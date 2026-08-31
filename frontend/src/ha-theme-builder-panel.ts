import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./components/ha-preview";
import "./components/variable-control";
import type { VariableChangeDetail } from "./components/variable-control";
import { THEME_VARIABLES, CATALOG_SOURCE } from "./data/theme-catalog.generated";
import { THEME_GROUPS } from "./data/groups";
import { THEME_PRESETS } from "./data/presets";
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
  @state() private modal: "presets" | "custom" | "library" | null = null;
  @state() private customName = "";
  @state() private customValue = "";
  @state() private dirty = false;
  @state() private toast?: { message: string; error?: boolean };
  @state() private savedThemes: string[] = [];
  @state() private libraryLoading = false;

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

  private get visibleDefinitions(): readonly ThemeVariable[] {
    const query = this.query.trim().toLocaleLowerCase();
    const currentIds = new Set(Object.keys(modeValues(this.theme, this.activeMode)));
    return this.allDefinitions
      .filter((definition) => this.showLegacy || !definition.legacy)
      .filter((definition) => this.expert || definition.group !== "advanced")
      .filter((definition) => {
        if (query) return `${definition.id} ${definition.label}`.toLocaleLowerCase().includes(query);
        if (this.selectedGroup === "all") return definition.featured || currentIds.has(definition.id);
        return definition.group === this.selectedGroup;
      })
      .sort((left, right) => {
        const featured = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
        return featured || left.id.localeCompare(right.id);
      });
  }

  private handleVariableChange(event: CustomEvent<VariableChangeDetail>): void {
    this.commit(setThemeValue(this.theme, this.activeMode, event.detail.id, event.detail.value));
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
    return html`
      <aside class=${`editor ${this.editorOpen ? "open" : ""}`}>
        <div class="editor-head">
          <div class="summary-line">
            <div class="summary-title"><strong>Variables du thème</strong><span>${changedCount(this.theme)} modifiées · ${CATALOG_SOURCE.count} disponibles</span></div>
            <div class="mode-segments" aria-label="Portée du thème">
              ${(["base", "light", "dark"] as const).map((mode) => html`<button class=${`segment-button ${this.activeMode === mode ? "active" : ""}`} title=${mode === "base" ? "Valeurs communes" : mode === "light" ? "Mode clair" : "Mode sombre"} @click=${() => { this.activeMode = mode; }}>${mode === "base" ? "Base" : icon(mode === "light" ? "sun" : "moon", 14)}</button>`)}
            </div>
          </div>
          <div class="search-row">
            <label class="search">${icon("search", 16)}<input type="search" placeholder="Rechercher une variable…" .value=${this.query} @input=${(event: Event) => { this.query = (event.target as HTMLInputElement).value; }} /></label>
            <button class="icon-button add-variable" title="Ajouter une variable personnalisée" @click=${() => { this.modal = "custom"; }}>${icon("plus", 17)}</button>
          </div>
          <div class="filter-row">
            <select class="group-select" aria-label="Groupe de variables" .value=${this.selectedGroup} @change=${(event: Event) => { this.selectedGroup = (event.target as HTMLSelectElement).value; this.query = ""; }}>
              ${THEME_GROUPS.filter((item) => this.expert || item.id !== "advanced").map((item) => html`<option value=${item.id}>${item.label}</option>`)}
            </select>
            <label class="expert-toggle"><input type="checkbox" .checked=${this.expert} @change=${(event: Event) => { this.expert = (event.target as HTMLInputElement).checked; if (!this.expert && this.selectedGroup === "advanced") this.selectedGroup = "all"; }} />Expert</label>
          </div>
          ${this.expert ? html`<div class="legacy-row"><label class="expert-toggle"><input type="checkbox" .checked=${this.showLegacy} @change=${(event: Event) => { this.showLegacy = (event.target as HTMLInputElement).checked; }} />Afficher les alias legacy</label></div>` : nothing}
        </div>
        <div class="variable-list" @variable-change=${this.handleVariableChange}>
          <div class="list-caption"><span>${this.query ? "Résultats" : group.label}</span><span>${this.visibleDefinitions.length} variable${this.visibleDefinitions.length > 1 ? "s" : ""}</span></div>
          ${this.visibleDefinitions.length ? this.visibleDefinitions.map((definition) => html`
            <theme-variable-control
              .definition=${definition}
              .value=${targetValues[definition.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? definition.defaultValue : (baseValues[definition.id] ?? definition.defaultValue)}
              .overridden=${Object.hasOwn(targetValues, definition.id)}
            ></theme-variable-control>
          `) : html`<div class="empty"><div><strong>Aucune variable trouvée</strong><span>Essaie un autre terme ou active le mode expert.</span></div></div>`}
        </div>
      </aside>
    `;
  }

  private renderPreview() {
    const previewMode = this.activeMode === "dark" ? "dark" : "light";
    const values = this.activeMode === "base" ? this.theme.values : resolvedValues(this.theme, previewMode);
    return html`
      <section class="preview-pane">
        <div class="preview-toolbar">
          <span class="preview-label">Aperçu</span>
          <div class="preview-tabs">
            ${(["card", "dashboard", "system"] as const).map((kind) => html`<button class=${`segment-button ${this.previewKind === kind ? "active" : ""}`} @click=${() => { this.previewKind = kind; }}>${icon(kind === "card" ? "card" : kind === "dashboard" ? "dashboard" : "settings", 14)}<span>${kind === "card" ? "Cartes" : kind === "dashboard" ? "Dashboard" : "Système"}</span></button>`)}
          </div>
          <div class="device-tabs">
            ${(["desktop", "tablet", "mobile"] as const).map((device) => html`<button class=${`segment-button ${this.previewDevice === device ? "active" : ""}`} title=${device} @click=${() => { this.previewDevice = device; }}>${icon(device, 15)}</button>`)}
          </div>
        </div>
        <div class="preview-stage"><ha-theme-preview .values=${values} .kind=${this.previewKind} .device=${this.previewDevice}></ha-theme-preview></div>
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
      ${this.toast ? html`<div class=${`toast ${this.toast.error ? "error" : ""}`}>${icon(this.toast.error ? "close" : "check", 17)}${this.toast.message}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-theme-builder-panel": HAThemeBuilderPanel;
  }
}
