import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { PreviewDevice, PreviewKind } from "../models/types";
import { icon } from "../utils/icons";

@customElement("ha-theme-preview")
export class HAThemePreview extends LitElement {
  @property({ attribute: false }) public values: Record<string, string> = {};
  @property() public kind: PreviewKind = "dashboard";
  @property() public device: PreviewDevice = "desktop";

  static styles = css`
    :host {
      --primary-color: #03a9f4;
      --accent-color: #ff9800;
      --primary-text-color: #202124;
      --secondary-text-color: #727783;
      --disabled-text-color: #a0a5af;
      --primary-background-color: #f4f6f8;
      --secondary-background-color: #eef1f4;
      --card-background-color: #fff;
      --ha-card-background: var(--card-background-color);
      --ha-card-border-radius: 16px;
      --ha-card-border-width: 1px;
      --ha-card-border-color: rgba(0, 0, 0, .1);
      --ha-card-box-shadow: none;
      --ha-card-backdrop-filter: none;
      --divider-color: rgba(0, 0, 0, .12);
      --sidebar-background-color: #fff;
      --sidebar-text-color: var(--primary-text-color);
      --sidebar-icon-color: var(--secondary-text-color);
      --sidebar-selected-text-color: var(--primary-color);
      --sidebar-selected-icon-color: var(--primary-color);
      --sidebar-menu-button-background-color: color-mix(in srgb, var(--primary-color), transparent 88%);
      --app-header-background-color: var(--sidebar-background-color);
      --app-header-text-color: var(--primary-text-color);
      --state-active-color: var(--primary-color);
      --state-inactive-color: var(--secondary-text-color);
      --error-color: #db4437;
      --warning-color: #ffa600;
      --success-color: #43a047;
      --info-color: #039be5;
      --ha-font-family-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      min-height: 0;
      color: var(--primary-text-color);
      font-family: var(--ha-font-family-body);
    }
    * { box-sizing: border-box; }
    .device {
      position: relative;
      overflow: hidden;
      width: 100%; height: 100%; min-height: 420px;
      border: 1px solid color-mix(in srgb, var(--primary-text-color), transparent 84%);
      background: var(--primary-background-color);
      box-shadow: 0 22px 70px rgba(23, 30, 50, .16);
      transition: width 220ms ease, max-height 220ms ease, border-radius 220ms ease;
    }
    .device.desktop { max-width: 100%; border-radius: 13px; }
    .device.tablet { width: min(78%, 820px); max-height: 94%; border-radius: 22px; }
    .device.mobile { width: min(42%, 390px); min-width: 310px; max-height: 94%; border-radius: 28px; }
    .shell { display: grid; grid-template-columns: 188px minmax(0, 1fr); width: 100%; height: 100%; min-height: 420px; }
    .device.mobile .shell { grid-template-columns: 1fr; }
    .device.mobile .sidebar { display: none; }
    .device.tablet .shell { grid-template-columns: 76px minmax(0, 1fr); }
    .device.tablet .sidebar .nav-label, .device.tablet .sidebar .brand-name, .device.tablet .sidebar .user-meta { display: none; }
    .device.tablet .nav-item { justify-content: center; }
    .device.tablet .sidebar { padding-inline: 10px; }
    .sidebar {
      position: relative; z-index: 3; display: flex; flex-direction: column; min-width: 0; padding: 12px 9px;
      color: var(--sidebar-text-color); background: var(--sidebar-background-color);
      border-right: 1px solid var(--divider-color);
    }
    .brand { display: flex; align-items: center; gap: 9px; height: 46px; padding: 0 9px 10px; }
    .ha-logo {
      display: grid; place-items: center; flex: 0 0 auto; width: 28px; height: 28px; border-radius: 9px;
      color: white; background: linear-gradient(145deg, color-mix(in srgb, var(--primary-color), white 20%), var(--primary-color));
      font-size: 13px; font-weight: 800;
    }
    .brand-name { overflow: hidden; font-size: 11px; font-weight: 700; white-space: nowrap; }
    .navigation { display: grid; gap: 3px; }
    .nav-item {
      display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; border-radius: 9px;
      color: var(--sidebar-icon-color); font-size: 10px; font-weight: 540;
    }
    .nav-item.active { color: var(--sidebar-selected-text-color); background: var(--sidebar-menu-button-background-color); }
    .nav-item.active svg { color: var(--sidebar-selected-icon-color); }
    .user { display: flex; align-items: center; gap: 9px; margin-top: auto; padding: 10px 9px 2px; border-top: 1px solid var(--divider-color); }
    .avatar { display: grid; place-items: center; flex: 0 0 auto; width: 26px; height: 26px; border-radius: 50%; color: white; background: var(--primary-color); font-size: 9px; font-weight: 700; }
    .user-meta { min-width: 0; }
    .user-meta strong { display: block; overflow: hidden; font-size: 9px; white-space: nowrap; text-overflow: ellipsis; }
    .user-meta span { color: var(--secondary-text-color); font-size: 8px; }
    .main { display: grid; grid-template-rows: 51px minmax(0, 1fr); min-width: 0; min-height: 0; }
    .header {
      position: relative; z-index: 2; display: flex; align-items: center; gap: 10px; padding: 0 18px;
      color: var(--app-header-text-color); background: var(--app-header-background-color);
      border-bottom: var(--app-header-border-bottom, 1px solid var(--divider-color));
      -webkit-backdrop-filter: var(--app-header-backdrop-filter, none); backdrop-filter: var(--app-header-backdrop-filter, none);
    }
    .header-title { min-width: 0; flex: 1; overflow: hidden; font-size: 14px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
    .header-icon { display: grid; place-items: center; width: 29px; height: 29px; color: var(--secondary-text-color); }
    .content {
      position: relative; overflow: auto; min-height: 0; padding: 19px;
      background: var(--lovelace-background, var(--primary-background-color));
      background-position: center; background-size: cover;
    }
    .content::before, .content::after {
      content: ""; position: fixed; z-index: 0; width: 290px; height: 290px; border-radius: 50%; pointer-events: none;
      filter: blur(10px); opacity: .5;
    }
    .content::before { top: 80px; right: 8%; background: color-mix(in srgb, var(--primary-color), transparent 55%); }
    .content::after { bottom: -90px; left: 31%; background: color-mix(in srgb, var(--accent-color), transparent 65%); }
    .view { position: relative; z-index: 1; width: min(100%, 930px); margin: 0 auto; }
    .view-heading { display: flex; align-items: flex-end; justify-content: space-between; margin: 2px 2px 14px; }
    .view-heading h1 { margin: 0; color: var(--primary-text-color); font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
    .view-heading span { color: var(--secondary-text-color); font-size: 9px; }
    .grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 11px; }
    .ha-card {
      min-width: 0; overflow: hidden; color: var(--primary-text-color); background: var(--ha-card-background, var(--card-background-color));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      border-radius: var(--ha-card-border-radius, 16px); box-shadow: var(--ha-card-box-shadow, none);
      -webkit-backdrop-filter: var(--ha-card-backdrop-filter, none); backdrop-filter: var(--ha-card-backdrop-filter, none);
    }
    .tile { grid-column: span 3; min-height: 99px; padding: 13px; }
    .tile-icon { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 10px; color: var(--state-inactive-color); background: color-mix(in srgb, var(--state-inactive-color), transparent 87%); }
    .tile.on .tile-icon { color: var(--state-active-color); background: color-mix(in srgb, var(--state-active-color), transparent 84%); }
    .tile strong { display: block; margin-top: 12px; overflow: hidden; font-size: 10px; white-space: nowrap; text-overflow: ellipsis; }
    .tile span { display: block; margin-top: 3px; color: var(--secondary-text-color); font-size: 8px; }
    .weather { grid-column: span 7; min-height: 154px; padding: 16px; }
    .weather-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .weather h3, .entities h3, .energy h3 { margin: 0; color: var(--ha-card-header-color, var(--primary-text-color)); font-size: 12px; font-weight: 600; }
    .temperature { font-size: 29px; font-weight: 350; letter-spacing: -.06em; }
    .temperature small { color: var(--secondary-text-color); font-size: 12px; }
    .forecast { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-top: 20px; }
    .day { text-align: center; color: var(--secondary-text-color); font-size: 8px; }
    .day b { display: block; margin: 6px 0 5px; color: var(--primary-color); font-size: 16px; font-weight: 500; }
    .day strong { color: var(--primary-text-color); font-size: 8px; }
    .energy { grid-column: span 5; min-height: 154px; padding: 16px; }
    .energy-total { margin-top: 16px; font-size: 21px; font-weight: 500; }
    .energy-total small { color: var(--secondary-text-color); font-size: 9px; font-weight: 400; }
    .bars { display: flex; align-items: end; gap: 5px; height: 54px; margin-top: 9px; }
    .bar { flex: 1; min-height: 5px; border-radius: 4px 4px 2px 2px; background: var(--energy-solar-color, var(--primary-color)); opacity: .78; }
    .entities { grid-column: span 12; padding: 4px 15px; }
    .entities h3 { padding: 12px 0 9px; }
    .entity-row { display: grid; grid-template-columns: 29px 1fr auto; align-items: center; min-height: 42px; border-top: 1px solid var(--divider-color); }
    .entity-row:first-of-type { border-top: 0; }
    .entity-icon { color: var(--state-icon-color, var(--state-inactive-color)); }
    .entity-icon.active { color: var(--state-icon-active-color, var(--state-active-color)); }
    .entity-name { font-size: 9px; }
    .entity-state { color: var(--secondary-text-color); font-size: 8px; }
    .switch { position: relative; width: 27px; height: 15px; border-radius: 999px; background: color-mix(in srgb, var(--state-inactive-color), transparent 52%); }
    .switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 11px; height: 11px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px #0003; }
    .switch.on { background: var(--state-active-color); }
    .switch.on::after { left: 14px; }
    .device.mobile .content { padding: 12px; }
    .device.mobile .grid { gap: 8px; }
    .device.mobile .tile { grid-column: span 6; }
    .device.mobile .weather, .device.mobile .energy, .device.mobile .entities { grid-column: span 12; }
    .device.mobile .energy { min-height: 126px; }
    .device.mobile .view-heading span { display: none; }
    .device.tablet .tile { grid-column: span 6; }
    .device.tablet .weather, .device.tablet .energy { grid-column: span 12; }
    .card-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 13px; }
    .card-gallery .ha-card { min-height: 160px; }
    .device.mobile .card-gallery { grid-template-columns: 1fr; }
    .thermostat { display: grid; place-items: center; padding: 20px; }
    .dial { display: grid; place-items: center; width: 92px; height: 92px; border: 7px solid color-mix(in srgb, var(--primary-color), transparent 72%); border-top-color: var(--primary-color); border-radius: 50%; }
    .dial strong { font-size: 22px; font-weight: 450; }
    .media { position: relative; padding: 15px; background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 8%), color-mix(in srgb, var(--accent-color), #151927 45%)); color: white; }
    .album { width: 53px; height: 53px; border-radius: 12px; background: linear-gradient(140deg, #f9b56d, #9a67ea); box-shadow: 0 8px 25px #0004; }
    .media strong { display: block; margin-top: 16px; font-size: 11px; }
    .media span { font-size: 8px; opacity: .75; }
    .system-view { width: min(100%, 810px); }
    .system-title { display: flex; align-items: center; gap: 10px; margin: 1px 0 15px; }
    .system-title h1 { margin: 0; font-size: 18px; font-weight: 550; }
    .system-tabs { display: flex; gap: 18px; margin-bottom: 13px; border-bottom: 1px solid var(--divider-color); }
    .system-tab { padding: 9px 1px; color: var(--secondary-text-color); font-size: 9px; }
    .system-tab.active { color: var(--primary-color); border-bottom: 2px solid var(--primary-color); }
    .integration-toolbar { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
    .search-box { display: flex; align-items: center; gap: 7px; flex: 1; height: 34px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 10px; color: var(--secondary-text-color); background: var(--card-background-color); font-size: 9px; }
    .add-button { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 11px; color: var(--text-primary-color, white); background: var(--primary-color); }
    .integration-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
    .integration { display: grid; grid-template-columns: 38px 1fr auto; align-items: center; gap: 10px; padding: 12px; }
    .integration-logo { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px; color: white; background: var(--primary-color); font-size: 12px; font-weight: 800; }
    .integration strong { display: block; overflow: hidden; font-size: 9px; white-space: nowrap; text-overflow: ellipsis; }
    .integration span { color: var(--secondary-text-color); font-size: 8px; }
    .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success-color); }
    .device.mobile .integration-list { grid-template-columns: 1fr; }
  `;

  private renderSidebar() {
    return html`
      <aside class="sidebar">
        <div class="brand"><div class="ha-logo">HA</div><div class="brand-name">Home Assistant</div></div>
        <nav class="navigation">
          <div class="nav-item active">${icon("dashboard", 15)}<span class="nav-label">Vue d’ensemble</span></div>
          <div class="nav-item">${icon("card", 15)}<span class="nav-label">Énergie</span></div>
          <div class="nav-item">${icon("settings", 15)}<span class="nav-label">Paramètres</span></div>
        </nav>
        <div class="user"><div class="avatar">JM</div><div class="user-meta"><strong>Maison</strong><span>Administrateur</span></div></div>
      </aside>
    `;
  }

  private renderTiles() {
    return html`
      <article class="ha-card tile on"><div class="tile-icon">${icon("sun", 16)}</div><strong>Salon</strong><span>Allumée · 72%</span></article>
      <article class="ha-card tile"><div class="tile-icon">${icon("settings", 16)}</div><strong>Porte d’entrée</strong><span>Verrouillée</span></article>
      <article class="ha-card tile on"><div class="tile-icon">${icon("activity", 16)}</div><strong>Climatisation</strong><span>22,5 °C</span></article>
      <article class="ha-card tile"><div class="tile-icon">${icon("card", 16)}</div><strong>Garage</strong><span>Fermé</span></article>
    `;
  }

  private renderDashboard() {
    const heights = [32, 48, 39, 67, 54, 72, 43, 59, 75, 65, 84, 57];
    return html`
      <div class="view">
        <div class="view-heading"><h1>Bonjour, Julien</h1><span>Dimanche 31 août · 21 °C</span></div>
        <div class="grid">
          ${this.renderTiles()}
          <article class="ha-card weather">
            <div class="weather-top"><h3>Météo</h3><div class="temperature">21<small>°C</small></div></div>
            <div class="forecast">${["Auj.", "Lun.", "Mar.", "Mer.", "Jeu."].map((day, index) => html`<div class="day">${day}<b>${index === 2 ? "☁" : "☀"}</b><strong>${21 + index}°</strong></div>`)}</div>
          </article>
          <article class="ha-card energy"><h3>Énergie aujourd’hui</h3><div class="energy-total">12,4 <small>kWh</small></div><div class="bars">${heights.map((height) => html`<div class="bar" style=${`height:${height}%`}></div>`)}</div></article>
          <article class="ha-card entities">
            <h3>Accès rapides</h3>
            ${[["Lampe cuisine", true], ["Ventilateur chambre", false], ["Éclairage jardin", true]].map(([name, active]) => html`
              <div class="entity-row"><div class=${`entity-icon ${active ? "active" : ""}`}>${icon("sun", 15)}</div><div><div class="entity-name">${name}</div><div class="entity-state">${active ? "Allumé" : "Éteint"}</div></div><div class=${`switch ${active ? "on" : ""}`}></div></div>
            `)}
          </article>
        </div>
      </div>
    `;
  }

  private renderCardGallery() {
    return html`
      <div class="view">
        <div class="view-heading"><h1>Cartes dashboard</h1><span>Composants natifs</span></div>
        <div class="card-gallery">
          <article class="ha-card thermostat"><div class="dial"><strong>22°</strong></div></article>
          <article class="ha-card media"><div class="album"></div><strong>Midnight City</strong><span>M83 · Salon</span></article>
          <article class="ha-card entities">
            <h3>Lumières</h3>
            ${[["Cuisine", true], ["Bureau", false], ["Terrasse", true]].map(([name, active]) => html`<div class="entity-row"><div class=${`entity-icon ${active ? "active" : ""}`}>${icon("sun", 15)}</div><div class="entity-name">${name}</div><div class=${`switch ${active ? "on" : ""}`}></div></div>`)}
          </article>
          <article class="ha-card weather"><div class="weather-top"><h3>Montréal</h3><div class="temperature">21<small>°C</small></div></div><div class="forecast">${["15h", "16h", "17h", "18h", "19h"].map((day) => html`<div class="day">${day}<b>☀</b><strong>21°</strong></div>`)}</div></article>
        </div>
      </div>
    `;
  }

  private renderSystem() {
    const integrations = [["HA", "Home Assistant Cloud", "1 service"], ["H", "HomeKit Bridge", "42 entités"], ["Z", "Zigbee Home Automation", "18 appareils"], ["M", "MQTT", "7 appareils"], ["E", "ESPHome", "12 appareils"], ["S", "Sun", "1 entité"]];
    return html`
      <div class="view system-view">
        <div class="system-title">${icon("settings", 18)}<h1>Appareils et services</h1></div>
        <div class="system-tabs"><div class="system-tab active">Intégrations</div><div class="system-tab">Appareils</div><div class="system-tab">Entités</div><div class="system-tab">Assistants</div></div>
        <div class="integration-toolbar"><div class="search-box">${icon("search", 13)} Rechercher des intégrations</div><div class="add-button">${icon("plus", 16)}</div></div>
        <div class="integration-list">${integrations.map(([letter, name, detail]) => html`<article class="ha-card integration"><div class="integration-logo">${letter}</div><div><strong>${name}</strong><span>${detail}</span></div><div class="status-dot"></div></article>`)}</div>
      </div>
    `;
  }

  protected render() {
    const styles = Object.fromEntries(Object.entries(this.values).map(([key, value]) => [`--${key}`, value]));
    const title = this.kind === "system" ? "Paramètres" : this.kind === "card" ? "Cartes" : "Vue d’ensemble";
    return html`
      <div class=${`device ${this.device}`} style=${styleMap(styles)}>
        <div class="shell">
          ${this.kind !== "card" ? this.renderSidebar() : nothing}
          <main class="main" style=${this.kind === "card" ? "grid-column:1/-1" : ""}>
            <header class="header"><div class="header-icon">${this.device === "mobile" ? icon("menu", 17) : icon(this.kind === "system" ? "settings" : "dashboard", 16)}</div><div class="header-title">${title}</div><div class="header-icon">${icon("search", 16)}</div><div class="header-icon">⋮</div></header>
            <section class="content">${this.kind === "dashboard" ? this.renderDashboard() : this.kind === "card" ? this.renderCardGallery() : this.renderSystem()}</section>
          </main>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-theme-preview": HAThemePreview;
  }
}
