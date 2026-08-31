import { css } from "lit";

export const appStyles = css`
  :host {
    --tb-accent: #6657dd;
    --tb-accent-strong: #5244c6;
    --tb-accent-soft: #eeecff;
    --tb-bg: #eef1f6;
    --tb-panel: #ffffff;
    --tb-panel-hover: #fafbfc;
    --tb-text: #1d2433;
    --tb-muted: #778093;
    --tb-border: #e3e7ee;
    --tb-input: #fff;
    --tb-input-border: #d9dde5;
    --tb-font: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    display: block;
    width: 100%;
    height: 100vh;
    min-height: 560px;
    overflow: hidden;
    color: var(--tb-text);
    background: var(--tb-bg);
    font-family: var(--tb-font);
    font-size: 14px;
  }
  * { box-sizing: border-box; }
  button, input, select { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }
  .app { display: grid; grid-template-rows: 64px minmax(0, 1fr); width: 100%; height: 100%; }
  .topbar {
    position: relative; z-index: 20; display: flex; align-items: center; gap: 10px; min-width: 0; padding: 0 17px;
    background: rgba(255, 255, 255, .94); border-bottom: 1px solid var(--tb-border); box-shadow: 0 1px 12px rgba(30, 38, 60, .04);
    backdrop-filter: blur(18px) saturate(140%);
  }
  .brand { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; }
  .brand-mark {
    display: grid; place-items: center; width: 35px; height: 35px; border-radius: 11px; color: white;
    background: linear-gradient(145deg, #8074ee, #5547c8); box-shadow: 0 7px 17px rgba(91, 76, 203, .25);
  }
  .brand-copy strong { display: block; font-size: 13px; line-height: 16px; letter-spacing: -.01em; }
  .brand-copy span { display: block; color: var(--tb-muted); font-size: 9px; line-height: 12px; letter-spacing: .045em; text-transform: uppercase; }
  .divider { width: 1px; height: 26px; margin: 0 4px; background: var(--tb-border); }
  .theme-name {
    width: min(240px, 22vw); min-width: 120px; height: 36px; padding: 0 11px; border: 1px solid transparent; border-radius: 9px;
    outline: 0; color: var(--tb-text); background: transparent; font-size: 13px; font-weight: 560; transition: background 140ms, border 140ms;
  }
  .theme-name:hover { background: #f6f7fa; }
  .theme-name:focus { background: #fff; border-color: var(--tb-accent); box-shadow: 0 0 0 3px var(--tb-accent-soft); }
  .dirty-badge { flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 0 3px #fff3d6; }
  .top-spacer { flex: 1; min-width: 4px; }
  .icon-button, .button, .segment-button, .group-chip {
    border: 0; outline: 0; cursor: pointer; transition: color 140ms, background 140ms, border-color 140ms, transform 100ms;
  }
  .icon-button:active, .button:active { transform: translateY(1px); }
  .icon-button {
    display: grid; place-items: center; flex: 0 0 auto; width: 36px; height: 36px; border-radius: 10px;
    color: var(--tb-muted); background: transparent;
  }
  .icon-button:hover:not(:disabled) { color: var(--tb-accent); background: var(--tb-accent-soft); }
  .icon-button:disabled { cursor: default; opacity: .3; }
  .button {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 36px; padding: 0 13px;
    border: 1px solid var(--tb-border); border-radius: 10px; color: var(--tb-text); background: #fff; font-size: 11px; font-weight: 630;
  }
  .button:hover { border-color: #cfd4df; background: #fafbfc; }
  .button.primary { border-color: var(--tb-accent); color: white; background: var(--tb-accent); box-shadow: 0 6px 15px rgba(102, 87, 221, .18); }
  .button.primary:hover { background: var(--tb-accent-strong); }
  .button.ghost { color: var(--tb-muted); background: transparent; }
  .button.danger { color: #c13948; }
  .workspace { display: grid; grid-template-columns: minmax(350px, 410px) minmax(0, 1fr); min-width: 0; min-height: 0; }
  .editor {
    position: relative; z-index: 10; display: grid; grid-template-rows: auto minmax(0, 1fr); min-width: 0; min-height: 0;
    background: var(--tb-panel); border-right: 1px solid var(--tb-border); box-shadow: 7px 0 25px rgba(34, 42, 65, .035);
  }
  .editor-head { position: relative; z-index: 2; padding: 14px 15px 12px; border-bottom: 1px solid var(--tb-border); background: #fff; }
  .summary-line { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 11px; }
  .summary-title strong { display: block; font-size: 13px; letter-spacing: -.01em; }
  .summary-title span { display: block; margin-top: 2px; color: var(--tb-muted); font-size: 9px; }
  .mode-segments { display: flex; padding: 3px; border-radius: 10px; background: #f1f3f7; }
  .segment-button { display: grid; place-items: center; min-width: 37px; height: 28px; padding: 0 8px; border-radius: 8px; color: var(--tb-muted); background: transparent; font-size: 9px; font-weight: 650; }
  .segment-button.active { color: var(--tb-accent); background: #fff; box-shadow: 0 2px 8px rgba(40, 48, 72, .09); }
  .search-row { display: grid; grid-template-columns: minmax(0, 1fr) 38px; gap: 8px; }
  .search {
    display: flex; align-items: center; gap: 8px; min-width: 0; height: 38px; padding: 0 10px;
    border: 1px solid var(--tb-input-border); border-radius: 10px; color: var(--tb-muted); background: #fff;
  }
  .search:focus-within { border-color: var(--tb-accent); box-shadow: 0 0 0 3px var(--tb-accent-soft); }
  .search input { min-width: 0; width: 100%; border: 0; outline: 0; color: var(--tb-text); background: transparent; font-size: 11px; }
  .search input::placeholder { color: #a2a8b4; }
  .search-row .add-variable { width: 38px; height: 38px; border: 1px solid var(--tb-input-border); background: #fff; }
  .filter-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 9px; margin-top: 9px; }
  .group-select {
    width: 100%; height: 34px; padding: 0 28px 0 10px; border: 1px solid var(--tb-input-border); border-radius: 9px;
    outline: 0; color: var(--tb-text); background: #fff; font-size: 10px;
  }
  .expert-toggle { display: inline-flex; align-items: center; gap: 6px; color: var(--tb-muted); font-size: 9px; cursor: pointer; user-select: none; }
  .expert-toggle input { accent-color: var(--tb-accent); }
  .legacy-row { display: flex; justify-content: flex-end; margin-top: 7px; }
  .variable-list { min-height: 0; overflow: auto; overscroll-behavior: contain; scrollbar-color: #cbd0db transparent; }
  .list-caption {
    position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; min-height: 35px; padding: 0 16px;
    color: var(--tb-muted); background: rgba(248, 249, 251, .94); border-bottom: 1px solid var(--tb-border); backdrop-filter: blur(12px);
    font-size: 9px; letter-spacing: .025em; text-transform: uppercase;
  }
  .empty { display: grid; place-items: center; min-height: 220px; padding: 30px; color: var(--tb-muted); text-align: center; }
  .empty strong { display: block; margin-bottom: 5px; color: var(--tb-text); font-size: 12px; }
  .empty span { font-size: 10px; line-height: 1.5; }
  .preview-pane { display: grid; grid-template-rows: 54px minmax(0, 1fr); min-width: 0; min-height: 0; padding: 0 20px 20px; background: #eef1f6; }
  .preview-toolbar { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .preview-label { color: var(--tb-muted); font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  .preview-tabs, .device-tabs { display: flex; align-items: center; gap: 2px; padding: 3px; border: 1px solid #dfe3ea; border-radius: 10px; background: rgba(255, 255, 255, .72); }
  .preview-tabs .segment-button { min-width: auto; gap: 6px; padding: 0 10px; }
  .preview-tabs .segment-button.active, .device-tabs .segment-button.active { color: var(--tb-accent); background: #fff; }
  .preview-tabs .segment-button { display: flex; }
  .device-tabs { margin-left: auto; }
  .device-tabs .segment-button { min-width: 31px; padding: 0; }
  .preview-stage {
    min-width: 0; min-height: 0; overflow: hidden; padding: 17px; border: 1px solid #dfe3ea; border-radius: 18px;
    background-color: #e7ebf2;
    background-image: linear-gradient(45deg, rgba(255,255,255,.38) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.38) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,.38) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.38) 75%);
    background-size: 24px 24px; background-position: 0 0, 0 12px, 12px -12px, -12px 0;
  }
  ha-theme-preview { width: 100%; height: 100%; }
  .menu-button { display: none; }
  .demo-pill { padding: 4px 8px; border-radius: 999px; color: #77540c; background: #fff0c9; font-size: 8px; font-weight: 750; letter-spacing: .05em; text-transform: uppercase; }
  .modal-backdrop { position: fixed; z-index: 100; inset: 0; display: grid; place-items: center; padding: 20px; background: rgba(20, 24, 35, .42); backdrop-filter: blur(5px); }
  .dialog { width: min(560px, 100%); max-height: min(680px, 90vh); overflow: auto; border: 1px solid rgba(255,255,255,.65); border-radius: 18px; background: #fff; box-shadow: 0 28px 90px rgba(20, 24, 40, .28); }
  .dialog-head { display: flex; align-items: center; gap: 10px; padding: 17px 18px; border-bottom: 1px solid var(--tb-border); }
  .dialog-head h2 { min-width: 0; flex: 1; margin: 0; font-size: 15px; }
  .dialog-body { padding: 18px; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 14px 18px; border-top: 1px solid var(--tb-border); background: #fafbfc; }
  .preset-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .preset { padding: 14px; border: 1px solid var(--tb-border); border-radius: 13px; background: #fff; cursor: pointer; transition: border 140ms, transform 140ms, box-shadow 140ms; }
  .preset:hover { transform: translateY(-1px); border-color: var(--tb-accent); box-shadow: 0 8px 25px rgba(40, 48, 72, .08); }
  .swatches { display: flex; height: 34px; overflow: hidden; margin-bottom: 11px; border-radius: 9px; }
  .swatch { flex: 1; }
  .preset strong { display: block; font-size: 11px; }
  .preset p { margin: 4px 0 0; color: var(--tb-muted); font-size: 9px; line-height: 1.4; }
  .field { display: grid; gap: 6px; margin-bottom: 14px; }
  .field:last-child { margin-bottom: 0; }
  .field label { color: var(--tb-muted); font-size: 9px; font-weight: 650; letter-spacing: .035em; text-transform: uppercase; }
  .field input, .field textarea {
    width: 100%; min-height: 40px; padding: 9px 11px; border: 1px solid var(--tb-input-border); border-radius: 10px; outline: 0;
    color: var(--tb-text); background: #fff; font: 11px/1.5 var(--tb-font);
  }
  .field textarea { min-height: 110px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .field input:focus, .field textarea:focus { border-color: var(--tb-accent); box-shadow: 0 0 0 3px var(--tb-accent-soft); }
  .field-hint { color: var(--tb-muted); font-size: 9px; line-height: 1.45; }
  .library-list { display: grid; gap: 8px; }
  .library-item {
    display: flex; align-items: center; gap: 11px; width: 100%; min-height: 52px; padding: 9px 12px; border: 1px solid var(--tb-border);
    border-radius: 11px; color: var(--tb-text); background: #fff; text-align: left; cursor: pointer; transition: border 140ms, background 140ms;
  }
  .library-item:hover { border-color: var(--tb-accent); background: #faf9ff; }
  .library-icon { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; color: var(--tb-accent); background: var(--tb-accent-soft); }
  .library-copy { min-width: 0; flex: 1; }
  .library-copy strong { display: block; overflow: hidden; font-size: 11px; white-space: nowrap; text-overflow: ellipsis; }
  .library-copy span { display: block; margin-top: 2px; color: var(--tb-muted); font-size: 9px; }
  .toast {
    position: fixed; z-index: 110; right: 22px; bottom: 22px; display: flex; align-items: center; gap: 9px; max-width: 380px;
    padding: 12px 15px; border-radius: 12px; color: white; background: #252b38; box-shadow: 0 14px 38px rgba(20, 24, 40, .26);
    font-size: 11px; animation: toast-in 180ms ease-out;
  }
  .toast.error { background: #a93141; }
  @keyframes toast-in { from { opacity: 0; transform: translateY(8px); } }
  .hidden-input { display: none; }
  @media (max-width: 1050px) {
    .workspace { grid-template-columns: minmax(330px, 370px) minmax(0, 1fr); }
    .brand-copy { display: none; }
    .topbar .button span.optional { display: none; }
  }
  @media (max-width: 820px) {
    :host { min-height: 520px; }
    .app { grid-template-rows: 58px minmax(0, 1fr); }
    .topbar { padding: 0 10px; }
    .menu-button { display: grid; }
    .brand, .divider { display: none; }
    .theme-name { width: min(190px, 40vw); }
    .topbar .button.secondary-action, .topbar .undo-group { display: none; }
    .workspace { display: block; position: relative; }
    .editor { position: absolute; z-index: 30; inset: 0 auto 0 0; width: min(410px, 92vw); transform: translateX(-103%); transition: transform 180ms ease; box-shadow: 15px 0 45px rgba(20, 24, 40, .22); }
    .editor.open { transform: translateX(0); }
    .editor-scrim { position: absolute; z-index: 25; inset: 0; background: rgba(20,24,35,.28); }
    .preview-pane { height: 100%; padding: 0 9px 9px; grid-template-rows: 50px minmax(0, 1fr); }
    .preview-stage { padding: 9px; border-radius: 14px; }
    .preview-label { display: none; }
    .preview-toolbar { gap: 5px; }
    .preview-tabs .segment-button span { display: none; }
    .preview-tabs .segment-button { padding: 0 8px; }
  }
  @media (max-width: 520px) {
    .theme-name { min-width: 90px; width: 36vw; }
    .topbar .icon-button.copy-action { display: none; }
    .button.primary { padding-inline: 10px; }
    .button.primary span { display: none; }
    .preview-stage { padding: 5px; }
    .device-tabs { display: none; }
    .preset-grid { grid-template-columns: 1fr; }
  }
`;
