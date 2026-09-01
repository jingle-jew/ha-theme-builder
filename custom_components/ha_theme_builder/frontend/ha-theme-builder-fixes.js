const r = "data-ha-theme-builder-surface-fix", a = /* @__PURE__ */ Symbol.for("ha-theme-builder:surface-fix"), i = {
  "hui-markdown-card": `
    ha-card.text-only {
      background: none !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  `,
  "hui-heading-card": `
    ha-card {
      background: none !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  `
};
function s(o, t) {
  const e = o.shadowRoot;
  if (!e || e.querySelector(`style[${r}]`)) return;
  const n = document.createElement("style");
  n.setAttribute(r, ""), n.textContent = t, e.append(n);
}
function c(o) {
  for (const [t, e] of Object.entries(i))
    o.querySelectorAll(t).forEach((n) => s(n, e));
  o.querySelectorAll("*").forEach((t) => {
    t.shadowRoot && c(t.shadowRoot);
  });
}
function l(o, t) {
  customElements.whenDefined(o).then(() => {
    const e = customElements.get(o);
    if (!e || e[a]) return;
    const n = e.prototype, d = n.connectedCallback;
    n.connectedCallback = function() {
      d?.call(this), queueMicrotask(() => s(this, t));
    }, e[a] = !0, c(document);
  });
}
function u() {
  for (const [o, t] of Object.entries(i))
    l(o, t);
  c(document);
}
typeof document < "u" && typeof customElements < "u" && u();
export {
  i as NATIVE_SURFACE_FIXES,
  u as installNativeSurfaceFixes
};
