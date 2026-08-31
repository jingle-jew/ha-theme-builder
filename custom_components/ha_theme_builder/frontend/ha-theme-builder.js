const at = globalThis, qt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Dt = /* @__PURE__ */ Symbol(), ua = /* @__PURE__ */ new WeakMap();
let qa = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== Dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (qt && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = ua.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && ua.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ms = (s) => new qa(typeof s == "string" ? s : s + "", void 0, Dt), Rt = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((a, r, o) => a + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new qa(t, s, Dt);
}, Os = (s, e) => {
  if (qt) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), r = at.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = t.cssText, s.appendChild(a);
  }
}, fa = qt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return Ms(t);
})(s) : s;
const { is: Ts, defineProperty: Ls, getOwnPropertyDescriptor: Is, getOwnPropertyNames: Ps, getOwnPropertySymbols: js, getPrototypeOf: Bs } = Object, mt = globalThis, ma = mt.trustedTypes, qs = ma ? ma.emptyScript : "", Ds = mt.reactiveElementPolyfillSupport, Le = (s, e) => s, lt = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? qs : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ut = (s, e) => !Ts(s, e), pa = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), mt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ge = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = pa) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, a, t);
      r !== void 0 && Ls(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: r, set: o } = Is(this.prototype, e) ?? { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: r, set(l) {
      const i = r?.call(this);
      o?.call(this, l), this.requestUpdate(e, i, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? pa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Le("elementProperties"))) return;
    const e = Bs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Le("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Le("properties"))) {
      const t = this.properties, a = [...Ps(t), ...js(t)];
      for (const r of a) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [a, r] of t) this.elementProperties.set(a, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, a] of this.elementProperties) {
      const r = this._$Eu(t, a);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const r of a) t.unshift(fa(r));
    } else e !== void 0 && t.push(fa(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Os(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    const a = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, a);
    if (r !== void 0 && a.reflect === !0) {
      const o = (a.converter?.toAttribute !== void 0 ? a.converter : lt).toAttribute(t, a.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const a = this.constructor, r = a._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = a.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : lt;
      this._$Em = r;
      const i = l.fromAttribute(t, o.type);
      this[r] = i ?? this._$Ej?.get(r) ?? i, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, r = !1, o) {
    if (e !== void 0) {
      const l = this.constructor;
      if (r === !1 && (o = this[e]), a ??= l.getPropertyOptions(e), !((a.hasChanged ?? Ut)(o, t) || a.useDefault && a.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: r, wrapped: o }, l) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, l ?? t ?? this[e]), o !== !0 || l !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [r, o] of a) {
        const { wrapped: l } = o, i = this[r];
        l !== !0 || this._$AL.has(r) || i === void 0 || this.C(r, void 0, o, i);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ge.elementStyles = [], ge.shadowRootOptions = { mode: "open" }, ge[Le("elementProperties")] = /* @__PURE__ */ new Map(), ge[Le("finalized")] = /* @__PURE__ */ new Map(), Ds?.({ ReactiveElement: ge }), (mt.reactiveElementVersions ??= []).push("2.1.2");
const zt = globalThis, ha = (s) => s, it = zt.trustedTypes, ga = it ? it.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Da = "$lit$", ee = `lit$${Math.random().toFixed(9).slice(2)}$`, Ra = "?" + ee, Rs = `<${Ra}>`, ce = document, je = () => ce.createComment(""), Be = (s) => s === null || typeof s != "object" && typeof s != "function", Wt = Array.isArray, Us = (s) => Wt(s) || typeof s?.[Symbol.iterator] == "function", wt = `[ 	
\f\r]`, Ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ba = /-->/g, ya = />/g, ae = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), va = /'/g, ka = /"/g, Ua = /^(?:script|style|textarea|title)$/i, za = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), V = za(1), _ = za(2), de = /* @__PURE__ */ Symbol.for("lit-noChange"), S = /* @__PURE__ */ Symbol.for("lit-nothing"), Va = /* @__PURE__ */ new WeakMap(), oe = ce.createTreeWalker(ce, 129);
function Wa(s, e) {
  if (!Wt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ga !== void 0 ? ga.createHTML(e) : e;
}
const zs = (s, e) => {
  const t = s.length - 1, a = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = Ee;
  for (let i = 0; i < t; i++) {
    const n = s[i];
    let c, m, d = -1, u = 0;
    for (; u < n.length && (l.lastIndex = u, m = l.exec(n), m !== null); ) u = l.lastIndex, l === Ee ? m[1] === "!--" ? l = ba : m[1] !== void 0 ? l = ya : m[2] !== void 0 ? (Ua.test(m[2]) && (r = RegExp("</" + m[2], "g")), l = ae) : m[3] !== void 0 && (l = ae) : l === ae ? m[0] === ">" ? (l = r ?? Ee, d = -1) : m[1] === void 0 ? d = -2 : (d = l.lastIndex - m[2].length, c = m[1], l = m[3] === void 0 ? ae : m[3] === '"' ? ka : va) : l === ka || l === va ? l = ae : l === ba || l === ya ? l = Ee : (l = ae, r = void 0);
    const p = l === ae && s[i + 1].startsWith("/>") ? " " : "";
    o += l === Ee ? n + Rs : d >= 0 ? (a.push(c), n.slice(0, d) + Da + n.slice(d) + ee + p) : n + ee + (d === -2 ? i : p);
  }
  return [Wa(s, o + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class qe {
  constructor({ strings: e, _$litType$: t }, a) {
    let r;
    this.parts = [];
    let o = 0, l = 0;
    const i = e.length - 1, n = this.parts, [c, m] = zs(e, t);
    if (this.el = qe.createElement(c, a), oe.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = oe.nextNode()) !== null && n.length < i; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Da)) {
          const u = m[l++], p = r.getAttribute(d).split(ee), g = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: o, name: g[2], strings: p, ctor: g[1] === "." ? Ks : g[1] === "?" ? Gs : g[1] === "@" ? Fs : pt }), r.removeAttribute(d);
        } else d.startsWith(ee) && (n.push({ type: 6, index: o }), r.removeAttribute(d));
        if (Ua.test(r.tagName)) {
          const d = r.textContent.split(ee), u = d.length - 1;
          if (u > 0) {
            r.textContent = it ? it.emptyScript : "";
            for (let p = 0; p < u; p++) r.append(d[p], je()), oe.nextNode(), n.push({ type: 2, index: ++o });
            r.append(d[u], je());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ra) n.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(ee, d + 1)) !== -1; ) n.push({ type: 7, index: o }), d += ee.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const a = ce.createElement("template");
    return a.innerHTML = e, a;
  }
}
function Ae(s, e, t = s, a) {
  if (e === de) return e;
  let r = a !== void 0 ? t._$Co?.[a] : t._$Cl;
  const o = Be(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, t, a)), a !== void 0 ? (t._$Co ??= [])[a] = r : t._$Cl = r), r !== void 0 && (e = Ae(s, r._$AS(s, e.values), r, a)), e;
}
class Ws {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: a } = this._$AD, r = (e?.creationScope ?? ce).importNode(t, !0);
    oe.currentNode = r;
    let o = oe.nextNode(), l = 0, i = 0, n = a[0];
    for (; n !== void 0; ) {
      if (l === n.index) {
        let c;
        n.type === 2 ? c = new Ue(o, o.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (c = new Js(o, this, e)), this._$AV.push(c), n = a[++i];
      }
      l !== n?.index && (o = oe.nextNode(), l++);
    }
    return oe.currentNode = ce, r;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class Ue {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, a, r) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Ae(this, e, t), Be(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== de && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Us(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && Be(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ce.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: a } = e, r = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = qe.createElement(Wa(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new Ws(r, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Va.get(e.strings);
    return t === void 0 && Va.set(e.strings, t = new qe(e)), t;
  }
  k(e) {
    Wt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, r = 0;
    for (const o of e) r === t.length ? t.push(a = new Ue(this.O(je()), this.O(je()), this, this.options)) : a = t[r], a._$AI(o), r++;
    r < t.length && (this._$AR(a && a._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const a = ha(e).nextSibling;
      ha(e).remove(), e = a;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, r, o) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = S;
  }
  _$AI(e, t = this, a, r) {
    const o = this.strings;
    let l = !1;
    if (o === void 0) e = Ae(this, e, t, 0), l = !Be(e) || e !== this._$AH && e !== de, l && (this._$AH = e);
    else {
      const i = e;
      let n, c;
      for (e = o[0], n = 0; n < o.length - 1; n++) c = Ae(this, i[a + n], t, n), c === de && (c = this._$AH[n]), l ||= !Be(c) || c !== this._$AH[n], c === S ? e = S : e !== S && (e += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    l && !r && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ks extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Gs extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Fs extends pt {
  constructor(e, t, a, r, o) {
    super(e, t, a, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ae(this, e, t, 0) ?? S) === de) return;
    const a = this._$AH, r = e === S && a !== S || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, o = e !== S && (a === S || r);
    r && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Js {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ae(this, e);
  }
}
const Ys = zt.litHtmlPolyfillSupport;
Ys?.(qe, Ue), (zt.litHtmlVersions ??= []).push("3.3.3");
const Qs = (s, e, t) => {
  const a = t?.renderBefore ?? e;
  let r = a._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    a._$litPart$ = r = new Ue(e.insertBefore(je(), o), o, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
const Kt = globalThis;
let ne = class extends ge {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Qs(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return de;
  }
};
ne._$litElement$ = !0, ne.finalized = !0, Kt.litElementHydrateSupport?.({ LitElement: ne });
const Xs = Kt.litElementPolyfillSupport;
Xs?.({ LitElement: ne });
(Kt.litElementVersions ??= []).push("4.2.2");
const Gt = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
const Zs = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: Ut }, er = (s = Zs, e, t) => {
  const { kind: a, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), a === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(t.name, s), a === "accessor") {
    const { name: l } = t;
    return { set(i) {
      const n = e.get.call(this);
      e.set.call(this, i), this.requestUpdate(l, n, s, !0, i);
    }, init(i) {
      return i !== void 0 && this.C(l, void 0, s, i), i;
    } };
  }
  if (a === "setter") {
    const { name: l } = t;
    return function(i) {
      const n = this[l];
      e.call(this, i), this.requestUpdate(l, n, s, !0, i);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function z(s) {
  return (e, t) => typeof t == "object" ? er(s, e, t) : ((a, r, o) => {
    const l = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, a), l ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, e, t);
}
function j(s) {
  return z({ ...s, state: !0, attribute: !1 });
}
const tr = { ATTRIBUTE: 1 }, ar = (s) => (...e) => ({ _$litDirective$: s, values: e });
let sr = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, a) {
    this._$Ct = e, this._$AM = t, this._$Ci = a;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const Ka = "important", rr = " !" + Ka, or = ar(class extends sr {
  constructor(s) {
    if (super(s), s.type !== tr.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((e, t) => {
      const a = s[t];
      return a == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${a};`;
    }, "");
  }
  update(s, [e]) {
    const { style: t } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const a of this.ft) e[a] == null && (this.ft.delete(a), a.includes("-") ? t.removeProperty(a) : t[a] = null);
    for (const a in e) {
      const r = e[a];
      if (r != null) {
        this.ft.add(a);
        const o = typeof r == "string" && r.endsWith(rr);
        a.includes("-") || o ? t.setProperty(a, o ? r.slice(0, -11) : r, o ? Ka : "") : t[a] = r;
      }
    }
    return de;
  }
}), Aa = {
  menu: _`<path d="M4 6h16M4 12h16M4 18h16"/>`,
  search: _`<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,
  undo: _`<path d="m9 14-4-4 4-4"/><path d="M5 10h8a6 6 0 0 1 6 6v2"/>`,
  redo: _`<path d="m15 14 4-4-4-4"/><path d="M19 10h-8a6 6 0 0 0-6 6v2"/>`,
  download: _`<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>`,
  upload: _`<path d="M12 16V4m0 0 4 4m-4-4L8 8M5 20h14"/>`,
  save: _`<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/>`,
  folder: _`<path d="M3 6h7l2 2h9v11H3z"/>`,
  copy: _`<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2"/>`,
  reset: _`<path d="M4 7v5h5"/><path d="M5.5 11a7 7 0 1 1 1.9 6.6"/>`,
  sun: _`<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,
  moon: _`<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>`,
  desktop: _`<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>`,
  tablet: _`<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>`,
  mobile: _`<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>`,
  card: _`<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h4m-4 4h10"/>`,
  activity: _`<path d="M3 12h4l2-7 4 14 2-7h6"/>`,
  dashboard: _`<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>`,
  settings: _`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>`,
  plus: _`<path d="M12 5v14M5 12h14"/>`,
  trash: _`<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>`,
  close: _`<path d="m6 6 12 12M18 6 6 18"/>`,
  check: _`<path d="m5 12 4 4L19 6"/>`,
  chevron: _`<path d="m9 18 6-6-6-6"/>`,
  palette: _`<path d="M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h2a7 7 0 0 0-2-11Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="9.5" cy="6.5" r="1"/><circle cx="14.5" cy="6.5" r="1"/>`,
  sparkles: _`<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm13-2 1 2.8 3 1.2-3 1.2L18 20l-1-2.8-3-1.2 3-1.2 1-2.8Z"/>`
};
function $(s, e = 20) {
  return _`<svg
    width=${e}
    height=${e}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${Aa[s] ?? Aa.palette}</svg>`;
}
var lr = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, ht = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? ir(e, t) : e, o = s.length - 1, l; o >= 0; o--)
    (l = s[o]) && (r = (a ? l(e, t, r) : l(r)) || r);
  return a && r && lr(e, t, r), r;
};
let xe = class extends ne {
  constructor() {
    super(...arguments), this.values = {}, this.kind = "dashboard", this.device = "desktop";
  }
  renderSidebar() {
    return V`
      <aside class="sidebar">
        <div class="brand"><div class="ha-logo">HA</div><div class="brand-name">Home Assistant</div></div>
        <nav class="navigation">
          <div class="nav-item active">${$("dashboard", 15)}<span class="nav-label">Vue d’ensemble</span></div>
          <div class="nav-item">${$("card", 15)}<span class="nav-label">Énergie</span></div>
          <div class="nav-item">${$("settings", 15)}<span class="nav-label">Paramètres</span></div>
        </nav>
        <div class="user"><div class="avatar">JM</div><div class="user-meta"><strong>Maison</strong><span>Administrateur</span></div></div>
      </aside>
    `;
  }
  renderTiles() {
    return V`
      <article class="ha-card tile on"><div class="tile-icon">${$("sun", 16)}</div><strong>Salon</strong><span>Allumée · 72%</span></article>
      <article class="ha-card tile"><div class="tile-icon">${$("settings", 16)}</div><strong>Porte d’entrée</strong><span>Verrouillée</span></article>
      <article class="ha-card tile on"><div class="tile-icon">${$("activity", 16)}</div><strong>Climatisation</strong><span>22,5 °C</span></article>
      <article class="ha-card tile"><div class="tile-icon">${$("card", 16)}</div><strong>Garage</strong><span>Fermé</span></article>
    `;
  }
  renderDashboard() {
    const s = [32, 48, 39, 67, 54, 72, 43, 59, 75, 65, 84, 57];
    return V`
      <div class="view">
        <div class="view-heading"><h1>Bonjour, Julien</h1><span>Dimanche 31 août · 21 °C</span></div>
        <div class="grid">
          ${this.renderTiles()}
          <article class="ha-card weather">
            <div class="weather-top"><h3>Météo</h3><div class="temperature">21<small>°C</small></div></div>
            <div class="forecast">${["Auj.", "Lun.", "Mar.", "Mer.", "Jeu."].map((e, t) => V`<div class="day">${e}<b>${t === 2 ? "☁" : "☀"}</b><strong>${21 + t}°</strong></div>`)}</div>
          </article>
          <article class="ha-card energy"><h3>Énergie aujourd’hui</h3><div class="energy-total">12,4 <small>kWh</small></div><div class="bars">${s.map((e) => V`<div class="bar" style=${`height:${e}%`}></div>`)}</div></article>
          <article class="ha-card entities">
            <h3>Accès rapides</h3>
            ${[["Lampe cuisine", !0], ["Ventilateur chambre", !1], ["Éclairage jardin", !0]].map(([e, t]) => V`
              <div class="entity-row"><div class=${`entity-icon ${t ? "active" : ""}`}>${$("sun", 15)}</div><div><div class="entity-name">${e}</div><div class="entity-state">${t ? "Allumé" : "Éteint"}</div></div><div class=${`switch ${t ? "on" : ""}`}></div></div>
            `)}
          </article>
        </div>
      </div>
    `;
  }
  renderCardGallery() {
    return V`
      <div class="view">
        <div class="view-heading"><h1>Cartes dashboard</h1><span>Composants natifs</span></div>
        <div class="card-gallery">
          <article class="ha-card thermostat"><div class="dial"><strong>22°</strong></div></article>
          <article class="ha-card media"><div class="album"></div><strong>Midnight City</strong><span>M83 · Salon</span></article>
          <article class="ha-card entities">
            <h3>Lumières</h3>
            ${[["Cuisine", !0], ["Bureau", !1], ["Terrasse", !0]].map(([s, e]) => V`<div class="entity-row"><div class=${`entity-icon ${e ? "active" : ""}`}>${$("sun", 15)}</div><div class="entity-name">${s}</div><div class=${`switch ${e ? "on" : ""}`}></div></div>`)}
          </article>
          <article class="ha-card weather"><div class="weather-top"><h3>Montréal</h3><div class="temperature">21<small>°C</small></div></div><div class="forecast">${["15h", "16h", "17h", "18h", "19h"].map((s) => V`<div class="day">${s}<b>☀</b><strong>21°</strong></div>`)}</div></article>
        </div>
      </div>
    `;
  }
  renderSystem() {
    const s = [["HA", "Home Assistant Cloud", "1 service"], ["H", "HomeKit Bridge", "42 entités"], ["Z", "Zigbee Home Automation", "18 appareils"], ["M", "MQTT", "7 appareils"], ["E", "ESPHome", "12 appareils"], ["S", "Sun", "1 entité"]];
    return V`
      <div class="view system-view">
        <div class="system-title">${$("settings", 18)}<h1>Appareils et services</h1></div>
        <div class="system-tabs"><div class="system-tab active">Intégrations</div><div class="system-tab">Appareils</div><div class="system-tab">Entités</div><div class="system-tab">Assistants</div></div>
        <div class="integration-toolbar"><div class="search-box">${$("search", 13)} Rechercher des intégrations</div><div class="add-button">${$("plus", 16)}</div></div>
        <div class="integration-list">${s.map(([e, t, a]) => V`<article class="ha-card integration"><div class="integration-logo">${e}</div><div><strong>${t}</strong><span>${a}</span></div><div class="status-dot"></div></article>`)}</div>
      </div>
    `;
  }
  render() {
    const s = Object.fromEntries(Object.entries(this.values).map(([t, a]) => [`--${t}`, a])), e = this.kind === "system" ? "Paramètres" : this.kind === "card" ? "Cartes" : "Vue d’ensemble";
    return V`
      <div class=${`device ${this.device}`} style=${or(s)}>
        <div class="shell">
          ${this.kind !== "card" ? this.renderSidebar() : S}
          <main class="main" style=${this.kind === "card" ? "grid-column:1/-1" : ""}>
            <header class="header"><div class="header-icon">${this.device === "mobile" ? $("menu", 17) : $(this.kind === "system" ? "settings" : "dashboard", 16)}</div><div class="header-title">${e}</div><div class="header-icon">${$("search", 16)}</div><div class="header-icon">⋮</div></header>
            <section class="content">${this.kind === "dashboard" ? this.renderDashboard() : this.kind === "card" ? this.renderCardGallery() : this.renderSystem()}</section>
          </main>
        </div>
      </div>
    `;
  }
};
xe.styles = Rt`
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
ht([
  z({ attribute: !1 })
], xe.prototype, "values", 2);
ht([
  z()
], xe.prototype, "kind", 2);
ht([
  z()
], xe.prototype, "device", 2);
xe = ht([
  Gt("ha-theme-preview")
], xe);
const J = (s, e, t) => Math.min(t, Math.max(e, s)), xa = (s) => Math.round(J(s, 0, 255)).toString(16).padStart(2, "0");
function nt(s) {
  const e = s.trim(), t = e.match(/^#([\da-f]{3,8})$/i)?.[1];
  if (t) {
    const o = t.length === 3 || t.length === 4 ? [...t].map((l) => `${l}${l}`).join("") : t;
    if (o.length === 6 || o.length === 8) {
      const l = [
        Number.parseInt(o.slice(0, 2), 16),
        Number.parseInt(o.slice(2, 4), 16),
        Number.parseInt(o.slice(4, 6), 16)
      ];
      return {
        hex: `#${o.slice(0, 6).toLowerCase()}`,
        alpha: o.length === 8 ? Number.parseInt(o.slice(6), 16) / 255 : 1,
        rgb: l
      };
    }
  }
  const a = e.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+)%?)?\s*\)$/i
  );
  if (a) {
    const o = [
      J(Number(a[1]), 0, 255),
      J(Number(a[2]), 0, 255),
      J(Number(a[3]), 0, 255)
    ];
    return {
      hex: `#${o.map(xa).join("")}`,
      alpha: J(a[4] === void 0 ? 1 : Number(a[4]), 0, 1),
      rgb: o
    };
  }
  const r = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);
  if (r) {
    const o = [
      J(Number(r[1]), 0, 255),
      J(Number(r[2]), 0, 255),
      J(Number(r[3]), 0, 255)
    ];
    return { hex: `#${o.map(xa).join("")}`, alpha: 1, rgb: o };
  }
}
function nr(s, e, t = "css-color") {
  const a = nt(e);
  if (!a) return s;
  if (t === "rgb-triplet") return a.rgb.map(Math.round).join(", ");
  const r = nt(s)?.alpha ?? 1;
  return r >= 0.999 ? a.hex : `rgba(${a.rgb.map(Math.round).join(", ")}, ${r.toFixed(2)})`;
}
function cr(s, e) {
  const t = nt(s);
  return t ? `rgba(${t.rgb.map(Math.round).join(", ")}, ${J(e, 0, 1).toFixed(2)})` : s;
}
var dr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, ze = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? ur(e, t) : e, o = s.length - 1, l; o >= 0; o--)
    (l = s[o]) && (r = (a ? l(e, t, r) : l(r)) || r);
  return a && r && dr(e, t, r), r;
};
let ue = class extends ne {
  constructor() {
    super(...arguments), this.value = "", this.inheritedValue = "", this.overridden = !1;
  }
  emitValue(s) {
    this.dispatchEvent(new CustomEvent("variable-change", {
      detail: { id: this.definition.id, value: s },
      bubbles: !0,
      composed: !0
    }));
  }
  current() {
    return this.value || this.inheritedValue || this.definition.defaultValue || "";
  }
  renderColor() {
    const s = this.current(), e = nt(s), t = e?.hex ?? "#64748b", a = this.definition.format ?? "css-color";
    return V`
      <div class="row">
        <input
          type="color"
          aria-label="Sélecteur de couleur"
          .value=${t}
          @input=${(r) => this.emitValue(nr(s, r.target.value, a))}
        />
        <input
          type="text"
          spellcheck="false"
          aria-label="Valeur CSS"
          .value=${this.value || this.inheritedValue}
          placeholder=${this.definition.defaultValue || "Couleur CSS"}
          @input=${(r) => this.emitValue(r.target.value)}
        />
      </div>
      ${a === "css-color" && e ? V`
        <div class="alpha">
          <span>Opacité</span>
          <input
            type="range" min="0" max="1" step="0.01"
            .value=${String(e.alpha)}
            @input=${(r) => this.emitValue(cr(s, Number(r.target.value)))}
          />
          <output>${Math.round(e.alpha * 100)}%</output>
        </div>
      ` : S}
    `;
  }
  renderRange() {
    const s = this.definition.defaultValue || `0${this.definition.unit ?? ""}`, e = Number.parseFloat(this.current() || s), t = Number.isFinite(e) ? e : 0, a = this.definition.min ?? 0, r = this.definition.max ?? 100, o = this.definition.step ?? 1, l = this.definition.unit ?? "", i = (n) => this.emitValue(`${n.target.value}${l}`);
    return V`
      <div class="row">
        <input type="range" .min=${String(a)} .max=${String(r)} .step=${String(o)} .value=${String(t)} @input=${i} />
        <input class="number" type="number" .min=${String(a)} .max=${String(r)} .step=${String(o)} .value=${String(t)} @input=${i} />
        <span class="unit">${l || "—"}</span>
      </div>
      <div class="range-label"><span>${a}${l}</span><span>${r}${l}</span></div>
    `;
  }
  renderFilter() {
    const s = this.current(), e = Number(s.match(/blur\(([\d.]+)px\)/)?.[1] ?? 0), t = Number(s.match(/saturate\(([\d.]+)%\)/)?.[1] ?? 100), a = (r, o) => this.emitValue(r === 0 && o === 100 ? "none" : `blur(${r}px) saturate(${o}%)`);
    return V`
      <div class="filter-grid">
        <div class="filter-row">
          <label>Flou</label>
          <input type="range" min="0" max="48" step="1" .value=${String(e)} @input=${(r) => a(Number(r.target.value), t)} />
          <output>${e}px</output>
        </div>
        <div class="filter-row">
          <label>Saturation</label>
          <input type="range" min="50" max="200" step="1" .value=${String(t)} @input=${(r) => a(e, Number(r.target.value))} />
          <output>${t}%</output>
        </div>
      </div>
    `;
  }
  renderInput() {
    return this.definition.kind === "color" ? this.renderColor() : this.definition.kind === "range" ? this.renderRange() : this.definition.kind === "filter" ? this.renderFilter() : this.definition.kind === "select" ? V`
      <select .value=${this.current()} @change=${(s) => this.emitValue(s.target.value)}>
        ${(this.definition.options ?? []).map((s) => V`<option value=${s}>${s}</option>`)}
      </select>
    ` : V`
      <input
        type="text"
        spellcheck="false"
        .value=${this.value || this.inheritedValue}
        placeholder=${this.definition.defaultValue || "Valeur CSS"}
        @input=${(s) => this.emitValue(s.target.value)}
      />
    `;
  }
  render() {
    return V`
      <section class="control">
        <div class="heading">
          <div class="meta">
            <div class="label-row">
              <div class="label">${this.definition.label}${this.definition.legacy ? V`<span class="badge">legacy</span>` : S}</div>
              <span class="info">
                <button class="info-trigger" type="button" aria-label=${`Description de ${this.definition.label}`} aria-describedby="variable-description">i</button>
                <span class="tooltip" id="variable-description" role="tooltip">${this.definition.description}</span>
              </span>
            </div>
            <div class="key">--${this.definition.id}</div>
          </div>
          <button class="reset" ?disabled=${!this.overridden} title="Réinitialiser cette valeur" @click=${() => this.emitValue(void 0)}>
            ${$("reset", 17)}
          </button>
        </div>
        ${this.renderInput()}
      </section>
    `;
  }
};
ue.styles = Rt`
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
    .label-row { display: flex; align-items: center; gap: 6px; }
    .label { min-width: 0; font-size: 13px; line-height: 18px; font-weight: 650; color: var(--tb-text, #1d2433); }
    .info { position: relative; display: inline-flex; flex: 0 0 auto; }
    .info-trigger {
      display: grid; place-items: center; width: 16px; height: 16px; padding: 0; border: 1px solid var(--tb-input-border, #d9dde5);
      border-radius: 50%; outline: 0; color: var(--tb-muted, #7b8495); background: var(--tb-panel, #fff); cursor: help;
      font: 700 10px/1 ui-sans-serif, system-ui, sans-serif; transition: color 140ms ease, border-color 140ms ease, background 140ms ease;
    }
    .info-trigger:hover, .info-trigger:focus-visible {
      color: var(--tb-accent, #6558d9); border-color: var(--tb-accent, #6558d9); background: var(--tb-accent-soft, #eeecff);
    }
    .tooltip {
      position: absolute; z-index: 5; top: calc(100% + 8px); left: -8px; width: max-content; max-width: min(260px, calc(100vw - 32px));
      padding: 8px 10px; border-radius: 8px; color: #fff; background: #252b38; box-shadow: 0 8px 24px rgba(20, 24, 40, .2);
      font: 10px/1.45 var(--tb-font, Inter, system-ui, sans-serif); font-weight: 450; pointer-events: none;
      opacity: 0; visibility: hidden; transform: translateY(-3px); transition: opacity 120ms ease, transform 120ms ease, visibility 120ms ease;
    }
    .tooltip::before {
      content: ""; position: absolute; bottom: 100%; left: 11px; border: 5px solid transparent; border-bottom-color: #252b38;
    }
    .info:hover .tooltip, .info:focus-within .tooltip { opacity: 1; visibility: visible; transform: translateY(0); }
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
ze([
  z({ attribute: !1 })
], ue.prototype, "definition", 2);
ze([
  z()
], ue.prototype, "value", 2);
ze([
  z()
], ue.prototype, "inheritedValue", 2);
ze([
  z({ type: Boolean })
], ue.prototype, "overridden", 2);
ue = ze([
  Gt("theme-variable-control")
], ue);
const fr = {
  count: 757
}, wa = [
  {
    id: "accent-color",
    label: "Couleur d’accent",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#ff9800",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "amber-color",
    label: "Amber couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffc107",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-header-background-color",
    label: "Arrière-plan de l’en-tête",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--sidebar-background-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-header-border-bottom",
    label: "App en-tête bordure bottom",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "text",
    defaultValue: "1px solid var(--divider-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-header-text-color",
    label: "Texte de l’en-tête",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--sidebar-text-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-safe-area-inset-bottom",
    label: "App safe area inset bottom",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-safe-area-inset-left",
    label: "App safe area inset left",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-safe-area-inset-right",
    label: "App safe area inset right",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-safe-area-inset-top",
    label: "App safe area inset top",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "app-theme-color",
    label: "App theme couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--app-header-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "badge-color",
    label: "Badge couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "bar-box-shadow",
    label: "Bar box ombre",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "0 2px 12px var(--shadow-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "black-color",
    label: "Black couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#000000",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "blue-color",
    label: "Blue couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#2196f3",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "blue-grey-color",
    label: "Blue grey couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#607d8b",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "brown-color",
    label: "Brown couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#795548",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "calendar-border-radius",
    label: "Calendar bordure rayon",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "calendar-border-width",
    label: "Calendar bordure largeur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "calendar-height",
    label: "Calendar hauteur",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "card-background-color",
    label: "Arrière-plan des cartes (compatibilité)",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "#ffffff",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "chip-background-color",
    label: "Chip arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.15)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "clear-background-color",
    label: "Clear arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "#ffffff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-atom",
    label: "Codemirror atom",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#f78c6c",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-attribute",
    label: "Codemirror attribute",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#c792ea",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-builtin",
    label: "Codemirror builtin",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#ffcb6b",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-comment",
    label: "Codemirror comment",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#545454",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-def",
    label: "Codemirror def",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#82aaff",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-keyword",
    label: "Codemirror keyword",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#c792ea",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-meta",
    label: "Codemirror meta",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#ffcb6b",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-number",
    label: "Codemirror number",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#ff5370",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-operator",
    label: "Codemirror operator",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#89ddff",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-property",
    label: "Codemirror property",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#c792ea",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-qualifier",
    label: "Codemirror qualifier",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#decb6b",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-string",
    label: "Codemirror string",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#c3e88d",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-string-2",
    label: "Codemirror string 2",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#f07178",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-tag",
    label: "Codemirror tag",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#ff5370",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-type",
    label: "Codemirror type",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#decb6b",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-variable",
    label: "Codemirror variable",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#f07178",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-variable-2",
    label: "Codemirror variable 2",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#eeffff",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "codemirror-variable-3",
    label: "Codemirror variable 3",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "#decb6b",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-1",
    label: "Couleur 1",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#4269d0",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-10",
    label: "Couleur 10",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#094bad",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-11",
    label: "Couleur 11",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#c99000",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-12",
    label: "Couleur 12",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#d84f3e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-13",
    label: "Couleur 13",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#49a28f",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-14",
    label: "Couleur 14",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#048732",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-15",
    label: "Couleur 15",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#d96895",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-16",
    label: "Couleur 16",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8043ce",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-17",
    label: "Couleur 17",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#7599d1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-18",
    label: "Couleur 18",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#7a4c31",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-19",
    label: "Couleur 19",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#6989f4",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-2",
    label: "Couleur 2",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f4bd4a",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-20",
    label: "Couleur 20",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ffd444",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-21",
    label: "Couleur 21",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ff957c",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-22",
    label: "Couleur 22",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8fe9d3",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-23",
    label: "Couleur 23",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#62cc71",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-24",
    label: "Couleur 24",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ffadda",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-25",
    label: "Couleur 25",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#c884ff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-26",
    label: "Couleur 26",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#badeff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-27",
    label: "Couleur 27",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#bf8b6d",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-28",
    label: "Couleur 28",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#927acc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-29",
    label: "Couleur 29",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#97ee3f",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-3",
    label: "Couleur 3",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ff725c",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-30",
    label: "Couleur 30",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#bf3947",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-31",
    label: "Couleur 31",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#9f5b00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-32",
    label: "Couleur 32",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f48758",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-33",
    label: "Couleur 33",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8caed6",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-34",
    label: "Couleur 34",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f2b94f",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-35",
    label: "Couleur 35",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#eff26e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-36",
    label: "Couleur 36",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#e43872",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-37",
    label: "Couleur 37",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#d9b100",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-38",
    label: "Couleur 38",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#9d7a00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-39",
    label: "Couleur 39",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#698cff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-4",
    label: "Couleur 4",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#6cc5b0",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-40",
    label: "Couleur 40",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#00d27e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-41",
    label: "Couleur 41",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#d06800",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-42",
    label: "Couleur 42",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#009f82",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-43",
    label: "Couleur 43",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#c49200",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-44",
    label: "Couleur 44",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#cbe8ff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-45",
    label: "Couleur 45",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#fecddf",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-46",
    label: "Couleur 46",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#c27eb6",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-47",
    label: "Couleur 47",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8cd2ce",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-48",
    label: "Couleur 48",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#c4b8d9",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-49",
    label: "Couleur 49",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f883b0",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-5",
    label: "Couleur 5",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#a463f2",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-50",
    label: "Couleur 50",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#a49100",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-51",
    label: "Couleur 51",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f48800",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-52",
    label: "Couleur 52",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#27d0df",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-53",
    label: "Couleur 53",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#a04a9b",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-54",
    label: "Couleur 54",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#4269d0",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-6",
    label: "Couleur 6",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ff8ab7",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-7",
    label: "Couleur 7",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#9c6b4e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-8",
    label: "Couleur 8",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#97bbf5",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "color-9",
    label: "Couleur 9",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#01ab63",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "cyan-color",
    label: "Cyan couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#00bcd4",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-disabled-opacity",
    label: "Dark désactivé opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "0.38",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-divider-opacity",
    label: "Dark divider opacity",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "range",
    defaultValue: "0.12",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-grey-color",
    label: "Dark grey couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#606060",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-primary-color",
    label: "Dark primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#0288d1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-primary-opacity",
    label: "Dark primaire opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "0.87",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "dark-secondary-opacity",
    label: "Dark secondaire opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "0.54",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "darker-primary-color",
    label: "Darker primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#016194",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "data-table-background-color",
    label: "Data table arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "color",
    defaultValue: "var(--card-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "deep-orange-color",
    label: "Deep orange couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ff6f22",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "deep-purple-color",
    label: "Deep purple couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#6e41ab",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "direction",
    label: "Direction",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "ltr",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "disabled-color",
    label: "Désactivé couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#bdbdbd",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "disabled-text-color",
    label: "Texte désactivé",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "#bdbdbd",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "divider-color",
    label: "Séparateurs",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.12)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-battery-in-color",
    label: "Energy battery in couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#f06292",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-battery-out-color",
    label: "Energy battery out couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#4db6ac",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-gas-color",
    label: "Energy gas couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8e021b",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-grid-consumption-color",
    label: "Energy grid consumption couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#488fc2",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-grid-return-color",
    label: "Energy grid return couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#8353d1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-non-fossil-color",
    label: "Energy non fossil couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#0f9d58",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-solar-color",
    label: "Energy solar couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#ff9800",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "energy-water-color",
    label: "Energy water couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "#00bcd4",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "error-color",
    label: "Erreur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#db4437",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "error-state-color",
    label: "Erreur state couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "float-end",
    label: "Float end",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "right",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "float-start",
    label: "Float start",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "left",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-1",
    label: "Graph couleur 1",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-10",
    label: "Graph couleur 10",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-11",
    label: "Graph couleur 11",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-12",
    label: "Graph couleur 12",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-13",
    label: "Graph couleur 13",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-14",
    label: "Graph couleur 14",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-15",
    label: "Graph couleur 15",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-16",
    label: "Graph couleur 16",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-17",
    label: "Graph couleur 17",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-18",
    label: "Graph couleur 18",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-19",
    label: "Graph couleur 19",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-2",
    label: "Graph couleur 2",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-20",
    label: "Graph couleur 20",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-21",
    label: "Graph couleur 21",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-22",
    label: "Graph couleur 22",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-23",
    label: "Graph couleur 23",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-24",
    label: "Graph couleur 24",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-25",
    label: "Graph couleur 25",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-26",
    label: "Graph couleur 26",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-27",
    label: "Graph couleur 27",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-28",
    label: "Graph couleur 28",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-29",
    label: "Graph couleur 29",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-3",
    label: "Graph couleur 3",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-30",
    label: "Graph couleur 30",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-31",
    label: "Graph couleur 31",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-32",
    label: "Graph couleur 32",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-33",
    label: "Graph couleur 33",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-34",
    label: "Graph couleur 34",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-35",
    label: "Graph couleur 35",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-36",
    label: "Graph couleur 36",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-37",
    label: "Graph couleur 37",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-38",
    label: "Graph couleur 38",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-39",
    label: "Graph couleur 39",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-4",
    label: "Graph couleur 4",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-40",
    label: "Graph couleur 40",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-41",
    label: "Graph couleur 41",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-42",
    label: "Graph couleur 42",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-43",
    label: "Graph couleur 43",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-44",
    label: "Graph couleur 44",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-45",
    label: "Graph couleur 45",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-46",
    label: "Graph couleur 46",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-47",
    label: "Graph couleur 47",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-48",
    label: "Graph couleur 48",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-49",
    label: "Graph couleur 49",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-5",
    label: "Graph couleur 5",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-50",
    label: "Graph couleur 50",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-51",
    label: "Graph couleur 51",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-52",
    label: "Graph couleur 52",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-53",
    label: "Graph couleur 53",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-54",
    label: "Graph couleur 54",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-6",
    label: "Graph couleur 6",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-7",
    label: "Graph couleur 7",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-8",
    label: "Graph couleur 8",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "graph-color-9",
    label: "Graph couleur 9",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "green-color",
    label: "Green couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#4caf50",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "grey-color",
    label: "Grey couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#9e9e9e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-animation-duration-fast",
    label: "HA animation duration fast",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "150ms",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-animation-duration-instant",
    label: "HA animation duration instant",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "75ms",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-animation-duration-none",
    label: "HA animation duration none",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "1ms",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-animation-duration-normal",
    label: "HA animation duration normal",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "250ms",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-animation-duration-slow",
    label: "HA animation duration slow",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "350ms",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-assist-chip-active-container-color",
    label: "HA assist chip actif container couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-color), 0.15)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-assist-chip-filled-container-color",
    label: "HA assist chip filled container couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.15)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-badge-border-radius",
    label: "HA badge bordure rayon",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-badge-font-size",
    label: "HA badge police taille",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-badge-icon-size",
    label: "HA badge icon taille",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-badge-size",
    label: "HA badge taille",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-2xl",
    label: "HA bordure rayon 2xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "20px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-3xl",
    label: "HA bordure rayon 3xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "24px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-4xl",
    label: "HA bordure rayon 4xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "28px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-5xl",
    label: "HA bordure rayon 5xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "32px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-6xl",
    label: "HA bordure rayon 6xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "36px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-circle",
    label: "HA bordure rayon circle",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "50%",
    unit: "%",
    min: 0,
    max: 100,
    step: 0.05,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-lg",
    label: "HA bordure rayon lg",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "12px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-md",
    label: "HA bordure rayon md",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "8px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-pill",
    label: "HA bordure rayon pill",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "9999px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-sm",
    label: "HA bordure rayon sm",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "4px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-square",
    label: "HA bordure rayon square",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "0",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-radius-xl",
    label: "HA bordure rayon xl",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "16px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-width-lg",
    label: "HA bordure largeur lg",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "3px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-width-md",
    label: "HA bordure largeur md",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "2px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-border-width-sm",
    label: "HA bordure largeur sm",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "1px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-box-shadow-l",
    label: "HA box ombre l",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "0 6px 12px -3px rgba(0, 0, 0, 0.12), 0 16px 32px -6px rgba(0, 0, 0, 0.2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-box-shadow-m",
    label: "HA box ombre m",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "0 3px 6px -1px rgba(0, 0, 0, 0.1), 0 8px 16px -2px rgba(0, 0, 0, 0.15)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-box-shadow-s",
    label: "HA box ombre s",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-button-neutral-color",
    label: "HA button neutral couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "#d9dae0",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-button-neutral-light-color",
    label: "HA button neutral light couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "#6a7081",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-button-primary-light-color",
    label: "HA button primaire light couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "#4082a040",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-button-warning-light-color",
    label: "HA button avertissement light couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "#917b54c1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-backdrop-filter",
    label: "Blur des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "filter",
    defaultValue: "",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-background",
    label: "Arrière-plan des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-border-color",
    label: "Couleur de bordure des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-border-radius",
    label: "Arrondi des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-border-width",
    label: "Épaisseur de bordure des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-box-shadow",
    label: "Ombre des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-header-color",
    label: "Titre des cartes",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-header-font-family",
    label: "HA carte en-tête police family",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-card-header-font-size",
    label: "HA carte en-tête police taille",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-black",
    label: "HA couleur black",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#000000",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-danger-loud",
    label: "HA couleur bordure danger fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-red-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-danger-normal",
    label: "HA couleur bordure danger normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-red-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-danger-quiet",
    label: "HA couleur bordure danger discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-red-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-neutral-loud",
    label: "HA couleur bordure neutral fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-neutral-normal",
    label: "HA couleur bordure neutral normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-60)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-neutral-quiet",
    label: "HA couleur bordure neutral discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-normal",
    label: "HA couleur bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-primary-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-primary-loud",
    label: "HA couleur bordure primaire fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-primary-normal",
    label: "HA couleur bordure primaire normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-primary-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-primary-quiet",
    label: "HA couleur bordure primaire discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-primary-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-success-loud",
    label: "HA couleur bordure succès fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-green-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-success-normal",
    label: "HA couleur bordure succès normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-green-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-success-quiet",
    label: "HA couleur bordure succès discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-green-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-warning-loud",
    label: "HA couleur bordure avertissement fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-orange-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-warning-normal",
    label: "HA couleur bordure avertissement normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-orange-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-border-warning-quiet",
    label: "HA couleur bordure avertissement discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-orange-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-loud-active",
    label: "HA couleur remplissage danger fort actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-loud-hover",
    label: "HA couleur remplissage danger fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-loud-resting",
    label: "HA couleur remplissage danger fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-normal-active",
    label: "HA couleur remplissage danger normal actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-normal-hover",
    label: "HA couleur remplissage danger normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-normal-resting",
    label: "HA couleur remplissage danger normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-quiet-active",
    label: "HA couleur remplissage danger discret actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-quiet-hover",
    label: "HA couleur remplissage danger discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-danger-quiet-resting",
    label: "HA couleur remplissage danger discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-red-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-loud-hover",
    label: "HA couleur remplissage désactivé fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-loud-resting",
    label: "HA couleur remplissage désactivé fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-normal-hover",
    label: "HA couleur remplissage désactivé normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-normal-resting",
    label: "HA couleur remplissage désactivé normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-quiet-hover",
    label: "HA couleur remplissage désactivé discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-disabled-quiet-resting",
    label: "HA couleur remplissage désactivé discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-loud-active",
    label: "HA couleur remplissage neutral fort actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-loud-hover",
    label: "HA couleur remplissage neutral fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-30)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-loud-resting",
    label: "HA couleur remplissage neutral fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-normal-active",
    label: "HA couleur remplissage neutral normal actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-normal-hover",
    label: "HA couleur remplissage neutral normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-normal-resting",
    label: "HA couleur remplissage neutral normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-quiet-active",
    label: "HA couleur remplissage neutral discret actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-quiet-hover",
    label: "HA couleur remplissage neutral discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-neutral-quiet-resting",
    label: "HA couleur remplissage neutral discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-loud-active",
    label: "HA couleur remplissage primaire fort actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-loud-hover",
    label: "HA couleur remplissage primaire fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-30)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-loud-resting",
    label: "HA couleur remplissage primaire fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-normal-active",
    label: "HA couleur remplissage primaire normal actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-normal-hover",
    label: "HA couleur remplissage primaire normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-normal-resting",
    label: "HA couleur remplissage primaire normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-quiet-active",
    label: "HA couleur remplissage primaire discret actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-quiet-hover",
    label: "HA couleur remplissage primaire discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-primary-quiet-resting",
    label: "HA couleur remplissage primaire discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-loud-active",
    label: "HA couleur remplissage succès fort actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-loud-hover",
    label: "HA couleur remplissage succès fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-loud-resting",
    label: "HA couleur remplissage succès fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-normal-active",
    label: "HA couleur remplissage succès normal actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-normal-hover",
    label: "HA couleur remplissage succès normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-normal-resting",
    label: "HA couleur remplissage succès normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-quiet-active",
    label: "HA couleur remplissage succès discret actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-quiet-hover",
    label: "HA couleur remplissage succès discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-success-quiet-resting",
    label: "HA couleur remplissage succès discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-green-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-loud-active",
    label: "HA couleur remplissage avertissement fort actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-loud-hover",
    label: "HA couleur remplissage avertissement fort hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-loud-resting",
    label: "HA couleur remplissage avertissement fort resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-normal-active",
    label: "HA couleur remplissage avertissement normal actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-normal-hover",
    label: "HA couleur remplissage avertissement normal hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-normal-resting",
    label: "HA couleur remplissage avertissement normal resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-quiet-active",
    label: "HA couleur remplissage avertissement discret actif",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-quiet-hover",
    label: "HA couleur remplissage avertissement discret hover",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-fill-warning-quiet-resting",
    label: "HA couleur remplissage avertissement discret resting",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-orange-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-focus",
    label: "HA couleur focus",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-60)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-form-background",
    label: "HA couleur form arrière-plan",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-form-background-disabled",
    label: "HA couleur form arrière-plan désactivé",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-form-background-hover",
    label: "HA couleur form arrière-plan hover",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-05",
    label: "HA couleur green 05",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#031608",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-10",
    label: "HA couleur green 10",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#052310",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-20",
    label: "HA couleur green 20",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#0a3a1d",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-30",
    label: "HA couleur green 30",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#0a5027",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-40",
    label: "HA couleur green 40",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#036730",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-50",
    label: "HA couleur green 50",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#00883c",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-60",
    label: "HA couleur green 60",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#00ac49",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-70",
    label: "HA couleur green 70",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#5dc36f",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-80",
    label: "HA couleur green 80",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#93da98",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-90",
    label: "HA couleur green 90",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#c2f2c1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-green-95",
    label: "HA couleur green 95",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#e3f9e3",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-05",
    label: "HA couleur neutral 05",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#141414",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-10",
    label: "HA couleur neutral 10",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#202020",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-20",
    label: "HA couleur neutral 20",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#363636",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-30",
    label: "HA couleur neutral 30",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#4a4a4a",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-40",
    label: "HA couleur neutral 40",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#5e5e5e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-50",
    label: "HA couleur neutral 50",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#7a7a7a",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-60",
    label: "HA couleur neutral 60",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#989898",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-70",
    label: "HA couleur neutral 70",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#b1b1b1",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-80",
    label: "HA couleur neutral 80",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#cccccc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-90",
    label: "HA couleur neutral 90",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#e6e6e6",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-neutral-95",
    label: "HA couleur neutral 95",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#f3f3f3",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-danger-loud",
    label: "HA couleur on danger fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--white-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-danger-normal",
    label: "HA couleur on danger normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-red-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-danger-quiet",
    label: "HA couleur on danger discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-red-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-disabled-loud",
    label: "HA couleur on désactivé fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-disabled-normal",
    label: "HA couleur on désactivé normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-70)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-disabled-quiet",
    label: "HA couleur on désactivé discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-80)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-neutral-loud",
    label: "HA couleur on neutral fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--white-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-neutral-normal",
    label: "HA couleur on neutral normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-neutral-quiet",
    label: "HA couleur on neutral discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-primary-loud",
    label: "HA couleur on primaire fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--white-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-primary-normal",
    label: "HA couleur on primaire normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-primary-quiet",
    label: "HA couleur on primaire discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-primary-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-success-loud",
    label: "HA couleur on succès fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--white-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-success-normal",
    label: "HA couleur on succès normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-green-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-success-quiet",
    label: "HA couleur on succès discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-green-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-surface-default",
    label: "HA couleur on surface default",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-05)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-warning-loud",
    label: "HA couleur on avertissement fort",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--white-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-warning-normal",
    label: "HA couleur on avertissement normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-orange-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-on-warning-quiet",
    label: "HA couleur on avertissement discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-orange-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-05",
    label: "HA couleur orange 05",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#280700",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-10",
    label: "HA couleur orange 10",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#3b0f00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-20",
    label: "HA couleur orange 20",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#5e1c00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-30",
    label: "HA couleur orange 30",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#7e2900",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-40",
    label: "HA couleur orange 40",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#9d3800",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-50",
    label: "HA couleur orange 50",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#c94e00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-60",
    label: "HA couleur orange 60",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#f36d00",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-70",
    label: "HA couleur orange 70",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ff9342",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-80",
    label: "HA couleur orange 80",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffbb89",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-90",
    label: "HA couleur orange 90",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffe0c8",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-orange-95",
    label: "HA couleur orange 95",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#fff0e4",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-05",
    label: "HA couleur primaire 05",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#001721",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-10",
    label: "HA couleur primaire 10",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#002e3e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-20",
    label: "HA couleur primaire 20",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#004156",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-30",
    label: "HA couleur primaire 30",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#006787",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-40",
    label: "HA couleur primaire 40",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#009ac7",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-50",
    label: "HA couleur primaire 50",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#18bcf2",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-60",
    label: "HA couleur primaire 60",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#37c8fd",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-70",
    label: "HA couleur primaire 70",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#7bd4fb",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-80",
    label: "HA couleur primaire 80",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#b9e6fc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-90",
    label: "HA couleur primaire 90",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#dff3fc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-primary-95",
    label: "HA couleur primaire 95",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#eff9fe",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-05",
    label: "HA couleur red 05",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#2a040b",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-10",
    label: "HA couleur red 10",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#3e0913",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-20",
    label: "HA couleur red 20",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#631323",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-30",
    label: "HA couleur red 30",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#8a132c",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-40",
    label: "HA couleur red 40",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#b30532",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-50",
    label: "HA couleur red 50",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#dc3146",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-60",
    label: "HA couleur red 60",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#f3676c",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-70",
    label: "HA couleur red 70",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#fd8f90",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-80",
    label: "HA couleur red 80",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffb8b6",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-90",
    label: "HA couleur red 90",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffdedc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-red-95",
    label: "HA couleur red 95",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#fff0ef",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-shadow-scrollable-fade",
    label: "HA couleur ombre scrollable fade",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.08)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-default",
    label: "HA couleur surface default",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-white)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-default-inverted",
    label: "HA couleur surface default inverted",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-10)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-low",
    label: "HA couleur surface low",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-95)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-low-inverted",
    label: "HA couleur surface low inverted",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-05)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-lower",
    label: "HA couleur surface lower",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-90)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-surface-lower-inverted",
    label: "HA couleur surface lower inverted",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-color-black)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-disabled",
    label: "HA couleur texte désactivé",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-60)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-link",
    label: "HA couleur texte link",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-primary",
    label: "HA couleur texte primaire",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-05)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-primary-inverted",
    label: "HA couleur texte primaire inverted",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-white)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-secondary",
    label: "HA couleur texte secondaire",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-40)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-text-secondary-inverted",
    label: "HA couleur texte secondaire inverted",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-neutral-20)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-color-white",
    label: "HA couleur white",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffffff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-dialog-scrim-backdrop-filter",
    label: "HA dialog scrim backdrop filter",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "filter",
    defaultValue: "brightness(68%)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-family-body",
    label: "Police du corps",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "Roboto, Noto, sans-serif",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-family-code",
    label: "HA police family code",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "monospace",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-family-heading",
    label: "Police des titres",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-family-body)",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-family-longform",
    label: "HA police family longform",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "ui-sans-serif, system-ui, sans-serif",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-2xl",
    label: "HA police taille 2xl",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(24px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-3xl",
    label: "HA police taille 3xl",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(28px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-4xl",
    label: "HA police taille 4xl",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(32px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-5xl",
    label: "HA police taille 5xl",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(40px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-l",
    label: "HA police taille l",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(16px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-m",
    label: "HA police taille m",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(14px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-s",
    label: "HA police taille s",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(12px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-scale",
    label: "Échelle typographique",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "1",
    unit: "",
    min: 0.7,
    max: 1.5,
    step: 0.01,
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-xl",
    label: "HA police taille xl",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(20px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-size-xs",
    label: "HA police taille xs",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "calc(10px * var(--ha-font-size-scale))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-smoothing",
    label: "HA police smoothing",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "select",
    defaultValue: "antialiased",
    options: [
      "auto",
      "antialiased",
      "subpixel-antialiased",
      "grayscale"
    ],
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-action",
    label: "HA police graisse action",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--ha-font-weight-medium)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-body",
    label: "HA police graisse body",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--ha-font-weight-normal)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-bold",
    label: "HA police graisse bold",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "700",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-heading",
    label: "HA police graisse heading",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--ha-font-weight-bold)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-light",
    label: "HA police graisse light",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "300",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-medium",
    label: "HA police graisse medium",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "500",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-font-weight-normal",
    label: "HA police graisse normal",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "400",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-line-height-condensed",
    label: "HA line hauteur condensed",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "1.2",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-line-height-expanded",
    label: "HA line hauteur expanded",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "2",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-line-height-normal",
    label: "HA line hauteur normal",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "1.6",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-moz-osx-font-smoothing",
    label: "HA moz osx police smoothing",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "select",
    defaultValue: "grayscale",
    options: [
      "auto",
      "antialiased",
      "subpixel-antialiased",
      "grayscale"
    ],
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-picture-card-background-color",
    label: "HA picture carte arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-picture-card-text-color",
    label: "HA picture carte texte couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-picture-icon-button-color",
    label: "HA picture icon button couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-picture-icon-button-on-color",
    label: "HA picture icon button on couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-sidebar-expanded-item-width",
    label: "HA barre latérale expanded item largeur",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-sidebar-expanded-width",
    label: "HA barre latérale expanded largeur",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-1",
    label: "HA space 1",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "4px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-10",
    label: "HA space 10",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "40px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-11",
    label: "HA space 11",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "44px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-12",
    label: "HA space 12",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "48px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-13",
    label: "HA space 13",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "52px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-14",
    label: "HA space 14",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "56px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-15",
    label: "HA space 15",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "60px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-16",
    label: "HA space 16",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "64px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-17",
    label: "HA space 17",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "68px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-18",
    label: "HA space 18",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "72px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-19",
    label: "HA space 19",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "76px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-2",
    label: "HA space 2",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "8px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-20",
    label: "HA space 20",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "80px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-3",
    label: "HA space 3",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "12px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-4",
    label: "HA space 4",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "16px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-5",
    label: "HA space 5",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "20px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-6",
    label: "HA space 6",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "24px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-7",
    label: "HA space 7",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "28px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-8",
    label: "HA space 8",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "32px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "ha-space-9",
    label: "HA space 9",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "36px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "header-height",
    label: "En-tête hauteur",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "range",
    defaultValue: "56px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "history-unavailable-color",
    label: "History indisponible couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "transparent",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "history-unknown-color",
    label: "History unknown couleur",
    description: "Variable de thème Home Assistant.",
    group: "data",
    kind: "color",
    defaultValue: "var(--dark-grey-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "indigo-color",
    label: "Indigo couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#3f51b5",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "info-color",
    label: "Information",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#039be5",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-disabled-fill-color",
    label: "Input désactivé remplissage couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgb(250, 250, 250)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-disabled-ink-color",
    label: "Input désactivé ink couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.37)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-disabled-line-color",
    label: "Input désactivé line couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.06)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-dropdown-icon-color",
    label: "Input dropdown icon couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.54)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-fill-color",
    label: "Input remplissage couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgb(245, 245, 245)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-hover-line-color",
    label: "Input hover line couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.87)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-idle-line-color",
    label: "Input idle line couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.42)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-ink-color",
    label: "Input ink couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.87)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-label-ink-color",
    label: "Input label ink couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.6)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-outlined-disabled-border-color",
    label: "Input outlined désactivé bordure couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.06)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-outlined-hover-border-color",
    label: "Input outlined hover bordure couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.87)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "input-outlined-idle-border-color",
    label: "Input outlined idle bordure couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.38)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-background-color",
    label: "Label badge arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "var(--card-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-blue",
    label: "Label badge blue",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "var(--info-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-green",
    label: "Label badge green",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "var(--success-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-grey",
    label: "Label badge grey",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "#9e9e9e",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-red",
    label: "Label badge red",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "var(--error-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-text-color",
    label: "Label badge texte couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.8)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "label-badge-yellow",
    label: "Label badge yellow",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "text",
    defaultValue: "var(--warning-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-blue-color",
    label: "Light blue couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#03a9f4",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-disabled-opacity",
    label: "Light désactivé opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "0.3",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-divider-opacity",
    label: "Light divider opacity",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "range",
    defaultValue: "0.12",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-green-color",
    label: "Light green couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#8bc34a",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-grey-color",
    label: "Light grey couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#bdbdbd",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-primary-color",
    label: "Light primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#b3e5fc",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-primary-opacity",
    label: "Light primaire opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "1",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "light-secondary-opacity",
    label: "Light secondaire opacity",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "0.7",
    unit: "",
    min: 0,
    max: 1,
    step: 0.01,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "lime-color",
    label: "Lime couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#cddc39",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "map-filter",
    label: "Map filter",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "text",
    defaultValue: "invert(0.9) hue-rotate(170deg) brightness(1.5) contrast(1.2) saturate(0.3)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "margin-title-ltr",
    label: "Margin title ltr",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "0 0 0 24px",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "margin-title-rtl",
    label: "Margin title rtl",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "0 24px 0 0",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "markdown-code-background-color",
    label: "Markdown code arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--primary-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "md-list-item-label-text-font",
    label: "Md list item label texte police",
    description: "Compatibilité avec un ancien composant Material.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-family-body)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "md-list-item-supporting-text-font",
    label: "Md list item supporting texte police",
    description: "Compatibilité avec un ancien composant Material.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-family-body)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "md-list-item-trailing-supporting-text-font",
    label: "Md list item trailing supporting texte police",
    description: "Compatibilité avec un ancien composant Material.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-family-body)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-button-disabled-ink-color",
    label: "Material (legacy) button désactivé ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "components",
    kind: "color",
    defaultValue: "var(--disabled-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-button-outline-color",
    label: "Material (legacy) button outline couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "components",
    kind: "color",
    defaultValue: "var(--outline-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-checkbox-disabled-color",
    label: "Material (legacy) checkbox désactivé couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "var(--disabled-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-checkbox-unchecked-color",
    label: "Material (legacy) checkbox unchecked couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.54)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-dialog-content-ink-color",
    label: "Material (legacy) dialog content ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "system",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-dialog-heading-ink-color",
    label: "Material (legacy) dialog heading ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "system",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-dialog-scroll-divider-color",
    label: "Material (legacy) dialog scroll divider couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "system",
    kind: "color",
    defaultValue: "var(--divider-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-linear-progress-buffer-color",
    label: "Material (legacy) linear progress buffer couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "rgba(255, 255, 255, 0.1)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-radio-disabled-color",
    label: "Material (legacy) radio désactivé couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "var(--disabled-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-radio-unchecked-color",
    label: "Material (legacy) radio unchecked couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.54)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-ripple-color",
    label: "Material (legacy) ripple couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "core",
    kind: "color",
    defaultValue: "#aaaaaa",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-disabled-dropdown-icon-color",
    label: "Material (legacy) select désactivé dropdown icon couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-disabled-fill-color",
    label: "Material (legacy) select désactivé remplissage couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-fill-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-disabled-ink-color",
    label: "Material (legacy) select désactivé ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-dropdown-icon-color",
    label: "Material (legacy) select dropdown icon couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-dropdown-icon-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-fill-color",
    label: "Material (legacy) select remplissage couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-fill-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-hover-line-color",
    label: "Material (legacy) select hover line couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-hover-line-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-idle-line-color",
    label: "Material (legacy) select idle line couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-idle-line-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-ink-color",
    label: "Material (legacy) select ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-label-ink-color",
    label: "Material (legacy) select label ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-label-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-outlined-disabled-border-color",
    label: "Material (legacy) select outlined désactivé bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-disabled-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-outlined-hover-border-color",
    label: "Material (legacy) select outlined hover bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-hover-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-select-outlined-idle-border-color",
    label: "Material (legacy) select outlined idle bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-idle-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-tab-text-label-color-default",
    label: "Material (legacy) tab texte label couleur default",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-disabled-fill-color",
    label: "Material (legacy) texte field désactivé remplissage couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-fill-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-disabled-ink-color",
    label: "Material (legacy) texte field désactivé ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-disabled-line-color",
    label: "Material (legacy) texte field désactivé line couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-disabled-line-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-fill-color",
    label: "Material (legacy) texte field remplissage couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-fill-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-hover-line-color",
    label: "Material (legacy) texte field hover line couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-hover-line-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-idle-line-color",
    label: "Material (legacy) texte field idle line couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-idle-line-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-ink-color",
    label: "Material (legacy) texte field ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-label-ink-color",
    label: "Material (legacy) texte field label ink couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--input-label-ink-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-outlined-disabled-border-color",
    label: "Material (legacy) texte field outlined désactivé bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-disabled-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-outlined-hover-border-color",
    label: "Material (legacy) texte field outlined hover bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-hover-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-text-field-outlined-idle-border-color",
    label: "Material (legacy) texte field outlined idle bordure couleur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--input-outlined-idle-border-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-background",
    label: "Material (legacy) theme arrière-plan",
    description: "Compatibilité avec un ancien composant Material.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--primary-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-error",
    label: "Material (legacy) theme erreur",
    description: "Compatibilité avec un ancien composant Material.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--error-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-on-primary",
    label: "Material (legacy) theme on primaire",
    description: "Compatibilité avec un ancien composant Material.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--text-primary-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-on-secondary",
    label: "Material (legacy) theme on secondaire",
    description: "Compatibilité avec un ancien composant Material.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--text-primary-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-on-surface",
    label: "Material (legacy) theme on surface",
    description: "Compatibilité avec un ancien composant Material.",
    group: "surfaces",
    kind: "text",
    defaultValue: "var(--primary-text-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-primary",
    label: "Material (legacy) theme primaire",
    description: "Compatibilité avec un ancien composant Material.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--primary-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-secondary",
    label: "Material (legacy) theme secondaire",
    description: "Compatibilité avec un ancien composant Material.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--accent-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-surface",
    label: "Material (legacy) theme surface",
    description: "Compatibilité avec un ancien composant Material.",
    group: "surfaces",
    kind: "text",
    defaultValue: "var(--card-background-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-text-disabled-on-light",
    label: "Material (legacy) theme texte désactivé on light",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "text",
    defaultValue: "var(--disabled-text-color)",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-text-hint-on-background",
    label: "Material (legacy) theme texte hint on arrière-plan",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "color",
    defaultValue: "var(--secondary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-text-icon-on-background",
    label: "Material (legacy) theme texte icon on arrière-plan",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "color",
    defaultValue: "var(--secondary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-text-primary-on-background",
    label: "Material (legacy) theme texte primaire on arrière-plan",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "mdc-theme-text-secondary-on-background",
    label: "Material (legacy) theme texte secondaire on arrière-plan",
    description: "Compatibilité avec un ancien composant Material.",
    group: "text",
    kind: "color",
    defaultValue: "var(--secondary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !0,
    source: "home-assistant"
  },
  {
    id: "orange-color",
    label: "Orange couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ff9800",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "outline-color",
    label: "Outline couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.12)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "outline-hover-color",
    label: "Outline hover couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.24)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "pink-color",
    label: "Pink couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#e91e63",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "primary-background-color",
    label: "Arrière-plan principal",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "#fafafa",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "primary-color",
    label: "Couleur primaire",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-primary-40)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "primary-text-color",
    label: "Texte principal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-text-primary)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "purple-color",
    label: "Purple couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#926bc7",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "red-color",
    label: "Red couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#f44336",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-accent-color",
    label: "RGB accent couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "255, 152, 0",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-card-background-color",
    label: "RGB carte arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "255, 255, 255",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-error-color",
    label: "RGB erreur couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "219, 68, 55",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-info-color",
    label: "RGB info couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "3, 155, 229",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-primary-color",
    label: "RGB primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "0, 154, 199",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-primary-text-color",
    label: "RGB primaire texte couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "33, 33, 33",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-secondary-text-color",
    label: "RGB secondaire texte couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "114, 114, 114",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-success-color",
    label: "RGB succès couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "67, 160, 71",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-text-primary-color",
    label: "RGB texte primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "255, 255, 255",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "rgb-warning-color",
    label: "RGB avertissement couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "255, 166, 0",
    format: "rgb-triplet",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-bottom",
    label: "Safe area inset bottom",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--app-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-left",
    label: "Safe area inset left",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--app-safe-area-inset-left, env(safe-area-inset-left, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-right",
    label: "Safe area inset right",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--app-safe-area-inset-right, env(safe-area-inset-right, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-top",
    label: "Safe area inset top",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--app-safe-area-inset-top, env(safe-area-inset-top, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-x",
    label: "Safe area inset x",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(var(--safe-area-inset-left, 0px) + var(--safe-area-inset-right, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-inset-y",
    label: "Safe area inset y",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(var(--safe-area-inset-top, 0px) + var(--safe-area-inset-bottom, 0px))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-offset-bottom",
    label: "Safe area offset bottom",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(max(var(--safe-area-inset-bottom, 0px) - var(--safe-area-inset-top, 0px), 0px) / 2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-offset-left",
    label: "Safe area offset left",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(max(var(--safe-area-inset-left, 0px) - var(--safe-area-inset-right, 0px), 0px) / 2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-offset-right",
    label: "Safe area offset right",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(max(var(--safe-area-inset-right, 0px) - var(--safe-area-inset-left, 0px), 0px) / 2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-area-offset-top",
    label: "Safe area offset top",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(max(var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px), 0px) / 2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-height",
    label: "Safe hauteur",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "safe-width",
    label: "Safe largeur",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "calc(100vw - var(--safe-area-inset-left) - var(--safe-area-inset-right))",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "scale-direction",
    label: "Scale direction",
    description: "Jeton interne ou dépendant de l’appareil.",
    group: "advanced",
    kind: "text",
    defaultValue: "",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "scrollbar-thumb-color",
    label: "Scrollbar thumb couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "rgb(194, 194, 194)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "secondary-background-color",
    label: "Arrière-plan secondaire",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "#e5e5e5",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "secondary-text-color",
    label: "Texte secondaire",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-text-secondary)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "shadow-color",
    label: "Ombre couleur",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "color",
    defaultValue: "rgba(0, 0, 0, 0.16)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-background-color",
    label: "Arrière-plan de la barre latérale",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--card-background-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-icon-color",
    label: "Icônes de la barre latérale",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "rgba(var(--rgb-primary-text-color), 0.6)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-menu-button-background-color",
    label: "Barre latérale menu button arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-menu-button-text-color",
    label: "Barre latérale menu button texte couleur",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-selected-icon-color",
    label: "Icône sélectionnée de la barre latérale",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--primary-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-selected-text-color",
    label: "Texte sélectionné de la barre latérale",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--primary-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "sidebar-text-color",
    label: "Texte de la barre latérale",
    description: "Variable de thème Home Assistant.",
    group: "navigation",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "slider-color",
    label: "Slider couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "var(--primary-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "slider-secondary-color",
    label: "Slider secondaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "var(--light-primary-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "slider-track-color",
    label: "Slider track couleur",
    description: "Variable de thème Home Assistant.",
    group: "components",
    kind: "color",
    defaultValue: "var(--scrollbar-thumb-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-active-color",
    label: "État actif",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-armed_away-color",
    label: "State alarm control panel armed away couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-armed_custom_bypass-color",
    label: "State alarm control panel armed custom bypass couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-armed_home-color",
    label: "State alarm control panel armed home couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-armed_night-color",
    label: "State alarm control panel armed night couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-armed_vacation-color",
    label: "State alarm control panel armed vacation couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-arming-color",
    label: "State alarm control panel arming couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-disarming-color",
    label: "State alarm control panel disarming couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-pending-color",
    label: "State alarm control panel pending couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alarm_control_panel-triggered-color",
    label: "State alarm control panel triggered couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alert-off-color",
    label: "State alert off couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-alert-on-color",
    label: "State alert on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-active-color",
    label: "State binary sensor actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-battery-on-color",
    label: "State binary sensor battery on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-carbon_monoxide-on-color",
    label: "State binary sensor carbon monoxide on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-gas-on-color",
    label: "State binary sensor gas on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-heat-on-color",
    label: "State binary sensor heat on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-lock-on-color",
    label: "State binary sensor lock on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-moisture-on-color",
    label: "State binary sensor moisture on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-problem-on-color",
    label: "State binary sensor problem on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-safety-on-color",
    label: "State binary sensor safety on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-smoke-on-color",
    label: "State binary sensor smoke on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-sound-on-color",
    label: "State binary sensor sound on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-binary_sensor-tamper-on-color",
    label: "State binary sensor tamper on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-auto-color",
    label: "State climate auto couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-cool-color",
    label: "State climate cool couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-dry-color",
    label: "State climate dry couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-fan_only-color",
    label: "State climate fan only couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--cyan-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-heat-color",
    label: "State climate heat couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--deep-orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-climate-heat-cool-color",
    label: "State climate heat cool couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-cover-active-color",
    label: "State cover actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--purple-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-device_tracker-active-color",
    label: "State device tracker actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-device_tracker-home-color",
    label: "State device tracker home couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-fan-active-color",
    label: "State fan actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--cyan-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-humidifier-on-color",
    label: "State humidifier on couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-icon-color",
    label: "State icon couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "#44739e",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-icon-error-color",
    label: "State icon erreur couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "#db4437",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-icon-unavailable-color",
    label: "State icon indisponible couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-inactive-color",
    label: "État inactif",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--grey-color)",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lawn_mower-active-color",
    label: "State lawn mower actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--teal-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lawn_mower-error-color",
    label: "State lawn mower erreur couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-light-active-color",
    label: "State light actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-jammed-color",
    label: "State lock jammed couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-locked-color",
    label: "State lock locked couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-locking-color",
    label: "State lock locking couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-open-color",
    label: "State lock open couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-opening-color",
    label: "State lock opening couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-unlocked-color",
    label: "State lock unlocked couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-lock-unlocking-color",
    label: "State lock unlocking couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-media_player-active-color",
    label: "State media player actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--light-blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-person-active-color",
    label: "State person actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-person-home-color",
    label: "State person home couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-plant-active-color",
    label: "State plant actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-sensor-battery-high-color",
    label: "State sensor battery high couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-sensor-battery-low-color",
    label: "State sensor battery low couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-sensor-battery-medium-color",
    label: "State sensor battery medium couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-siren-active-color",
    label: "State siren actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-sun-above_horizon-color",
    label: "State sun above horizon couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-sun-below_horizon-color",
    label: "State sun below horizon couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--indigo-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-switch-active-color",
    label: "State switch actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-unavailable-color",
    label: "État indisponible",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--state-icon-unavailable-color, var(--disabled-text-color))",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-update-active-color",
    label: "State update actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-vacuum-active-color",
    label: "State vacuum actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--teal-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-vacuum-error-color",
    label: "State vacuum erreur couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-valve-active-color",
    label: "State valve actif couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-eco-color",
    label: "State water heater eco couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-electric-color",
    label: "State water heater electric couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-gas-color",
    label: "State water heater gas couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-heat_pump-color",
    label: "State water heater heat pump couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-high_demand-color",
    label: "State water heater high demand couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--deep-orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-water_heater-performance-color",
    label: "State water heater performance couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--deep-orange-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-clear_night-color",
    label: "State weather clear night couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--deep-purple-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-cloudy-color",
    label: "State weather cloudy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--light-grey-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-exceptional-color",
    label: "State weather exceptional couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--red-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-fog-color",
    label: "State weather fog couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--grey-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-hail-color",
    label: "State weather hail couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--cyan-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-lightning_rainy-color",
    label: "State weather lightning rainy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--lime-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-lightning-color",
    label: "State weather lightning couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--yellow-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-partlycloudy-color",
    label: "State weather partlycloudy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-grey-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-pouring-color",
    label: "State weather pouring couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--indigo-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-rainy-color",
    label: "State weather rainy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-snowy_rainy-color",
    label: "State weather snowy rainy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--light-blue-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-snowy-color",
    label: "State weather snowy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "#c0e0ff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-sunny-color",
    label: "State weather sunny couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--amber-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-windy_variant-color",
    label: "State weather windy variant couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "state-weather-windy-color",
    label: "State weather windy couleur",
    description: "Variable de thème Home Assistant.",
    group: "states",
    kind: "color",
    defaultValue: "var(--green-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "success-color",
    label: "Succès",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#43a047",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "table-header-background-color",
    label: "Table en-tête arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "color",
    defaultValue: "var(--input-fill-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "table-row-alternative-background-color",
    label: "Table row alternative arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "color",
    defaultValue: "var(--secondary-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "table-row-background-color",
    label: "Table row arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "system",
    kind: "color",
    defaultValue: "var(--primary-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "teal-color",
    label: "Teal couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#009688",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "text-accent-color",
    label: "Texte accent couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "text-light-primary-color",
    label: "Texte light primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "#212121",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "text-primary-color",
    label: "Texte primaire couleur",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "#ffffff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-radius-l",
    label: "Web Awesome bordure rayon l",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-radius-lg)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-radius-m",
    label: "Web Awesome bordure rayon m",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-radius-md)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-radius-pill",
    label: "Web Awesome bordure rayon pill",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-radius-pill)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-radius-s",
    label: "Web Awesome bordure rayon s",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-radius-sm)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-style",
    label: "Web Awesome bordure style",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "select",
    defaultValue: "solid",
    options: [
      "none",
      "solid",
      "dashed",
      "dotted",
      "double"
    ],
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-width-l",
    label: "Web Awesome bordure largeur l",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-width-lg)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-width-m",
    label: "Web Awesome bordure largeur m",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-width-md)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-border-width-s",
    label: "Web Awesome bordure largeur s",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-width-sm)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-border-loud",
    label: "Web Awesome couleur brand bordure fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-primary-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-border-normal",
    label: "Web Awesome couleur brand bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-primary-50)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-border-quiet",
    label: "Web Awesome couleur brand bordure discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-primary-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-fill-loud",
    label: "Web Awesome couleur brand remplissage fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-primary-loud-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-fill-normal",
    label: "Web Awesome couleur brand remplissage normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-primary-normal-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-fill-quiet",
    label: "Web Awesome couleur brand remplissage discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-primary-quiet-hover)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-on-loud",
    label: "Web Awesome couleur brand on fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-primary-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-on-normal",
    label: "Web Awesome couleur brand on normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-primary-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-brand-on-quiet",
    label: "Web Awesome couleur brand on discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-primary-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-border-loud",
    label: "Web Awesome couleur danger bordure fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-danger-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-border-normal",
    label: "Web Awesome couleur danger bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-danger-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-border-quiet",
    label: "Web Awesome couleur danger bordure discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-danger-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-fill-loud",
    label: "Web Awesome couleur danger remplissage fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-danger-loud-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-fill-normal",
    label: "Web Awesome couleur danger remplissage normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-danger-normal-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-fill-quiet",
    label: "Web Awesome couleur danger remplissage discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-danger-quiet-hover)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-on-loud",
    label: "Web Awesome couleur danger on fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-danger-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-on-normal",
    label: "Web Awesome couleur danger on normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-danger-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-danger-on-quiet",
    label: "Web Awesome couleur danger on discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-danger-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-border-loud",
    label: "Web Awesome couleur neutral bordure fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-neutral-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-border-normal",
    label: "Web Awesome couleur neutral bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-neutral-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-border-quiet",
    label: "Web Awesome couleur neutral bordure discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-neutral-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-fill-loud",
    label: "Web Awesome couleur neutral remplissage fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-neutral-loud-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-fill-normal",
    label: "Web Awesome couleur neutral remplissage normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-neutral-normal-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-fill-quiet",
    label: "Web Awesome couleur neutral remplissage discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-neutral-quiet-hover)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-on-loud",
    label: "Web Awesome couleur neutral on fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-neutral-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-on-normal",
    label: "Web Awesome couleur neutral on normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-neutral-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-neutral-on-quiet",
    label: "Web Awesome couleur neutral on discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-neutral-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-border-loud",
    label: "Web Awesome couleur succès bordure fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-success-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-border-normal",
    label: "Web Awesome couleur succès bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-success-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-border-quiet",
    label: "Web Awesome couleur succès bordure discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-success-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-fill-loud",
    label: "Web Awesome couleur succès remplissage fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-success-loud-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-fill-normal",
    label: "Web Awesome couleur succès remplissage normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-success-normal-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-fill-quiet",
    label: "Web Awesome couleur succès remplissage discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-success-quiet-hover)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-on-loud",
    label: "Web Awesome couleur succès on fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-success-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-on-normal",
    label: "Web Awesome couleur succès on normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-success-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-success-on-quiet",
    label: "Web Awesome couleur succès on discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-success-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-surface-border",
    label: "Web Awesome couleur surface bordure",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-neutral-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-surface-default",
    label: "Web Awesome couleur surface default",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--card-background-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-surface-raised",
    label: "Web Awesome couleur surface raised",
    description: "Variable de thème Home Assistant.",
    group: "surfaces",
    kind: "color",
    defaultValue: "var(--ha-dialog-surface-background, var(--mdc-theme-surface, #fff))",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-text-normal",
    label: "Web Awesome couleur texte normal",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-text-quiet",
    label: "Web Awesome couleur texte discret",
    description: "Variable de thème Home Assistant.",
    group: "text",
    kind: "color",
    defaultValue: "var(--ha-color-text-secondary)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-border-loud",
    label: "Web Awesome couleur avertissement bordure fort",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-warning-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-border-normal",
    label: "Web Awesome couleur avertissement bordure normal",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-warning-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-border-quiet",
    label: "Web Awesome couleur avertissement bordure discret",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-warning-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-fill-loud",
    label: "Web Awesome couleur avertissement remplissage fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-warning-loud-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-fill-normal",
    label: "Web Awesome couleur avertissement remplissage normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-warning-normal-resting)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-fill-quiet",
    label: "Web Awesome couleur avertissement remplissage discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-fill-warning-quiet-hover)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-on-loud",
    label: "Web Awesome couleur avertissement on fort",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-warning-loud)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-on-normal",
    label: "Web Awesome couleur avertissement on normal",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-warning-normal)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-color-warning-on-quiet",
    label: "Web Awesome couleur avertissement on discret",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-on-warning-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-focus-ring",
    label: "Web Awesome focus ring",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "text",
    defaultValue: "var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-focus-ring-color)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-focus-ring-color",
    label: "Web Awesome focus ring couleur",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "var(--ha-color-focus)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-focus-ring-offset",
    label: "Web Awesome focus ring offset",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "2px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-focus-ring-style",
    label: "Web Awesome focus ring style",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "text",
    defaultValue: "solid",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-focus-ring-width",
    label: "Web Awesome focus ring largeur",
    description: "Variable de thème Home Assistant.",
    group: "advanced",
    kind: "range",
    defaultValue: "2px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-font-size-l",
    label: "Web Awesome police taille l",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-size-l)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-font-size-m",
    label: "Web Awesome police taille m",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-size-m)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-font-size-s",
    label: "Web Awesome police taille s",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-font-size-s)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-font-weight-action",
    label: "Web Awesome police graisse action",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--ha-font-weight-medium)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-font-weight-body",
    label: "Web Awesome police graisse body",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--ha-font-weight-normal)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-background-color",
    label: "Web Awesome form control arrière-plan couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--wa-color-surface-raised)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-border-color",
    label: "Web Awesome form control bordure couleur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "color",
    defaultValue: "var(--ha-color-border-neutral-quiet)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-border-radius",
    label: "Web Awesome form control bordure rayon",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--wa-border-radius-l)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-border-style",
    label: "Web Awesome form control bordure style",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "select",
    defaultValue: "var(--wa-border-style)",
    options: [
      "none",
      "solid",
      "dashed",
      "dotted",
      "double"
    ],
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-border-width",
    label: "Web Awesome form control bordure largeur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--wa-border-width-s)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-height",
    label: "Web Awesome form control hauteur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "range",
    defaultValue: "40px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-padding-block",
    label: "Web Awesome form control padding block",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "range",
    defaultValue: "0.75em",
    unit: "em",
    min: 0,
    max: 8,
    step: 0.05,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-padding-inline",
    label: "Web Awesome form control padding inline",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "text",
    defaultValue: "var(--ha-space-3)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-placeholder-color",
    label: "Web Awesome form control placeholder couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--ha-color-text-secondary)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-value-color",
    label: "Web Awesome form control value couleur",
    description: "Variable de thème Home Assistant.",
    group: "forms",
    kind: "color",
    defaultValue: "var(--primary-text-color)",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-value-font-weight",
    label: "Web Awesome form control value police graisse",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "range",
    defaultValue: "var(--wa-font-weight-body)",
    unit: "",
    min: 100,
    max: 900,
    step: 50,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-form-control-value-line-height",
    label: "Web Awesome form control value line hauteur",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--wa-line-height-condensed)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-line-height-condensed",
    label: "Web Awesome line hauteur condensed",
    description: "Variable de thème Home Assistant.",
    group: "typography",
    kind: "text",
    defaultValue: "var(--ha-line-height-condensed)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-panel-border-radius",
    label: "Web Awesome panel bordure rayon",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "text",
    defaultValue: "var(--ha-border-radius-3xl)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-panel-border-style",
    label: "Web Awesome panel bordure style",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "select",
    defaultValue: "solid",
    options: [
      "none",
      "solid",
      "dashed",
      "dotted",
      "double"
    ],
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-panel-border-width",
    label: "Web Awesome panel bordure largeur",
    description: "Variable de thème Home Assistant.",
    group: "shape",
    kind: "range",
    defaultValue: "1px",
    unit: "px",
    min: 0,
    max: 96,
    step: 1,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-shadow-l",
    label: "Web Awesome ombre l",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "var(--ha-box-shadow-l)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-shadow-m",
    label: "Web Awesome ombre m",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "var(--ha-box-shadow-m)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-shadow-s",
    label: "Web Awesome ombre s",
    description: "Variable de thème Home Assistant.",
    group: "glass_cards",
    kind: "text",
    defaultValue: "var(--ha-box-shadow-s)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-space-l",
    label: "Web Awesome space l",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "text",
    defaultValue: "var(--ha-space-6)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-space-m",
    label: "Web Awesome space m",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "text",
    defaultValue: "var(--ha-space-4)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-space-xl",
    label: "Web Awesome space xl",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "text",
    defaultValue: "var(--ha-space-8)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-space-xs",
    label: "Web Awesome space xs",
    description: "Variable de thème Home Assistant.",
    group: "spacing",
    kind: "text",
    defaultValue: "var(--ha-space-2)",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-transition-easing",
    label: "Web Awesome transition easing",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "ease",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-transition-fast",
    label: "Web Awesome transition fast",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "var(--ha-animation-duration-instant)",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "wa-transition-normal",
    label: "Web Awesome transition normal",
    description: "Variable de thème Home Assistant.",
    group: "motion",
    kind: "range",
    defaultValue: "var(--ha-animation-duration-fast)",
    unit: "ms",
    min: 0,
    max: 2e3,
    step: 10,
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "warning-color",
    label: "Avertissement",
    description: "Variable de thème Home Assistant.",
    group: "core",
    kind: "color",
    defaultValue: "#ffa600",
    format: "css-color",
    featured: !0,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "white-color",
    label: "White couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffffff",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  },
  {
    id: "yellow-color",
    label: "Yellow couleur",
    description: "Variable de thème Home Assistant.",
    group: "palette",
    kind: "color",
    defaultValue: "#ffeb3b",
    format: "css-color",
    featured: !1,
    legacy: !1,
    source: "home-assistant"
  }
], Ht = [
  { id: "all", label: "Essentiels", description: "Les réglages qui définissent le caractère du thème.", icon: "sparkles" },
  { id: "core", label: "Couleurs clés", description: "Accent, états et couleurs sémantiques principales.", icon: "palette" },
  { id: "surfaces", label: "Surfaces", description: "Arrière-plans, panneaux et séparateurs.", icon: "layers" },
  { id: "glass_cards", label: "Cartes & verre", description: "Transparence, blur, bordures et ombres des cartes.", icon: "glass" },
  { id: "text", label: "Texte", description: "Hiérarchie, contraste et liens.", icon: "type" },
  { id: "navigation", label: "Navigation", description: "Barre latérale et en-tête de Home Assistant.", icon: "sidebar" },
  { id: "states", label: "États", description: "Couleurs globales, domaines et états d’entités.", icon: "activity" },
  { id: "typography", label: "Typographie", description: "Familles, tailles, graisses et interlignage.", icon: "type" },
  { id: "shape", label: "Formes", description: "Rayons, contours et épaisseurs.", icon: "shapes" },
  { id: "spacing", label: "Espacements", description: "Échelle d’espace, tailles et zones sûres.", icon: "move" },
  { id: "forms", label: "Formulaires", description: "Champs, listes et contrôles.", icon: "form" },
  { id: "components", label: "Composants", description: "Badges, boutons, puces et sliders.", icon: "component" },
  { id: "data", label: "Graphiques", description: "Historique, énergie et palettes de données.", icon: "chart" },
  { id: "palette", label: "Palette étendue", description: "Couleurs nommées et valeurs RGB dérivées.", icon: "swatches" },
  { id: "system", label: "Pages système", description: "Tables, dialogues, éditeur et calendrier.", icon: "settings" },
  { id: "motion", label: "Mouvement", description: "Durées et courbes d’animation.", icon: "motion" },
  { id: "advanced", label: "Système avancé", description: "Tokens internes et réglages experts.", icon: "code" }
], mr = {
  latte: {
    rosewater: "#dc8a78",
    pink: "#ea76cb",
    mauve: "#8839ef",
    red: "#d20f39",
    peach: "#fe640b",
    yellow: "#df8e1d",
    green: "#40a02b",
    teal: "#179299",
    sky: "#04a5e5",
    blue: "#1e66f5",
    lavender: "#7287fd",
    text: "#4c4f69",
    subtext1: "#5c5f77",
    subtext0: "#6c6f85",
    overlay1: "#8c8fa1",
    overlay0: "#9ca0b0",
    surface2: "#acb0be",
    surface1: "#bcc0cc",
    surface0: "#ccd0da",
    base: "#eff1f5",
    mantle: "#e6e9ef",
    crust: "#dce0e8"
  },
  frappe: {
    rosewater: "#f2d5cf",
    pink: "#f4b8e4",
    mauve: "#ca9ee6",
    red: "#e78284",
    peach: "#ef9f76",
    yellow: "#e5c890",
    green: "#a6d189",
    teal: "#81c8be",
    sky: "#99d1db",
    blue: "#8caaee",
    lavender: "#babbf1",
    text: "#c6d0f5",
    subtext1: "#b5bfe2",
    subtext0: "#a5adce",
    overlay1: "#838ba7",
    overlay0: "#737994",
    surface2: "#626880",
    surface1: "#51576d",
    surface0: "#414559",
    base: "#303446",
    mantle: "#292c3c",
    crust: "#232634"
  },
  macchiato: {
    rosewater: "#f4dbd6",
    pink: "#f5bde6",
    mauve: "#c6a0f6",
    red: "#ed8796",
    peach: "#f5a97f",
    yellow: "#eed49f",
    green: "#a6da95",
    teal: "#8bd5ca",
    sky: "#91d7e3",
    blue: "#8aadf4",
    lavender: "#b7bdf8",
    text: "#cad3f5",
    subtext1: "#b8c0e0",
    subtext0: "#a5adcb",
    overlay1: "#8087a2",
    overlay0: "#6e738d",
    surface2: "#5b6078",
    surface1: "#494d64",
    surface0: "#363a4f",
    base: "#24273a",
    mantle: "#1e2030",
    crust: "#181926"
  },
  mocha: {
    rosewater: "#f5e0dc",
    pink: "#f5c2e7",
    mauve: "#cba6f7",
    red: "#f38ba8",
    peach: "#fab387",
    yellow: "#f9e2af",
    green: "#a6e3a1",
    teal: "#94e2d5",
    sky: "#89dceb",
    blue: "#89b4fa",
    lavender: "#b4befe",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    subtext0: "#a6adc8",
    overlay1: "#7f849c",
    overlay0: "#6c7086",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b"
  }
};
function G(s) {
  const e = s.slice(1);
  return [0, 2, 4].map((t) => Number.parseInt(e.slice(t, t + 2), 16)).join(", ");
}
function Ye(s, e, t) {
  const a = mr[s];
  return {
    id: `catppuccin-${s}`,
    name: e,
    description: t,
    swatches: [a.mauve, a.blue, a.base, a.text],
    theme: {
      values: {
        "primary-color": a.mauve,
        "accent-color": a.blue,
        "dark-primary-color": a.mauve,
        "light-primary-color": a.lavender,
        "primary-text-color": a.text,
        "secondary-text-color": a.subtext1,
        "disabled-text-color": a.overlay0,
        "text-primary-color": a.base,
        "primary-background-color": a.base,
        "secondary-background-color": a.mantle,
        "card-background-color": a.surface0,
        "ha-card-background": a.surface0,
        "ha-card-border-color": a.surface1,
        "ha-card-border-radius": "16px",
        "ha-card-border-width": "1px",
        "ha-card-box-shadow": "none",
        "divider-color": a.surface1,
        "outline-color": a.surface2,
        "outline-hover-color": a.mauve,
        "sidebar-background-color": a.mantle,
        "sidebar-text-color": a.text,
        "sidebar-icon-color": a.subtext0,
        "sidebar-selected-text-color": a.mauve,
        "sidebar-selected-icon-color": a.mauve,
        "sidebar-menu-button-background-color": a.surface0,
        "sidebar-menu-button-text-color": a.text,
        "app-header-background-color": a.mantle,
        "app-header-text-color": a.text,
        "state-active-color": a.green,
        "state-inactive-color": a.overlay1,
        "state-unavailable-color": a.overlay0,
        "state-icon-color": a.subtext0,
        "state-icon-active-color": a.green,
        "state-icon-unavailable-color": a.overlay0,
        "state-icon-error-color": a.red,
        "error-color": a.red,
        "error-state-color": a.red,
        "warning-color": a.yellow,
        "success-color": a.green,
        "info-color": a.blue,
        "red-color": a.red,
        "pink-color": a.pink,
        "purple-color": a.mauve,
        "blue-color": a.blue,
        "cyan-color": a.sky,
        "teal-color": a.teal,
        "green-color": a.green,
        "yellow-color": a.yellow,
        "orange-color": a.peach,
        "ha-color-text-primary": a.text,
        "ha-color-text-secondary": a.subtext1,
        "ha-color-text-disabled": a.overlay0,
        "ha-color-text-link": a.blue,
        "ha-color-text-primary-inverted": a.base,
        "ha-color-text-secondary-inverted": a.mantle,
        "ha-color-surface-default": a.base,
        "ha-color-surface-low": a.mantle,
        "ha-color-surface-lower": a.crust,
        "ha-color-surface-default-inverted": a.text,
        "scrollbar-thumb-color": a.overlay0,
        "rgb-primary-color": G(a.mauve),
        "rgb-accent-color": G(a.blue),
        "rgb-primary-text-color": G(a.text),
        "rgb-secondary-text-color": G(a.subtext1),
        "rgb-text-primary-color": G(a.base),
        "rgb-card-background-color": G(a.surface0),
        "rgb-error-color": G(a.red),
        "rgb-warning-color": G(a.yellow),
        "rgb-success-color": G(a.green),
        "rgb-info-color": G(a.blue)
      },
      modes: { light: {}, dark: {} }
    }
  };
}
const pr = [
  Ye(
    "latte",
    "Catppuccin Latte",
    "La déclinaison claire Catppuccin, douce et lumineuse."
  ),
  Ye(
    "frappe",
    "Catppuccin Frappé",
    "Un thème sombre adouci aux contrastes feutrés."
  ),
  Ye(
    "macchiato",
    "Catppuccin Macchiato",
    "Un thème sombre équilibré au contraste intermédiaire."
  ),
  Ye(
    "mocha",
    "Catppuccin Mocha",
    "La déclinaison Catppuccin la plus sombre et contrastée."
  )
], ct = [
  {
    id: "ha-clean",
    name: "HA essentiel",
    description: "Une base claire, proche du thème Home Assistant moderne.",
    swatches: ["#03a9f4", "#ffffff", "#f4f6f8", "#202124"],
    theme: {
      values: {
        "primary-color": "#03a9f4",
        "accent-color": "#ff9800",
        "primary-text-color": "#202124",
        "secondary-text-color": "#5f6368",
        "primary-background-color": "#f4f6f8",
        "secondary-background-color": "#eef1f4",
        "card-background-color": "#ffffff",
        "ha-card-background": "#ffffff",
        "ha-card-border-radius": "16px",
        "ha-card-border-color": "rgba(0, 0, 0, 0.10)",
        "ha-card-border-width": "1px",
        "sidebar-background-color": "#ffffff",
        "app-header-background-color": "#ffffff"
      },
      modes: { light: {}, dark: {} }
    }
  },
  {
    id: "aurora-glass",
    name: "Verre boréal",
    description: "Surfaces translucides, blur natif et accents cyan-violet.",
    swatches: ["#6ee7f9", "#8b7cff", "#10172a", "#ffffff"],
    theme: {
      values: {
        "primary-color": "#7c6df2",
        "accent-color": "#55d8ee",
        "primary-text-color": "#f7f8ff",
        "secondary-text-color": "rgba(238, 242, 255, 0.72)",
        "disabled-text-color": "rgba(238, 242, 255, 0.42)",
        "primary-background-color": "#11172a",
        "secondary-background-color": "#171f36",
        "card-background-color": "rgba(23, 31, 54, 0.64)",
        "ha-card-background": "rgba(23, 31, 54, 0.64)",
        "ha-card-backdrop-filter": "blur(18px) saturate(135%)",
        "ha-card-border-radius": "22px",
        "ha-card-border-color": "rgba(255, 255, 255, 0.14)",
        "ha-card-border-width": "1px",
        "ha-card-box-shadow": "0 18px 55px rgba(4, 8, 20, 0.28)",
        "divider-color": "rgba(255, 255, 255, 0.11)",
        "sidebar-background-color": "rgba(13, 19, 35, 0.78)",
        "sidebar-text-color": "#eef2ff",
        "sidebar-icon-color": "rgba(238, 242, 255, 0.68)",
        "sidebar-selected-text-color": "#ffffff",
        "sidebar-selected-icon-color": "#6ee7f9",
        "app-header-background-color": "rgba(13, 19, 35, 0.72)",
        "app-header-text-color": "#ffffff",
        "state-active-color": "#6ee7f9",
        "state-inactive-color": "#75809b"
      },
      modes: { light: {}, dark: {} }
    }
  },
  {
    id: "oled-night",
    name: "OLED minuit",
    description: "Noir profond, contrastes nets et consommation réduite.",
    swatches: ["#00d4ff", "#000000", "#111318", "#f7fbff"],
    theme: {
      values: {
        "primary-color": "#00bfe8",
        "accent-color": "#8be9fd",
        "primary-text-color": "#f7fbff",
        "secondary-text-color": "#aeb7c3",
        "primary-background-color": "#000000",
        "secondary-background-color": "#090a0d",
        "card-background-color": "#111318",
        "ha-card-background": "#111318",
        "ha-card-border-radius": "12px",
        "ha-card-border-color": "#252a33",
        "divider-color": "#252a33",
        "sidebar-background-color": "#07080a",
        "app-header-background-color": "#07080a",
        "state-active-color": "#00d4ff"
      },
      modes: { light: {}, dark: {} }
    }
  },
  {
    id: "warm-minimal",
    name: "Sable doux",
    description: "Palette chaude et organique pour des interfaces calmes.",
    swatches: ["#c86b46", "#f5efe5", "#fffaf2", "#342e29"],
    theme: {
      values: {
        "primary-color": "#b85f3d",
        "accent-color": "#d58a52",
        "primary-text-color": "#342e29",
        "secondary-text-color": "#766b61",
        "primary-background-color": "#f5efe5",
        "secondary-background-color": "#eee5d8",
        "card-background-color": "#fffaf2",
        "ha-card-background": "rgba(255, 250, 242, 0.88)",
        "ha-card-backdrop-filter": "blur(10px) saturate(112%)",
        "ha-card-border-radius": "20px",
        "ha-card-border-color": "rgba(93, 70, 50, 0.14)",
        "ha-card-box-shadow": "0 12px 34px rgba(93, 70, 50, 0.10)",
        "divider-color": "rgba(93, 70, 50, 0.14)",
        "sidebar-background-color": "#fffaf2",
        "app-header-background-color": "rgba(255, 250, 242, 0.90)",
        "state-active-color": "#c86b46"
      },
      modes: { light: {}, dark: {} }
    }
  },
  ...pr
], hr = Rt`
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
`, Ft = /* @__PURE__ */ Symbol.for("yaml.alias"), Ot = /* @__PURE__ */ Symbol.for("yaml.document"), te = /* @__PURE__ */ Symbol.for("yaml.map"), Ga = /* @__PURE__ */ Symbol.for("yaml.pair"), F = /* @__PURE__ */ Symbol.for("yaml.scalar"), $e = /* @__PURE__ */ Symbol.for("yaml.seq"), U = /* @__PURE__ */ Symbol.for("yaml.node.type"), Se = (s) => !!s && typeof s == "object" && s[U] === Ft, We = (s) => !!s && typeof s == "object" && s[U] === Ot, Ke = (s) => !!s && typeof s == "object" && s[U] === te, T = (s) => !!s && typeof s == "object" && s[U] === Ga, N = (s) => !!s && typeof s == "object" && s[U] === F, Ge = (s) => !!s && typeof s == "object" && s[U] === $e;
function M(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case te:
      case $e:
        return !0;
    }
  return !1;
}
function O(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case Ft:
      case te:
      case F:
      case $e:
        return !0;
    }
  return !1;
}
const Fa = (s) => (N(s) || M(s)) && !!s.anchor, se = /* @__PURE__ */ Symbol("break visit"), gr = /* @__PURE__ */ Symbol("skip children"), Ie = /* @__PURE__ */ Symbol("remove node");
function _e(s, e) {
  const t = br(e);
  We(s) ? be(null, s.contents, t, Object.freeze([s])) === Ie && (s.contents = null) : be(null, s, t, Object.freeze([]));
}
_e.BREAK = se;
_e.SKIP = gr;
_e.REMOVE = Ie;
function be(s, e, t, a) {
  const r = yr(s, e, t, a);
  if (O(r) || T(r))
    return vr(s, a, r), be(s, r, t, a);
  if (typeof r != "symbol") {
    if (M(e)) {
      a = Object.freeze(a.concat(e));
      for (let o = 0; o < e.items.length; ++o) {
        const l = be(o, e.items[o], t, a);
        if (typeof l == "number")
          o = l - 1;
        else {
          if (l === se)
            return se;
          l === Ie && (e.items.splice(o, 1), o -= 1);
        }
      }
    } else if (T(e)) {
      a = Object.freeze(a.concat(e));
      const o = be("key", e.key, t, a);
      if (o === se)
        return se;
      o === Ie && (e.key = null);
      const l = be("value", e.value, t, a);
      if (l === se)
        return se;
      l === Ie && (e.value = null);
    }
  }
  return r;
}
function br(s) {
  return typeof s == "object" && (s.Collection || s.Node || s.Value) ? Object.assign({
    Alias: s.Node,
    Map: s.Node,
    Scalar: s.Node,
    Seq: s.Node
  }, s.Value && {
    Map: s.Value,
    Scalar: s.Value,
    Seq: s.Value
  }, s.Collection && {
    Map: s.Collection,
    Seq: s.Collection
  }, s) : s;
}
function yr(s, e, t, a) {
  if (typeof t == "function")
    return t(s, e, a);
  if (Ke(e))
    return t.Map?.(s, e, a);
  if (Ge(e))
    return t.Seq?.(s, e, a);
  if (T(e))
    return t.Pair?.(s, e, a);
  if (N(e))
    return t.Scalar?.(s, e, a);
  if (Se(e))
    return t.Alias?.(s, e, a);
}
function vr(s, e, t) {
  const a = e[e.length - 1];
  if (M(a))
    a.items[s] = t;
  else if (T(a))
    s === "key" ? a.key = t : a.value = t;
  else if (We(a))
    a.contents = t;
  else {
    const r = Se(a) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${r} parent`);
  }
}
const kr = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Vr = (s) => s.replace(/[!,[\]{}]/g, (e) => kr[e]);
class B {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, B.defaultYaml, e), this.tags = Object.assign({}, B.defaultTags, t);
  }
  clone() {
    const e = new B(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new B(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: B.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, B.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: B.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, B.defaultTags), this.atNextDocument = !1);
    const a = e.trim().split(/[ \t]+/), r = a.shift();
    switch (r) {
      case "%TAG": {
        if (a.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), a.length < 2))
          return !1;
        const [o, l] = a;
        return this.tags[o] = l, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, a.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [o] = a;
        if (o === "1.1" || o === "1.2")
          return this.yaml.version = o, !0;
        {
          const l = /^\d+\.\d+$/.test(o);
          return t(6, `Unsupported YAML version ${o}`, l), !1;
        }
      }
      default:
        return t(0, `Unknown directive ${r}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(e, t) {
    if (e === "!")
      return "!";
    if (e[0] !== "!")
      return t(`Not a valid tag: ${e}`), null;
    if (e[1] === "<") {
      const l = e.slice(2, -1);
      return l === "!" || l === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), l);
    }
    const [, a, r] = e.match(/^(.*!)([^!]*)$/s);
    r || t(`The ${e} tag has no suffix`);
    const o = this.tags[a];
    if (o)
      try {
        return o + decodeURIComponent(r);
      } catch (l) {
        return t(String(l)), null;
      }
    return a === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(e) {
    for (const [t, a] of Object.entries(this.tags))
      if (e.startsWith(a))
        return t + Vr(e.substring(a.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], a = Object.entries(this.tags);
    let r;
    if (e && a.length > 0 && O(e.contents)) {
      const o = {};
      _e(e.contents, (l, i) => {
        O(i) && i.tag && (o[i.tag] = !0);
      }), r = Object.keys(o);
    } else
      r = [];
    for (const [o, l] of a)
      o === "!!" && l === "tag:yaml.org,2002:" || (!e || r.some((i) => i.startsWith(l))) && t.push(`%TAG ${o} ${l}`);
    return t.join(`
`);
  }
}
B.defaultYaml = { explicit: !1, version: "1.2" };
B.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Ja(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function Ya(s) {
  const e = /* @__PURE__ */ new Set();
  return _e(s, {
    Value(t, a) {
      a.anchor && e.add(a.anchor);
    }
  }), e;
}
function Qa(s, e) {
  for (let t = 1; ; ++t) {
    const a = `${s}${t}`;
    if (!e.has(a))
      return a;
  }
}
function Ar(s, e) {
  const t = [], a = /* @__PURE__ */ new Map();
  let r = null;
  return {
    onAnchor: (o) => {
      t.push(o), r ?? (r = Ya(s));
      const l = Qa(e, r);
      return r.add(l), l;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const o of t) {
        const l = a.get(o);
        if (typeof l == "object" && l.anchor && (N(l.node) || M(l.node)))
          l.node.anchor = l.anchor;
        else {
          const i = new Error("Failed to resolve repeated object (this should not happen)");
          throw i.source = o, i;
        }
      }
    },
    sourceObjects: a
  };
}
function ye(s, e, t, a) {
  if (a && typeof a == "object")
    if (Array.isArray(a))
      for (let r = 0, o = a.length; r < o; ++r) {
        const l = a[r], i = ye(s, a, String(r), l);
        i === void 0 ? delete a[r] : i !== l && (a[r] = i);
      }
    else if (a instanceof Map)
      for (const r of Array.from(a.keys())) {
        const o = a.get(r), l = ye(s, a, r, o);
        l === void 0 ? a.delete(r) : l !== o && a.set(r, l);
      }
    else if (a instanceof Set)
      for (const r of Array.from(a)) {
        const o = ye(s, a, r, r);
        o === void 0 ? a.delete(r) : o !== r && (a.delete(r), a.add(o));
      }
    else
      for (const [r, o] of Object.entries(a)) {
        const l = ye(s, a, r, o);
        l === void 0 ? delete a[r] : l !== o && (a[r] = l);
      }
  return s.call(e, t, a);
}
function R(s, e, t) {
  if (Array.isArray(s))
    return s.map((a, r) => R(a, String(r), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !Fa(s))
      return s.toJSON(e, t);
    const a = { aliasCount: 0, count: 1, res: void 0 };
    t.anchors.set(s, a), t.onCreate = (o) => {
      a.res = o, delete t.onCreate;
    };
    const r = s.toJSON(e, t);
    return t.onCreate && t.onCreate(r), r;
  }
  return typeof s == "bigint" && !t?.keep ? Number(s) : s;
}
class Jt {
  constructor(e) {
    Object.defineProperty(this, U, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: a, onAnchor: r, reviver: o } = {}) {
    if (!We(e))
      throw new TypeError("A document argument is required");
    const l = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof a == "number" ? a : 100
    }, i = R(this, "", l);
    if (typeof r == "function")
      for (const { count: n, res: c } of l.anchors.values())
        r(c, n);
    return typeof o == "function" ? ye(o, { "": i }, "", i) : i;
  }
}
class Yt extends Jt {
  constructor(e) {
    super(Ft), this.source = e, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(e, t) {
    if (t?.maxAliasCount === 0)
      throw new ReferenceError("Alias resolution is disabled");
    let a;
    t?.aliasResolveCache ? a = t.aliasResolveCache : (a = [], _e(e, {
      Node: (o, l) => {
        (Se(l) || Fa(l)) && a.push(l);
      }
    }), t && (t.aliasResolveCache = a));
    let r;
    for (const o of a) {
      if (o === this)
        break;
      o.anchor === this.source && (r = o);
    }
    return r;
  }
  toJSON(e, t) {
    if (!t)
      return { source: this.source };
    const { anchors: a, doc: r, maxAliasCount: o } = t, l = this.resolve(r, t);
    if (!l) {
      const n = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(n);
    }
    let i = a.get(l);
    if (i || (R(l, null, t), i = a.get(l)), i?.res === void 0) {
      const n = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(n);
    }
    if (o >= 0 && (i.count += 1, i.aliasCount === 0 && (i.aliasCount = st(r, l, a)), i.count * i.aliasCount > o)) {
      const n = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(n);
    }
    return i.res;
  }
  toString(e, t, a) {
    const r = `*${this.source}`;
    if (e) {
      if (Ja(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const o = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(o);
      }
      if (e.implicitKey)
        return `${r} `;
    }
    return r;
  }
}
function st(s, e, t) {
  if (Se(e)) {
    const a = e.resolve(s), r = t && a && t.get(a);
    return r ? r.count * r.aliasCount : 0;
  } else if (M(e)) {
    let a = 0;
    for (const r of e.items) {
      const o = st(s, r, t);
      o > a && (a = o);
    }
    return a;
  } else if (T(e)) {
    const a = st(s, e.key, t), r = st(s, e.value, t);
    return Math.max(a, r);
  }
  return 1;
}
const Xa = (s) => !s || typeof s != "function" && typeof s != "object";
class w extends Jt {
  constructor(e) {
    super(F), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : R(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
w.BLOCK_FOLDED = "BLOCK_FOLDED";
w.BLOCK_LITERAL = "BLOCK_LITERAL";
w.PLAIN = "PLAIN";
w.QUOTE_DOUBLE = "QUOTE_DOUBLE";
w.QUOTE_SINGLE = "QUOTE_SINGLE";
const xr = "tag:yaml.org,2002:";
function wr(s, e, t) {
  if (e) {
    const a = t.filter((o) => o.tag === e), r = a.find((o) => !o.format) ?? a[0];
    if (!r)
      throw new Error(`Tag ${e} not found`);
    return r;
  }
  return t.find((a) => a.identify?.(s) && !a.format);
}
function De(s, e, t) {
  if (We(s) && (s = s.contents), O(s))
    return s;
  if (T(s)) {
    const d = t.schema[te].createNode?.(t.schema, null, t);
    return d.items.push(s), d;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: a, onAnchor: r, onTagObj: o, schema: l, sourceObjects: i } = t;
  let n;
  if (a && s && typeof s == "object") {
    if (n = i.get(s), n)
      return n.anchor ?? (n.anchor = r(s)), new Yt(n.anchor);
    n = { anchor: null, node: null }, i.set(s, n);
  }
  e?.startsWith("!!") && (e = xr + e.slice(2));
  let c = wr(s, e, l.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const d = new w(s);
      return n && (n.node = d), d;
    }
    c = s instanceof Map ? l[te] : Symbol.iterator in Object(s) ? l[$e] : l[te];
  }
  o && (o(c), delete t.onTagObj);
  const m = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new w(s);
  return e ? m.tag = e : c.default || (m.tag = c.tag), n && (n.node = m), m;
}
function dt(s, e, t) {
  let a = t;
  for (let r = e.length - 1; r >= 0; --r) {
    const o = e[r];
    if (typeof o == "number" && Number.isInteger(o) && o >= 0) {
      const l = [];
      l[o] = a, a = l;
    } else
      a = /* @__PURE__ */ new Map([[o, a]]);
  }
  return De(a, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Oe = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class Za extends Jt {
  constructor(e, t) {
    super(e), Object.defineProperty(this, "schema", {
      value: t,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(e) {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return e && (t.schema = e), t.items = t.items.map((a) => O(a) || T(a) ? a.clone(e) : a), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Oe(e))
      this.add(t);
    else {
      const [a, ...r] = e, o = this.get(a, !0);
      if (M(o))
        o.addIn(r, t);
      else if (o === void 0 && this.schema)
        this.set(a, dt(this.schema, r, t));
      else
        throw new Error(`Expected YAML collection at ${a}. Remaining path: ${r}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    const [t, ...a] = e;
    if (a.length === 0)
      return this.delete(t);
    const r = this.get(t, !0);
    if (M(r))
      return r.deleteIn(a);
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${a}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    const [a, ...r] = e, o = this.get(a, !0);
    return r.length === 0 ? !t && N(o) ? o.value : o : M(o) ? o.getIn(r, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!T(t))
        return !1;
      const a = t.value;
      return a == null || e && N(a) && a.value == null && !a.commentBefore && !a.comment && !a.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(e) {
    const [t, ...a] = e;
    if (a.length === 0)
      return this.has(t);
    const r = this.get(t, !0);
    return M(r) ? r.hasIn(a) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    const [a, ...r] = e;
    if (r.length === 0)
      this.set(a, t);
    else {
      const o = this.get(a, !0);
      if (M(o))
        o.setIn(r, t);
      else if (o === void 0 && this.schema)
        this.set(a, dt(this.schema, r, t));
      else
        throw new Error(`Expected YAML collection at ${a}. Remaining path: ${r}`);
    }
  }
}
const Hr = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function Y(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const le = (s, e, t) => s.endsWith(`
`) ? Y(t, e) : t.includes(`
`) ? `
` + Y(t, e) : (s.endsWith(" ") ? "" : " ") + t, es = "flow", Tt = "block", rt = "quoted";
function gt(s, e, t = "flow", { indentAtStart: a, lineWidth: r = 80, minContentWidth: o = 20, onFold: l, onOverflow: i } = {}) {
  if (!r || r < 0)
    return s;
  r < o && (o = 0);
  const n = Math.max(1 + o, 1 + r - e.length);
  if (s.length <= n)
    return s;
  const c = [], m = {};
  let d = r - e.length;
  typeof a == "number" && (a > r - Math.max(2, o) ? c.push(0) : d = r - a);
  let u, p, g = !1, f = -1, h = -1, y = -1;
  t === Tt && (f = Ha(s, f, e.length), f !== -1 && (d = f + n));
  for (let k; k = s[f += 1]; ) {
    if (t === rt && k === "\\") {
      switch (h = f, s[f + 1]) {
        case "x":
          f += 3;
          break;
        case "u":
          f += 5;
          break;
        case "U":
          f += 9;
          break;
        default:
          f += 1;
      }
      y = f;
    }
    if (k === `
`)
      t === Tt && (f = Ha(s, f, e.length)), d = f + e.length + n, u = void 0;
    else {
      if (k === " " && p && p !== " " && p !== `
` && p !== "	") {
        const A = s[f + 1];
        A && A !== " " && A !== `
` && A !== "	" && (u = f);
      }
      if (f >= d)
        if (u)
          c.push(u), d = u + n, u = void 0;
        else if (t === rt) {
          for (; p === " " || p === "	"; )
            p = k, k = s[f += 1], g = !0;
          const A = f > y + 1 ? f - 2 : h - 1;
          if (m[A])
            return s;
          c.push(A), m[A] = !0, d = A + n, u = void 0;
        } else
          g = !0;
    }
    p = k;
  }
  if (g && i && i(), c.length === 0)
    return s;
  l && l();
  let v = s.slice(0, c[0]);
  for (let k = 0; k < c.length; ++k) {
    const A = c[k], x = c[k + 1] || s.length;
    A === 0 ? v = `
${e}${s.slice(0, x)}` : (t === rt && m[A] && (v += `${s[A]}\\`), v += `
${e}${s.slice(A + 1, x)}`);
  }
  return v;
}
function Ha(s, e, t) {
  let a = e, r = e + 1, o = s[r];
  for (; o === " " || o === "	"; )
    if (e < r + t)
      o = s[++e];
    else {
      do
        o = s[++e];
      while (o && o !== `
`);
      a = e, r = e + 1, o = s[r];
    }
  return a;
}
const bt = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), yt = (s) => /^(%|---|\.\.\.)/m.test(s);
function $r(s, e, t) {
  if (!e || e < 0)
    return !1;
  const a = e - t, r = s.length;
  if (r <= a)
    return !1;
  for (let o = 0, l = 0; o < r; ++o)
    if (s[o] === `
`) {
      if (o - l > a)
        return !0;
      if (l = o + 1, r - l <= a)
        return !1;
    }
  return !0;
}
function Pe(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: a } = e, r = e.options.doubleQuotedMinMultiLineLength, o = e.indent || (yt(s) ? "  " : "");
  let l = "", i = 0;
  for (let n = 0, c = t[n]; c; c = t[++n])
    if (c === " " && t[n + 1] === "\\" && t[n + 2] === "n" && (l += t.slice(i, n) + "\\ ", n += 1, i = n, c = "\\"), c === "\\")
      switch (t[n + 1]) {
        case "u":
          {
            l += t.slice(i, n);
            const m = t.substr(n + 2, 4);
            switch (m) {
              case "0000":
                l += "\\0";
                break;
              case "0007":
                l += "\\a";
                break;
              case "000b":
                l += "\\v";
                break;
              case "001b":
                l += "\\e";
                break;
              case "0085":
                l += "\\N";
                break;
              case "00a0":
                l += "\\_";
                break;
              case "2028":
                l += "\\L";
                break;
              case "2029":
                l += "\\P";
                break;
              default:
                m.substr(0, 2) === "00" ? l += "\\x" + m.substr(2) : l += t.substr(n, 6);
            }
            n += 5, i = n + 1;
          }
          break;
        case "n":
          if (a || t[n + 2] === '"' || t.length < r)
            n += 1;
          else {
            for (l += t.slice(i, n) + `

`; t[n + 2] === "\\" && t[n + 3] === "n" && t[n + 4] !== '"'; )
              l += `
`, n += 2;
            l += o, t[n + 2] === " " && (l += "\\"), n += 1, i = n + 1;
          }
          break;
        default:
          n += 1;
      }
  return l = i ? l + t.slice(i) : t, a ? l : gt(l, o, rt, bt(e, !1));
}
function Lt(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Pe(s, e);
  const t = e.indent || (yt(s) ? "  " : ""), a = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? a : gt(a, t, es, bt(e, !1));
}
function ve(s, e) {
  const { singleQuote: t } = e.options;
  let a;
  if (t === !1)
    a = Pe;
  else {
    const r = s.includes('"'), o = s.includes("'");
    r && !o ? a = Lt : o && !r ? a = Pe : a = t ? Lt : Pe;
  }
  return a(s, e);
}
let It;
try {
  It = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  It = /\n+(?!\n|$)/g;
}
function ot({ comment: s, type: e, value: t }, a, r, o) {
  const { blockQuote: l, commentString: i, lineWidth: n } = a.options;
  if (!l || /\n[\t ]+$/.test(t))
    return ve(t, a);
  const c = a.indent || (a.forceBlockIndent || yt(t) ? "  " : ""), m = l === "literal" ? !0 : l === "folded" || e === w.BLOCK_FOLDED ? !1 : e === w.BLOCK_LITERAL ? !0 : !$r(t, n, c.length);
  if (!t)
    return m ? `|
` : `>
`;
  let d, u;
  for (u = t.length; u > 0; --u) {
    const x = t[u - 1];
    if (x !== `
` && x !== "	" && x !== " ")
      break;
  }
  let p = t.substring(u);
  const g = p.indexOf(`
`);
  g === -1 ? d = "-" : t === p || g !== p.length - 1 ? (d = "+", o && o()) : d = "", p && (t = t.slice(0, -p.length), p[p.length - 1] === `
` && (p = p.slice(0, -1)), p = p.replace(It, `$&${c}`));
  let f = !1, h, y = -1;
  for (h = 0; h < t.length; ++h) {
    const x = t[h];
    if (x === " ")
      f = !0;
    else if (x === `
`)
      y = h;
    else
      break;
  }
  let v = t.substring(0, y < h ? y + 1 : h);
  v && (t = t.substring(v.length), v = v.replace(/\n+/g, `$&${c}`));
  let A = (f ? c ? "2" : "1" : "") + d;
  if (s && (A += " " + i(s.replace(/ ?[\r\n]+/g, " ")), r && r()), !m) {
    const x = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let H = !1;
    const C = bt(a, !0);
    l !== "folded" && e !== w.BLOCK_FOLDED && (C.onOverflow = () => {
      H = !0;
    });
    const b = gt(`${v}${x}${p}`, c, Tt, C);
    if (!H)
      return `>${A}
${c}${b}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${A}
${c}${v}${t}${p}`;
}
function Sr(s, e, t, a) {
  const { type: r, value: o } = s, { actualString: l, implicitKey: i, indent: n, indentStep: c, inFlow: m } = e;
  if (i && o.includes(`
`) || m && /[[\]{},]/.test(o))
    return ve(o, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))
    return i || m || !o.includes(`
`) ? ve(o, e) : ot(s, e, t, a);
  if (!i && !m && r !== w.PLAIN && o.includes(`
`))
    return ot(s, e, t, a);
  if (yt(o)) {
    if (n === "")
      return e.forceBlockIndent = !0, ot(s, e, t, a);
    if (i && n === c)
      return ve(o, e);
  }
  const d = o.replace(/\n+/g, `$&
${n}`);
  if (l) {
    const u = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(d), { compat: p, tags: g } = e.doc.schema;
    if (g.some(u) || p?.some(u))
      return ve(o, e);
  }
  return i ? d : gt(d, n, es, bt(e, !1));
}
function Qt(s, e, t, a) {
  const { implicitKey: r, inFlow: o } = e, l = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: i } = s;
  i !== w.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(l.value) && (i = w.QUOTE_DOUBLE);
  const n = (m) => {
    switch (m) {
      case w.BLOCK_FOLDED:
      case w.BLOCK_LITERAL:
        return r || o ? ve(l.value, e) : ot(l, e, t, a);
      case w.QUOTE_DOUBLE:
        return Pe(l.value, e);
      case w.QUOTE_SINGLE:
        return Lt(l.value, e);
      case w.PLAIN:
        return Sr(l, e, t, a);
      default:
        return null;
    }
  };
  let c = n(i);
  if (c === null) {
    const { defaultKeyType: m, defaultStringType: d } = e.options, u = r && m || d;
    if (c = n(u), c === null)
      throw new Error(`Unsupported default string type ${u}`);
  }
  return c;
}
function ts(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Hr,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trailingComma: !1,
    trueStr: "true",
    verifyAliasOrder: !0
  }, s.schema.toStringOptions, e);
  let a;
  switch (t.collectionStyle) {
    case "block":
      a = !1;
      break;
    case "flow":
      a = !0;
      break;
    default:
      a = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: s,
    flowCollectionPadding: t.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof t.indent == "number" ? " ".repeat(t.indent) : "  ",
    inFlow: a,
    options: t
  };
}
function _r(s, e) {
  if (e.tag) {
    const r = s.filter((o) => o.tag === e.tag);
    if (r.length > 0)
      return r.find((o) => o.format === e.format) ?? r[0];
  }
  let t, a;
  if (N(e)) {
    a = e.value;
    let r = s.filter((o) => o.identify?.(a));
    if (r.length > 1) {
      const o = r.filter((l) => l.test);
      o.length > 0 && (r = o);
    }
    t = r.find((o) => o.format === e.format) ?? r.find((o) => !o.format);
  } else
    a = e, t = s.find((r) => r.nodeClass && a instanceof r.nodeClass);
  if (!t) {
    const r = a?.constructor?.name ?? (a === null ? "null" : typeof a);
    throw new Error(`Tag not resolved for ${r} value`);
  }
  return t;
}
function Cr(s, e, { anchors: t, doc: a }) {
  if (!a.directives)
    return "";
  const r = [], o = (N(s) || M(s)) && s.anchor;
  o && Ja(o) && (t.add(o), r.push(`&${o}`));
  const l = s.tag ?? (e.default ? null : e.tag);
  return l && r.push(a.directives.tagString(l)), r.join(" ");
}
function we(s, e, t, a) {
  if (T(s))
    return s.toString(e, t, a);
  if (Se(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let r;
  const o = O(s) ? s : e.doc.createNode(s, { onTagObj: (n) => r = n });
  r ?? (r = _r(e.doc.schema.tags, o));
  const l = Cr(o, r, e);
  l.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + l.length + 1);
  const i = typeof r.stringify == "function" ? r.stringify(o, e, t, a) : N(o) ? Qt(o, e, t, a) : o.toString(e, t, a);
  return l ? N(o) || i[0] === "{" || i[0] === "[" ? `${l} ${i}` : `${l}
${e.indent}${i}` : i;
}
function Nr({ key: s, value: e }, t, a, r) {
  const { allNullValues: o, doc: l, indent: i, indentStep: n, options: { commentString: c, indentSeq: m, simpleKeys: d } } = t;
  let u = O(s) && s.comment || null;
  if (d) {
    if (u)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (M(s) || !O(s) && typeof s == "object") {
      const C = "With simple keys, collection cannot be used as a key value";
      throw new Error(C);
    }
  }
  let p = !d && (!s || u && e == null && !t.inFlow || M(s) || (N(s) ? s.type === w.BLOCK_FOLDED || s.type === w.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !p && (d || !o),
    indent: i + n
  });
  let g = !1, f = !1, h = we(s, t, () => g = !0, () => f = !0);
  if (!p && !t.inFlow && h.length > 1024) {
    if (d)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    p = !0;
  }
  if (t.inFlow) {
    if (o || e == null)
      return g && a && a(), h === "" ? "?" : p ? `? ${h}` : h;
  } else if (o && !d || e == null && p)
    return h = `? ${h}`, u && !g ? h += le(h, t.indent, c(u)) : f && r && r(), h;
  g && (u = null), p ? (u && (h += le(h, t.indent, c(u))), h = `? ${h}
${i}:`) : (h = `${h}:`, u && (h += le(h, t.indent, c(u))));
  let y, v, k;
  O(e) ? (y = !!e.spaceBefore, v = e.commentBefore, k = e.comment) : (y = !1, v = null, k = null, e && typeof e == "object" && (e = l.createNode(e))), t.implicitKey = !1, !p && !u && N(e) && (t.indentAtStart = h.length + 1), f = !1, !m && n.length >= 2 && !t.inFlow && !p && Ge(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let A = !1;
  const x = we(e, t, () => A = !0, () => f = !0);
  let H = " ";
  if (u || y || v) {
    if (H = y ? `
` : "", v) {
      const C = c(v);
      H += `
${Y(C, t.indent)}`;
    }
    x === "" && !t.inFlow ? H === `
` && k && (H = `

`) : H += `
${t.indent}`;
  } else if (!p && M(e)) {
    const C = x[0], b = x.indexOf(`
`), I = b !== -1, X = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (I || !X) {
      let me = !1;
      if (I && (C === "&" || C === "!")) {
        let P = x.indexOf(" ");
        C === "&" && P !== -1 && P < b && x[P + 1] === "!" && (P = x.indexOf(" ", P + 1)), (P === -1 || b < P) && (me = !0);
      }
      me || (H = `
${t.indent}`);
    }
  } else (x === "" || x[0] === `
`) && (H = "");
  return h += H + x, t.inFlow ? A && a && a() : k && !A ? h += le(h, t.indent, c(k)) : f && r && r(), h;
}
function as(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const Qe = "<<", Q = {
  identify: (s) => s === Qe || typeof s == "symbol" && s.description === Qe,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new w(Symbol(Qe)), {
    addToJSMap: ss
  }),
  stringify: () => Qe
}, Er = (s, e) => (Q.identify(e) || N(e) && (!e.type || e.type === w.PLAIN) && Q.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === Q.tag && t.default);
function ss(s, e, t) {
  const a = rs(s, t);
  if (Ge(a))
    for (const r of a.items)
      $t(s, e, r);
  else if (Array.isArray(a))
    for (const r of a)
      $t(s, e, r);
  else
    $t(s, e, a);
}
function $t(s, e, t) {
  const a = rs(s, t);
  if (!Ke(a))
    throw new Error("Merge sources must be maps or map aliases");
  const r = a.toJSON(null, s, Map);
  for (const [o, l] of r)
    e instanceof Map ? e.has(o) || e.set(o, l) : e instanceof Set ? e.add(o) : Object.prototype.hasOwnProperty.call(e, o) || Object.defineProperty(e, o, {
      value: l,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function rs(s, e) {
  return s && Se(e) ? e.resolve(s.doc, s) : e;
}
function os(s, e, { key: t, value: a }) {
  if (O(t) && t.addToJSMap)
    t.addToJSMap(s, e, a);
  else if (Er(s, t))
    ss(s, e, a);
  else {
    const r = R(t, "", s);
    if (e instanceof Map)
      e.set(r, R(a, r, s));
    else if (e instanceof Set)
      e.add(r);
    else {
      const o = Mr(t, r, s), l = R(a, o, s);
      o in e ? Object.defineProperty(e, o, {
        value: l,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : e[o] = l;
    }
  }
  return e;
}
function Mr(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (O(s) && t?.doc) {
    const a = ts(t.doc, {});
    a.anchors = /* @__PURE__ */ new Set();
    for (const o of t.anchors.keys())
      a.anchors.add(o.anchor);
    a.inFlow = !0, a.inStringifyKey = !0;
    const r = s.toString(a);
    if (!t.mapKeyWarned) {
      let o = JSON.stringify(r);
      o.length > 40 && (o = o.substring(0, 36) + '..."'), as(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return r;
  }
  return JSON.stringify(e);
}
function Xt(s, e, t) {
  const a = De(s, void 0, t), r = De(e, void 0, t);
  return new q(a, r);
}
class q {
  constructor(e, t = null) {
    Object.defineProperty(this, U, { value: Ga }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: a } = this;
    return O(t) && (t = t.clone(e)), O(a) && (a = a.clone(e)), new q(t, a);
  }
  toJSON(e, t) {
    const a = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return os(t, a, this);
  }
  toString(e, t, a) {
    return e?.doc ? Nr(this, e, t, a) : JSON.stringify(this);
  }
}
function ls(s, e, t) {
  return (e.inFlow ?? s.flow ? Tr : Or)(s, e, t);
}
function Or({ comment: s, items: e }, t, { blockItemPrefix: a, flowChars: r, itemIndent: o, onChompKeep: l, onComment: i }) {
  const { indent: n, options: { commentString: c } } = t, m = Object.assign({}, t, { indent: o, type: null });
  let d = !1;
  const u = [];
  for (let g = 0; g < e.length; ++g) {
    const f = e[g];
    let h = null;
    if (O(f))
      !d && f.spaceBefore && u.push(""), ut(t, u, f.commentBefore, d), f.comment && (h = f.comment);
    else if (T(f)) {
      const v = O(f.key) ? f.key : null;
      v && (!d && v.spaceBefore && u.push(""), ut(t, u, v.commentBefore, d));
    }
    d = !1;
    let y = we(f, m, () => h = null, () => d = !0);
    h && (y += le(y, o, c(h))), d && h && (d = !1), u.push(a + y);
  }
  let p;
  if (u.length === 0)
    p = r.start + r.end;
  else {
    p = u[0];
    for (let g = 1; g < u.length; ++g) {
      const f = u[g];
      p += f ? `
${n}${f}` : `
`;
    }
  }
  return s ? (p += `
` + Y(c(s), n), i && i()) : d && l && l(), p;
}
function Tr({ items: s }, e, { flowChars: t, itemIndent: a }) {
  const { indent: r, indentStep: o, flowCollectionPadding: l, options: { commentString: i } } = e;
  a += o;
  const n = Object.assign({}, e, {
    indent: a,
    inFlow: !0,
    type: null
  });
  let c = !1, m = 0;
  const d = [];
  for (let g = 0; g < s.length; ++g) {
    const f = s[g];
    let h = null;
    if (O(f))
      f.spaceBefore && d.push(""), ut(e, d, f.commentBefore, !1), f.comment && (h = f.comment);
    else if (T(f)) {
      const v = O(f.key) ? f.key : null;
      v && (v.spaceBefore && d.push(""), ut(e, d, v.commentBefore, !1), v.comment && (c = !0));
      const k = O(f.value) ? f.value : null;
      k ? (k.comment && (h = k.comment), k.commentBefore && (c = !0)) : f.value == null && v?.comment && (h = v.comment);
    }
    h && (c = !0);
    let y = we(f, n, () => h = null);
    c || (c = d.length > m || y.includes(`
`)), g < s.length - 1 ? y += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = d.reduce((v, k) => v + k.length + 2, 2) + (y.length + 2) > e.options.lineWidth)), c && (y += ",")), h && (y += le(y, a, i(h))), d.push(y), m = d.length;
  }
  const { start: u, end: p } = t;
  if (d.length === 0)
    return u + p;
  if (!c) {
    const g = d.reduce((f, h) => f + h.length + 2, 2);
    c = e.options.lineWidth > 0 && g > e.options.lineWidth;
  }
  if (c) {
    let g = u;
    for (const f of d)
      g += f ? `
${o}${r}${f}` : `
`;
    return `${g}
${r}${p}`;
  } else
    return `${u}${l}${d.join(" ")}${l}${p}`;
}
function ut({ indent: s, options: { commentString: e } }, t, a, r) {
  if (a && r && (a = a.replace(/^\n+/, "")), a) {
    const o = Y(e(a), s);
    t.push(o.trimStart());
  }
}
function ie(s, e) {
  const t = N(e) ? e.value : e;
  for (const a of s)
    if (T(a) && (a.key === e || a.key === t || N(a.key) && a.key.value === t))
      return a;
}
class D extends Za {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(te, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, a) {
    const { keepUndefined: r, replacer: o } = a, l = new this(e), i = (n, c) => {
      if (typeof o == "function")
        c = o.call(t, n, c);
      else if (Array.isArray(o) && !o.includes(n))
        return;
      (c !== void 0 || r) && l.items.push(Xt(n, c, a));
    };
    if (t instanceof Map)
      for (const [n, c] of t)
        i(n, c);
    else if (t && typeof t == "object")
      for (const n of Object.keys(t))
        i(n, t[n]);
    return typeof e.sortMapEntries == "function" && l.items.sort(e.sortMapEntries), l;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    let a;
    T(e) ? a = e : !e || typeof e != "object" || !("key" in e) ? a = new q(e, e?.value) : a = new q(e.key, e.value);
    const r = ie(this.items, a.key), o = this.schema?.sortMapEntries;
    if (r) {
      if (!t)
        throw new Error(`Key ${a.key} already set`);
      N(r.value) && Xa(a.value) ? r.value.value = a.value : r.value = a.value;
    } else if (o) {
      const l = this.items.findIndex((i) => o(a, i) < 0);
      l === -1 ? this.items.push(a) : this.items.splice(l, 0, a);
    } else
      this.items.push(a);
  }
  delete(e) {
    const t = ie(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const r = ie(this.items, e)?.value;
    return (!t && N(r) ? r.value : r) ?? void 0;
  }
  has(e) {
    return !!ie(this.items, e);
  }
  set(e, t) {
    this.add(new q(e, t), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(e, t, a) {
    const r = a ? new a() : t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    t?.onCreate && t.onCreate(r);
    for (const o of this.items)
      os(t, r, o);
    return r;
  }
  toString(e, t, a) {
    if (!e)
      return JSON.stringify(this);
    for (const r of this.items)
      if (!T(r))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(r)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), ls(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: a,
      onComment: t
    });
  }
}
const Ce = {
  collection: "map",
  default: !0,
  nodeClass: D,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return Ke(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => D.from(s, e, t)
};
class fe extends Za {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super($e, e), this.items = [];
  }
  add(e) {
    this.items.push(e);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    const t = Xe(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const a = Xe(e);
    if (typeof a != "number")
      return;
    const r = this.items[a];
    return !t && N(r) ? r.value : r;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Xe(e);
    return typeof t == "number" && t < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(e, t) {
    const a = Xe(e);
    if (typeof a != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const r = this.items[a];
    N(r) && Xa(t) ? r.value = t : this.items[a] = t;
  }
  toJSON(e, t) {
    const a = [];
    t?.onCreate && t.onCreate(a);
    let r = 0;
    for (const o of this.items)
      a.push(R(o, String(r++), t));
    return a;
  }
  toString(e, t, a) {
    return e ? ls(this, e, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (e.indent || "") + "  ",
      onChompKeep: a,
      onComment: t
    }) : JSON.stringify(this);
  }
  static from(e, t, a) {
    const { replacer: r } = a, o = new this(e);
    if (t && Symbol.iterator in Object(t)) {
      let l = 0;
      for (let i of t) {
        if (typeof r == "function") {
          const n = t instanceof Set ? i : String(l++);
          i = r.call(t, n, i);
        }
        o.items.push(De(i, void 0, a));
      }
    }
    return o;
  }
}
function Xe(s) {
  let e = N(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const Ne = {
  collection: "seq",
  default: !0,
  nodeClass: fe,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return Ge(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => fe.from(s, e, t)
}, vt = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, a) {
    return e = Object.assign({ actualString: !0 }, e), Qt(s, e, t, a);
  }
}, kt = {
  identify: (s) => s == null,
  createNode: () => new w(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new w(null),
  stringify: ({ source: s }, e) => typeof s == "string" && kt.test.test(s) ? s : e.options.nullStr
}, Zt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new w(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && Zt.test.test(s)) {
      const a = s[0] === "t" || s[0] === "T";
      if (e === a)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function K({ format: s, minFractionDigits: e, tag: t, value: a }) {
  if (typeof a == "bigint")
    return String(a);
  const r = typeof a == "number" ? a : Number(a);
  if (!isFinite(r))
    return isNaN(r) ? ".nan" : r < 0 ? "-.inf" : ".inf";
  let o = Object.is(a, -0) ? "-0" : JSON.stringify(a);
  if (!s && e && (!t || t === "tag:yaml.org,2002:float") && /^-?\d/.test(o) && !o.includes("e")) {
    let l = o.indexOf(".");
    l < 0 && (l = o.length, o += ".");
    let i = e - (o.length - l - 1);
    for (; i-- > 0; )
      o += "0";
  }
  return o;
}
const is = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, ns = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : K(s);
  }
}, cs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new w(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: K
}, Vt = (s) => typeof s == "bigint" || Number.isInteger(s), ea = (s, e, t, { intAsBigInt: a }) => a ? BigInt(s) : parseInt(s.substring(e), t);
function ds(s, e, t) {
  const { value: a } = s;
  return Vt(a) && a >= 0 ? t + a.toString(e) : K(s);
}
const us = {
  identify: (s) => Vt(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => ea(s, 2, 8, t),
  stringify: (s) => ds(s, 8, "0o")
}, fs = {
  identify: Vt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => ea(s, 0, 10, t),
  stringify: K
}, ms = {
  identify: (s) => Vt(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => ea(s, 2, 16, t),
  stringify: (s) => ds(s, 16, "0x")
}, Lr = [
  Ce,
  Ne,
  vt,
  kt,
  Zt,
  us,
  fs,
  ms,
  is,
  ns,
  cs
];
function $a(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Ze = ({ value: s }) => JSON.stringify(s), Ir = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Ze
  },
  {
    identify: (s) => s == null,
    createNode: () => new w(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Ze
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Ze
  },
  {
    identify: $a,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => $a(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: Ze
  }
], Pr = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, jr = [Ce, Ne].concat(Ir, Pr), ta = {
  identify: (s) => s instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(s, e) {
    if (typeof atob == "function") {
      const t = atob(s.replace(/[\n\r]/g, "")), a = new Uint8Array(t.length);
      for (let r = 0; r < t.length; ++r)
        a[r] = t.charCodeAt(r);
      return a;
    } else
      return e("This environment does not support reading binary tags; either Buffer or atob is required"), s;
  },
  stringify({ comment: s, type: e, value: t }, a, r, o) {
    if (!t)
      return "";
    const l = t;
    let i;
    if (typeof btoa == "function") {
      let n = "";
      for (let c = 0; c < l.length; ++c)
        n += String.fromCharCode(l[c]);
      i = btoa(n);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = w.BLOCK_LITERAL), e !== w.QUOTE_DOUBLE) {
      const n = Math.max(a.options.lineWidth - a.indent.length, a.options.minContentWidth), c = Math.ceil(i.length / n), m = new Array(c);
      for (let d = 0, u = 0; d < c; ++d, u += n)
        m[d] = i.substr(u, n);
      i = m.join(e === w.BLOCK_LITERAL ? `
` : " ");
    }
    return Qt({ comment: s, type: e, value: i }, a, r, o);
  }
};
function ps(s, e) {
  if (Ge(s))
    for (let t = 0; t < s.items.length; ++t) {
      let a = s.items[t];
      if (!T(a)) {
        if (Ke(a)) {
          a.items.length > 1 && e("Each pair must have its own sequence indicator");
          const r = a.items[0] || new q(new w(null));
          if (a.commentBefore && (r.key.commentBefore = r.key.commentBefore ? `${a.commentBefore}
${r.key.commentBefore}` : a.commentBefore), a.comment) {
            const o = r.value ?? r.key;
            o.comment = o.comment ? `${a.comment}
${o.comment}` : a.comment;
          }
          a = r;
        }
        s.items[t] = T(a) ? a : new q(a);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function hs(s, e, t) {
  const { replacer: a } = t, r = new fe(s);
  r.tag = "tag:yaml.org,2002:pairs";
  let o = 0;
  if (e && Symbol.iterator in Object(e))
    for (let l of e) {
      typeof a == "function" && (l = a.call(e, String(o++), l));
      let i, n;
      if (Array.isArray(l))
        if (l.length === 2)
          i = l[0], n = l[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${l}`);
      else if (l && l instanceof Object) {
        const c = Object.keys(l);
        if (c.length === 1)
          i = c[0], n = l[i];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        i = l;
      r.items.push(Xt(i, n, t));
    }
  return r;
}
const aa = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ps,
  createNode: hs
};
class ke extends fe {
  constructor() {
    super(), this.add = D.prototype.add.bind(this), this.delete = D.prototype.delete.bind(this), this.get = D.prototype.get.bind(this), this.has = D.prototype.has.bind(this), this.set = D.prototype.set.bind(this), this.tag = ke.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(e, t) {
    if (!t)
      return super.toJSON(e);
    const a = /* @__PURE__ */ new Map();
    t?.onCreate && t.onCreate(a);
    for (const r of this.items) {
      let o, l;
      if (T(r) ? (o = R(r.key, "", t), l = R(r.value, o, t)) : o = R(r, "", t), a.has(o))
        throw new Error("Ordered maps must not include duplicate keys");
      a.set(o, l);
    }
    return a;
  }
  static from(e, t, a) {
    const r = hs(e, t, a), o = new this();
    return o.items = r.items, o;
  }
}
ke.tag = "tag:yaml.org,2002:omap";
const sa = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: ke,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = ps(s, e), a = [];
    for (const { key: r } of t.items)
      N(r) && (a.includes(r.value) ? e(`Ordered maps must not include duplicate keys: ${r.value}`) : a.push(r.value));
    return Object.assign(new ke(), t);
  },
  createNode: (s, e, t) => ke.from(s, e, t)
};
function gs({ value: s, source: e }, t) {
  return e && (s ? bs : ys).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const bs = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new w(!0),
  stringify: gs
}, ys = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new w(!1),
  stringify: gs
}, Br = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, qr = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : K(s);
  }
}, Dr = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(s) {
    const e = new w(parseFloat(s.replace(/_/g, ""))), t = s.indexOf(".");
    if (t !== -1) {
      const a = s.substring(t + 1).replace(/_/g, "");
      a[a.length - 1] === "0" && (e.minFractionDigits = a.length);
    }
    return e;
  },
  stringify: K
}, Fe = (s) => typeof s == "bigint" || Number.isInteger(s);
function At(s, e, t, { intAsBigInt: a }) {
  const r = s[0];
  if ((r === "-" || r === "+") && (e += 1), s = s.substring(e).replace(/_/g, ""), a) {
    switch (t) {
      case 2:
        s = `0b${s}`;
        break;
      case 8:
        s = `0o${s}`;
        break;
      case 16:
        s = `0x${s}`;
        break;
    }
    const l = BigInt(s);
    return r === "-" ? BigInt(-1) * l : l;
  }
  const o = parseInt(s, t);
  return r === "-" ? -1 * o : o;
}
function ra(s, e, t) {
  const { value: a } = s;
  if (Fe(a)) {
    const r = a.toString(e);
    return a < 0 ? "-" + t + r.substr(1) : t + r;
  }
  return K(s);
}
const Rr = {
  identify: Fe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => At(s, 2, 2, t),
  stringify: (s) => ra(s, 2, "0b")
}, Ur = {
  identify: Fe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => At(s, 1, 8, t),
  stringify: (s) => ra(s, 8, "0")
}, zr = {
  identify: Fe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => At(s, 0, 10, t),
  stringify: K
}, Wr = {
  identify: Fe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => At(s, 2, 16, t),
  stringify: (s) => ra(s, 16, "0x")
};
class Ve extends D {
  constructor(e) {
    super(e), this.tag = Ve.tag;
  }
  add(e) {
    let t;
    T(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new q(e.key, null) : t = new q(e, null), ie(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const a = ie(this.items, e);
    return !t && T(a) ? N(a.key) ? a.key.value : a.key : a;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const a = ie(this.items, e);
    a && !t ? this.items.splice(this.items.indexOf(a), 1) : !a && t && this.items.push(new q(e));
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set);
  }
  toString(e, t, a) {
    if (!e)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, a);
    throw new Error("Set items must all have null values");
  }
  static from(e, t, a) {
    const { replacer: r } = a, o = new this(e);
    if (t && Symbol.iterator in Object(t))
      for (let l of t)
        typeof r == "function" && (l = r.call(t, l, l)), o.items.push(Xt(l, null, a));
    return o;
  }
}
Ve.tag = "tag:yaml.org,2002:set";
const oa = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: Ve,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => Ve.from(s, e, t),
  resolve(s, e) {
    if (Ke(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new Ve(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function la(s, e) {
  const t = s[0], a = t === "-" || t === "+" ? s.substring(1) : s, r = (l) => e ? BigInt(l) : Number(l), o = a.replace(/_/g, "").split(":").reduce((l, i) => l * r(60) + r(i), r(0));
  return t === "-" ? r(-1) * o : o;
}
function vs(s) {
  let { value: e } = s, t = (l) => l;
  if (typeof e == "bigint")
    t = (l) => BigInt(l);
  else if (isNaN(e) || !isFinite(e))
    return K(s);
  let a = "";
  e < 0 && (a = "-", e *= t(-1));
  const r = t(60), o = [e % r];
  return e < 60 ? o.unshift(0) : (e = (e - o[0]) / r, o.unshift(e % r), e >= 60 && (e = (e - o[0]) / r, o.unshift(e))), a + o.map((l) => String(l).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const ks = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => la(s, t),
  stringify: vs
}, Vs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => la(s, !1),
  stringify: vs
}, xt = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(xt.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, a, r, o, l, i] = e.map(Number), n = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, a - 1, r, o || 0, l || 0, i || 0, n);
    const m = e[8];
    if (m && m !== "Z") {
      let d = la(m, !1);
      Math.abs(d) < 30 && (d *= 60), c -= 6e4 * d;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Sa = [
  Ce,
  Ne,
  vt,
  kt,
  bs,
  ys,
  Rr,
  Ur,
  zr,
  Wr,
  Br,
  qr,
  Dr,
  ta,
  Q,
  sa,
  aa,
  oa,
  ks,
  Vs,
  xt
], _a = /* @__PURE__ */ new Map([
  ["core", Lr],
  ["failsafe", [Ce, Ne, vt]],
  ["json", jr],
  ["yaml11", Sa],
  ["yaml-1.1", Sa]
]), Ca = {
  binary: ta,
  bool: Zt,
  float: cs,
  floatExp: ns,
  floatNaN: is,
  floatTime: Vs,
  int: fs,
  intHex: ms,
  intOct: us,
  intTime: ks,
  map: Ce,
  merge: Q,
  null: kt,
  omap: sa,
  pairs: aa,
  seq: Ne,
  set: oa,
  timestamp: xt
}, Kr = {
  "tag:yaml.org,2002:binary": ta,
  "tag:yaml.org,2002:merge": Q,
  "tag:yaml.org,2002:omap": sa,
  "tag:yaml.org,2002:pairs": aa,
  "tag:yaml.org,2002:set": oa,
  "tag:yaml.org,2002:timestamp": xt
};
function St(s, e, t) {
  const a = _a.get(e);
  if (a && !s)
    return t && !a.includes(Q) ? a.concat(Q) : a.slice();
  let r = a;
  if (!r)
    if (Array.isArray(s))
      r = [];
    else {
      const o = Array.from(_a.keys()).filter((l) => l !== "yaml11").map((l) => JSON.stringify(l)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${o} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const o of s)
      r = r.concat(o);
  else typeof s == "function" && (r = s(r.slice()));
  return t && (r = r.concat(Q)), r.reduce((o, l) => {
    const i = typeof l == "string" ? Ca[l] : l;
    if (!i) {
      const n = JSON.stringify(l), c = Object.keys(Ca).map((m) => JSON.stringify(m)).join(", ");
      throw new Error(`Unknown custom tag ${n}; use one of ${c}`);
    }
    return o.includes(i) || o.push(i), o;
  }, []);
}
const Gr = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class ia {
  constructor({ compat: e, customTags: t, merge: a, resolveKnownTags: r, schema: o, sortMapEntries: l, toStringDefaults: i }) {
    this.compat = Array.isArray(e) ? St(e, "compat") : e ? St(null, e) : null, this.name = typeof o == "string" && o || "core", this.knownTags = r ? Kr : {}, this.tags = St(t, this.name, a), this.toStringOptions = i ?? null, Object.defineProperty(this, te, { value: Ce }), Object.defineProperty(this, F, { value: vt }), Object.defineProperty(this, $e, { value: Ne }), this.sortMapEntries = typeof l == "function" ? l : l === !0 ? Gr : null;
  }
  clone() {
    const e = Object.create(ia.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Fr(s, e) {
  const t = [];
  let a = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const n = s.directives.toString(s);
    n ? (t.push(n), a = !0) : s.directives.docStart && (a = !0);
  }
  a && t.push("---");
  const r = ts(s, e), { commentString: o } = r.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const n = o(s.commentBefore);
    t.unshift(Y(n, ""));
  }
  let l = !1, i = null;
  if (s.contents) {
    if (O(s.contents)) {
      if (s.contents.spaceBefore && a && t.push(""), s.contents.commentBefore) {
        const m = o(s.contents.commentBefore);
        t.push(Y(m, ""));
      }
      r.forceBlockIndent = !!s.comment, i = s.contents.comment;
    }
    const n = i ? void 0 : () => l = !0;
    let c = we(s.contents, r, () => i = null, n);
    i && (c += le(c, "", o(i))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(we(s.contents, r));
  if (s.directives?.docEnd)
    if (s.comment) {
      const n = o(s.comment);
      n.includes(`
`) ? (t.push("..."), t.push(Y(n, ""))) : t.push(`... ${n}`);
    } else
      t.push("...");
  else {
    let n = s.comment;
    n && l && (n = n.replace(/^\n+/, "")), n && ((!l || i) && t[t.length - 1] !== "" && t.push(""), t.push(Y(o(n), "")));
  }
  return t.join(`
`) + `
`;
}
let na = class As {
  constructor(e, t, a) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, U, { value: Ot });
    let r = null;
    typeof t == "function" || Array.isArray(t) ? r = t : a === void 0 && t && (a = t, t = void 0);
    const o = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, a);
    this.options = o;
    let { version: l } = o;
    a?._directives ? (this.directives = a._directives.atDocument(), this.directives.yaml.explicit && (l = this.directives.yaml.version)) : this.directives = new B({ version: l }), this.setSchema(l, a), this.contents = e === void 0 ? null : this.createNode(e, r, a);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(As.prototype, {
      [U]: { value: Ot }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = O(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    pe(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    pe(this.contents) && this.contents.addIn(e, t);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(e, t) {
    if (!e.anchor) {
      const a = Ya(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || a.has(t) ? Qa(t || "a", a) : t;
    }
    return new Yt(e.anchor);
  }
  createNode(e, t, a) {
    let r;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), r = t;
    else if (Array.isArray(t)) {
      const h = (v) => typeof v == "number" || v instanceof String || v instanceof Number, y = t.filter(h).map(String);
      y.length > 0 && (t = t.concat(y)), r = t;
    } else a === void 0 && t && (a = t, t = void 0);
    const { aliasDuplicateObjects: o, anchorPrefix: l, flow: i, keepUndefined: n, onTagObj: c, tag: m } = a ?? {}, { onAnchor: d, setAnchors: u, sourceObjects: p } = Ar(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      l || "a"
    ), g = {
      aliasDuplicateObjects: o ?? !0,
      keepUndefined: n ?? !1,
      onAnchor: d,
      onTagObj: c,
      replacer: r,
      schema: this.schema,
      sourceObjects: p
    }, f = De(e, m, g);
    return i && M(f) && (f.flow = !0), u(), f;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, a = {}) {
    const r = this.createNode(e, null, a), o = this.createNode(t, null, a);
    return new q(r, o);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return pe(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Oe(e) ? this.contents == null ? !1 : (this.contents = null, !0) : pe(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return M(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Oe(e) ? !t && N(this.contents) ? this.contents.value : this.contents : M(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return M(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Oe(e) ? this.contents !== void 0 : M(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = dt(this.schema, [e], t) : pe(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Oe(e) ? this.contents = t : this.contents == null ? this.contents = dt(this.schema, Array.from(e), t) : pe(this.contents) && this.contents.setIn(e, t);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(e, t = {}) {
    typeof e == "number" && (e = String(e));
    let a;
    switch (e) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new B({ version: "1.1" }), a = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new B({ version: e }), a = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, a = null;
        break;
      default: {
        const r = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${r}`);
      }
    }
    if (t.schema instanceof Object)
      this.schema = t.schema;
    else if (a)
      this.schema = new ia(Object.assign(a, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: a, maxAliasCount: r, onAnchor: o, reviver: l } = {}) {
    const i = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: a === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof r == "number" ? r : 100
    }, n = R(this.contents, t ?? "", i);
    if (typeof o == "function")
      for (const { count: c, res: m } of i.anchors.values())
        o(m, c);
    return typeof l == "function" ? ye(l, { "": n }, "", n) : n;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(e, t) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t });
  }
  /** A YAML representation of the document. */
  toString(e = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
      const t = JSON.stringify(e.indent);
      throw new Error(`"indent" option must be a positive integer, not ${t}`);
    }
    return Fr(this, e);
  }
};
function pe(s) {
  if (M(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class xs extends Error {
  constructor(e, t, a, r) {
    super(), this.name = e, this.code = a, this.message = r, this.pos = t;
  }
}
class Te extends xs {
  constructor(e, t, a) {
    super("YAMLParseError", e, t, a);
  }
}
class Jr extends xs {
  constructor(e, t, a) {
    super("YAMLWarning", e, t, a);
  }
}
const Na = (s, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((i) => e.linePos(i));
  const { line: a, col: r } = t.linePos[0];
  t.message += ` at line ${a}, column ${r}`;
  let o = r - 1, l = s.substring(e.lineStarts[a - 1], e.lineStarts[a]).replace(/[\n\r]+$/, "");
  if (o >= 60 && l.length > 80) {
    const i = Math.min(o - 39, l.length - 79);
    l = "…" + l.substring(i), o -= i - 1;
  }
  if (l.length > 80 && (l = l.substring(0, 79) + "…"), a > 1 && /^ *$/.test(l.substring(0, o))) {
    let i = s.substring(e.lineStarts[a - 2], e.lineStarts[a - 1]);
    i.length > 80 && (i = i.substring(0, 79) + `…
`), l = i + l;
  }
  if (/[^ ]/.test(l)) {
    let i = 1;
    const n = t.linePos[1];
    n?.line === a && n.col > r && (i = Math.max(1, Math.min(n.col - r, 80 - o)));
    const c = " ".repeat(o) + "^".repeat(i);
    t.message += `:

${l}
${c}
`;
  }
};
function He(s, { flow: e, indicator: t, next: a, offset: r, onError: o, parentIndent: l, startOnNewline: i }) {
  let n = !1, c = i, m = i, d = "", u = "", p = !1, g = !1, f = null, h = null, y = null, v = null, k = null, A = null, x = null;
  for (const b of s)
    switch (g && (b.type !== "space" && b.type !== "newline" && b.type !== "comma" && o(b.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), f && (c && b.type !== "comment" && b.type !== "newline" && o(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), b.type) {
      case "space":
        !e && (t !== "doc-start" || a?.type !== "flow-collection") && b.source.includes("	") && (f = b), m = !0;
        break;
      case "comment": {
        m || o(b, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const I = b.source.substring(1) || " ";
        d ? d += u + I : d = I, u = "", c = !1;
        break;
      }
      case "newline":
        c ? d ? d += b.source : (!A || t !== "seq-item-ind") && (n = !0) : u += b.source, c = !0, p = !0, (h || y) && (v = b), m = !0;
        break;
      case "anchor":
        h && o(b, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), b.source.endsWith(":") && o(b.offset + b.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), h = b, x ?? (x = b.offset), c = !1, m = !1, g = !0;
        break;
      case "tag": {
        y && o(b, "MULTIPLE_TAGS", "A node can have at most one tag"), y = b, x ?? (x = b.offset), c = !1, m = !1, g = !0;
        break;
      }
      case t:
        (h || y) && o(b, "BAD_PROP_ORDER", `Anchors and tags must be after the ${b.source} indicator`), A && o(b, "UNEXPECTED_TOKEN", `Unexpected ${b.source} in ${e ?? "collection"}`), A = b, c = t === "seq-item-ind" || t === "explicit-key-ind", m = !1;
        break;
      case "comma":
        if (e) {
          k && o(b, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = b, c = !1, m = !1;
          break;
        }
      // else fallthrough
      default:
        o(b, "UNEXPECTED_TOKEN", `Unexpected ${b.type} token`), c = !1, m = !1;
    }
  const H = s[s.length - 1], C = H ? H.offset + H.source.length : r;
  return g && a && a.type !== "space" && a.type !== "newline" && a.type !== "comma" && (a.type !== "scalar" || a.source !== "") && o(a.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (c && f.indent <= l || a?.type === "block-map" || a?.type === "block-seq") && o(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: A,
    spaceBefore: n,
    comment: d,
    hasNewline: p,
    anchor: h,
    tag: y,
    newlineAfterProp: v,
    end: C,
    start: x ?? C
  };
}
function Re(s) {
  if (!s)
    return null;
  switch (s.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (s.source.includes(`
`))
        return !0;
      if (s.end) {
        for (const e of s.end)
          if (e.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const e of s.items) {
        for (const t of e.start)
          if (t.type === "newline")
            return !0;
        if (e.sep) {
          for (const t of e.sep)
            if (t.type === "newline")
              return !0;
        }
        if (Re(e.key) || Re(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Pt(s, e, t) {
  if (e?.type === "flow-collection") {
    const a = e.end[0];
    a.indent === s && (a.source === "]" || a.source === "}") && Re(e) && t(a, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function ws(s, e, t) {
  const { uniqueKeys: a } = s.options;
  if (a === !1)
    return !1;
  const r = typeof a == "function" ? a : (o, l) => o === l || N(o) && N(l) && o.value === l.value;
  return e.some((o) => r(o.key, t));
}
const Ea = "All mapping items must start at the same column";
function Yr({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const l = o?.nodeClass ?? D, i = new l(t.schema);
  t.atRoot && (t.atRoot = !1);
  let n = a.offset, c = null;
  for (const m of a.items) {
    const { start: d, key: u, sep: p, value: g } = m, f = He(d, {
      indicator: "explicit-key-ind",
      next: u ?? p?.[0],
      offset: n,
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !0
    }), h = !f.found;
    if (h) {
      if (u && (u.type === "block-seq" ? r(n, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in u && u.indent !== a.indent && r(n, "BAD_INDENT", Ea)), !f.anchor && !f.tag && !p) {
        c = f.end, f.comment && (i.comment ? i.comment += `
` + f.comment : i.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || Re(u)) && r(u ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== a.indent && r(n, "BAD_INDENT", Ea);
    t.atKey = !0;
    const y = f.end, v = u ? s(t, u, f, r) : e(t, y, d, null, f, r);
    t.schema.compat && Pt(a.indent, u, r), t.atKey = !1, ws(t, i.items, v) && r(y, "DUPLICATE_KEY", "Map keys must be unique");
    const k = He(p ?? [], {
      indicator: "map-value-ind",
      next: g,
      offset: v.range[2],
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !u || u.type === "block-scalar"
    });
    if (n = k.end, k.found) {
      h && (g?.type === "block-map" && !k.hasNewline && r(n, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && f.start < k.found.offset - 1024 && r(v.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const A = g ? s(t, g, k, r) : e(t, n, p, null, k, r);
      t.schema.compat && Pt(a.indent, g, r), n = A.range[2];
      const x = new q(v, A);
      t.options.keepSourceTokens && (x.srcToken = m), i.items.push(x);
    } else {
      h && r(v.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && (v.comment ? v.comment += `
` + k.comment : v.comment = k.comment);
      const A = new q(v);
      t.options.keepSourceTokens && (A.srcToken = m), i.items.push(A);
    }
  }
  return c && c < n && r(c, "IMPOSSIBLE", "Map comment with trailing content"), i.range = [a.offset, n, c ?? n], i;
}
function Qr({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const l = o?.nodeClass ?? fe, i = new l(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let n = a.offset, c = null;
  for (const { start: m, value: d } of a.items) {
    const u = He(m, {
      indicator: "seq-item-ind",
      next: d,
      offset: n,
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !0
    });
    if (!u.found)
      if (u.anchor || u.tag || d)
        d?.type === "block-seq" ? r(u.end, "BAD_INDENT", "All sequence items must start at the same column") : r(n, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = u.end, u.comment && (i.comment = u.comment);
        continue;
      }
    const p = d ? s(t, d, u, r) : e(t, u.end, m, null, u, r);
    t.schema.compat && Pt(a.indent, d, r), n = p.range[2], i.items.push(p);
  }
  return i.range = [a.offset, n, c ?? n], i;
}
function Je(s, e, t, a) {
  let r = "";
  if (s) {
    let o = !1, l = "";
    for (const i of s) {
      const { source: n, type: c } = i;
      switch (c) {
        case "space":
          o = !0;
          break;
        case "comment": {
          t && !o && a(i, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const m = n.substring(1) || " ";
          r ? r += l + m : r = m, l = "";
          break;
        }
        case "newline":
          r && (l += n), o = !0;
          break;
        default:
          a(i, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += n.length;
    }
  }
  return { comment: r, offset: e };
}
const _t = "Block collections are not allowed within flow collections", Ct = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function Xr({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const l = a.start.source === "{", i = l ? "flow map" : "flow sequence", n = o?.nodeClass ?? (l ? D : fe), c = new n(t.schema);
  c.flow = !0;
  const m = t.atRoot;
  m && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let d = a.offset + a.start.source.length;
  for (let h = 0; h < a.items.length; ++h) {
    const y = a.items[h], { start: v, key: k, sep: A, value: x } = y, H = He(v, {
      flow: i,
      indicator: "explicit-key-ind",
      next: k ?? A?.[0],
      offset: d,
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !1
    });
    if (!H.found) {
      if (!H.anchor && !H.tag && !A && !x) {
        h === 0 && H.comma ? r(H.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${i}`) : h < a.items.length - 1 && r(H.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${i}`), H.comment && (c.comment ? c.comment += `
` + H.comment : c.comment = H.comment), d = H.end;
        continue;
      }
      !l && t.options.strict && Re(k) && r(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (h === 0)
      H.comma && r(H.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${i}`);
    else if (H.comma || r(H.start, "MISSING_CHAR", `Missing , between ${i} items`), H.comment) {
      let C = "";
      e: for (const b of v)
        switch (b.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            C = b.source.substring(1);
            break e;
          default:
            break e;
        }
      if (C) {
        let b = c.items[c.items.length - 1];
        T(b) && (b = b.value ?? b.key), b.comment ? b.comment += `
` + C : b.comment = C, H.comment = H.comment.substring(C.length + 1);
      }
    }
    if (!l && !A && !H.found) {
      const C = x ? s(t, x, H, r) : e(t, H.end, A, null, H, r);
      c.items.push(C), d = C.range[2], Ct(x) && r(C.range, "BLOCK_IN_FLOW", _t);
    } else {
      t.atKey = !0;
      const C = H.end, b = k ? s(t, k, H, r) : e(t, C, v, null, H, r);
      Ct(k) && r(b.range, "BLOCK_IN_FLOW", _t), t.atKey = !1;
      const I = He(A ?? [], {
        flow: i,
        indicator: "map-value-ind",
        next: x,
        offset: b.range[2],
        onError: r,
        parentIndent: a.indent,
        startOnNewline: !1
      });
      if (I.found) {
        if (!l && !H.found && t.options.strict) {
          if (A)
            for (const P of A) {
              if (P === I.found)
                break;
              if (P.type === "newline") {
                r(P, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          H.start < I.found.offset - 1024 && r(I.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else x && ("source" in x && x.source?.[0] === ":" ? r(x, "MISSING_CHAR", `Missing space after : in ${i}`) : r(I.start, "MISSING_CHAR", `Missing , or : between ${i} items`));
      const X = x ? s(t, x, I, r) : I.found ? e(t, I.end, A, null, I, r) : null;
      X ? Ct(x) && r(X.range, "BLOCK_IN_FLOW", _t) : I.comment && (b.comment ? b.comment += `
` + I.comment : b.comment = I.comment);
      const me = new q(b, X);
      if (t.options.keepSourceTokens && (me.srcToken = y), l) {
        const P = c;
        ws(t, P.items, b) && r(C, "DUPLICATE_KEY", "Map keys must be unique"), P.items.push(me);
      } else {
        const P = new D(t.schema);
        P.flow = !0, P.items.push(me);
        const da = (X ?? b).range;
        P.range = [b.range[0], da[1], da[2]], c.items.push(P);
      }
      d = X ? X.range[2] : I.end;
    }
  }
  const u = l ? "}" : "]", [p, ...g] = a.end;
  let f = d;
  if (p?.source === u)
    f = p.offset + p.source.length;
  else {
    const h = i[0].toUpperCase() + i.substring(1), y = m ? `${h} must end with a ${u}` : `${h} in block collection must be sufficiently indented and end with a ${u}`;
    r(d, m ? "MISSING_CHAR" : "BAD_INDENT", y), p && p.source.length !== 1 && g.unshift(p);
  }
  if (g.length > 0) {
    const h = Je(g, f, t.options.strict, r);
    h.comment && (c.comment ? c.comment += `
` + h.comment : c.comment = h.comment), c.range = [a.offset, f, h.offset];
  } else
    c.range = [a.offset, f, f];
  return c;
}
function Nt(s, e, t, a, r, o) {
  const l = t.type === "block-map" ? Yr(s, e, t, a, o) : t.type === "block-seq" ? Qr(s, e, t, a, o) : Xr(s, e, t, a, o), i = l.constructor;
  return r === "!" || r === i.tagName ? (l.tag = i.tagName, l) : (r && (l.tag = r), l);
}
function Zr(s, e, t, a, r) {
  const o = a.tag, l = o ? e.directives.tagName(o.source, (u) => r(o, "TAG_RESOLVE_FAILED", u)) : null;
  if (t.type === "block-seq") {
    const { anchor: u, newlineAfterProp: p } = a, g = u && o ? u.offset > o.offset ? u : o : u ?? o;
    g && (!p || p.offset < g.offset) && r(g, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const i = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!o || !l || l === "!" || l === D.tagName && i === "map" || l === fe.tagName && i === "seq")
    return Nt(s, e, t, r, l);
  let n = e.schema.tags.find((u) => u.tag === l && u.collection === i);
  if (!n) {
    const u = e.schema.knownTags[l];
    if (u?.collection === i)
      e.schema.tags.push(Object.assign({}, u, { default: !1 })), n = u;
    else
      return u ? r(o, "BAD_COLLECTION_TYPE", `${u.tag} used for ${i} collection, but expects ${u.collection ?? "scalar"}`, !0) : r(o, "TAG_RESOLVE_FAILED", `Unresolved tag: ${l}`, !0), Nt(s, e, t, r, l);
  }
  const c = Nt(s, e, t, r, l, n), m = n.resolve?.(c, (u) => r(o, "TAG_RESOLVE_FAILED", u), e.options) ?? c, d = O(m) ? m : new w(m);
  return d.range = c.range, d.tag = l, n?.format && (d.format = n.format), d;
}
function eo(s, e, t) {
  const a = e.offset, r = to(e, s.options.strict, t);
  if (!r)
    return { value: "", type: null, comment: "", range: [a, a, a] };
  const o = r.mode === ">" ? w.BLOCK_FOLDED : w.BLOCK_LITERAL, l = e.source ? ao(e.source) : [];
  let i = l.length;
  for (let f = l.length - 1; f >= 0; --f) {
    const h = l[f][1];
    if (h === "" || h === "\r")
      i = f;
    else
      break;
  }
  if (i === 0) {
    const f = r.chomp === "+" && l.length > 0 ? `
`.repeat(Math.max(1, l.length - 1)) : "";
    let h = a + r.length;
    return e.source && (h += e.source.length), { value: f, type: o, comment: r.comment, range: [a, h, h] };
  }
  let n = e.indent + r.indent, c = e.offset + r.length, m = 0;
  for (let f = 0; f < i; ++f) {
    const [h, y] = l[f];
    if (y === "" || y === "\r")
      r.indent === 0 && h.length > n && (n = h.length);
    else {
      h.length < n && t(c + h.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), r.indent === 0 && (n = h.length), m = f, n === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += h.length + y.length + 1;
  }
  for (let f = l.length - 1; f >= i; --f)
    l[f][0].length > n && (i = f + 1);
  let d = "", u = "", p = !1;
  for (let f = 0; f < m; ++f)
    d += l[f][0].slice(n) + `
`;
  for (let f = m; f < i; ++f) {
    let [h, y] = l[f];
    c += h.length + y.length + 1;
    const v = y[y.length - 1] === "\r";
    if (v && (y = y.slice(0, -1)), y && h.length < n) {
      const A = `Block scalar lines must not be less indented than their ${r.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - y.length - (v ? 2 : 1), "BAD_INDENT", A), h = "";
    }
    o === w.BLOCK_LITERAL ? (d += u + h.slice(n) + y, u = `
`) : h.length > n || y[0] === "	" ? (u === " " ? u = `
` : !p && u === `
` && (u = `

`), d += u + h.slice(n) + y, u = `
`, p = !0) : y === "" ? u === `
` ? d += `
` : u = `
` : (d += u + y, u = " ", p = !1);
  }
  switch (r.chomp) {
    case "-":
      break;
    case "+":
      for (let f = i; f < l.length; ++f)
        d += `
` + l[f][0].slice(n);
      d[d.length - 1] !== `
` && (d += `
`);
      break;
    default:
      d += `
`;
  }
  const g = a + r.length + e.source.length;
  return { value: d, type: o, comment: r.comment, range: [a, g, g] };
}
function to({ offset: s, props: e }, t, a) {
  if (e[0].type !== "block-scalar-header")
    return a(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: r } = e[0], o = r[0];
  let l = 0, i = "", n = -1;
  for (let u = 1; u < r.length; ++u) {
    const p = r[u];
    if (!i && (p === "-" || p === "+"))
      i = p;
    else {
      const g = Number(p);
      !l && g ? l = g : n === -1 && (n = s + u);
    }
  }
  n !== -1 && a(n, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${r}`);
  let c = !1, m = "", d = r.length;
  for (let u = 1; u < e.length; ++u) {
    const p = e[u];
    switch (p.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        d += p.source.length;
        break;
      case "comment":
        t && !c && a(p, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += p.source.length, m = p.source.substring(1);
        break;
      case "error":
        a(p, "UNEXPECTED_TOKEN", p.message), d += p.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const g = `Unexpected token in block scalar header: ${p.type}`;
        a(p, "UNEXPECTED_TOKEN", g);
        const f = p.source;
        f && typeof f == "string" && (d += f.length);
      }
    }
  }
  return { mode: o, indent: l, chomp: i, comment: m, length: d };
}
function ao(s) {
  const e = s.split(/\n( *)/), t = e[0], a = t.match(/^( *)/), o = [a?.[1] ? [a[1], t.slice(a[1].length)] : ["", t]];
  for (let l = 1; l < e.length; l += 2)
    o.push([e[l], e[l + 1]]);
  return o;
}
function so(s, e, t) {
  const { offset: a, type: r, source: o, end: l } = s;
  let i, n;
  const c = (u, p, g) => t(a + u, p, g);
  switch (r) {
    case "scalar":
      i = w.PLAIN, n = ro(o, c);
      break;
    case "single-quoted-scalar":
      i = w.QUOTE_SINGLE, n = oo(o, c);
      break;
    case "double-quoted-scalar":
      i = w.QUOTE_DOUBLE, n = lo(o, c);
      break;
    /* istanbul ignore next should not happen */
    default:
      return t(s, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${r}`), {
        value: "",
        type: null,
        comment: "",
        range: [a, a + o.length, a + o.length]
      };
  }
  const m = a + o.length, d = Je(l, m, e, t);
  return {
    value: n,
    type: i,
    comment: d.comment,
    range: [a, m, d.offset]
  };
}
function ro(s, e) {
  let t = "";
  switch (s[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      t = "a tab character";
      break;
    case ",":
      t = "flow indicator character ,";
      break;
    case "%":
      t = "directive indicator character %";
      break;
    case "|":
    case ">": {
      t = `block scalar indicator ${s[0]}`;
      break;
    }
    case "@":
    case "`": {
      t = `reserved character ${s[0]}`;
      break;
    }
  }
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Hs(s);
}
function oo(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), Hs(s.slice(1, -1)).replace(/''/g, "'");
}
function Hs(s) {
  let e, t;
  try {
    e = new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`, "sy"), t = new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`, "sy");
  } catch {
    e = /(.*?)[ \t]*\r?\n/sy, t = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let a = e.exec(s);
  if (!a)
    return s;
  let r = a[1], o = " ", l = e.lastIndex;
  for (t.lastIndex = l; a = t.exec(s); )
    a[1] === "" ? o === `
` ? r += o : o = `
` : (r += o + a[1], o = " "), l = t.lastIndex;
  const i = /[ \t]*(.*)/sy;
  return i.lastIndex = l, a = i.exec(s), r + o + (a?.[1] ?? "");
}
function lo(s, e) {
  let t = "";
  for (let a = 1; a < s.length - 1; ++a) {
    const r = s[a];
    if (!(r === "\r" && s[a + 1] === `
`))
      if (r === `
`) {
        const { fold: o, offset: l } = io(s, a);
        t += o, a = l;
      } else if (r === "\\") {
        let o = s[++a];
        const l = no[o];
        if (l)
          t += l;
        else if (o === `
`)
          for (o = s[a + 1]; o === " " || o === "	"; )
            o = s[++a + 1];
        else if (o === "\r" && s[a + 1] === `
`)
          for (o = s[++a + 1]; o === " " || o === "	"; )
            o = s[++a + 1];
        else if (o === "x" || o === "u" || o === "U") {
          const i = o === "x" ? 2 : o === "u" ? 4 : 8;
          t += co(s, a + 1, i, e), a += i;
        } else {
          const i = s.substr(a - 1, 2);
          e(a - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${i}`), t += i;
        }
      } else if (r === " " || r === "	") {
        const o = a;
        let l = s[a + 1];
        for (; l === " " || l === "	"; )
          l = s[++a + 1];
        l !== `
` && !(l === "\r" && s[a + 2] === `
`) && (t += a > o ? s.slice(o, a + 1) : r);
      } else
        t += r;
  }
  return (s[s.length - 1] !== '"' || s.length === 1) && e(s.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function io(s, e) {
  let t = "", a = s[e + 1];
  for (; (a === " " || a === "	" || a === `
` || a === "\r") && !(a === "\r" && s[e + 2] !== `
`); )
    a === `
` && (t += `
`), e += 1, a = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const no = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function co(s, e, t, a) {
  const r = s.substr(e, t), l = r.length === t && /^[0-9a-fA-F]+$/.test(r) ? parseInt(r, 16) : NaN;
  try {
    return String.fromCodePoint(l);
  } catch {
    const i = s.substr(e - 2, t + 2);
    return a(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${i}`), i;
  }
}
function $s(s, e, t, a) {
  const { value: r, type: o, comment: l, range: i } = e.type === "block-scalar" ? eo(s, e, a) : so(e, s.options.strict, a), n = t ? s.directives.tagName(t.source, (d) => a(t, "TAG_RESOLVE_FAILED", d)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[F] : n ? c = uo(s.schema, r, n, t, a) : e.type === "scalar" ? c = fo(s, r, e, a) : c = s.schema[F];
  let m;
  try {
    const d = c.resolve(r, (u) => a(t ?? e, "TAG_RESOLVE_FAILED", u), s.options);
    m = N(d) ? d : new w(d);
  } catch (d) {
    const u = d instanceof Error ? d.message : String(d);
    a(t ?? e, "TAG_RESOLVE_FAILED", u), m = new w(r);
  }
  return m.range = i, m.source = r, o && (m.type = o), n && (m.tag = n), c.format && (m.format = c.format), l && (m.comment = l), m;
}
function uo(s, e, t, a, r) {
  if (t === "!")
    return s[F];
  const o = [];
  for (const i of s.tags)
    if (!i.collection && i.tag === t)
      if (i.default && i.test)
        o.push(i);
      else
        return i;
  for (const i of o)
    if (i.test?.test(e))
      return i;
  const l = s.knownTags[t];
  return l && !l.collection ? (s.tags.push(Object.assign({}, l, { default: !1, test: void 0 })), l) : (r(a, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[F]);
}
function fo({ atKey: s, directives: e, schema: t }, a, r, o) {
  const l = t.tags.find((i) => (i.default === !0 || s && i.default === "key") && i.test?.test(a)) || t[F];
  if (t.compat) {
    const i = t.compat.find((n) => n.default && n.test?.test(a)) ?? t[F];
    if (l.tag !== i.tag) {
      const n = e.tagString(l.tag), c = e.tagString(i.tag), m = `Value may be parsed as either ${n} or ${c}`;
      o(r, "TAG_RESOLVE_FAILED", m, !0);
    }
  }
  return l;
}
function mo(s, e, t) {
  if (e) {
    t ?? (t = e.length);
    for (let a = t - 1; a >= 0; --a) {
      let r = e[a];
      switch (r.type) {
        case "space":
        case "comment":
        case "newline":
          s -= r.source.length;
          continue;
      }
      for (r = e[++a]; r?.type === "space"; )
        s += r.source.length, r = e[++a];
      break;
    }
  }
  return s;
}
const po = { composeNode: Ss, composeEmptyNode: ca };
function Ss(s, e, t, a) {
  const r = s.atKey, { spaceBefore: o, comment: l, anchor: i, tag: n } = t;
  let c, m = !0;
  switch (e.type) {
    case "alias":
      c = ho(s, e, a), (i || n) && a(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = $s(s, e, n, a), i && (c.anchor = i.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = Zr(po, s, e, t, a), i && (c.anchor = i.source.substring(1));
      } catch (d) {
        const u = d instanceof Error ? d.message : String(d);
        a(e, "RESOURCE_EXHAUSTION", u);
      }
      break;
    default: {
      const d = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      a(e, "UNEXPECTED_TOKEN", d), m = !1;
    }
  }
  return c ?? (c = ca(s, e.offset, void 0, null, t, a)), i && c.anchor === "" && a(i, "BAD_ALIAS", "Anchor cannot be an empty string"), r && s.options.stringKeys && (!N(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && a(n ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), o && (c.spaceBefore = !0), l && (e.type === "scalar" && e.source === "" ? c.comment = l : c.commentBefore = l), s.options.keepSourceTokens && m && (c.srcToken = e), c;
}
function ca(s, e, t, a, { spaceBefore: r, comment: o, anchor: l, tag: i, end: n }, c) {
  const m = {
    type: "scalar",
    offset: mo(e, t, a),
    indent: -1,
    source: ""
  }, d = $s(s, m, i, c);
  return l && (d.anchor = l.source.substring(1), d.anchor === "" && c(l, "BAD_ALIAS", "Anchor cannot be an empty string")), r && (d.spaceBefore = !0), o && (d.comment = o, d.range[2] = n), d;
}
function ho({ options: s }, { offset: e, source: t, end: a }, r) {
  const o = new Yt(t.substring(1));
  o.source === "" && r(e, "BAD_ALIAS", "Alias cannot be an empty string"), o.source.endsWith(":") && r(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const l = e + t.length, i = Je(a, l, s.strict, r);
  return o.range = [e, l, i.offset], i.comment && (o.comment = i.comment), o;
}
function go(s, e, { offset: t, start: a, value: r, end: o }, l) {
  const i = Object.assign({ _directives: e }, s), n = new na(void 0, i), c = {
    atKey: !1,
    atRoot: !0,
    directives: n.directives,
    options: n.options,
    schema: n.schema
  }, m = He(a, {
    indicator: "doc-start",
    next: r ?? o?.[0],
    offset: t,
    onError: l,
    parentIndent: 0,
    startOnNewline: !0
  });
  m.found && (n.directives.docStart = !0, r && (r.type === "block-map" || r.type === "block-seq") && !m.hasNewline && l(m.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), n.contents = r ? Ss(c, r, m, l) : ca(c, m.end, a, null, m, l);
  const d = n.contents.range[2], u = Je(o, d, !1, l);
  return u.comment && (n.comment = u.comment), n.range = [t, d, u.offset], n;
}
function Me(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Ma(s) {
  let e = "", t = !1, a = !1;
  for (let r = 0; r < s.length; ++r) {
    const o = s[r];
    switch (o[0]) {
      case "#":
        e += (e === "" ? "" : a ? `

` : `
`) + (o.substring(1) || " "), t = !0, a = !1;
        break;
      case "%":
        s[r + 1]?.[0] !== "#" && (r += 1), t = !1;
        break;
      default:
        t || (a = !0), t = !1;
    }
  }
  return { comment: e, afterEmptyLine: a };
}
class bo {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, a, r, o) => {
      const l = Me(t);
      o ? this.warnings.push(new Jr(l, a, r)) : this.errors.push(new Te(l, a, r));
    }, this.directives = new B({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: a, afterEmptyLine: r } = Ma(this.prelude);
    if (a) {
      const o = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${a}` : a;
      else if (r || e.directives.docStart || !o)
        e.commentBefore = a;
      else if (M(o) && !o.flow && o.items.length > 0) {
        let l = o.items[0];
        T(l) && (l = l.key);
        const i = l.commentBefore;
        l.commentBefore = i ? `${a}
${i}` : a;
      } else {
        const l = o.commentBefore;
        o.commentBefore = l ? `${a}
${l}` : a;
      }
    }
    if (t) {
      for (let o = 0; o < this.errors.length; ++o)
        e.errors.push(this.errors[o]);
      for (let o = 0; o < this.warnings.length; ++o)
        e.warnings.push(this.warnings[o]);
    } else
      e.errors = this.errors, e.warnings = this.warnings;
    this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: Ma(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(e, t = !1, a = -1) {
    for (const r of e)
      yield* this.next(r);
    yield* this.end(t, a);
  }
  /** Advance the composer by one CST token. */
  *next(e) {
    switch (e.type) {
      case "directive":
        this.directives.add(e.source, (t, a, r) => {
          const o = Me(e);
          o[0] += t, this.onError(o, "BAD_DIRECTIVE", a, r);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = go(this.options, this.directives, e, this.onError);
        this.atDirectives && !t.directives.docStart && this.onError(e, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(t, !1), this.doc && (yield this.doc), this.doc = t, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(e.source);
        break;
      case "error": {
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, a = new Te(Me(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(a) : this.doc.errors.push(a);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const a = "Unexpected doc-end without preceding document";
          this.errors.push(new Te(Me(e), "UNEXPECTED_TOKEN", a));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Je(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const a = this.doc.comment;
          this.doc.comment = a ? `${a}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new Te(Me(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(e = !1, t = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (e) {
      const a = Object.assign({ _directives: this.directives }, this.options), r = new na(void 0, a);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), r.range = [0, t, t], this.decorate(r, !1), yield r;
    }
  }
}
const _s = "\uFEFF", Cs = "", Ns = "", jt = "";
function yo(s) {
  switch (s) {
    case _s:
      return "byte-order-mark";
    case Cs:
      return "doc-mode";
    case Ns:
      return "flow-error-end";
    case jt:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (s[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function W(s) {
  switch (s) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const Oa = new Set("0123456789ABCDEFabcdef"), vo = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), et = new Set(",[]{}"), ko = new Set(` ,[]{}
\r	`), Et = (s) => !s || ko.has(s);
class Vo {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(e, t = !1) {
    if (e) {
      if (typeof e != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + e : e, this.lineEndPos = null;
    }
    this.atEnd = !t;
    let a = this.next ?? "stream";
    for (; a && (t || this.hasChars(1)); )
      a = yield* this.parseNext(a);
  }
  atLineEnd() {
    let e = this.pos, t = this.buffer[e];
    for (; t === " " || t === "	"; )
      t = this.buffer[++e];
    return !t || t === "#" || t === `
` ? !0 : t === "\r" ? this.buffer[e + 1] === `
` : !1;
  }
  charAt(e) {
    return this.buffer[this.pos + e];
  }
  continueScalar(e) {
    let t = this.buffer[e];
    if (this.indentNext > 0) {
      let a = 0;
      for (; t === " "; )
        t = this.buffer[++a + e];
      if (t === "\r") {
        const r = this.buffer[a + e + 1];
        if (r === `
` || !r && !this.atEnd)
          return e + a + 1;
      }
      return t === `
` || a >= this.indentNext || !t && !this.atEnd ? e + a : -1;
    }
    if (t === "-" || t === ".") {
      const a = this.buffer.substr(e, 3);
      if ((a === "---" || a === "...") && W(this.buffer[e + 3]))
        return -1;
    }
    return e;
  }
  getLine() {
    let e = this.lineEndPos;
    return (typeof e != "number" || e !== -1 && e < this.pos) && (e = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = e), e === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[e - 1] === "\r" && (e -= 1), this.buffer.substring(this.pos, e));
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length;
  }
  setNext(e) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = e, null;
  }
  peek(e) {
    return this.buffer.substr(this.pos, e);
  }
  *parseNext(e) {
    switch (e) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let e = this.getLine();
    if (e === null)
      return this.setNext("stream");
    if (e[0] === _s && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
      let t = e.length, a = e.indexOf("#");
      for (; a !== -1; ) {
        const o = e[a - 1];
        if (o === " " || o === "	") {
          t = a - 1;
          break;
        } else
          a = e.indexOf("#", a + 1);
      }
      for (; ; ) {
        const o = e[t - 1];
        if (o === " " || o === "	")
          t -= 1;
        else
          break;
      }
      const r = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(e.length - r), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const t = yield* this.pushSpaces(!0);
      return yield* this.pushCount(e.length - t), yield* this.pushNewline(), "stream";
    }
    return yield Cs, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && W(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !W(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && W(t)) {
      const a = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += a, "block-start";
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const e = this.getLine();
    if (e === null)
      return this.setNext("doc");
    let t = yield* this.pushIndicators();
    switch (e[t]) {
      case "#":
        yield* this.pushCount(e.length - t);
      // fallthrough
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(Et), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return t += yield* this.parseBlockScalarHeader(), t += yield* this.pushSpaces(!0), yield* this.pushCount(e.length - t), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let e, t, a = -1;
    do
      e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = a = t) : t = 0, t += yield* this.pushSpaces(!0);
    while (e + t > 0);
    const r = this.getLine();
    if (r === null)
      return this.setNext("flow");
    if ((a !== -1 && a < this.indentNext && r[0] !== "#" || a === 0 && (r.startsWith("---") || r.startsWith("...")) && W(r[3])) && !(a === this.indentNext - 1 && this.flowLevel === 1 && (r[0] === "]" || r[0] === "}")))
      return this.flowLevel = 0, yield Ns, yield* this.parseLineStart();
    let o = 0;
    for (; r[o] === ","; )
      o += yield* this.pushCount(1), o += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (o += yield* this.pushIndicators(), r[o]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(r.length - o), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(Et), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const l = this.charAt(1);
        if (this.flowKey || W(l) || l === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      // fallthrough
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0);
    let t = this.buffer.indexOf(e, this.pos + 1);
    if (e === "'")
      for (; t !== -1 && this.buffer[t + 1] === "'"; )
        t = this.buffer.indexOf("'", t + 2);
    else
      for (; t !== -1; ) {
        let o = 0;
        for (; this.buffer[t - 1 - o] === "\\"; )
          o += 1;
        if (o % 2 === 0)
          break;
        t = this.buffer.indexOf('"', t + 1);
      }
    const a = this.buffer.substring(0, t);
    let r = a.indexOf(`
`, this.pos);
    if (r !== -1) {
      for (; r !== -1; ) {
        const o = this.continueScalar(r + 1);
        if (o === -1)
          break;
        r = a.indexOf(`
`, o);
      }
      r !== -1 && (t = r - (a[r - 1] === "\r" ? 2 : 1));
    }
    if (t === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      t = this.buffer.length;
    }
    return yield* this.pushToIndex(t + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let e = this.pos;
    for (; ; ) {
      const t = this.buffer[++e];
      if (t === "+")
        this.blockScalarKeep = !0;
      else if (t > "0" && t <= "9")
        this.blockScalarIndent = Number(t) - 1;
      else if (t !== "-")
        break;
    }
    return yield* this.pushUntil((t) => W(t) || t === "#");
  }
  *parseBlockScalar() {
    let e = this.pos - 1, t = 0, a;
    e: for (let o = this.pos; a = this.buffer[o]; ++o)
      switch (a) {
        case " ":
          t += 1;
          break;
        case `
`:
          e = o, t = 0;
          break;
        case "\r": {
          const l = this.buffer[o + 1];
          if (!l && !this.atEnd)
            return this.setNext("block-scalar");
          if (l === `
`)
            break;
        }
        // fallthrough
        default:
          break e;
      }
    if (!a && !this.atEnd)
      return this.setNext("block-scalar");
    if (t >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = t : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const o = this.continueScalar(e + 1);
        if (o === -1)
          break;
        e = this.buffer.indexOf(`
`, o);
      } while (e !== -1);
      if (e === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        e = this.buffer.length;
      }
    }
    let r = e + 1;
    for (a = this.buffer[r]; a === " "; )
      a = this.buffer[++r];
    if (a === "	") {
      for (; a === "	" || a === " " || a === "\r" || a === `
`; )
        a = this.buffer[++r];
      e = r - 1;
    } else if (!this.blockScalarKeep)
      do {
        let o = e - 1, l = this.buffer[o];
        l === "\r" && (l = this.buffer[--o]);
        const i = o;
        for (; l === " "; )
          l = this.buffer[--o];
        if (l === `
` && o >= this.pos && o + 1 + t > i)
          e = o;
        else
          break;
      } while (!0);
    return yield jt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, a = this.pos - 1, r;
    for (; r = this.buffer[++a]; )
      if (r === ":") {
        const o = this.buffer[a + 1];
        if (W(o) || e && et.has(o))
          break;
        t = a;
      } else if (W(r)) {
        let o = this.buffer[a + 1];
        if (r === "\r" && (o === `
` ? (a += 1, r = `
`, o = this.buffer[a + 1]) : t = a), o === "#" || e && et.has(o))
          break;
        if (r === `
`) {
          const l = this.continueScalar(a + 1);
          if (l === -1)
            break;
          a = Math.max(a, l - 2);
        }
      } else {
        if (e && et.has(r))
          break;
        t = a;
      }
    return !r && !this.atEnd ? this.setNext("plain-scalar") : (yield jt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
  }
  *pushToIndex(e, t) {
    const a = this.buffer.slice(this.pos, e);
    return a ? (yield a, this.pos += a.length, a.length) : (t && (yield ""), 0);
  }
  *pushIndicators() {
    let e = 0;
    e: for (; ; ) {
      switch (this.charAt(0)) {
        case "!":
          e += yield* this.pushTag(), e += yield* this.pushSpaces(!0);
          continue e;
        case "&":
          e += yield* this.pushUntil(Et), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, a = this.charAt(1);
          if (W(a) || t && et.has(a)) {
            t ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, e += yield* this.pushCount(1), e += yield* this.pushSpaces(!0);
            continue e;
          }
        }
      }
      break e;
    }
    return e;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let e = this.pos + 2, t = this.buffer[e];
      for (; !W(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (vo.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Oa.has(this.buffer[e + 1]) && Oa.has(this.buffer[e + 2]))
          t = this.buffer[e += 3];
        else
          break;
      return yield* this.pushToIndex(e, !1);
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos];
    return e === `
` ? yield* this.pushCount(1) : e === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(e) {
    let t = this.pos - 1, a;
    do
      a = this.buffer[++t];
    while (a === " " || e && a === "	");
    const r = t - this.pos;
    return r > 0 && (yield this.buffer.substr(this.pos, r), this.pos = t), r;
  }
  *pushUntil(e) {
    let t = this.pos, a = this.buffer[t];
    for (; !e(a); )
      a = this.buffer[++t];
    return yield* this.pushToIndex(t, !1);
  }
}
class Ao {
  constructor() {
    this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
      let t = 0, a = this.lineStarts.length;
      for (; t < a; ) {
        const o = t + a >> 1;
        this.lineStarts[o] < e ? t = o + 1 : a = o;
      }
      if (this.lineStarts[t] === e)
        return { line: t + 1, col: 1 };
      if (t === 0)
        return { line: 0, col: e };
      const r = this.lineStarts[t - 1];
      return { line: t, col: e - r + 1 };
    };
  }
}
function Z(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function Ta(s) {
  for (let e = 0; e < s.length; ++e)
    switch (s[e].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return e;
    }
  return -1;
}
function Es(s) {
  switch (s?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function tt(s) {
  switch (s.type) {
    case "document":
      return s.start;
    case "block-map": {
      const e = s.items[s.items.length - 1];
      return e.sep ?? e.start;
    }
    case "block-seq":
      return s.items[s.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function he(s) {
  if (s.length === 0)
    return [];
  let e = s.length;
  e: for (; --e >= 0; )
    switch (s[e].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; s[++e]?.type === "space"; )
    ;
  return s.splice(e, s.length);
}
function ft(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function La(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !Z(e.start, "explicit-key-ind") && !Z(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Es(e.value) ? e.value.end ? ft(e.value.end, e.sep) : e.value.end = e.sep : ft(e.start, e.sep), delete e.sep);
}
class xo {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Vo(), this.onNewLine = e;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(e, t = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const a of this.lexer.lex(e, t))
      yield* this.next(a);
    t || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(e) {
    if (this.source = e, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += e.length;
      return;
    }
    const t = yo(e);
    if (t)
      if (t === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = t, yield* this.step(), t) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + e.length);
            break;
          case "space":
            this.atNewLine && e[0] === " " && (this.indent += e.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += e.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += e.length;
      }
    else {
      const a = `Not a YAML token: ${e}`;
      yield* this.pop({ type: "error", offset: this.offset, message: a, source: e }), this.offset += e.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const e = this.peek(1);
    if (this.type === "doc-end" && e?.type !== "doc-end") {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!e)
      return yield* this.stream();
    switch (e.type) {
      case "document":
        return yield* this.document(e);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(e);
      case "block-scalar":
        return yield* this.blockScalar(e);
      case "block-map":
        return yield* this.blockMap(e);
      case "block-seq":
        return yield* this.blockSequence(e);
      case "flow-collection":
        return yield* this.flowCollection(e);
      case "doc-end":
        return yield* this.documentEnd(e);
    }
    yield* this.pop();
  }
  peek(e) {
    return this.stack[this.stack.length - e];
  }
  *pop(e) {
    const t = e ?? this.stack.pop();
    if (!t)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield t;
    else {
      const a = this.peek(1);
      switch (t.type === "block-scalar" ? t.indent = "indent" in a ? a.indent : 0 : t.type === "flow-collection" && a.type === "document" && (t.indent = 0), t.type === "flow-collection" && La(t), a.type) {
        case "document":
          a.value = t;
          break;
        case "block-scalar":
          a.props.push(t);
          break;
        case "block-map": {
          const r = a.items[a.items.length - 1];
          if (r.value) {
            a.items.push({ start: [], key: t, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (r.sep)
            r.value = t;
          else {
            Object.assign(r, { key: t, sep: [] }), this.onKeyLine = !r.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const r = a.items[a.items.length - 1];
          r.value ? a.items.push({ start: [], value: t }) : r.value = t;
          break;
        }
        case "flow-collection": {
          const r = a.items[a.items.length - 1];
          !r || r.value ? a.items.push({ start: [], key: t, sep: [] }) : r.sep ? r.value = t : Object.assign(r, { key: t, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop(), yield* this.pop(t);
      }
      if ((a.type === "document" || a.type === "block-map" || a.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
        const r = t.items[t.items.length - 1];
        r && !r.sep && !r.value && r.start.length > 0 && Ta(r.start) === -1 && (t.indent === 0 || r.start.every((o) => o.type !== "comment" || o.indent < t.indent)) && (a.type === "document" ? a.end = r.start : a.items.push({ start: r.start }), t.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const e = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && e.start.push(this.sourceToken), this.stack.push(e);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(e) {
    if (e.value)
      return yield* this.lineEnd(e);
    switch (this.type) {
      case "doc-start": {
        Ta(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        e.start.push(this.sourceToken);
        return;
    }
    const t = this.startBlockValue(e);
    t ? this.stack.push(t) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(e) {
    if (this.type === "map-value-ind") {
      const t = tt(this.peek(2)), a = he(t);
      let r;
      e.end ? (r = e.end, r.push(this.sourceToken), delete e.end) : r = [this.sourceToken];
      const o = {
        type: "block-map",
        offset: e.offset,
        indent: e.indent,
        items: [{ start: a, key: e, sep: r }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = o;
    } else
      yield* this.lineEnd(e);
  }
  *blockScalar(e) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        e.props.push(this.sourceToken);
        return;
      case "scalar":
        if (e.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let t = this.source.indexOf(`
`) + 1;
          for (; t !== 0; )
            this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(e) {
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, t.value) {
          const a = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(a) ? a[a.length - 1] : void 0)?.type === "comment" ? a?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else if (t.sep)
          t.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const r = e.items[e.items.length - 2]?.value?.end;
            if (Array.isArray(r)) {
              ft(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const a = !this.onKeyLine && this.indent === e.indent, r = a && (t.sep || t.explicitKey) && this.type !== "seq-item-ind";
      let o = [];
      if (r && t.sep && !t.value) {
        const l = [];
        for (let i = 0; i < t.sep.length; ++i) {
          const n = t.sep[i];
          switch (n.type) {
            case "newline":
              l.push(i);
              break;
            case "space":
              break;
            case "comment":
              n.indent > e.indent && (l.length = 0);
              break;
            default:
              l.length = 0;
          }
        }
        l.length >= 2 && (o = t.sep.splice(l[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o }), this.onKeyLine = !0) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !t.sep && !t.explicitKey ? (t.start.push(this.sourceToken), t.explicitKey = !0) : r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (t.explicitKey)
            if (t.sep)
              if (t.value)
                e.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (Z(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: null, sep: [this.sourceToken] }]
                });
              else if (Es(t.key) && !Z(t.sep, "newline")) {
                const l = he(t.start), i = t.key, n = t.sep;
                n.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: l, key: i, sep: n }]
                });
              } else o.length > 0 ? t.sep = t.sep.concat(o, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (Z(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const l = he(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: l, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || r ? e.items.push({ start: o, key: null, sep: [this.sourceToken] }) : Z(t.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const l = this.flowScalar(this.type);
          r || t.value ? (e.items.push({ start: o, key: l, sep: [] }), this.onKeyLine = !0) : t.sep ? this.stack.push(l) : (Object.assign(t, { key: l, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const l = this.startBlockValue(e);
          if (l) {
            if (l.type === "block-seq") {
              if (!t.explicitKey && t.sep && !Z(t.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else a && e.items.push({ start: o });
            this.stack.push(l);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(e) {
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (t.value) {
          const a = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(a) ? a[a.length - 1] : void 0)?.type === "comment" ? a?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else
          t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const r = e.items[e.items.length - 2]?.value?.end;
            if (Array.isArray(r)) {
              ft(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (t.value || this.indent <= e.indent)
          break;
        t.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== e.indent)
          break;
        t.value || Z(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
        return;
    }
    if (this.indent > e.indent) {
      const a = this.startBlockValue(e);
      if (a) {
        this.stack.push(a);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1];
    if (this.type === "flow-error-end") {
      let a;
      do
        yield* this.pop(), a = this.peek(1);
      while (a?.type === "flow-collection");
    } else if (e.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !t || t.sep ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !t || t.value ? e.items.push({ start: [], key: null, sep: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !t || t.value ? e.items.push({ start: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const r = this.flowScalar(this.type);
          !t || t.value ? e.items.push({ start: [], key: r, sep: [] }) : t.sep ? this.stack.push(r) : Object.assign(t, { key: r, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          e.end.push(this.sourceToken);
          return;
      }
      const a = this.startBlockValue(e);
      a ? this.stack.push(a) : (yield* this.pop(), yield* this.step());
    } else {
      const a = this.peek(2);
      if (a.type === "block-map" && (this.type === "map-value-ind" && a.indent === e.indent || this.type === "newline" && !a.items[a.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && a.type !== "flow-collection") {
        const r = tt(a), o = he(r);
        La(e);
        const l = e.end.splice(1, e.end.length);
        l.push(this.sourceToken);
        const i = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: o, key: e, sep: l }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = i;
      } else
        yield* this.lineEnd(e);
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let t = this.source.indexOf(`
`) + 1;
      for (; t !== 0; )
        this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
    }
    return {
      type: e,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(e) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const t = tt(e), a = he(t);
        return a.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: a, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = tt(e), a = he(t);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: a, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(e, t) {
    return this.type !== "comment" || this.indent <= t ? !1 : e.every((a) => a.type === "newline" || a.type === "space");
  }
  *documentEnd(e) {
    this.type !== "doc-mode" && (e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(e) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      default:
        e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function wo(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new Ao() || null, prettyErrors: e };
}
function Ho(s, e = {}) {
  const { lineCounter: t, prettyErrors: a } = wo(e), r = new xo(t?.addNewLine), o = new bo(e);
  let l = null;
  for (const i of o.compose(r.parse(s), !0, s.length))
    if (!l)
      l = i;
    else if (l.options.logLevel !== "silent") {
      l.errors.push(new Te(i.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return a && t && (l.errors.forEach(Na(s, t)), l.warnings.forEach(Na(s, t))), l;
}
function $o(s, e, t) {
  let a;
  const r = Ho(s, t);
  if (!r)
    return null;
  if (r.warnings.forEach((o) => as(r.options.logLevel, o)), r.errors.length > 0) {
    if (r.options.logLevel !== "silent")
      throw r.errors[0];
    r.errors = [];
  }
  return r.toJS(Object.assign({ reviver: a }, t));
}
function So(s, e, t) {
  let a = null;
  if (typeof e == "function" || Array.isArray(e) ? a = e : t === void 0 && e && (t = e), typeof t == "string" && (t = t.length), typeof t == "number") {
    const r = Math.round(t);
    t = r < 1 ? void 0 : r > 8 ? { indent: 8 } : { indent: r };
  }
  if (s === void 0) {
    const { keepUndefined: r } = t ?? e ?? {};
    if (!r)
      return;
  }
  return We(s) && !a ? s.toString(t) : new na(s, a, t).toString(t);
}
const _o = /^[a-z][a-z0-9_-]*$/;
function re(s) {
  return JSON.parse(JSON.stringify(s));
}
function Bt(s, e) {
  return e === "base" ? s.values : s.modes[e];
}
function Co(s, e) {
  return { ...s.values, ...s.modes[e] };
}
function Ia(s, e, t, a) {
  const r = re(s), o = Bt(r, e);
  return a === void 0 || !a.trim() ? delete o[t] : o[t] = a.trim(), r;
}
function Pa(s) {
  const e = { ...s.values }, t = {};
  return Object.keys(s.modes.light).length && (t.light = s.modes.light), Object.keys(s.modes.dark).length && (t.dark = s.modes.dark), Object.keys(t).length && (e.modes = t), So({ [s.name.trim() || "Mon thème"]: e }, { lineWidth: 0, singleQuote: !1 });
}
function Mt(s) {
  return !s || typeof s != "object" || Array.isArray(s) ? {} : Object.fromEntries(
    Object.entries(s).filter(([e, t]) => _o.test(e) && ["string", "number", "boolean"].includes(typeof t)).map(([e, t]) => [e, String(t)])
  );
}
function No(s) {
  const e = $o(s);
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("Le fichier YAML ne contient aucun thème valide.");
  const t = Object.entries(e);
  if (!t.length) throw new Error("Le fichier YAML est vide.");
  const [a, r] = t[0];
  if (!r || typeof r != "object" || Array.isArray(r))
    throw new Error("Le premier thème n’est pas un objet YAML valide.");
  const o = r, l = o.modes && typeof o.modes == "object" && !Array.isArray(o.modes) ? o.modes : {}, i = Mt(Object.fromEntries(Object.entries(o).filter(([n]) => n !== "modes")));
  return {
    name: a,
    values: i,
    modes: {
      light: Mt(l.light),
      dark: Mt(l.dark)
    }
  };
}
function Eo(s) {
  return (/* @__PURE__ */ new Set([
    ...Object.keys(s.values),
    ...Object.keys(s.modes.light),
    ...Object.keys(s.modes.dark)
  ])).size;
}
var Mo = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, L = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? Oo(e, t) : e, o = s.length - 1, l; o >= 0; o--)
    (l = s[o]) && (r = (a ? l(e, t, r) : l(r)) || r);
  return a && r && Mo(e, t, r), r;
};
const ja = "ha-theme-builder:draft:v1", To = /^[a-z][a-z0-9_-]*$/;
function Ba(s = 1) {
  const e = ct[s] ?? ct[0];
  return {
    name: e.name,
    values: { ...e.theme.values },
    modes: {
      light: { ...e.theme.modes.light },
      dark: { ...e.theme.modes.dark }
    }
  };
}
let E = class extends ne {
  constructor() {
    super(...arguments), this.narrow = !1, this.theme = Ba(), this.activeMode = "base", this.previewKind = "dashboard", this.previewDevice = "desktop", this.selectedGroup = "all", this.query = "", this.expert = !1, this.showLegacy = !1, this.editorOpen = !1, this.modal = null, this.customName = "", this.customValue = "", this.dirty = !1, this.savedThemes = [], this.libraryLoading = !1, this.history = [re(this.theme)], this.historyIndex = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const s = window.localStorage.getItem(ja);
      if (s) {
        const e = JSON.parse(s);
        e?.name && e?.values && e?.modes && (this.theme = e, this.history = [re(e)]);
      }
    } catch {
    }
  }
  disconnectedCallback() {
    this.toastTimer && window.clearTimeout(this.toastTimer), super.disconnectedCallback();
  }
  updated(s) {
    if (s.has("theme"))
      try {
        window.localStorage.setItem(ja, JSON.stringify(this.theme));
      } catch {
      }
    if (s.has("dirty")) {
      const e = window;
      e.isDirtyState = this.dirty, window.dispatchEvent(new CustomEvent("dirty-state-changed", { detail: { isDirty: this.dirty } }));
    }
  }
  commit(s, e = !0) {
    this.theme = s, this.history = [...this.history.slice(0, this.historyIndex + 1), re(s)].slice(-80), this.historyIndex = this.history.length - 1, e && (this.dirty = !0);
  }
  undo() {
    this.historyIndex <= 0 || (this.historyIndex -= 1, this.theme = re(this.history[this.historyIndex]), this.dirty = !0);
  }
  redo() {
    this.historyIndex >= this.history.length - 1 || (this.historyIndex += 1, this.theme = re(this.history[this.historyIndex]), this.dirty = !0);
  }
  notify(s, e = !1) {
    this.toastTimer && window.clearTimeout(this.toastTimer), this.toast = { message: s, error: e }, this.toastTimer = window.setTimeout(() => {
      this.toast = void 0;
    }, 3400);
  }
  get allDefinitions() {
    const s = new Set(wa.map((a) => a.id)), t = [...new Set([
      ...Object.keys(this.theme.values),
      ...Object.keys(this.theme.modes.light),
      ...Object.keys(this.theme.modes.dark)
    ].filter((a) => !s.has(a)))].sort().map((a) => ({
      id: a,
      label: a.replaceAll("-", " ").replace(/^./, (r) => r.toUpperCase()),
      description: "Variable personnalisée ou état de domaine dynamique.",
      group: "advanced",
      kind: "text",
      defaultValue: "",
      featured: !1,
      legacy: !1,
      source: "builder"
    }));
    return [...wa, ...t];
  }
  get visibleDefinitions() {
    const s = this.query.trim().toLocaleLowerCase(), e = new Set(Object.keys(Bt(this.theme, this.activeMode)));
    return this.allDefinitions.filter((t) => this.showLegacy || !t.legacy).filter((t) => this.expert || t.group !== "advanced").filter((t) => s ? `${t.id} ${t.label}`.toLocaleLowerCase().includes(s) : this.selectedGroup === "all" ? t.featured || e.has(t.id) : t.group === this.selectedGroup).sort((t, a) => +!!a.featured - +!!t.featured || t.id.localeCompare(a.id));
  }
  handleVariableChange(s) {
    this.commit(Ia(this.theme, this.activeMode, s.detail.id, s.detail.value));
  }
  selectPreset(s) {
    this.commit(Ba(s)), this.modal = null, this.selectedGroup = "all", this.query = "", this.notify(`Préréglage « ${ct[s].name} » appliqué.`);
  }
  addCustomVariable() {
    const s = this.customName.trim().replace(/^--/, "");
    if (!To.test(s)) {
      this.notify("Le nom doit ressembler à state-light-custom-color.", !0);
      return;
    }
    if (!this.customValue.trim()) {
      this.notify("Ajoute une valeur CSS avant de continuer.", !0);
      return;
    }
    this.commit(Ia(this.theme, this.activeMode, s, this.customValue)), this.expert = !0, this.selectedGroup = "advanced", this.query = s, this.customName = "", this.customValue = "", this.modal = null, this.notify(`Variable --${s} ajoutée.`);
  }
  async importFile(s) {
    const e = s.target, t = e.files?.[0];
    if (e.value = "", !!t)
      try {
        const a = No(await t.text());
        this.commit(a), this.selectedGroup = "all", this.query = "", this.notify(`Thème « ${a.name} » importé.`);
      } catch (a) {
        this.notify(a instanceof Error ? a.message : "Import YAML impossible.", !0);
      }
  }
  async copyYaml() {
    try {
      await navigator.clipboard.writeText(Pa(this.theme)), this.notify("YAML copié dans le presse-papiers.");
    } catch {
      this.notify("Le navigateur a refusé l’accès au presse-papiers.", !0);
    }
  }
  downloadYaml() {
    const s = new Blob([Pa(this.theme)], { type: "text/yaml;charset=utf-8" }), e = URL.createObjectURL(s), t = document.createElement("a");
    t.href = e, t.download = `${this.theme.name.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ha-theme"}.yaml`, t.click(), URL.revokeObjectURL(e), this.notify("Fichier YAML téléchargé.");
  }
  async saveToHomeAssistant() {
    if (!this.hass?.callWS) {
      this.downloadYaml();
      return;
    }
    try {
      await this.hass.callWS({
        type: "ha_theme_builder/save",
        name: this.theme.name,
        values: this.theme.values,
        modes: this.theme.modes
      }), this.dirty = !1, this.notify(`« ${this.theme.name} » enregistré dans Home Assistant.`);
    } catch (s) {
      this.notify(s instanceof Error ? s.message : "Enregistrement impossible.", !0);
    }
  }
  async openLibrary() {
    if (this.hass?.callWS) {
      this.modal = "library", this.libraryLoading = !0;
      try {
        const s = await this.hass.callWS({ type: "ha_theme_builder/list" });
        this.savedThemes = s.themes;
      } catch (s) {
        this.notify(s instanceof Error ? s.message : "Liste des thèmes inaccessible.", !0);
      } finally {
        this.libraryLoading = !1;
      }
    }
  }
  async loadSavedTheme(s) {
    if (this.hass?.callWS)
      try {
        const e = await this.hass.callWS({ type: "ha_theme_builder/get", name: s });
        this.commit(e, !1), this.dirty = !1, this.modal = null, this.selectedGroup = "all", this.query = "", this.notify(`« ${s} » chargé.`);
      } catch (e) {
        this.notify(e instanceof Error ? e.message : "Chargement impossible.", !0);
      }
  }
  renderTopbar() {
    return V`
      <header class="topbar">
        <button class="icon-button menu-button" title="Ouvrir l’éditeur" @click=${() => {
      this.editorOpen = !this.editorOpen;
    }}>${$("menu")}</button>
        <div class="brand"><div class="brand-mark">${$("palette", 21)}</div><div class="brand-copy"><strong>Theme Builder</strong><span>Home Assistant</span></div></div>
        <div class="divider"></div>
        <input class="theme-name" aria-label="Nom du thème" .value=${this.theme.name} @change=${(s) => {
      const e = re(this.theme);
      e.name = s.target.value, this.commit(e);
    }} />
        ${this.dirty ? V`<span class="dirty-badge" title="Modifications non enregistrées"></span>` : S}
        <div class="top-spacer"></div>
        ${this.hass ? S : V`<span class="demo-pill">Aperçu local</span>`}
        <div class="undo-group">
          <button class="icon-button" title="Annuler" ?disabled=${this.historyIndex === 0} @click=${this.undo}>${$("undo", 18)}</button>
        </div>
        <button class="icon-button" title="Rétablir" ?disabled=${this.historyIndex >= this.history.length - 1} @click=${this.redo}>${$("redo", 18)}</button>
        <button class="button secondary-action" @click=${() => {
      this.modal = "presets";
    }}>${$("sparkles", 16)}<span class="optional">Préréglages</span></button>
        ${this.hass ? V`<button class="button secondary-action" @click=${this.openLibrary}>${$("folder", 16)}<span class="optional">Mes thèmes</span></button>` : S}
        <label class="button secondary-action" title="Importer un thème YAML">${$("upload", 16)}<span class="optional">Importer</span><input class="hidden-input" type="file" accept=".yaml,.yml,text/yaml" @change=${this.importFile} /></label>
        <button class="icon-button copy-action" title="Copier le YAML" @click=${this.copyYaml}>${$("copy", 17)}</button>
        <button class="button primary" @click=${this.saveToHomeAssistant}>${$(this.hass ? "save" : "download", 16)}<span>${this.hass ? "Enregistrer" : "Télécharger"}</span></button>
      </header>
    `;
  }
  renderEditor() {
    const s = Bt(this.theme, this.activeMode), e = this.theme.values, t = Ht.find((a) => a.id === this.selectedGroup) ?? Ht[0];
    return V`
      <aside class=${`editor ${this.editorOpen ? "open" : ""}`}>
        <div class="editor-head">
          <div class="summary-line">
            <div class="summary-title"><strong>Variables du thème</strong><span>${Eo(this.theme)} modifiées · ${fr.count} disponibles</span></div>
            <div class="mode-segments" aria-label="Portée du thème">
              ${["base", "light", "dark"].map((a) => V`<button class=${`segment-button ${this.activeMode === a ? "active" : ""}`} title=${a === "base" ? "Valeurs communes" : a === "light" ? "Mode clair" : "Mode sombre"} @click=${() => {
      this.activeMode = a;
    }}>${a === "base" ? "Base" : $(a === "light" ? "sun" : "moon", 14)}</button>`)}
            </div>
          </div>
          <div class="search-row">
            <label class="search">${$("search", 16)}<input type="search" placeholder="Rechercher une variable…" .value=${this.query} @input=${(a) => {
      this.query = a.target.value;
    }} /></label>
            <button class="icon-button add-variable" title="Ajouter une variable personnalisée" @click=${() => {
      this.modal = "custom";
    }}>${$("plus", 17)}</button>
          </div>
          <div class="filter-row">
            <select class="group-select" aria-label="Groupe de variables" .value=${this.selectedGroup} @change=${(a) => {
      this.selectedGroup = a.target.value, this.query = "";
    }}>
              ${Ht.filter((a) => this.expert || a.id !== "advanced").map((a) => V`<option value=${a.id}>${a.label}</option>`)}
            </select>
            <label class="expert-toggle"><input type="checkbox" .checked=${this.expert} @change=${(a) => {
      this.expert = a.target.checked, !this.expert && this.selectedGroup === "advanced" && (this.selectedGroup = "all");
    }} />Expert</label>
          </div>
          ${this.expert ? V`<div class="legacy-row"><label class="expert-toggle"><input type="checkbox" .checked=${this.showLegacy} @change=${(a) => {
      this.showLegacy = a.target.checked;
    }} />Afficher les alias legacy</label></div>` : S}
        </div>
        <div class="variable-list" @variable-change=${this.handleVariableChange}>
          <div class="list-caption"><span>${this.query ? "Résultats" : t.label}</span><span>${this.visibleDefinitions.length} variable${this.visibleDefinitions.length > 1 ? "s" : ""}</span></div>
          ${this.visibleDefinitions.length ? this.visibleDefinitions.map((a) => V`
            <theme-variable-control
              .definition=${a}
              .value=${s[a.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? a.defaultValue : e[a.id] ?? a.defaultValue}
              .overridden=${Object.hasOwn(s, a.id)}
            ></theme-variable-control>
          `) : V`<div class="empty"><div><strong>Aucune variable trouvée</strong><span>Essaie un autre terme ou active le mode expert.</span></div></div>`}
        </div>
      </aside>
    `;
  }
  renderPreview() {
    const s = this.activeMode === "dark" ? "dark" : "light", e = this.activeMode === "base" ? this.theme.values : Co(this.theme, s);
    return V`
      <section class="preview-pane">
        <div class="preview-toolbar">
          <span class="preview-label">Aperçu</span>
          <div class="preview-tabs">
            ${["card", "dashboard", "system"].map((t) => V`<button class=${`segment-button ${this.previewKind === t ? "active" : ""}`} @click=${() => {
      this.previewKind = t;
    }}>${$(t === "card" ? "card" : t === "dashboard" ? "dashboard" : "settings", 14)}<span>${t === "card" ? "Cartes" : t === "dashboard" ? "Dashboard" : "Système"}</span></button>`)}
          </div>
          <div class="device-tabs">
            ${["desktop", "tablet", "mobile"].map((t) => V`<button class=${`segment-button ${this.previewDevice === t ? "active" : ""}`} title=${t} @click=${() => {
      this.previewDevice = t;
    }}>${$(t, 15)}</button>`)}
          </div>
        </div>
        <div class="preview-stage"><ha-theme-preview .values=${e} .kind=${this.previewKind} .device=${this.previewDevice}></ha-theme-preview></div>
      </section>
    `;
  }
  renderModal() {
    return this.modal === "presets" ? V`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Préréglages">
          <div class="dialog-head"><h2>Choisir un point de départ</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${$("close", 18)}</button></div>
          <div class="dialog-body"><div class="preset-grid">${ct.map((s, e) => V`<button class="preset" @click=${() => this.selectPreset(e)}><div class="swatches">${s.swatches.map((t) => V`<span class="swatch" style=${`background:${t}`}></span>`)}</div><strong>${s.name}</strong><p>${s.description}</p></button>`)}</div></div>
        </section>
      </div>
    ` : this.modal === "custom" ? V`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Variable personnalisée">
          <div class="dialog-head"><h2>Ajouter une variable personnalisée</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${$("close", 18)}</button></div>
          <div class="dialog-body">
            <div class="field"><label>Nom de la variable</label><input autofocus placeholder="state-light-reading-color" .value=${this.customName} @input=${(s) => {
      this.customName = s.target.value;
    }} /><div class="field-hint">Sans les deux tirets. Cette entrée couvre aussi les modèles dynamiques comme <code>state-{domain}-{state}-color</code>.</div></div>
            <div class="field"><label>Valeur CSS</label><input placeholder="#ffd166 ou var(--accent-color)" .value=${this.customValue} @input=${(s) => {
      this.customValue = s.target.value;
    }} /></div>
          </div>
          <div class="dialog-actions"><button class="button ghost" @click=${() => {
      this.modal = null;
    }}>Annuler</button><button class="button primary" @click=${this.addCustomVariable}>${$("plus", 15)} Ajouter</button></div>
        </section>
      </div>
    ` : this.modal === "library" ? V`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Mes thèmes">
          <div class="dialog-head"><h2>Mes thèmes Home Assistant</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${$("close", 18)}</button></div>
          <div class="dialog-body">
            ${this.libraryLoading ? V`<div class="empty"><div><strong>Chargement…</strong><span>Lecture de ha_theme_builder.yaml</span></div></div>` : this.savedThemes.length ? V`<div class="library-list">${this.savedThemes.map((s) => V`<button class="library-item" @click=${() => this.loadSavedTheme(s)}><span class="library-icon">${$("palette", 17)}</span><span class="library-copy"><strong>${s}</strong><span>Ouvrir dans l’éditeur</span></span>${$("chevron", 16)}</button>`)}</div>` : V`<div class="empty"><div><strong>Aucun thème enregistré</strong><span>Le premier apparaîtra ici après une sauvegarde.</span></div></div>`}
          </div>
        </section>
      </div>
    ` : S;
  }
  render() {
    return V`
      <div class="app">
        ${this.renderTopbar()}
        <main class="workspace">
          ${this.editorOpen ? V`<div class="editor-scrim" @click=${() => {
      this.editorOpen = !1;
    }}></div>` : S}
          ${this.renderEditor()}
          ${this.renderPreview()}
        </main>
      </div>
      ${this.renderModal()}
      ${this.toast ? V`<div class=${`toast ${this.toast.error ? "error" : ""}`}>${$(this.toast.error ? "close" : "check", 17)}${this.toast.message}</div>` : S}
    `;
  }
};
E.styles = hr;
L([
  z({ attribute: !1 })
], E.prototype, "hass", 2);
L([
  z({ type: Boolean })
], E.prototype, "narrow", 2);
L([
  z({ attribute: !1 })
], E.prototype, "route", 2);
L([
  z({ attribute: !1 })
], E.prototype, "panel", 2);
L([
  j()
], E.prototype, "theme", 2);
L([
  j()
], E.prototype, "activeMode", 2);
L([
  j()
], E.prototype, "previewKind", 2);
L([
  j()
], E.prototype, "previewDevice", 2);
L([
  j()
], E.prototype, "selectedGroup", 2);
L([
  j()
], E.prototype, "query", 2);
L([
  j()
], E.prototype, "expert", 2);
L([
  j()
], E.prototype, "showLegacy", 2);
L([
  j()
], E.prototype, "editorOpen", 2);
L([
  j()
], E.prototype, "modal", 2);
L([
  j()
], E.prototype, "customName", 2);
L([
  j()
], E.prototype, "customValue", 2);
L([
  j()
], E.prototype, "dirty", 2);
L([
  j()
], E.prototype, "toast", 2);
L([
  j()
], E.prototype, "savedThemes", 2);
L([
  j()
], E.prototype, "libraryLoading", 2);
E = L([
  Gt("ha-theme-builder-panel")
], E);
export {
  E as HAThemeBuilderPanel
};
