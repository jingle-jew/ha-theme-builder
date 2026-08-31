import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ThemeVariable } from "../models/types";
import { parseCssColor, withAlpha, withHexColor } from "../utils/colors";
import { icon } from "../utils/icons";

export interface VariableChangeDetail {
  id: string;
  value?: string;
}

@customElement("theme-variable-control")
export class VariableControl extends LitElement {
  @property({ attribute: false }) public definition!: ThemeVariable;
  @property() public value = "";
  @property() public inheritedValue = "";
  @property({ type: Boolean }) public overridden = false;

  static styles = css`
    :host { display: block; }
    .control {
      padding: 15px 16px 16px;
      border-bottom: 1px solid var(--tb-border, #e5e7eb);
      background: var(--tb-panel, #fff);
      transition: background 160ms ease;
    }
    .control:hover { background: var(--tb-panel-hover, #fafbfc); }
    .heading { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 11px; }
    .meta { min-width: 0; flex: 1; }
    .label { font-size: 13px; line-height: 18px; font-weight: 650; color: var(--tb-text, #1d2433); }
    .key {
      margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      color: var(--tb-muted, #7b8495); font: 10.5px/15px ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .reset {
      display: grid; place-items: center; flex: 0 0 auto; width: 28px; height: 28px; border: 0;
      border-radius: 8px; color: var(--tb-muted, #7b8495); background: transparent; cursor: pointer;
    }
    .reset:hover:not(:disabled) { color: var(--tb-accent, #6558d9); background: var(--tb-accent-soft, #eeecff); }
    .reset:disabled { opacity: .25; cursor: default; }
    .row { display: flex; align-items: center; gap: 9px; }
    .column { display: grid; gap: 10px; }
    input, select {
      box-sizing: border-box; min-width: 0; height: 36px; border: 1px solid var(--tb-input-border, #d9dde5);
      border-radius: 9px; outline: none; color: var(--tb-text, #1d2433); background: var(--tb-input, #fff);
      font: 12px/1.2 var(--tb-font, Inter, system-ui, sans-serif); transition: border-color 140ms ease, box-shadow 140ms ease;
    }
    input:focus, select:focus { border-color: var(--tb-accent, #6558d9); box-shadow: 0 0 0 3px var(--tb-accent-soft, #eeecff); }
    input[type="text"], input[type="number"], select { width: 100%; padding: 0 10px; }
    input[type="color"] { width: 42px; padding: 3px; cursor: pointer; flex: 0 0 auto; }
    input[type="range"] {
      flex: 1; height: 20px; border: 0; padding: 0; box-shadow: none; accent-color: var(--tb-accent, #6558d9);
      background: transparent; cursor: pointer;
    }
    .number { width: 77px !important; text-align: right; font-variant-numeric: tabular-nums; }
    .unit {
      min-width: 31px; color: var(--tb-muted, #7b8495); font-size: 11px; text-align: left;
    }
    .range-label { display: flex; justify-content: space-between; color: var(--tb-muted, #7b8495); font-size: 10px; }
    .alpha { display: grid; grid-template-columns: 48px 1fr 39px; align-items: center; gap: 8px; margin-top: 9px; }
    .alpha span { color: var(--tb-muted, #7b8495); font-size: 10px; }
    .alpha output { color: var(--tb-text, #1d2433); font-size: 10px; text-align: right; font-variant-numeric: tabular-nums; }
    .filter-grid { display: grid; gap: 10px; }
    .filter-row { display: grid; grid-template-columns: 62px 1fr 51px; align-items: center; gap: 8px; }
    .filter-row label { color: var(--tb-muted, #7b8495); font-size: 11px; }
    .filter-row output { color: var(--tb-text, #1d2433); font-size: 11px; text-align: right; font-variant-numeric: tabular-nums; }
    .badge {
      display: inline-flex; align-items: center; height: 18px; margin-left: 6px; padding: 0 6px; border-radius: 999px;
      vertical-align: 1px; color: #8a5d13; background: #fff1cf; font-size: 8px; font-weight: 700; letter-spacing: .03em;
      text-transform: uppercase;
    }
  `;

  private emitValue(value?: string): void {
    this.dispatchEvent(new CustomEvent<VariableChangeDetail>("variable-change", {
      detail: { id: this.definition.id, value }, bubbles: true, composed: true,
    }));
  }

  private current(): string {
    return this.value || this.inheritedValue || this.definition.defaultValue || "";
  }

  private renderColor() {
    const current = this.current();
    const parsed = parseCssColor(current);
    const displayHex = parsed?.hex ?? "#64748b";
    const format = this.definition.format ?? "css-color";
    return html`
      <div class="row">
        <input
          type="color"
          aria-label="Sélecteur de couleur"
          .value=${displayHex}
          @input=${(event: Event) => this.emitValue(withHexColor(current, (event.target as HTMLInputElement).value, format))}
        />
        <input
          type="text"
          spellcheck="false"
          aria-label="Valeur CSS"
          .value=${this.value || this.inheritedValue}
          placeholder=${this.definition.defaultValue || "Couleur CSS"}
          @input=${(event: Event) => this.emitValue((event.target as HTMLInputElement).value)}
        />
      </div>
      ${format === "css-color" && parsed ? html`
        <div class="alpha">
          <span>Opacité</span>
          <input
            type="range" min="0" max="1" step="0.01"
            .value=${String(parsed.alpha)}
            @input=${(event: Event) => this.emitValue(withAlpha(current, Number((event.target as HTMLInputElement).value)))}
          />
          <output>${Math.round(parsed.alpha * 100)}%</output>
        </div>
      ` : nothing}
    `;
  }

  private renderRange() {
    const fallback = this.definition.defaultValue || `0${this.definition.unit ?? ""}`;
    const numeric = Number.parseFloat(this.current() || fallback);
    const value = Number.isFinite(numeric) ? numeric : 0;
    const min = this.definition.min ?? 0;
    const max = this.definition.max ?? 100;
    const step = this.definition.step ?? 1;
    const unit = this.definition.unit ?? "";
    const update = (event: Event) => this.emitValue(`${(event.target as HTMLInputElement).value}${unit}`);
    return html`
      <div class="row">
        <input type="range" .min=${String(min)} .max=${String(max)} .step=${String(step)} .value=${String(value)} @input=${update} />
        <input class="number" type="number" .min=${String(min)} .max=${String(max)} .step=${String(step)} .value=${String(value)} @input=${update} />
        <span class="unit">${unit || "—"}</span>
      </div>
      <div class="range-label"><span>${min}${unit}</span><span>${max}${unit}</span></div>
    `;
  }

  private renderFilter() {
    const current = this.current();
    const blur = Number(current.match(/blur\(([\d.]+)px\)/)?.[1] ?? 0);
    const saturation = Number(current.match(/saturate\(([\d.]+)%\)/)?.[1] ?? 100);
    const update = (nextBlur: number, nextSaturation: number) =>
      this.emitValue(nextBlur === 0 && nextSaturation === 100 ? "none" : `blur(${nextBlur}px) saturate(${nextSaturation}%)`);
    return html`
      <div class="filter-grid">
        <div class="filter-row">
          <label>Flou</label>
          <input type="range" min="0" max="48" step="1" .value=${String(blur)} @input=${(event: Event) => update(Number((event.target as HTMLInputElement).value), saturation)} />
          <output>${blur}px</output>
        </div>
        <div class="filter-row">
          <label>Saturation</label>
          <input type="range" min="50" max="200" step="1" .value=${String(saturation)} @input=${(event: Event) => update(blur, Number((event.target as HTMLInputElement).value))} />
          <output>${saturation}%</output>
        </div>
      </div>
    `;
  }

  private renderInput() {
    if (this.definition.kind === "color") return this.renderColor();
    if (this.definition.kind === "range") return this.renderRange();
    if (this.definition.kind === "filter") return this.renderFilter();
    if (this.definition.kind === "select") return html`
      <select .value=${this.current()} @change=${(event: Event) => this.emitValue((event.target as HTMLSelectElement).value)}>
        ${(this.definition.options ?? []).map((option) => html`<option value=${option}>${option}</option>`)}
      </select>
    `;
    return html`
      <input
        type="text"
        spellcheck="false"
        .value=${this.value || this.inheritedValue}
        placeholder=${this.definition.defaultValue || "Valeur CSS"}
        @input=${(event: Event) => this.emitValue((event.target as HTMLInputElement).value)}
      />
    `;
  }

  protected render() {
    return html`
      <section class="control">
        <div class="heading">
          <div class="meta">
            <div class="label">${this.definition.label}${this.definition.legacy ? html`<span class="badge">legacy</span>` : nothing}</div>
            <div class="key">--${this.definition.id}</div>
          </div>
          <button class="reset" ?disabled=${!this.overridden} title="Réinitialiser cette valeur" @click=${() => this.emitValue(undefined)}>
            ${icon("reset", 17)}
          </button>
        </div>
        ${this.renderInput()}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-variable-control": VariableControl;
  }
}
