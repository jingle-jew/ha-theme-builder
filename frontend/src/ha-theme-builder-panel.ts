import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/ha-preview";
import "./components/variable-control";
import type { VariableChangeDetail } from "./components/variable-control";
import { THEME_VARIABLES, CATALOG_SOURCE } from "./data/theme-catalog.generated";
import { THEME_GROUPS } from "./data/groups";
import { THEME_PRESETS } from "./data/presets";
import {
  DEFAULT_VARIABLE_IDS,
  VISUAL_CONTROLS,
  visualControl,
  type VisualControlId,
  type VisualControlRequestDetail,
} from "./data/visual-controls";
import type {
  HomeAssistantLike,
  PreviewDevice,
  PreviewKind,
  ThemeDocument,
  ThemeMode,
  ThemeVariable,
} from "./models/types";
import { appStyles } from "./styles/app-styles";
import { icon } from "./utils/icons";
import {
  backgroundImageUrl,
  backgroundImageValue,
  isSupportedBackgroundUrl,
} from "./utils/background";
import {
  changedCount,
  cloneTheme,
  modeValues,
  resolvedValues,
  setThemeValue,
  themeFromYaml,
  themeToYaml,
} from "./utils/theme-document";

const DRAFT_KEY = "ha-theme-builder:draft:v1";
const CUSTOM_PROPERTY = /^[a-z][a-z0-9_-]*$/;
const MAX_BACKGROUND_BYTES = 8 * 1024 * 1024;
const EXPERT_PAGE_SIZE = 120;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture de l’image impossible."));
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const content = result.split(",", 2)[1];
      if (!content) reject(new Error("Lecture de l’image impossible."));
      else resolve(content);
    };
    reader.readAsDataURL(file);
  });
}

function themeFromPreset(index = 1): ThemeDocument {
  const preset = THEME_PRESETS[index] ?? THEME_PRESETS[0];
  return {
    name: preset.name,
    values: { ...preset.theme.values },
    modes: {
      light: { ...preset.theme.modes.light },
      dark: { ...preset.theme.modes.dark },
    },
  };
}

@customElement("ha-theme-builder-panel")
export class HAThemeBuilderPanel extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantLike;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public route?: unknown;
  @property({ attribute: false }) public panel?: unknown;

  @state() private theme = themeFromPreset();
  @state() private activeMode: ThemeMode = "base";
  @state() private previewKind: PreviewKind = "dashboard";
  @state() private previewDevice: PreviewDevice = "desktop";
  @state() private selectedGroup = "all";
  @state() private query = "";
  @state() private expert = false;
  @state() private showLegacy = false;
  @state() private editorOpen = false;
  @state() private modal: "presets" | "custom" | "library" | "background" | null = null;
  @state() private customName = "";
  @state() private customValue = "";
  @state() private dirty = false;
  @state() private toast?: { message: string; error?: boolean };
  @state() private savedThemes: string[] = [];
  @state() private libraryLoading = false;
  @state() private backgroundUrl = "";
  @state() private backgroundUploading = false;
  @state() private visualMenu?: { id: VisualControlId; left: number; top: number };
  @state() private expertLimit = EXPERT_PAGE_SIZE;

  private history: ThemeDocument[] = [cloneTheme(this.theme)];
  private historyIndex = 0;
  private toastTimer?: number;

  static styles = appStyles;

  connectedCallback(): void {
    super.connectedCallback();
    try {
      const draft = window.localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft) as ThemeDocument;
        if (parsed?.name && parsed?.values && parsed?.modes) {
          this.theme = parsed;
          this.history = [cloneTheme(parsed)];
        }
      }
    } catch {
      // Storage is optional inside hardened browser contexts.
    }
  }

  disconnectedCallback(): void {
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("theme")) {
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(this.theme));
      } catch {
        // Keep the editor functional when storage is unavailable.
      }
    }
    if (changed.has("dirty")) {
      const dirtyWindow = window as Window & { isDirtyState?: boolean };
      dirtyWindow.isDirtyState = this.dirty;
      window.dispatchEvent(new CustomEvent("dirty-state-changed", { detail: { isDirty: this.dirty } }));
    }
  }

  private commit(next: ThemeDocument, markDirty = true): void {
    this.theme = next;
    this.history = [...this.history.slice(0, this.historyIndex + 1), cloneTheme(next)].slice(-80);
    this.historyIndex = this.history.length - 1;
    if (markDirty) this.dirty = true;
  }

  private undo(): void {
    if (this.historyIndex <= 0) return;
    this.historyIndex -= 1;
    this.theme = cloneTheme(this.history[this.historyIndex]);
    this.dirty = true;
  }

  private redo(): void {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex += 1;
    this.theme = cloneTheme(this.history[this.historyIndex]);
    this.dirty = true;
  }

  private notify(message: string, error = false): void {
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    this.toast = { message, error };
    this.toastTimer = window.setTimeout(() => { this.toast = undefined; }, 3400);
  }

  private get allDefinitions(): readonly ThemeVariable[] {
    const known = new Set(THEME_VARIABLES.map((definition) => definition.id));
    const customIds = new Set([
      ...Object.keys(this.theme.values),
      ...Object.keys(this.theme.modes.light),
      ...Object.keys(this.theme.modes.dark),
    ].filter((id) => !known.has(id)));
    const custom: ThemeVariable[] = [...customIds].sort().map((id) => ({
      id,
      label: id.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase()),
      description: "Variable personnalisée ou état de domaine dynamique.",
      group: "advanced",
      kind: "text",
      defaultValue: "",
      featured: false,
      legacy: false,
      source: "builder",
    }));
    return [...THEME_VARIABLES, ...custom];
  }

  private get expertDefinitions(): readonly ThemeVariable[] {
    const query = this.query.trim().toLocaleLowerCase();
    return this.allDefinitions
      .filter((definition) => this.showLegacy || !definition.legacy)
      .filter((definition) => {
        if (query) return `${definition.id} ${definition.label}`.toLocaleLowerCase().includes(query);
        if (this.selectedGroup === "all") return true;
        return definition.group === this.selectedGroup;
      })
      .sort((left, right) => {
        const featured = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
        return featured || left.id.localeCompare(right.id);
      });
  }

  private get visibleDefinitions(): readonly ThemeVariable[] {
    if (!this.expert) {
      const definitions = new Map(this.allDefinitions.map((definition) => [definition.id, definition]));
      return DEFAULT_VARIABLE_IDS.flatMap((id) => definitions.get(id) ?? []);
    }
    return this.expertDefinitions.slice(0, this.expertLimit);
  }

  private handleVariableChange(event: CustomEvent<VariableChangeDetail>): void {
    this.commit(setThemeValue(this.theme, this.activeMode, event.detail.id, event.detail.value));
  }

  private setExpert(expert: boolean): void {
    this.expert = expert;
    this.visualMenu = undefined;
    this.query = "";
    this.expertLimit = EXPERT_PAGE_SIZE;
    if (!expert) this.selectedGroup = "all";
  }

  private positionVisualMenu(id: VisualControlId, clientX: number, clientY: number): void {
    const width = 370;
    const left = Math.max(12, Math.min(clientX + 14, window.innerWidth - width - 12));
    const top = Math.max(72, Math.min(clientY - 28, window.innerHeight - 520));
    this.visualMenu = { id, left, top };
  }

  private openVisualMenu(event: CustomEvent<VisualControlRequestDetail>): void {
    const { id, clientX, clientY } = event.detail;
    this.positionVisualMenu(id, clientX, clientY);
  }

  private openVisualMenuFromButton(id: VisualControlId, event: Event): void {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.positionVisualMenu(id, bounds.right, bounds.top + bounds.height / 2);
  }

  private selectPreset(index: number): void {
    this.commit(themeFromPreset(index));
    this.modal = null;
    this.selectedGroup = "all";
    this.query = "";
    this.notify(`Préréglage « ${THEME_PRESETS[index].name} » appliqué.`);
  }

  private addCustomVariable(): void {
    const id = this.customName.trim().replace(/^--/, "");
    if (!CUSTOM_PROPERTY.test(id)) {
      this.notify("Le nom doit ressembler à state-light-custom-color.", true);
      return;
    }
    if (!this.customValue.trim()) {
      this.notify("Ajoute une valeur CSS avant de continuer.", true);
      return;
    }
    this.commit(setThemeValue(this.theme, this.activeMode, id, this.customValue));
    this.expert = true;
    this.selectedGroup = "advanced";
    this.query = id;
    this.customName = "";
    this.customValue = "";
    this.modal = null;
    this.notify(`Variable --${id} ajoutée.`);
  }

  private openBackground(): void {
    const values = this.activeMode === "base"
      ? this.theme.values
      : resolvedValues(this.theme, this.activeMode);
    this.backgroundUrl = backgroundImageUrl(values["lovelace-background"]);
    this.modal = "background";
  }

  private applyBackgroundUrl(): void {
    const url = this.backgroundUrl.trim();
    if (!isSupportedBackgroundUrl(url)) {
      this.notify("Utilise une URL http(s) ou un chemin Home Assistant commençant par /local/.", true);
      return;
    }
    this.commit(setThemeValue(this.theme, this.activeMode, "lovelace-background", backgroundImageValue(url)));
    this.modal = null;
    this.notify("Arrière-plan photo appliqué.");
  }

  private removeBackground(): void {
    this.commit(setThemeValue(this.theme, this.activeMode, "lovelace-background", undefined));
    this.backgroundUrl = "";
    this.modal = null;
    this.notify(this.activeMode === "base" ? "Arrière-plan photo retiré." : "Arrière-plan retiré pour ce mode.");
  }

  private async uploadBackground(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !this.hass?.callWS) return;
    if (file.size > MAX_BACKGROUND_BYTES) {
      this.notify("L’image doit faire 8 Mo ou moins.", true);
      return;
    }
    this.backgroundUploading = true;
    try {
      const content = await fileToBase64(file);
      const result = await this.hass.callWS<{ url: string }>({
        type: "ha_theme_builder/upload_background",
        content,
      });
      this.backgroundUrl = result.url;
      this.commit(setThemeValue(this.theme, this.activeMode, "lovelace-background", backgroundImageValue(result.url)));
      this.modal = null;
      this.notify("Photo téléversée et appliquée.");
    } catch (error) {
      this.notify(error instanceof Error ? error.message : "Téléversement impossible.", true);
    } finally {
      this.backgroundUploading = false;
    }
  }

  private async importFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      const imported = themeFromYaml(await file.text());
      this.commit(imported);
      this.selectedGroup = "all";
      this.query = "";
      this.notify(`Thème « ${imported.name} » importé.`);
    } catch (error) {
      this.notify(error instanceof Error ? error.message : "Import YAML impossible.", true);
    }
  }

  private async copyYaml(): Promise<void> {
    try {
      await navigator.clipboard.writeText(themeToYaml(this.theme));
      this.notify("YAML copié dans le presse-papiers.");
    } catch {
      this.notify("Le navigateur a refusé l’accès au presse-papiers.", true);
    }
  }

  private downloadYaml(): void {
    const blob = new Blob([themeToYaml(this.theme)], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.theme.name.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ha-theme"}.yaml`;
    link.click();
    URL.revokeObjectURL(url);
    this.notify("Fichier YAML téléchargé.");
  }

  private async saveToHomeAssistant(): Promise<void> {
    if (!this.hass?.callWS) {
      this.downloadYaml();
      return;
    }
    try {
      await this.hass.callWS({
        type: "ha_theme_builder/save",
        name: this.theme.name,
        values: this.theme.values,
        modes: this.theme.modes,
      });
      this.dirty = false;
      this.notify(`« ${this.theme.name} » enregistré dans Home Assistant.`);
    } catch (error) {
      this.notify(error instanceof Error ? error.message : "Enregistrement impossible.", true);
    }
  }

  private async openLibrary(): Promise<void> {
    if (!this.hass?.callWS) return;
    this.modal = "library";
    this.libraryLoading = true;
    try {
      const result = await this.hass.callWS<{ themes: string[] }>({ type: "ha_theme_builder/list" });
      this.savedThemes = result.themes;
    } catch (error) {
      this.notify(error instanceof Error ? error.message : "Liste des thèmes inaccessible.", true);
    } finally {
      this.libraryLoading = false;
    }
  }

  private async loadSavedTheme(name: string): Promise<void> {
    if (!this.hass?.callWS) return;
    try {
      const theme = await this.hass.callWS<ThemeDocument>({ type: "ha_theme_builder/get", name });
      this.commit(theme, false);
      this.dirty = false;
      this.modal = null;
      this.selectedGroup = "all";
      this.query = "";
      this.notify(`« ${name} » chargé.`);
    } catch (error) {
      this.notify(error instanceof Error ? error.message : "Chargement impossible.", true);
    }
  }

  private renderTopbar() {
    return html`
      <header class="topbar">
        <button class="icon-button menu-button" title="Ouvrir l’éditeur" @click=${() => { this.editorOpen = !this.editorOpen; }}>${icon("menu")}</button>
        <div class="brand"><div class="brand-mark">${icon("palette", 21)}</div><div class="brand-copy"><strong>Theme Builder</strong><span>Home Assistant</span></div></div>
        <div class="divider"></div>
        <input class="theme-name" aria-label="Nom du thème" .value=${this.theme.name} @change=${(event: Event) => { const next = cloneTheme(this.theme); next.name = (event.target as HTMLInputElement).value; this.commit(next); }} />
        ${this.dirty ? html`<span class="dirty-badge" title="Modifications non enregistrées"></span>` : nothing}
        <div class="top-spacer"></div>
        ${!this.hass ? html`<span class="demo-pill">Aperçu local</span>` : nothing}
        <div class="undo-group">
          <button class="icon-button" title="Annuler" ?disabled=${this.historyIndex === 0} @click=${this.undo}>${icon("undo", 18)}</button>
        </div>
        <button class="icon-button" title="Rétablir" ?disabled=${this.historyIndex >= this.history.length - 1} @click=${this.redo}>${icon("redo", 18)}</button>
        <button class="button secondary-action" @click=${() => { this.modal = "presets"; }}>${icon("sparkles", 16)}<span class="optional">Préréglages</span></button>
        ${this.hass ? html`<button class="button secondary-action" @click=${this.openLibrary}>${icon("folder", 16)}<span class="optional">Mes thèmes</span></button>` : nothing}
        <label class="button secondary-action" title="Importer un thème YAML">${icon("upload", 16)}<span class="optional">Importer</span><input class="hidden-input" type="file" accept=".yaml,.yml,text/yaml" @change=${this.importFile} /></label>
        <button class="icon-button copy-action" title="Copier le YAML" @click=${this.copyYaml}>${icon("copy", 17)}</button>
        <button class="button primary" @click=${this.saveToHomeAssistant}>${icon(this.hass ? "save" : "download", 16)}<span>${this.hass ? "Enregistrer" : "Télécharger"}</span></button>
      </header>
    `;
  }

  private renderEditor() {
    const targetValues = modeValues(this.theme, this.activeMode);
    const baseValues = this.theme.values;
    const group = THEME_GROUPS.find((item) => item.id === this.selectedGroup) ?? THEME_GROUPS[0];
    const definitions = this.visibleDefinitions;
    const expertTotal = this.expert ? this.expertDefinitions.length : definitions.length;
    return html`
      <aside class=${`editor ${this.editorOpen ? "open" : ""}`}>
        <div class="editor-head">
          <div class="summary-line">
            <div class="summary-title"><strong>${this.expert ? "Catalogue expert" : "Studio visuel"}</strong><span>${changedCount(this.theme)} modifiées · ${this.expert ? `${CATALOG_SOURCE.count} variables disponibles` : "réglages essentiels"}</span></div>
            <div class="mode-segments" aria-label="Portée du thème">
              ${(["base", "light", "dark"] as const).map((mode) => html`<button class=${`segment-button ${this.activeMode === mode ? "active" : ""}`} title=${mode === "base" ? "Valeurs communes" : mode === "light" ? "Mode clair" : "Mode sombre"} @click=${() => { this.activeMode = mode; this.visualMenu = undefined; }}>${mode === "base" ? "Base" : icon(mode === "light" ? "sun" : "moon", 14)}</button>`)}
            </div>
          </div>
          <div class="experience-switch" aria-label="Expérience d’édition">
            <button class=${`experience-button ${!this.expert ? "active" : ""}`} @click=${() => this.setExpert(false)}>${icon("sparkles", 15)} Visuel</button>
            <button class=${`experience-button ${this.expert ? "active" : ""}`} @click=${() => this.setExpert(true)}>${icon("settings", 15)} Expert</button>
          </div>
          ${this.expert ? html`
            <div class="search-row expert-search-row">
              <label class="search">${icon("search", 16)}<input type="search" placeholder="Rechercher parmi toutes les variables…" .value=${this.query} @input=${(event: Event) => { this.query = (event.target as HTMLInputElement).value; this.expertLimit = EXPERT_PAGE_SIZE; }} /></label>
              <button class="icon-button add-variable" title="Ajouter une variable personnalisée" @click=${() => { this.modal = "custom"; }}>${icon("plus", 17)}</button>
            </div>
            <div class="filter-row">
              <select class="group-select" aria-label="Groupe de variables" .value=${this.selectedGroup} @change=${(event: Event) => { this.selectedGroup = (event.target as HTMLSelectElement).value; this.query = ""; this.expertLimit = EXPERT_PAGE_SIZE; }}>
                ${THEME_GROUPS.map((item) => html`<option value=${item.id}>${item.id === "all" ? "Toutes les variables" : item.label}</option>`)}
              </select>
              <label class="expert-toggle"><input type="checkbox" .checked=${this.showLegacy} @change=${(event: Event) => { this.showLegacy = (event.target as HTMLInputElement).checked; this.expertLimit = EXPERT_PAGE_SIZE; }} />Legacy</label>
            </div>
          ` : html`
            <div class="visual-guide">
              <span class="visual-guide-icon">${icon("sparkles", 16)}</span>
              <span><strong>Modifie directement l’aperçu</strong><small>Clique une pastille pour ouvrir ses réglages.</small></span>
            </div>
            <div class="visual-zone-grid">
              ${VISUAL_CONTROLS.map((control) => html`<button class="visual-zone-button" title=${control.description} @click=${(event: Event) => this.openVisualMenuFromButton(control.id, event)}>${icon(control.icon, 14)}<span>${control.label}</span></button>`)}
            </div>
          `}
        </div>
        <div class="variable-list" @variable-change=${this.handleVariableChange}>
          <div class="list-caption"><span>${this.expert ? (this.query ? "Résultats" : this.selectedGroup === "all" ? "Toutes les variables" : group.label) : "Réglages globaux"}</span><span>${this.expert ? `${definitions.length}/${expertTotal}` : definitions.length} variable${expertTotal > 1 ? "s" : ""}</span></div>
          ${definitions.length ? definitions.map((definition) => html`
            <theme-variable-control
              .definition=${definition}
              .value=${targetValues[definition.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? definition.defaultValue : (baseValues[definition.id] ?? definition.defaultValue)}
              .overridden=${Object.hasOwn(targetValues, definition.id)}
            ></theme-variable-control>
          `) : html`<div class="empty"><div><strong>Aucune variable trouvée</strong><span>Essaie un autre terme ou affiche les alias legacy.</span></div></div>`}
          ${this.expert && definitions.length < expertTotal ? html`<button class="load-more" @click=${() => { this.expertLimit += EXPERT_PAGE_SIZE; }}>Afficher ${Math.min(EXPERT_PAGE_SIZE, expertTotal - definitions.length)} variables supplémentaires</button>` : nothing}
        </div>
      </aside>
    `;
  }

  private renderPreview() {
    const previewMode = this.activeMode === "dark" ? "dark" : "light";
    const values = this.activeMode === "base" ? this.theme.values : resolvedValues(this.theme, previewMode);
    const hasBackground = Boolean(backgroundImageUrl(values["lovelace-background"]));
    return html`
      <section class="preview-pane">
        <div class="preview-toolbar">
          <span class="preview-label">Aperçu</span>
          <div class="preview-tabs">
            ${(["card", "dashboard", "system"] as const).map((kind) => html`<button class=${`segment-button ${this.previewKind === kind ? "active" : ""}`} @click=${() => { this.previewKind = kind; this.visualMenu = undefined; }}>${icon(kind === "card" ? "card" : kind === "dashboard" ? "dashboard" : "settings", 14)}<span>${kind === "card" ? "Cartes" : kind === "dashboard" ? "Dashboard" : "Système"}</span></button>`)}
          </div>
          <button class=${`button background-action ${hasBackground ? "active" : ""}`} @click=${this.openBackground}>${icon("image", 15)}<span>Arrière-plan</span></button>
          ${!this.expert ? html`<span class="inspector-badge">${icon("sparkles", 13)} Pastilles actives</span>` : nothing}
          <div class="device-tabs">
            ${(["desktop", "tablet", "mobile"] as const).map((device) => html`<button class=${`segment-button ${this.previewDevice === device ? "active" : ""}`} title=${device} @click=${() => { this.previewDevice = device; }}>${icon(device, 15)}</button>`)}
          </div>
        </div>
        <div class="preview-stage"><ha-theme-preview .values=${values} .kind=${this.previewKind} .device=${this.previewDevice} .inspector=${!this.expert} @visual-control-request=${this.openVisualMenu}></ha-theme-preview></div>
      </section>
    `;
  }

  private renderVisualMenu() {
    if (!this.visualMenu || this.expert) return nothing;
    const control = visualControl(this.visualMenu.id);
    const definitions = new Map(this.allDefinitions.map((definition) => [definition.id, definition]));
    const targetValues = modeValues(this.theme, this.activeMode);
    const baseValues = this.theme.values;
    const controls = control.variables.flatMap((id) => definitions.get(id) ?? []);
    return html`
      <div class="visual-menu-scrim" @click=${() => { this.visualMenu = undefined; }}></div>
      <section class="visual-menu" role="dialog" aria-label=${control.label} style=${`left:${this.visualMenu.left}px;top:${this.visualMenu.top}px`}>
        <div class="visual-menu-head">
          <span class="visual-menu-icon">${icon(control.icon, 17)}</span>
          <span><strong>${control.label}</strong><small>${control.description}</small></span>
          <button class="icon-button" title="Fermer" @click=${() => { this.visualMenu = undefined; }}>${icon("close", 16)}</button>
        </div>
        <div class="visual-menu-scope">${this.activeMode === "base" ? "Valeurs communes" : this.activeMode === "light" ? "Mode clair" : "Mode sombre"}</div>
        ${control.photo ? html`<button class="photo-menu-button" @click=${() => { this.visualMenu = undefined; this.openBackground(); }}>${icon("image", 16)}<span><strong>Photo d’arrière-plan</strong><small>Choisir, remplacer ou retirer l’image</small></span>${icon("chevron", 15)}</button>` : nothing}
        <div class="visual-menu-controls" @variable-change=${this.handleVariableChange}>
          ${controls.map((definition) => html`
            <theme-variable-control
              .definition=${definition}
              .value=${targetValues[definition.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? definition.defaultValue : (baseValues[definition.id] ?? definition.defaultValue)}
              .overridden=${Object.hasOwn(targetValues, definition.id)}
            ></theme-variable-control>
          `)}
        </div>
      </section>
    `;
  }

  private renderModal() {
    if (this.modal === "presets") return html`
      <div class="modal-backdrop" @click=${(event: Event) => { if (event.target === event.currentTarget) this.modal = null; }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Préréglages">
          <div class="dialog-head"><h2>Choisir un point de départ</h2><button class="icon-button" @click=${() => { this.modal = null; }}>${icon("close", 18)}</button></div>
          <div class="dialog-body"><div class="preset-grid">${THEME_PRESETS.map((preset, index) => html`<button class="preset" @click=${() => this.selectPreset(index)}><div class="swatches">${preset.swatches.map((swatch) => html`<span class="swatch" style=${`background:${swatch}`}></span>`)}</div><strong>${preset.name}</strong><p>${preset.description}</p></button>`)}</div></div>
        </section>
      </div>
    `;
    if (this.modal === "custom") return html`
      <div class="modal-backdrop" @click=${(event: Event) => { if (event.target === event.currentTarget) this.modal = null; }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Variable personnalisée">
          <div class="dialog-head"><h2>Ajouter une variable personnalisée</h2><button class="icon-button" @click=${() => { this.modal = null; }}>${icon("close", 18)}</button></div>
          <div class="dialog-body">
            <div class="field"><label>Nom de la variable</label><input autofocus placeholder="state-light-reading-color" .value=${this.customName} @input=${(event: Event) => { this.customName = (event.target as HTMLInputElement).value; }} /><div class="field-hint">Sans les deux tirets. Cette entrée couvre aussi les modèles dynamiques comme <code>state-{domain}-{state}-color</code>.</div></div>
            <div class="field"><label>Valeur CSS</label><input placeholder="#ffd166 ou var(--accent-color)" .value=${this.customValue} @input=${(event: Event) => { this.customValue = (event.target as HTMLInputElement).value; }} /></div>
          </div>
          <div class="dialog-actions"><button class="button ghost" @click=${() => { this.modal = null; }}>Annuler</button><button class="button primary" @click=${this.addCustomVariable}>${icon("plus", 15)} Ajouter</button></div>
        </section>
      </div>
    `;
    if (this.modal === "background") return html`
      <div class="modal-backdrop" @click=${(event: Event) => { if (event.target === event.currentTarget && !this.backgroundUploading) this.modal = null; }}>
        <section class="dialog background-dialog" role="dialog" aria-modal="true" aria-label="Arrière-plan photo">
          <div class="dialog-head"><h2>Arrière-plan photo</h2><button class="icon-button" ?disabled=${this.backgroundUploading} @click=${() => { this.modal = null; }}>${icon("close", 18)}</button></div>
          <div class="dialog-body">
            ${this.backgroundUrl ? html`<div class="background-preview"><img src=${this.backgroundUrl} alt="Aperçu de l’arrière-plan" /></div>` : html`<div class="background-placeholder">${icon("image", 28)}<span>Aucune photo pour cette portée</span></div>`}
            ${this.hass ? html`
              <label class=${`button background-upload ${this.backgroundUploading ? "disabled" : ""}`}>
                ${icon("upload", 16)} ${this.backgroundUploading ? "Téléversement…" : "Choisir une photo"}
                <input class="hidden-input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" ?disabled=${this.backgroundUploading} @change=${this.uploadBackground} />
              </label>
              <div class="field-hint background-hint">JPEG, PNG, GIF ou WebP · 8 Mo maximum. La photo sera copiée dans <code>/config/www/ha_theme_builder/backgrounds/</code>.</div>
              <div class="or-divider"><span>ou</span></div>
            ` : html`<div class="field-hint background-hint">Dans l’aperçu local, utilise une URL. Le téléversement de fichier est disponible depuis le panneau Home Assistant.</div>`}
            <div class="field background-url-field">
              <label>URL de l’image</label>
              <input type="url" placeholder="https://… ou /local/…" .value=${this.backgroundUrl} @input=${(event: Event) => { this.backgroundUrl = (event.target as HTMLInputElement).value; }} @keydown=${(event: KeyboardEvent) => { if (event.key === "Enter") this.applyBackgroundUrl(); }} />
            </div>
            <div class="field-hint">Le réglage s’applique à la portée active : <strong>${this.activeMode === "base" ? "Base" : this.activeMode === "light" ? "Mode clair" : "Mode sombre"}</strong>.</div>
          </div>
          <div class="dialog-actions">
            <button class="button danger" ?disabled=${this.backgroundUploading || !backgroundImageUrl(modeValues(this.theme, this.activeMode)["lovelace-background"])} @click=${this.removeBackground}>${icon("trash", 15)} Retirer</button>
            <span class="dialog-spacer"></span>
            <button class="button ghost" ?disabled=${this.backgroundUploading} @click=${() => { this.modal = null; }}>Annuler</button>
            <button class="button primary" ?disabled=${this.backgroundUploading} @click=${this.applyBackgroundUrl}>Appliquer l’URL</button>
          </div>
        </section>
      </div>
    `;
    if (this.modal === "library") return html`
      <div class="modal-backdrop" @click=${(event: Event) => { if (event.target === event.currentTarget) this.modal = null; }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Mes thèmes">
          <div class="dialog-head"><h2>Mes thèmes Home Assistant</h2><button class="icon-button" @click=${() => { this.modal = null; }}>${icon("close", 18)}</button></div>
          <div class="dialog-body">
            ${this.libraryLoading ? html`<div class="empty"><div><strong>Chargement…</strong><span>Lecture de ha_theme_builder.yaml</span></div></div>` : this.savedThemes.length ? html`<div class="library-list">${this.savedThemes.map((name) => html`<button class="library-item" @click=${() => this.loadSavedTheme(name)}><span class="library-icon">${icon("palette", 17)}</span><span class="library-copy"><strong>${name}</strong><span>Ouvrir dans l’éditeur</span></span>${icon("chevron", 16)}</button>`)}</div>` : html`<div class="empty"><div><strong>Aucun thème enregistré</strong><span>Le premier apparaîtra ici après une sauvegarde.</span></div></div>`}
          </div>
        </section>
      </div>
    `;
    return nothing;
  }

  protected render() {
    return html`
      <div class="app">
        ${this.renderTopbar()}
        <main class="workspace">
          ${this.editorOpen ? html`<div class="editor-scrim" @click=${() => { this.editorOpen = false; }}></div>` : nothing}
          ${this.renderEditor()}
          ${this.renderPreview()}
        </main>
      </div>
      ${this.renderModal()}
      ${this.renderVisualMenu()}
      ${this.toast ? html`<div class=${`toast ${this.toast.error ? "error" : ""}`}>${icon(this.toast.error ? "close" : "check", 17)}${this.toast.message}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-theme-builder-panel": HAThemeBuilderPanel;
  }
}
