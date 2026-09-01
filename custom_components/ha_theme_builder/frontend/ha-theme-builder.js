const nt = globalThis, Jt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = /* @__PURE__ */ Symbol(), xa = /* @__PURE__ */ new WeakMap();
let Xa = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== Yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Jt && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = xa.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && xa.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ys = (s) => new Xa(typeof s == "string" ? s : s + "", void 0, Yt), Qt = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((a, r, o) => a + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new Xa(t, s, Yt);
}, Qs = (s, e) => {
  if (Jt) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), r = nt.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = t.cssText, s.appendChild(a);
  }
}, Va = Jt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return Ys(t);
})(s) : s;
const { is: Xs, defineProperty: Zs, getOwnPropertyDescriptor: er, getOwnPropertyNames: tr, getOwnPropertySymbols: ar, getPrototypeOf: sr } = Object, kt = globalThis, Aa = kt.trustedTypes, rr = Aa ? Aa.emptyScript : "", or = kt.reactiveElementPolyfillSupport, Be = (s, e) => s, pt = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? rr : null;
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
} }, Xt = (s, e) => !Xs(s, e), wa = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), kt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ye = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = wa) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, a, t);
      r !== void 0 && Zs(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: r, set: o } = er(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get: r, set(i) {
      const l = r?.call(this);
      o?.call(this, i), this.requestUpdate(e, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? wa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Be("elementProperties"))) return;
    const e = sr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Be("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Be("properties"))) {
      const t = this.properties, a = [...tr(t), ...ar(t)];
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
      for (const r of a) t.unshift(Va(r));
    } else e !== void 0 && t.push(Va(e));
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
    return Qs(e, this.constructor.elementStyles), e;
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
      const o = (a.converter?.toAttribute !== void 0 ? a.converter : pt).toAttribute(t, a.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const a = this.constructor, r = a._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = a.getPropertyOptions(r), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : pt;
      this._$Em = r;
      const l = i.fromAttribute(t, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, r = !1, o) {
    if (e !== void 0) {
      const i = this.constructor;
      if (r === !1 && (o = this[e]), a ??= i.getPropertyOptions(e), !((a.hasChanged ?? Xt)(o, t) || a.useDefault && a.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: r, wrapped: o }, i) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, i ?? t ?? this[e]), o !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: i } = o, l = this[r];
        i !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
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
ye.elementStyles = [], ye.shadowRootOptions = { mode: "open" }, ye[Be("elementProperties")] = /* @__PURE__ */ new Map(), ye[Be("finalized")] = /* @__PURE__ */ new Map(), or?.({ ReactiveElement: ye }), (kt.reactiveElementVersions ??= []).push("2.1.2");
const Zt = globalThis, Ha = (s) => s, mt = Zt.trustedTypes, $a = mt ? mt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Za = "$lit$", te = `lit$${Math.random().toFixed(9).slice(2)}$`, es = "?" + te, ir = `<${es}>`, de = document, Ue = () => de.createComment(""), Re = (s) => s === null || typeof s != "object" && typeof s != "function", ea = Array.isArray, lr = (s) => ea(s) || typeof s?.[Symbol.iterator] == "function", Et = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Sa = /-->/g, _a = />/g, se = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ca = /'/g, Ma = /"/g, ts = /^(?:script|style|textarea|title)$/i, as = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), y = as(1), _ = as(2), ue = /* @__PURE__ */ Symbol.for("lit-noChange"), S = /* @__PURE__ */ Symbol.for("lit-nothing"), Ea = /* @__PURE__ */ new WeakMap(), ie = de.createTreeWalker(de, 129);
function ss(s, e) {
  if (!ea(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $a !== void 0 ? $a.createHTML(e) : e;
}
const nr = (s, e) => {
  const t = s.length - 1, a = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = Oe;
  for (let l = 0; l < t; l++) {
    const n = s[l];
    let c, p, d = -1, u = 0;
    for (; u < n.length && (i.lastIndex = u, p = i.exec(n), p !== null); ) u = i.lastIndex, i === Oe ? p[1] === "!--" ? i = Sa : p[1] !== void 0 ? i = _a : p[2] !== void 0 ? (ts.test(p[2]) && (r = RegExp("</" + p[2], "g")), i = se) : p[3] !== void 0 && (i = se) : i === se ? p[0] === ">" ? (i = r ?? Oe, d = -1) : p[1] === void 0 ? d = -2 : (d = i.lastIndex - p[2].length, c = p[1], i = p[3] === void 0 ? se : p[3] === '"' ? Ma : Ca) : i === Ma || i === Ca ? i = se : i === Sa || i === _a ? i = Oe : (i = se, r = void 0);
    const m = i === se && s[l + 1].startsWith("/>") ? " " : "";
    o += i === Oe ? n + ir : d >= 0 ? (a.push(c), n.slice(0, d) + Za + n.slice(d) + te + m) : n + te + (d === -2 ? l : m);
  }
  return [ss(s, o + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class ze {
  constructor({ strings: e, _$litType$: t }, a) {
    let r;
    this.parts = [];
    let o = 0, i = 0;
    const l = e.length - 1, n = this.parts, [c, p] = nr(e, t);
    if (this.el = ze.createElement(c, a), ie.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = ie.nextNode()) !== null && n.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Za)) {
          const u = p[i++], m = r.getAttribute(d).split(te), g = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: o, name: g[2], strings: m, ctor: g[1] === "." ? dr : g[1] === "?" ? ur : g[1] === "@" ? fr : xt }), r.removeAttribute(d);
        } else d.startsWith(te) && (n.push({ type: 6, index: o }), r.removeAttribute(d));
        if (ts.test(r.tagName)) {
          const d = r.textContent.split(te), u = d.length - 1;
          if (u > 0) {
            r.textContent = mt ? mt.emptyScript : "";
            for (let m = 0; m < u; m++) r.append(d[m], Ue()), ie.nextNode(), n.push({ type: 2, index: ++o });
            r.append(d[u], Ue());
          }
        }
      } else if (r.nodeType === 8) if (r.data === es) n.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(te, d + 1)) !== -1; ) n.push({ type: 7, index: o }), d += te.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const a = de.createElement("template");
    return a.innerHTML = e, a;
  }
}
function He(s, e, t = s, a) {
  if (e === ue) return e;
  let r = a !== void 0 ? t._$Co?.[a] : t._$Cl;
  const o = Re(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, t, a)), a !== void 0 ? (t._$Co ??= [])[a] = r : t._$Cl = r), r !== void 0 && (e = He(s, r._$AS(s, e.values), r, a)), e;
}
class cr {
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
    const { el: { content: t }, parts: a } = this._$AD, r = (e?.creationScope ?? de).importNode(t, !0);
    ie.currentNode = r;
    let o = ie.nextNode(), i = 0, l = 0, n = a[0];
    for (; n !== void 0; ) {
      if (i === n.index) {
        let c;
        n.type === 2 ? c = new Fe(o, o.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (c = new pr(o, this, e)), this._$AV.push(c), n = a[++l];
      }
      i !== n?.index && (o = ie.nextNode(), i++);
    }
    return ie.currentNode = de, r;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class Fe {
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
    e = He(this, e, t), Re(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : lr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && Re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(de.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: a } = e, r = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = ze.createElement(ss(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new cr(r, this), i = o.u(this.options);
      o.p(t), this.T(i), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ea.get(e.strings);
    return t === void 0 && Ea.set(e.strings, t = new ze(e)), t;
  }
  k(e) {
    ea(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, r = 0;
    for (const o of e) r === t.length ? t.push(a = new Fe(this.O(Ue()), this.O(Ue()), this, this.options)) : a = t[r], a._$AI(o), r++;
    r < t.length && (this._$AR(a && a._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const a = Ha(e).nextSibling;
      Ha(e).remove(), e = a;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class xt {
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
    let i = !1;
    if (o === void 0) e = He(this, e, t, 0), i = !Re(e) || e !== this._$AH && e !== ue, i && (this._$AH = e);
    else {
      const l = e;
      let n, c;
      for (e = o[0], n = 0; n < o.length - 1; n++) c = He(this, l[a + n], t, n), c === ue && (c = this._$AH[n]), i ||= !Re(c) || c !== this._$AH[n], c === S ? e = S : e !== S && (e += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    i && !r && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class dr extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class ur extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class fr extends xt {
  constructor(e, t, a, r, o) {
    super(e, t, a, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = He(this, e, t, 0) ?? S) === ue) return;
    const a = this._$AH, r = e === S && a !== S || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, o = e !== S && (a === S || r);
    r && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class pr {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    He(this, e);
  }
}
const mr = Zt.litHtmlPolyfillSupport;
mr?.(ze, Fe), (Zt.litHtmlVersions ??= []).push("3.3.3");
const hr = (s, e, t) => {
  const a = t?.renderBefore ?? e;
  let r = a._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    a._$litPart$ = r = new Fe(e.insertBefore(Ue(), o), o, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
const ta = globalThis;
let ce = class extends ye {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = hr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ue;
  }
};
ce._$litElement$ = !0, ce.finalized = !0, ta.litElementHydrateSupport?.({ LitElement: ce });
const gr = ta.litElementPolyfillSupport;
gr?.({ LitElement: ce });
(ta.litElementVersions ??= []).push("4.2.2");
const aa = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
const br = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Xt }, yr = (s = br, e, t) => {
  const { kind: a, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), a === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(t.name, s), a === "accessor") {
    const { name: i } = t;
    return { set(l) {
      const n = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(i, n, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(i, void 0, s, l), l;
    } };
  }
  if (a === "setter") {
    const { name: i } = t;
    return function(l) {
      const n = this[i];
      e.call(this, l), this.requestUpdate(i, n, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function D(s) {
  return (e, t) => typeof t == "object" ? yr(s, e, t) : ((a, r, o) => {
    const i = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, a), i ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, e, t);
}
function I(s) {
  return D({ ...s, state: !0, attribute: !1 });
}
const vr = { ATTRIBUTE: 1 }, kr = (s) => (...e) => ({ _$litDirective$: s, values: e });
let xr = class {
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
const rs = "important", Vr = " !" + rs, Ar = kr(class extends xr {
  constructor(s) {
    if (super(s), s.type !== vr.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof r == "string" && r.endsWith(Vr);
        a.includes("-") || o ? t.setProperty(a, o ? r.slice(0, -11) : r, o ? rs : "") : t[a] = r;
      }
    }
    return ue;
  }
}), wr = [
  "primary-color",
  "accent-color",
  "primary-background-color",
  "secondary-background-color",
  "primary-text-color",
  "secondary-text-color",
  "ha-card-background",
  "ha-card-backdrop-filter",
  "ha-card-border-color",
  "ha-card-border-radius",
  "sidebar-background-color",
  "app-header-background-color",
  "state-active-color",
  "divider-color"
], Dt = [
  {
    id: "palette",
    label: "Palette globale",
    description: "Couleurs d’accent principales du thème.",
    icon: "palette",
    variables: ["primary-color", "accent-color"]
  },
  {
    id: "background",
    label: "Arrière-plan",
    description: "Fond général du dashboard et image d’arrière-plan.",
    icon: "image",
    variables: ["primary-background-color", "secondary-background-color"],
    photo: !0
  },
  {
    id: "card-surface",
    label: "Surface des cartes",
    description: "Couleur et transparence de la surface des cartes.",
    icon: "card",
    variables: ["ha-card-background", "card-background-color"]
  },
  {
    id: "card-glass",
    label: "Verre et flou",
    description: "Flou et saturation derrière les cartes transparentes.",
    icon: "sparkles",
    variables: ["ha-card-backdrop-filter"]
  },
  {
    id: "card-border",
    label: "Bordures",
    description: "Couleur et épaisseur du contour des cartes.",
    icon: "card",
    variables: ["ha-card-border-color", "ha-card-border-width", "divider-color"]
  },
  {
    id: "card-radius",
    label: "Rayons",
    description: "Arrondi global des cartes Home Assistant.",
    icon: "card",
    variables: ["ha-card-border-radius"]
  },
  {
    id: "card-shadow",
    label: "Ombres",
    description: "Profondeur et ombre portée des cartes.",
    icon: "layers",
    variables: ["ha-card-box-shadow"]
  },
  {
    id: "text",
    label: "Textes",
    description: "Hiérarchie des textes principaux et secondaires.",
    icon: "type",
    variables: ["primary-text-color", "secondary-text-color", "ha-card-header-color"]
  },
  {
    id: "sidebar",
    label: "Barre latérale",
    description: "Surface, texte et icônes de navigation.",
    icon: "sidebar",
    variables: ["sidebar-background-color", "sidebar-text-color", "sidebar-icon-color"]
  },
  {
    id: "header",
    label: "En-tête système",
    description: "Surface et texte de la barre supérieure.",
    icon: "menu",
    variables: ["app-header-background-color", "app-header-text-color"]
  },
  {
    id: "states",
    label: "États et actions",
    description: "Couleurs globales des éléments actifs et inactifs.",
    icon: "activity",
    variables: ["state-active-color", "state-inactive-color"]
  }
], os = (s) => Dt.find((e) => e.id === s) ?? Dt[0], Na = {
  menu: _`<path d="M4 6h16M4 12h16M4 18h16"/>`,
  search: _`<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,
  undo: _`<path d="m9 14-4-4 4-4"/><path d="M5 10h8a6 6 0 0 1 6 6v2"/>`,
  redo: _`<path d="m15 14 4-4-4-4"/><path d="M19 10h-8a6 6 0 0 0-6 6v2"/>`,
  download: _`<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>`,
  upload: _`<path d="M12 16V4m0 0 4 4m-4-4L8 8M5 20h14"/>`,
  save: _`<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/>`,
  folder: _`<path d="M3 6h7l2 2h9v11H3z"/>`,
  image: _`<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/>`,
  layers: _`<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>`,
  type: _`<path d="M5 5h14M12 5v14M8 19h8"/>`,
  sidebar: _`<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M5.5 7h1M5.5 11h1"/>`,
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
function x(s, e = 20) {
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
  >${Na[s] ?? Na.palette}</svg>`;
}
var Hr = Object.defineProperty, $r = Object.getOwnPropertyDescriptor, Je = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? $r(e, t) : e, o = s.length - 1, i; o >= 0; o--)
    (i = s[o]) && (r = (a ? i(e, t, r) : i(r)) || r);
  return a && r && Hr(e, t, r), r;
};
let fe = class extends ce {
  constructor() {
    super(...arguments), this.values = {}, this.kind = "dashboard", this.device = "desktop", this.inspector = !1;
  }
  requestVisualControl(s, e) {
    s.stopPropagation();
    const t = { id: e, clientX: s.clientX, clientY: s.clientY };
    this.dispatchEvent(new CustomEvent("visual-control-request", {
      detail: t,
      bubbles: !0,
      composed: !0
    }));
  }
  renderVisualMarker(s, e) {
    if (!this.inspector) return S;
    const t = os(s);
    return y`<button class=${`visual-marker ${e}`} title=${t.label} aria-label=${`Configurer ${t.label}`} @click=${(a) => this.requestVisualControl(a, s)}><span class="marker-dot">${x(t.icon, 12)}</span><span class="marker-label">${t.label}</span></button>`;
  }
  renderSidebar() {
    return y`
      <aside class="sidebar">
        ${this.renderVisualMarker("sidebar", "sidebar-marker")}
        <div class="brand"><div class="ha-logo">HA</div><div class="brand-name">Home Assistant</div></div>
        <nav class="navigation">
          <div class="nav-item active">${x("dashboard", 15)}<span class="nav-label">Vue d’ensemble</span></div>
          <div class="nav-item">${x("card", 15)}<span class="nav-label">Énergie</span></div>
          <div class="nav-item">${x("settings", 15)}<span class="nav-label">Paramètres</span></div>
        </nav>
        <div class="user"><div class="avatar">JM</div><div class="user-meta"><strong>Maison</strong><span>Administrateur</span></div></div>
      </aside>
    `;
  }
  renderTiles() {
    return y`
      <article class="ha-card tile on">${this.renderVisualMarker("states", "state-marker")}<div class="tile-icon">${x("sun", 16)}</div><strong>Salon</strong><span>Allumée · 72%</span></article>
      <article class="ha-card tile"><div class="tile-icon">${x("settings", 16)}</div><strong>Porte d’entrée</strong><span>Verrouillée</span></article>
      <article class="ha-card tile on"><div class="tile-icon">${x("activity", 16)}</div><strong>Climatisation</strong><span>22,5 °C</span></article>
      <article class="ha-card tile"><div class="tile-icon">${x("card", 16)}</div><strong>Garage</strong><span>Fermé</span></article>
    `;
  }
  renderDashboard() {
    const s = [32, 48, 39, 67, 54, 72, 43, 59, 75, 65, 84, 57];
    return y`
      <div class="view">
        <div class="view-heading"><h1>Bonjour, Julien</h1>${this.renderVisualMarker("text", "text-marker")}<span>Dimanche 31 août · 21 °C</span></div>
        <div class="grid">
          ${this.renderTiles()}
          <article class="ha-card weather">
            ${this.renderVisualMarker("card-surface", "surface-marker")}
            ${this.renderVisualMarker("card-border", "border-marker")}
            ${this.renderVisualMarker("card-radius", "radius-marker")}
            ${this.renderVisualMarker("card-glass", "glass-marker")}
            ${this.renderVisualMarker("card-shadow", "shadow-marker")}
            <div class="weather-top"><h3>Météo</h3><div class="temperature">21<small>°C</small></div></div>
            <div class="forecast">${["Auj.", "Lun.", "Mar.", "Mer.", "Jeu."].map((e, t) => y`<div class="day">${e}<b>${t === 2 ? "☁" : "☀"}</b><strong>${21 + t}°</strong></div>`)}</div>
          </article>
          <article class="ha-card energy"><h3>Énergie aujourd’hui</h3><div class="energy-total">12,4 <small>kWh</small></div><div class="bars">${s.map((e) => y`<div class="bar" style=${`height:${e}%`}></div>`)}</div></article>
          <article class="ha-card entities">
            <h3>Accès rapides</h3>
            ${[["Lampe cuisine", !0], ["Ventilateur chambre", !1], ["Éclairage jardin", !0]].map(([e, t]) => y`
              <div class="entity-row"><div class=${`entity-icon ${t ? "active" : ""}`}>${x("sun", 15)}</div><div><div class="entity-name">${e}</div><div class="entity-state">${t ? "Allumé" : "Éteint"}</div></div><div class=${`switch ${t ? "on" : ""}`}></div></div>
            `)}
          </article>
        </div>
      </div>
    `;
  }
  renderCardGallery() {
    return y`
      <div class="view">
        <div class="view-heading"><h1>Cartes dashboard</h1>${this.renderVisualMarker("text", "text-marker")}<span>Composants natifs</span></div>
        <div class="card-gallery">
          <article class="ha-card thermostat">${this.renderVisualMarker("card-surface", "gallery-surface-marker")}${this.renderVisualMarker("card-radius", "gallery-radius-marker")}${this.renderVisualMarker("card-glass", "glass-marker")}<div class="dial"><strong>22°</strong></div></article>
          <article class="ha-card media"><div class="album"></div><strong>Midnight City</strong><span>M83 · Salon</span></article>
          <article class="ha-card entities">
            <h3>Lumières</h3>
            ${[["Cuisine", !0], ["Bureau", !1], ["Terrasse", !0]].map(([s, e]) => y`<div class="entity-row"><div class=${`entity-icon ${e ? "active" : ""}`}>${x("sun", 15)}</div><div class="entity-name">${s}</div><div class=${`switch ${e ? "on" : ""}`}></div></div>`)}
          </article>
          <article class="ha-card weather"><div class="weather-top"><h3>Montréal</h3><div class="temperature">21<small>°C</small></div></div><div class="forecast">${["15h", "16h", "17h", "18h", "19h"].map((s) => y`<div class="day">${s}<b>☀</b><strong>21°</strong></div>`)}</div></article>
        </div>
      </div>
    `;
  }
  renderSystem() {
    const s = [["HA", "Home Assistant Cloud", "1 service"], ["H", "HomeKit Bridge", "42 entités"], ["Z", "Zigbee Home Automation", "18 appareils"], ["M", "MQTT", "7 appareils"], ["E", "ESPHome", "12 appareils"], ["S", "Sun", "1 entité"]];
    return y`
      <div class="view system-view">
        <div class="system-title">${x("settings", 18)}<h1>Appareils et services</h1>${this.renderVisualMarker("text", "text-marker")}</div>
        <div class="system-tabs"><div class="system-tab active">Intégrations</div><div class="system-tab">Appareils</div><div class="system-tab">Entités</div><div class="system-tab">Assistants</div></div>
        <div class="integration-toolbar"><div class="search-box">${x("search", 13)} Rechercher des intégrations</div><div class="add-button">${x("plus", 16)}</div></div>
        <div class="integration-list">${s.map(([e, t, a], r) => y`<article class="ha-card integration">${r === 0 ? this.renderVisualMarker("card-surface", "system-surface-marker") : S}<div class="integration-logo">${e}</div><div><strong>${t}</strong><span>${a}</span></div><div class="status-dot"></div></article>`)}</div>
      </div>
    `;
  }
  render() {
    const s = Object.fromEntries(Object.entries(this.values).map(([t, a]) => [`--${t}`, a])), e = this.kind === "system" ? "Paramètres" : this.kind === "card" ? "Cartes" : "Vue d’ensemble";
    return y`
      <div class=${`device ${this.device}`} style=${Ar(s)}>
        <div class="shell">
          ${this.kind !== "card" ? this.renderSidebar() : S}
          <main class="main" style=${this.kind === "card" ? "grid-column:1/-1" : ""}>
            <header class="header">${this.renderVisualMarker("header", "header-marker")}<div class="header-icon">${this.device === "mobile" ? x("menu", 17) : x(this.kind === "system" ? "settings" : "dashboard", 16)}</div><div class="header-title">${e}</div><div class="header-icon">${x("search", 16)}</div><div class="header-icon">⋮</div></header>
            <section class="content">${this.renderVisualMarker("background", "background-marker")}${this.kind === "dashboard" ? this.renderDashboard() : this.kind === "card" ? this.renderCardGallery() : this.renderSystem()}</section>
          </main>
        </div>
      </div>
    `;
  }
};
fe.styles = Qt`
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
    .view-heading { position: relative; display: flex; align-items: flex-end; justify-content: space-between; margin: 2px 2px 14px; }
    .view-heading h1 { margin: 0; color: var(--primary-text-color); font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
    .view-heading span { color: var(--secondary-text-color); font-size: 9px; }
    .grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 11px; }
    .ha-card {
      position: relative; min-width: 0; overflow: hidden; color: var(--primary-text-color); background: var(--ha-card-background, var(--card-background-color));
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
    .system-title { position: relative; display: flex; align-items: center; gap: 10px; margin: 1px 0 15px; }
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
    .visual-marker {
      position: absolute; z-index: 30; display: flex; align-items: center; gap: 5px; height: 22px; max-width: 22px; padding: 0;
      overflow: hidden; border: 1px solid rgba(255,255,255,.9); border-radius: 999px; outline: 0; color: #fff;
      background: #6657dd; box-shadow: 0 4px 13px rgba(35, 27, 105, .34); cursor: pointer; pointer-events: auto;
      transition: max-width 160ms ease, transform 120ms ease, box-shadow 120ms ease; white-space: nowrap;
    }
    .visual-marker:hover, .visual-marker:focus-visible { max-width: 145px; box-shadow: 0 6px 18px rgba(35, 27, 105, .42); transform: translateY(-1px); }
    .visual-marker:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .marker-dot { display: grid; place-items: center; flex: 0 0 20px; width: 20px; height: 20px; }
    .marker-label { padding-right: 8px; font-size: 8px; font-weight: 750; letter-spacing: .01em; }
    .sidebar-marker { top: 55px; right: 7px; }
    .header-marker { top: 14px; left: 48%; }
    .background-marker { top: 12px; right: 12px; }
    .text-marker { top: -3px; left: 122px; }
    .state-marker { top: 8px; right: 8px; }
    .surface-marker { top: 13px; right: 13px; }
    .border-marker { top: 50%; right: -1px; transform: translateY(-50%); }
    .border-marker:hover, .border-marker:focus-visible { transform: translateY(calc(-50% - 1px)); }
    .radius-marker { top: -1px; left: -1px; }
    .glass-marker { bottom: 11px; right: 13px; }
    .shadow-marker { bottom: 11px; left: 13px; }
    .gallery-surface-marker { top: 12px; right: 12px; }
    .gallery-radius-marker { top: -1px; left: -1px; }
    .system-surface-marker { top: 8px; right: 8px; }
    .device.mobile .visual-marker, .device.tablet .visual-marker { max-width: 20px; height: 20px; }
    .device.mobile .marker-label, .device.tablet .marker-label { display: none; }
  `;
Je([
  D({ attribute: !1 })
], fe.prototype, "values", 2);
Je([
  D()
], fe.prototype, "kind", 2);
Je([
  D()
], fe.prototype, "device", 2);
Je([
  D({ type: Boolean })
], fe.prototype, "inspector", 2);
fe = Je([
  aa("ha-theme-preview")
], fe);
const J = (s, e, t) => Math.min(t, Math.max(e, s)), Oa = (s) => Math.round(J(s, 0, 255)).toString(16).padStart(2, "0");
function ht(s) {
  const e = s.trim(), t = e.match(/^#([\da-f]{3,8})$/i)?.[1];
  if (t) {
    const o = t.length === 3 || t.length === 4 ? [...t].map((i) => `${i}${i}`).join("") : t;
    if (o.length === 6 || o.length === 8) {
      const i = [
        Number.parseInt(o.slice(0, 2), 16),
        Number.parseInt(o.slice(2, 4), 16),
        Number.parseInt(o.slice(4, 6), 16)
      ];
      return {
        hex: `#${o.slice(0, 6).toLowerCase()}`,
        alpha: o.length === 8 ? Number.parseInt(o.slice(6), 16) / 255 : 1,
        rgb: i
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
      hex: `#${o.map(Oa).join("")}`,
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
    return { hex: `#${o.map(Oa).join("")}`, alpha: 1, rgb: o };
  }
}
function Sr(s, e, t = "css-color") {
  const a = ht(e);
  if (!a) return s;
  if (t === "rgb-triplet") return a.rgb.map(Math.round).join(", ");
  const r = ht(s)?.alpha ?? 1;
  return r >= 0.999 ? a.hex : `rgba(${a.rgb.map(Math.round).join(", ")}, ${r.toFixed(2)})`;
}
function _r(s, e) {
  const t = ht(s);
  return t ? `rgba(${t.rgb.map(Math.round).join(", ")}, ${J(e, 0, 1).toFixed(2)})` : s;
}
var Cr = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, Ye = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? Mr(e, t) : e, o = s.length - 1, i; o >= 0; o--)
    (i = s[o]) && (r = (a ? i(e, t, r) : i(r)) || r);
  return a && r && Cr(e, t, r), r;
};
let pe = class extends ce {
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
    const s = this.current(), e = ht(s), t = e?.hex ?? "#64748b", a = this.definition.format ?? "css-color";
    return y`
      <div class="row">
        <input
          type="color"
          aria-label="Sélecteur de couleur"
          .value=${t}
          @input=${(r) => this.emitValue(Sr(s, r.target.value, a))}
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
      ${a === "css-color" && e ? y`
        <div class="alpha">
          <span>Opacité</span>
          <input
            type="range" min="0" max="1" step="0.01"
            .value=${String(e.alpha)}
            @input=${(r) => this.emitValue(_r(s, Number(r.target.value)))}
          />
          <output>${Math.round(e.alpha * 100)}%</output>
        </div>
      ` : S}
    `;
  }
  renderRange() {
    const s = this.definition.defaultValue || `0${this.definition.unit ?? ""}`, e = Number.parseFloat(this.current() || s), t = Number.isFinite(e) ? e : 0, a = this.definition.min ?? 0, r = this.definition.max ?? 100, o = this.definition.step ?? 1, i = this.definition.unit ?? "", l = (n) => this.emitValue(`${n.target.value}${i}`);
    return y`
      <div class="row">
        <input type="range" .min=${String(a)} .max=${String(r)} .step=${String(o)} .value=${String(t)} @input=${l} />
        <input class="number" type="number" .min=${String(a)} .max=${String(r)} .step=${String(o)} .value=${String(t)} @input=${l} />
        <span class="unit">${i || "—"}</span>
      </div>
      <div class="range-label"><span>${a}${i}</span><span>${r}${i}</span></div>
    `;
  }
  renderFilter() {
    const s = this.current(), e = Number(s.match(/blur\(([\d.]+)px\)/)?.[1] ?? 0), t = Number(s.match(/saturate\(([\d.]+)%\)/)?.[1] ?? 100), a = (r, o) => this.emitValue(r === 0 && o === 100 ? "none" : `blur(${r}px) saturate(${o}%)`);
    return y`
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
    return this.definition.kind === "color" ? this.renderColor() : this.definition.kind === "range" ? this.renderRange() : this.definition.kind === "filter" ? this.renderFilter() : this.definition.kind === "select" ? y`
      <select .value=${this.current()} @change=${(s) => this.emitValue(s.target.value)}>
        ${(this.definition.options ?? []).map((s) => y`<option value=${s}>${s}</option>`)}
      </select>
    ` : y`
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
    return y`
      <section class="control">
        <div class="heading">
          <div class="meta">
            <div class="label-row">
              <div class="label">${this.definition.label}${this.definition.legacy ? y`<span class="badge">legacy</span>` : S}</div>
              <span class="info">
                <button class="info-trigger" type="button" aria-label=${`Description de ${this.definition.label}`} aria-describedby="variable-description">i</button>
                <span class="tooltip" id="variable-description" role="tooltip">${this.definition.description}</span>
              </span>
            </div>
            <div class="key">--${this.definition.id}</div>
          </div>
          <button class="reset" ?disabled=${!this.overridden} title="Réinitialiser cette valeur" @click=${() => this.emitValue(void 0)}>
            ${x("reset", 17)}
          </button>
        </div>
        ${this.renderInput()}
      </section>
    `;
  }
};
pe.styles = Qt`
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
Ye([
  D({ attribute: !1 })
], pe.prototype, "definition", 2);
Ye([
  D()
], pe.prototype, "value", 2);
Ye([
  D()
], pe.prototype, "inheritedValue", 2);
Ye([
  D({ type: Boolean })
], pe.prototype, "overridden", 2);
pe = Ye([
  aa("theme-variable-control")
], pe);
const Er = {
  count: 757
}, Ta = [
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
], Nt = [
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
], Nr = {
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
function at(s, e, t) {
  const a = Nr[s];
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
const Or = [
  at(
    "latte",
    "Catppuccin Latte",
    "La déclinaison claire Catppuccin, douce et lumineuse."
  ),
  at(
    "frappe",
    "Catppuccin Frappé",
    "Un thème sombre adouci aux contrastes feutrés."
  ),
  at(
    "macchiato",
    "Catppuccin Macchiato",
    "Un thème sombre équilibré au contraste intermédiaire."
  ),
  at(
    "mocha",
    "Catppuccin Mocha",
    "La déclinaison Catppuccin la plus sombre et contrastée."
  )
], gt = [
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
  ...Or
], Tr = Qt`
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
  .experience-switch { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 10px; padding: 4px; border-radius: 11px; background: #f1f3f7; }
  .experience-button {
    display: flex; align-items: center; justify-content: center; gap: 7px; min-height: 33px; padding: 0 10px; border: 0; border-radius: 8px;
    color: var(--tb-muted); background: transparent; font-size: 10px; font-weight: 680; cursor: pointer; transition: color 140ms, background 140ms, box-shadow 140ms;
  }
  .experience-button.active { color: var(--tb-accent); background: #fff; box-shadow: 0 2px 9px rgba(40, 48, 72, .09); }
  .feature-option {
    display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 9px; margin-top: 9px; padding: 9px 10px;
    border: 1px solid var(--tb-border); border-radius: 10px; color: var(--tb-text); background: #fff; cursor: pointer;
    transition: border-color 140ms, background 140ms, box-shadow 140ms;
  }
  .feature-option:hover { border-color: #d2cdf7; background: #fbfaff; }
  .feature-option.active { border-color: #d2cdf7; background: #f8f7ff; box-shadow: inset 0 0 0 1px rgba(102, 87, 221, .04); }
  .feature-option input { position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
  .feature-option:has(input:focus-visible) { outline: 2px solid var(--tb-accent); outline-offset: 2px; }
  .feature-switch { position: relative; width: 28px; height: 17px; border-radius: 999px; background: #c9ced8; transition: background 140ms; }
  .feature-switch::after {
    content: ""; position: absolute; top: 2px; left: 2px; width: 13px; height: 13px; border-radius: 50%; background: #fff;
    box-shadow: 0 1px 4px rgba(30, 38, 60, .24); transition: transform 140ms;
  }
  .feature-option.active .feature-switch { background: var(--tb-accent); }
  .feature-option.active .feature-switch::after { transform: translateX(11px); }
  .feature-copy { min-width: 0; }
  .feature-copy strong { display: block; overflow: hidden; font-size: 9.5px; white-space: nowrap; text-overflow: ellipsis; }
  .feature-copy small { display: block; margin-top: 2px; overflow: hidden; color: var(--tb-muted); font-size: 8px; white-space: nowrap; text-overflow: ellipsis; }
  .dependency-badge { padding: 3px 6px; border-radius: 999px; color: #77540c; background: #fff0c9; font-size: 7px; font-weight: 750; white-space: nowrap; text-transform: uppercase; }
  .search-row { display: grid; grid-template-columns: minmax(0, 1fr) 38px; gap: 8px; }
  .expert-search-row { margin-top: 9px; }
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
  .visual-guide {
    display: flex; align-items: center; gap: 9px; margin-top: 10px; padding: 9px 10px; border: 1px solid #dedafc; border-radius: 10px;
    color: #4e429e; background: linear-gradient(135deg, #f4f2ff, #fbfaff);
  }
  .visual-guide-icon { display: grid; place-items: center; flex: 0 0 auto; width: 28px; height: 28px; border-radius: 8px; color: #fff; background: var(--tb-accent); }
  .visual-guide strong { display: block; font-size: 10px; }
  .visual-guide small { display: block; margin-top: 2px; color: #756da2; font-size: 8.5px; }
  .visual-zone-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px; margin-top: 8px; }
  .visual-zone-button {
    display: flex; align-items: center; gap: 6px; min-width: 0; min-height: 30px; padding: 0 8px; border: 1px solid var(--tb-border); border-radius: 8px;
    color: var(--tb-muted); background: #fff; text-align: left; font-size: 8.5px; cursor: pointer; transition: color 140ms, border-color 140ms, background 140ms;
  }
  .visual-zone-button:hover { color: var(--tb-accent); border-color: #cfc9fb; background: #faf9ff; }
  .visual-zone-button svg { flex: 0 0 auto; }
  .visual-zone-button span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .variable-list { min-height: 0; overflow: auto; overscroll-behavior: contain; scrollbar-color: #cbd0db transparent; }
  .list-caption {
    position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; min-height: 35px; padding: 0 16px;
    color: var(--tb-muted); background: rgba(248, 249, 251, .94); border-bottom: 1px solid var(--tb-border); backdrop-filter: blur(12px);
    font-size: 9px; letter-spacing: .025em; text-transform: uppercase;
  }
  .empty { display: grid; place-items: center; min-height: 220px; padding: 30px; color: var(--tb-muted); text-align: center; }
  .empty strong { display: block; margin-bottom: 5px; color: var(--tb-text); font-size: 12px; }
  .empty span { font-size: 10px; line-height: 1.5; }
  .load-more {
    display: block; width: calc(100% - 28px); min-height: 38px; margin: 14px; border: 1px solid #d8d3fa; border-radius: 10px;
    color: var(--tb-accent); background: #f8f7ff; font-size: 9px; font-weight: 700; cursor: pointer;
  }
  .load-more:hover { border-color: var(--tb-accent); background: var(--tb-accent-soft); }
  .preview-pane { display: grid; grid-template-rows: 54px minmax(0, 1fr); min-width: 0; min-height: 0; padding: 0 20px 20px; background: #eef1f6; }
  .preview-toolbar { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .preview-label { color: var(--tb-muted); font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  .preview-tabs, .device-tabs { display: flex; align-items: center; gap: 2px; padding: 3px; border: 1px solid #dfe3ea; border-radius: 10px; background: rgba(255, 255, 255, .72); }
  .preview-tabs .segment-button { min-width: auto; gap: 6px; padding: 0 10px; }
  .preview-tabs .segment-button.active, .device-tabs .segment-button.active { color: var(--tb-accent); background: #fff; }
  .preview-tabs .segment-button { display: flex; }
  .device-tabs { margin-left: auto; }
  .device-tabs .segment-button { min-width: 31px; padding: 0; }
  .background-action { min-height: 34px; padding-inline: 10px; color: var(--tb-muted); background: rgba(255, 255, 255, .72); font-size: 9px; }
  .background-action.active { color: var(--tb-accent); border-color: color-mix(in srgb, var(--tb-accent), transparent 55%); background: var(--tb-accent-soft); }
  .inspector-badge { display: inline-flex; align-items: center; gap: 5px; color: #6255c8; font-size: 8px; font-weight: 700; white-space: nowrap; }
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
  .dialog-spacer { flex: 1; }
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
  .background-dialog { width: min(590px, 100%); }
  .background-preview, .background-placeholder { width: 100%; aspect-ratio: 16 / 7; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--tb-border); border-radius: 12px; background: #f1f3f7; }
  .background-preview img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .background-placeholder { display: grid; place-content: center; justify-items: center; gap: 8px; color: #a0a7b5; }
  .background-placeholder span { font-size: 10px; }
  .background-upload { width: 100%; min-height: 42px; color: var(--tb-accent); border-color: color-mix(in srgb, var(--tb-accent), transparent 58%); background: var(--tb-accent-soft); }
  .background-upload.disabled { cursor: wait; opacity: .65; }
  .background-hint { margin-top: 7px; text-align: center; }
  .or-divider { display: flex; align-items: center; gap: 10px; margin: 15px 0; color: var(--tb-muted); font-size: 9px; text-transform: uppercase; }
  .or-divider::before, .or-divider::after { content: ""; flex: 1; height: 1px; background: var(--tb-border); }
  .background-url-field { margin-bottom: 7px; }
  .visual-menu-scrim { position: fixed; z-index: 80; inset: 0; background: rgba(18, 22, 34, .12); }
  .visual-menu {
    position: fixed; z-index: 90; display: flex; flex-direction: column; width: min(370px, calc(100vw - 24px)); max-height: calc(100vh - 88px); overflow: hidden;
    border: 1px solid rgba(255,255,255,.78); border-radius: 16px; background: #fff; box-shadow: 0 22px 65px rgba(25, 29, 48, .28); animation: visual-menu-in 150ms ease-out;
  }
  .visual-menu-head { display: flex; align-items: center; gap: 10px; min-height: 58px; padding: 9px 10px 9px 13px; border-bottom: 1px solid var(--tb-border); }
  .visual-menu-head > span:nth-child(2) { min-width: 0; flex: 1; }
  .visual-menu-head strong { display: block; font-size: 12px; }
  .visual-menu-head small { display: block; margin-top: 2px; overflow: hidden; color: var(--tb-muted); font-size: 8.5px; white-space: nowrap; text-overflow: ellipsis; }
  .visual-menu-icon { display: grid; place-items: center; flex: 0 0 auto; width: 31px; height: 31px; border-radius: 9px; color: #fff; background: var(--tb-accent); }
  .visual-menu-scope { padding: 7px 14px; color: var(--tb-muted); background: #f7f8fa; border-bottom: 1px solid var(--tb-border); font-size: 8px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
  .visual-menu-controls { min-height: 0; max-height: 480px; overflow: auto; }
  .photo-menu-button {
    display: flex; align-items: center; gap: 10px; width: calc(100% - 24px); min-height: 48px; margin: 12px; padding: 8px 10px;
    border: 1px solid #d8d3fa; border-radius: 10px; color: var(--tb-accent); background: #f7f5ff; text-align: left; cursor: pointer;
  }
  .photo-menu-button > span { min-width: 0; flex: 1; }
  .photo-menu-button strong { display: block; font-size: 10px; }
  .photo-menu-button small { display: block; margin-top: 2px; color: #766fa2; font-size: 8px; }
  @keyframes visual-menu-in { from { opacity: 0; transform: translateY(5px) scale(.985); } }
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
    .background-action span { display: none; }
    .background-action { width: 34px; padding: 0; }
    .inspector-badge { display: none; }
  }
  @media (max-width: 520px) {
    .theme-name { min-width: 90px; width: 36vw; }
    .topbar .icon-button.copy-action { display: none; }
    .button.primary { padding-inline: 10px; }
    .button.primary span { display: none; }
    .preview-stage { padding: 5px; }
    .device-tabs { display: none; }
    .visual-menu { left: 12px !important; top: 70px !important; }
    .preset-grid { grid-template-columns: 1fr; }
  }
`, Lr = /url\(\s*(["']?)(.*?)\1\s*\)/i;
function La(s) {
  return `center / cover no-repeat fixed url("${s.trim().replaceAll("\\", "\\\\").replaceAll('"', '\\"').replace(/[\r\n]/g, "")}")`;
}
function Ot(s) {
  return s ? s.match(Lr)?.[2]?.replaceAll('\\"', '"').replaceAll("\\\\", "\\") ?? "" : "";
}
function Ir(s) {
  const e = s.trim();
  if (e.startsWith("/local/")) return !0;
  try {
    const t = new URL(e);
    return t.protocol === "http:" || t.protocol === "https:";
  } catch {
    return !1;
  }
}
const We = "card-mod-theme", ve = "card-mod-grid-section", je = "card-mod-view-yaml", Vt = "/* ha-theme-builder: section-background-blur:start */", is = "/* ha-theme-builder: section-background-blur:end */", sa = "# ha-theme-builder: section-background-blur:start", Pr = "# ha-theme-builder: section-background-blur:end", Ia = `${Vt}
:host {
  position: relative;
}

:host::before {
  content: "";
  position: absolute;
  inset: calc(-1 * var(--ha-space-2, 8px));
  border-radius: var(--ha-border-radius-xl, 16px);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  pointer-events: none;
}
${is}`;
function ls(s) {
  return JSON.parse(JSON.stringify(s));
}
function ns(s, e, t) {
  let a = s, r = a.indexOf(e);
  for (; r >= 0; ) {
    const o = a.indexOf(t, r + e.length);
    if (o < 0) break;
    a = `${a.slice(0, r)}${a.slice(o + t.length)}`.trim(), r = a.indexOf(e);
  }
  return a.trim();
}
function Br(s) {
  return ns(s, Vt, is);
}
function jr(s) {
  return ns(s, sa, Pr);
}
function qr(s) {
  return Object.keys(s).some((e) => e.startsWith("card-mod-") && e !== We);
}
function cs(s) {
  return !!(s.values[je]?.includes(sa) || s.values[ve]?.includes(Vt));
}
function Ut(s) {
  if (!cs(s)) return s;
  const e = s.name.trim() || "Mon thème", t = s.values[ve] ?? "", r = (s.values[je] ?? "").includes(sa) || t.includes(Vt) && !t.includes(":host::before");
  if (s.values[We] === e && !r) return s;
  if (r) return ds(s, !0);
  const o = ls(s);
  return o.values[We] = e, o;
}
function ds(s, e) {
  const t = ls(s), a = t.values[ve] ?? "", r = Br(a), o = t.values[je] ?? "", i = jr(o);
  return i ? t.values[je] = i : delete t.values[je], e ? (t.values[ve] = r ? `${r}

${Ia}` : Ia, t.values[We] = t.name.trim() || "Mon thème", t) : (r ? t.values[ve] = r : delete t.values[ve], qr(t.values) || delete t.values[We], t);
}
const ra = /* @__PURE__ */ Symbol.for("yaml.alias"), Rt = /* @__PURE__ */ Symbol.for("yaml.document"), ae = /* @__PURE__ */ Symbol.for("yaml.map"), us = /* @__PURE__ */ Symbol.for("yaml.pair"), F = /* @__PURE__ */ Symbol.for("yaml.scalar"), _e = /* @__PURE__ */ Symbol.for("yaml.seq"), z = /* @__PURE__ */ Symbol.for("yaml.node.type"), Ce = (s) => !!s && typeof s == "object" && s[z] === ra, Qe = (s) => !!s && typeof s == "object" && s[z] === Rt, Xe = (s) => !!s && typeof s == "object" && s[z] === ae, L = (s) => !!s && typeof s == "object" && s[z] === us, E = (s) => !!s && typeof s == "object" && s[z] === F, Ze = (s) => !!s && typeof s == "object" && s[z] === _e;
function O(s) {
  if (s && typeof s == "object")
    switch (s[z]) {
      case ae:
      case _e:
        return !0;
    }
  return !1;
}
function T(s) {
  if (s && typeof s == "object")
    switch (s[z]) {
      case ra:
      case ae:
      case F:
      case _e:
        return !0;
    }
  return !1;
}
const fs = (s) => (E(s) || O(s)) && !!s.anchor, oe = /* @__PURE__ */ Symbol("break visit"), Dr = /* @__PURE__ */ Symbol("skip children"), qe = /* @__PURE__ */ Symbol("remove node");
function Me(s, e) {
  const t = Ur(e);
  Qe(s) ? ke(null, s.contents, t, Object.freeze([s])) === qe && (s.contents = null) : ke(null, s, t, Object.freeze([]));
}
Me.BREAK = oe;
Me.SKIP = Dr;
Me.REMOVE = qe;
function ke(s, e, t, a) {
  const r = Rr(s, e, t, a);
  if (T(r) || L(r))
    return zr(s, a, r), ke(s, r, t, a);
  if (typeof r != "symbol") {
    if (O(e)) {
      a = Object.freeze(a.concat(e));
      for (let o = 0; o < e.items.length; ++o) {
        const i = ke(o, e.items[o], t, a);
        if (typeof i == "number")
          o = i - 1;
        else {
          if (i === oe)
            return oe;
          i === qe && (e.items.splice(o, 1), o -= 1);
        }
      }
    } else if (L(e)) {
      a = Object.freeze(a.concat(e));
      const o = ke("key", e.key, t, a);
      if (o === oe)
        return oe;
      o === qe && (e.key = null);
      const i = ke("value", e.value, t, a);
      if (i === oe)
        return oe;
      i === qe && (e.value = null);
    }
  }
  return r;
}
function Ur(s) {
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
function Rr(s, e, t, a) {
  if (typeof t == "function")
    return t(s, e, a);
  if (Xe(e))
    return t.Map?.(s, e, a);
  if (Ze(e))
    return t.Seq?.(s, e, a);
  if (L(e))
    return t.Pair?.(s, e, a);
  if (E(e))
    return t.Scalar?.(s, e, a);
  if (Ce(e))
    return t.Alias?.(s, e, a);
}
function zr(s, e, t) {
  const a = e[e.length - 1];
  if (O(a))
    a.items[s] = t;
  else if (L(a))
    s === "key" ? a.key = t : a.value = t;
  else if (Qe(a))
    a.contents = t;
  else {
    const r = Ce(a) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${r} parent`);
  }
}
const Wr = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Kr = (s) => s.replace(/[!,[\]{}]/g, (e) => Wr[e]);
class j {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, j.defaultYaml, e), this.tags = Object.assign({}, j.defaultTags, t);
  }
  clone() {
    const e = new j(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new j(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: j.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, j.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: j.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, j.defaultTags), this.atNextDocument = !1);
    const a = e.trim().split(/[ \t]+/), r = a.shift();
    switch (r) {
      case "%TAG": {
        if (a.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), a.length < 2))
          return !1;
        const [o, i] = a;
        return this.tags[o] = i, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, a.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [o] = a;
        if (o === "1.1" || o === "1.2")
          return this.yaml.version = o, !0;
        {
          const i = /^\d+\.\d+$/.test(o);
          return t(6, `Unsupported YAML version ${o}`, i), !1;
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
      const i = e.slice(2, -1);
      return i === "!" || i === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), i);
    }
    const [, a, r] = e.match(/^(.*!)([^!]*)$/s);
    r || t(`The ${e} tag has no suffix`);
    const o = this.tags[a];
    if (o)
      try {
        return o + decodeURIComponent(r);
      } catch (i) {
        return t(String(i)), null;
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
        return t + Kr(e.substring(a.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], a = Object.entries(this.tags);
    let r;
    if (e && a.length > 0 && T(e.contents)) {
      const o = {};
      Me(e.contents, (i, l) => {
        T(l) && l.tag && (o[l.tag] = !0);
      }), r = Object.keys(o);
    } else
      r = [];
    for (const [o, i] of a)
      o === "!!" && i === "tag:yaml.org,2002:" || (!e || r.some((l) => l.startsWith(i))) && t.push(`%TAG ${o} ${i}`);
    return t.join(`
`);
  }
}
j.defaultYaml = { explicit: !1, version: "1.2" };
j.defaultTags = { "!!": "tag:yaml.org,2002:" };
function ps(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function ms(s) {
  const e = /* @__PURE__ */ new Set();
  return Me(s, {
    Value(t, a) {
      a.anchor && e.add(a.anchor);
    }
  }), e;
}
function hs(s, e) {
  for (let t = 1; ; ++t) {
    const a = `${s}${t}`;
    if (!e.has(a))
      return a;
  }
}
function Gr(s, e) {
  const t = [], a = /* @__PURE__ */ new Map();
  let r = null;
  return {
    onAnchor: (o) => {
      t.push(o), r ?? (r = ms(s));
      const i = hs(e, r);
      return r.add(i), i;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const o of t) {
        const i = a.get(o);
        if (typeof i == "object" && i.anchor && (E(i.node) || O(i.node)))
          i.node.anchor = i.anchor;
        else {
          const l = new Error("Failed to resolve repeated object (this should not happen)");
          throw l.source = o, l;
        }
      }
    },
    sourceObjects: a
  };
}
function xe(s, e, t, a) {
  if (a && typeof a == "object")
    if (Array.isArray(a))
      for (let r = 0, o = a.length; r < o; ++r) {
        const i = a[r], l = xe(s, a, String(r), i);
        l === void 0 ? delete a[r] : l !== i && (a[r] = l);
      }
    else if (a instanceof Map)
      for (const r of Array.from(a.keys())) {
        const o = a.get(r), i = xe(s, a, r, o);
        i === void 0 ? a.delete(r) : i !== o && a.set(r, i);
      }
    else if (a instanceof Set)
      for (const r of Array.from(a)) {
        const o = xe(s, a, r, r);
        o === void 0 ? a.delete(r) : o !== r && (a.delete(r), a.add(o));
      }
    else
      for (const [r, o] of Object.entries(a)) {
        const i = xe(s, a, r, o);
        i === void 0 ? delete a[r] : i !== o && (a[r] = i);
      }
  return s.call(e, t, a);
}
function R(s, e, t) {
  if (Array.isArray(s))
    return s.map((a, r) => R(a, String(r), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !fs(s))
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
class oa {
  constructor(e) {
    Object.defineProperty(this, z, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: a, onAnchor: r, reviver: o } = {}) {
    if (!Qe(e))
      throw new TypeError("A document argument is required");
    const i = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof a == "number" ? a : 100
    }, l = R(this, "", i);
    if (typeof r == "function")
      for (const { count: n, res: c } of i.anchors.values())
        r(c, n);
    return typeof o == "function" ? xe(o, { "": l }, "", l) : l;
  }
}
class ia extends oa {
  constructor(e) {
    super(ra), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? a = t.aliasResolveCache : (a = [], Me(e, {
      Node: (o, i) => {
        (Ce(i) || fs(i)) && a.push(i);
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
    const { anchors: a, doc: r, maxAliasCount: o } = t, i = this.resolve(r, t);
    if (!i) {
      const n = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(n);
    }
    let l = a.get(i);
    if (l || (R(i, null, t), l = a.get(i)), l?.res === void 0) {
      const n = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(n);
    }
    if (o >= 0 && (l.count += 1, l.aliasCount === 0 && (l.aliasCount = ct(r, i, a)), l.count * l.aliasCount > o)) {
      const n = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(n);
    }
    return l.res;
  }
  toString(e, t, a) {
    const r = `*${this.source}`;
    if (e) {
      if (ps(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const o = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(o);
      }
      if (e.implicitKey)
        return `${r} `;
    }
    return r;
  }
}
function ct(s, e, t) {
  if (Ce(e)) {
    const a = e.resolve(s), r = t && a && t.get(a);
    return r ? r.count * r.aliasCount : 0;
  } else if (O(e)) {
    let a = 0;
    for (const r of e.items) {
      const o = ct(s, r, t);
      o > a && (a = o);
    }
    return a;
  } else if (L(e)) {
    const a = ct(s, e.key, t), r = ct(s, e.value, t);
    return Math.max(a, r);
  }
  return 1;
}
const gs = (s) => !s || typeof s != "function" && typeof s != "object";
class H extends oa {
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
H.BLOCK_FOLDED = "BLOCK_FOLDED";
H.BLOCK_LITERAL = "BLOCK_LITERAL";
H.PLAIN = "PLAIN";
H.QUOTE_DOUBLE = "QUOTE_DOUBLE";
H.QUOTE_SINGLE = "QUOTE_SINGLE";
const Fr = "tag:yaml.org,2002:";
function Jr(s, e, t) {
  if (e) {
    const a = t.filter((o) => o.tag === e), r = a.find((o) => !o.format) ?? a[0];
    if (!r)
      throw new Error(`Tag ${e} not found`);
    return r;
  }
  return t.find((a) => a.identify?.(s) && !a.format);
}
function Ke(s, e, t) {
  if (Qe(s) && (s = s.contents), T(s))
    return s;
  if (L(s)) {
    const d = t.schema[ae].createNode?.(t.schema, null, t);
    return d.items.push(s), d;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: a, onAnchor: r, onTagObj: o, schema: i, sourceObjects: l } = t;
  let n;
  if (a && s && typeof s == "object") {
    if (n = l.get(s), n)
      return n.anchor ?? (n.anchor = r(s)), new ia(n.anchor);
    n = { anchor: null, node: null }, l.set(s, n);
  }
  e?.startsWith("!!") && (e = Fr + e.slice(2));
  let c = Jr(s, e, i.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const d = new H(s);
      return n && (n.node = d), d;
    }
    c = s instanceof Map ? i[ae] : Symbol.iterator in Object(s) ? i[_e] : i[ae];
  }
  o && (o(c), delete t.onTagObj);
  const p = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new H(s);
  return e ? p.tag = e : c.default || (p.tag = c.tag), n && (n.node = p), p;
}
function bt(s, e, t) {
  let a = t;
  for (let r = e.length - 1; r >= 0; --r) {
    const o = e[r];
    if (typeof o == "number" && Number.isInteger(o) && o >= 0) {
      const i = [];
      i[o] = a, a = i;
    } else
      a = /* @__PURE__ */ new Map([[o, a]]);
  }
  return Ke(a, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Ie = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class bs extends oa {
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
    return e && (t.schema = e), t.items = t.items.map((a) => T(a) || L(a) ? a.clone(e) : a), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Ie(e))
      this.add(t);
    else {
      const [a, ...r] = e, o = this.get(a, !0);
      if (O(o))
        o.addIn(r, t);
      else if (o === void 0 && this.schema)
        this.set(a, bt(this.schema, r, t));
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
    if (O(r))
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
    return r.length === 0 ? !t && E(o) ? o.value : o : O(o) ? o.getIn(r, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!L(t))
        return !1;
      const a = t.value;
      return a == null || e && E(a) && a.value == null && !a.commentBefore && !a.comment && !a.tag;
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
    return O(r) ? r.hasIn(a) : !1;
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
      if (O(o))
        o.setIn(r, t);
      else if (o === void 0 && this.schema)
        this.set(a, bt(this.schema, r, t));
      else
        throw new Error(`Expected YAML collection at ${a}. Remaining path: ${r}`);
    }
  }
}
const Yr = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function Y(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const le = (s, e, t) => s.endsWith(`
`) ? Y(t, e) : t.includes(`
`) ? `
` + Y(t, e) : (s.endsWith(" ") ? "" : " ") + t, ys = "flow", zt = "block", dt = "quoted";
function At(s, e, t = "flow", { indentAtStart: a, lineWidth: r = 80, minContentWidth: o = 20, onFold: i, onOverflow: l } = {}) {
  if (!r || r < 0)
    return s;
  r < o && (o = 0);
  const n = Math.max(1 + o, 1 + r - e.length);
  if (s.length <= n)
    return s;
  const c = [], p = {};
  let d = r - e.length;
  typeof a == "number" && (a > r - Math.max(2, o) ? c.push(0) : d = r - a);
  let u, m, g = !1, f = -1, h = -1, v = -1;
  t === zt && (f = Pa(s, f, e.length), f !== -1 && (d = f + n));
  for (let V; V = s[f += 1]; ) {
    if (t === dt && V === "\\") {
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
      v = f;
    }
    if (V === `
`)
      t === zt && (f = Pa(s, f, e.length)), d = f + e.length + n, u = void 0;
    else {
      if (V === " " && m && m !== " " && m !== `
` && m !== "	") {
        const A = s[f + 1];
        A && A !== " " && A !== `
` && A !== "	" && (u = f);
      }
      if (f >= d)
        if (u)
          c.push(u), d = u + n, u = void 0;
        else if (t === dt) {
          for (; m === " " || m === "	"; )
            m = V, V = s[f += 1], g = !0;
          const A = f > v + 1 ? f - 2 : h - 1;
          if (p[A])
            return s;
          c.push(A), p[A] = !0, d = A + n, u = void 0;
        } else
          g = !0;
    }
    m = V;
  }
  if (g && l && l(), c.length === 0)
    return s;
  i && i();
  let k = s.slice(0, c[0]);
  for (let V = 0; V < c.length; ++V) {
    const A = c[V], w = c[V + 1] || s.length;
    A === 0 ? k = `
${e}${s.slice(0, w)}` : (t === dt && p[A] && (k += `${s[A]}\\`), k += `
${e}${s.slice(A + 1, w)}`);
  }
  return k;
}
function Pa(s, e, t) {
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
const wt = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), Ht = (s) => /^(%|---|\.\.\.)/m.test(s);
function Qr(s, e, t) {
  if (!e || e < 0)
    return !1;
  const a = e - t, r = s.length;
  if (r <= a)
    return !1;
  for (let o = 0, i = 0; o < r; ++o)
    if (s[o] === `
`) {
      if (o - i > a)
        return !0;
      if (i = o + 1, r - i <= a)
        return !1;
    }
  return !0;
}
function De(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: a } = e, r = e.options.doubleQuotedMinMultiLineLength, o = e.indent || (Ht(s) ? "  " : "");
  let i = "", l = 0;
  for (let n = 0, c = t[n]; c; c = t[++n])
    if (c === " " && t[n + 1] === "\\" && t[n + 2] === "n" && (i += t.slice(l, n) + "\\ ", n += 1, l = n, c = "\\"), c === "\\")
      switch (t[n + 1]) {
        case "u":
          {
            i += t.slice(l, n);
            const p = t.substr(n + 2, 4);
            switch (p) {
              case "0000":
                i += "\\0";
                break;
              case "0007":
                i += "\\a";
                break;
              case "000b":
                i += "\\v";
                break;
              case "001b":
                i += "\\e";
                break;
              case "0085":
                i += "\\N";
                break;
              case "00a0":
                i += "\\_";
                break;
              case "2028":
                i += "\\L";
                break;
              case "2029":
                i += "\\P";
                break;
              default:
                p.substr(0, 2) === "00" ? i += "\\x" + p.substr(2) : i += t.substr(n, 6);
            }
            n += 5, l = n + 1;
          }
          break;
        case "n":
          if (a || t[n + 2] === '"' || t.length < r)
            n += 1;
          else {
            for (i += t.slice(l, n) + `

`; t[n + 2] === "\\" && t[n + 3] === "n" && t[n + 4] !== '"'; )
              i += `
`, n += 2;
            i += o, t[n + 2] === " " && (i += "\\"), n += 1, l = n + 1;
          }
          break;
        default:
          n += 1;
      }
  return i = l ? i + t.slice(l) : t, a ? i : At(i, o, dt, wt(e, !1));
}
function Wt(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return De(s, e);
  const t = e.indent || (Ht(s) ? "  " : ""), a = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? a : At(a, t, ys, wt(e, !1));
}
function Ve(s, e) {
  const { singleQuote: t } = e.options;
  let a;
  if (t === !1)
    a = De;
  else {
    const r = s.includes('"'), o = s.includes("'");
    r && !o ? a = Wt : o && !r ? a = De : a = t ? Wt : De;
  }
  return a(s, e);
}
let Kt;
try {
  Kt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Kt = /\n+(?!\n|$)/g;
}
function ut({ comment: s, type: e, value: t }, a, r, o) {
  const { blockQuote: i, commentString: l, lineWidth: n } = a.options;
  if (!i || /\n[\t ]+$/.test(t))
    return Ve(t, a);
  const c = a.indent || (a.forceBlockIndent || Ht(t) ? "  " : ""), p = i === "literal" ? !0 : i === "folded" || e === H.BLOCK_FOLDED ? !1 : e === H.BLOCK_LITERAL ? !0 : !Qr(t, n, c.length);
  if (!t)
    return p ? `|
` : `>
`;
  let d, u;
  for (u = t.length; u > 0; --u) {
    const w = t[u - 1];
    if (w !== `
` && w !== "	" && w !== " ")
      break;
  }
  let m = t.substring(u);
  const g = m.indexOf(`
`);
  g === -1 ? d = "-" : t === m || g !== m.length - 1 ? (d = "+", o && o()) : d = "", m && (t = t.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(Kt, `$&${c}`));
  let f = !1, h, v = -1;
  for (h = 0; h < t.length; ++h) {
    const w = t[h];
    if (w === " ")
      f = !0;
    else if (w === `
`)
      v = h;
    else
      break;
  }
  let k = t.substring(0, v < h ? v + 1 : h);
  k && (t = t.substring(k.length), k = k.replace(/\n+/g, `$&${c}`));
  let A = (f ? c ? "2" : "1" : "") + d;
  if (s && (A += " " + l(s.replace(/ ?[\r\n]+/g, " ")), r && r()), !p) {
    const w = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let $ = !1;
    const M = wt(a, !0);
    i !== "folded" && e !== H.BLOCK_FOLDED && (M.onOverflow = () => {
      $ = !0;
    });
    const b = At(`${k}${w}${m}`, c, zt, M);
    if (!$)
      return `>${A}
${c}${b}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${A}
${c}${k}${t}${m}`;
}
function Xr(s, e, t, a) {
  const { type: r, value: o } = s, { actualString: i, implicitKey: l, indent: n, indentStep: c, inFlow: p } = e;
  if (l && o.includes(`
`) || p && /[[\]{},]/.test(o))
    return Ve(o, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))
    return l || p || !o.includes(`
`) ? Ve(o, e) : ut(s, e, t, a);
  if (!l && !p && r !== H.PLAIN && o.includes(`
`))
    return ut(s, e, t, a);
  if (Ht(o)) {
    if (n === "")
      return e.forceBlockIndent = !0, ut(s, e, t, a);
    if (l && n === c)
      return Ve(o, e);
  }
  const d = o.replace(/\n+/g, `$&
${n}`);
  if (i) {
    const u = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(d), { compat: m, tags: g } = e.doc.schema;
    if (g.some(u) || m?.some(u))
      return Ve(o, e);
  }
  return l ? d : At(d, n, ys, wt(e, !1));
}
function la(s, e, t, a) {
  const { implicitKey: r, inFlow: o } = e, i = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: l } = s;
  l !== H.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(i.value) && (l = H.QUOTE_DOUBLE);
  const n = (p) => {
    switch (p) {
      case H.BLOCK_FOLDED:
      case H.BLOCK_LITERAL:
        return r || o ? Ve(i.value, e) : ut(i, e, t, a);
      case H.QUOTE_DOUBLE:
        return De(i.value, e);
      case H.QUOTE_SINGLE:
        return Wt(i.value, e);
      case H.PLAIN:
        return Xr(i, e, t, a);
      default:
        return null;
    }
  };
  let c = n(l);
  if (c === null) {
    const { defaultKeyType: p, defaultStringType: d } = e.options, u = r && p || d;
    if (c = n(u), c === null)
      throw new Error(`Unsupported default string type ${u}`);
  }
  return c;
}
function vs(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Yr,
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
function Zr(s, e) {
  if (e.tag) {
    const r = s.filter((o) => o.tag === e.tag);
    if (r.length > 0)
      return r.find((o) => o.format === e.format) ?? r[0];
  }
  let t, a;
  if (E(e)) {
    a = e.value;
    let r = s.filter((o) => o.identify?.(a));
    if (r.length > 1) {
      const o = r.filter((i) => i.test);
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
function eo(s, e, { anchors: t, doc: a }) {
  if (!a.directives)
    return "";
  const r = [], o = (E(s) || O(s)) && s.anchor;
  o && ps(o) && (t.add(o), r.push(`&${o}`));
  const i = s.tag ?? (e.default ? null : e.tag);
  return i && r.push(a.directives.tagString(i)), r.join(" ");
}
function $e(s, e, t, a) {
  if (L(s))
    return s.toString(e, t, a);
  if (Ce(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let r;
  const o = T(s) ? s : e.doc.createNode(s, { onTagObj: (n) => r = n });
  r ?? (r = Zr(e.doc.schema.tags, o));
  const i = eo(o, r, e);
  i.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + i.length + 1);
  const l = typeof r.stringify == "function" ? r.stringify(o, e, t, a) : E(o) ? la(o, e, t, a) : o.toString(e, t, a);
  return i ? E(o) || l[0] === "{" || l[0] === "[" ? `${i} ${l}` : `${i}
${e.indent}${l}` : l;
}
function to({ key: s, value: e }, t, a, r) {
  const { allNullValues: o, doc: i, indent: l, indentStep: n, options: { commentString: c, indentSeq: p, simpleKeys: d } } = t;
  let u = T(s) && s.comment || null;
  if (d) {
    if (u)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (O(s) || !T(s) && typeof s == "object") {
      const M = "With simple keys, collection cannot be used as a key value";
      throw new Error(M);
    }
  }
  let m = !d && (!s || u && e == null && !t.inFlow || O(s) || (E(s) ? s.type === H.BLOCK_FOLDED || s.type === H.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !m && (d || !o),
    indent: l + n
  });
  let g = !1, f = !1, h = $e(s, t, () => g = !0, () => f = !0);
  if (!m && !t.inFlow && h.length > 1024) {
    if (d)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (t.inFlow) {
    if (o || e == null)
      return g && a && a(), h === "" ? "?" : m ? `? ${h}` : h;
  } else if (o && !d || e == null && m)
    return h = `? ${h}`, u && !g ? h += le(h, t.indent, c(u)) : f && r && r(), h;
  g && (u = null), m ? (u && (h += le(h, t.indent, c(u))), h = `? ${h}
${l}:`) : (h = `${h}:`, u && (h += le(h, t.indent, c(u))));
  let v, k, V;
  T(e) ? (v = !!e.spaceBefore, k = e.commentBefore, V = e.comment) : (v = !1, k = null, V = null, e && typeof e == "object" && (e = i.createNode(e))), t.implicitKey = !1, !m && !u && E(e) && (t.indentAtStart = h.length + 1), f = !1, !p && n.length >= 2 && !t.inFlow && !m && Ze(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let A = !1;
  const w = $e(e, t, () => A = !0, () => f = !0);
  let $ = " ";
  if (u || v || k) {
    if ($ = v ? `
` : "", k) {
      const M = c(k);
      $ += `
${Y(M, t.indent)}`;
    }
    w === "" && !t.inFlow ? $ === `
` && V && ($ = `

`) : $ += `
${t.indent}`;
  } else if (!m && O(e)) {
    const M = w[0], b = w.indexOf(`
`), P = b !== -1, X = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (P || !X) {
      let he = !1;
      if (P && (M === "&" || M === "!")) {
        let B = w.indexOf(" ");
        M === "&" && B !== -1 && B < b && w[B + 1] === "!" && (B = w.indexOf(" ", B + 1)), (B === -1 || b < B) && (he = !0);
      }
      he || ($ = `
${t.indent}`);
    }
  } else (w === "" || w[0] === `
`) && ($ = "");
  return h += $ + w, t.inFlow ? A && a && a() : V && !A ? h += le(h, t.indent, c(V)) : f && r && r(), h;
}
function ks(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const st = "<<", Q = {
  identify: (s) => s === st || typeof s == "symbol" && s.description === st,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new H(Symbol(st)), {
    addToJSMap: xs
  }),
  stringify: () => st
}, ao = (s, e) => (Q.identify(e) || E(e) && (!e.type || e.type === H.PLAIN) && Q.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === Q.tag && t.default);
function xs(s, e, t) {
  const a = Vs(s, t);
  if (Ze(a))
    for (const r of a.items)
      Tt(s, e, r);
  else if (Array.isArray(a))
    for (const r of a)
      Tt(s, e, r);
  else
    Tt(s, e, a);
}
function Tt(s, e, t) {
  const a = Vs(s, t);
  if (!Xe(a))
    throw new Error("Merge sources must be maps or map aliases");
  const r = a.toJSON(null, s, Map);
  for (const [o, i] of r)
    e instanceof Map ? e.has(o) || e.set(o, i) : e instanceof Set ? e.add(o) : Object.prototype.hasOwnProperty.call(e, o) || Object.defineProperty(e, o, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function Vs(s, e) {
  return s && Ce(e) ? e.resolve(s.doc, s) : e;
}
function As(s, e, { key: t, value: a }) {
  if (T(t) && t.addToJSMap)
    t.addToJSMap(s, e, a);
  else if (ao(s, t))
    xs(s, e, a);
  else {
    const r = R(t, "", s);
    if (e instanceof Map)
      e.set(r, R(a, r, s));
    else if (e instanceof Set)
      e.add(r);
    else {
      const o = so(t, r, s), i = R(a, o, s);
      o in e ? Object.defineProperty(e, o, {
        value: i,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : e[o] = i;
    }
  }
  return e;
}
function so(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (T(s) && t?.doc) {
    const a = vs(t.doc, {});
    a.anchors = /* @__PURE__ */ new Set();
    for (const o of t.anchors.keys())
      a.anchors.add(o.anchor);
    a.inFlow = !0, a.inStringifyKey = !0;
    const r = s.toString(a);
    if (!t.mapKeyWarned) {
      let o = JSON.stringify(r);
      o.length > 40 && (o = o.substring(0, 36) + '..."'), ks(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return r;
  }
  return JSON.stringify(e);
}
function na(s, e, t) {
  const a = Ke(s, void 0, t), r = Ke(e, void 0, t);
  return new q(a, r);
}
class q {
  constructor(e, t = null) {
    Object.defineProperty(this, z, { value: us }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: a } = this;
    return T(t) && (t = t.clone(e)), T(a) && (a = a.clone(e)), new q(t, a);
  }
  toJSON(e, t) {
    const a = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return As(t, a, this);
  }
  toString(e, t, a) {
    return e?.doc ? to(this, e, t, a) : JSON.stringify(this);
  }
}
function ws(s, e, t) {
  return (e.inFlow ?? s.flow ? oo : ro)(s, e, t);
}
function ro({ comment: s, items: e }, t, { blockItemPrefix: a, flowChars: r, itemIndent: o, onChompKeep: i, onComment: l }) {
  const { indent: n, options: { commentString: c } } = t, p = Object.assign({}, t, { indent: o, type: null });
  let d = !1;
  const u = [];
  for (let g = 0; g < e.length; ++g) {
    const f = e[g];
    let h = null;
    if (T(f))
      !d && f.spaceBefore && u.push(""), yt(t, u, f.commentBefore, d), f.comment && (h = f.comment);
    else if (L(f)) {
      const k = T(f.key) ? f.key : null;
      k && (!d && k.spaceBefore && u.push(""), yt(t, u, k.commentBefore, d));
    }
    d = !1;
    let v = $e(f, p, () => h = null, () => d = !0);
    h && (v += le(v, o, c(h))), d && h && (d = !1), u.push(a + v);
  }
  let m;
  if (u.length === 0)
    m = r.start + r.end;
  else {
    m = u[0];
    for (let g = 1; g < u.length; ++g) {
      const f = u[g];
      m += f ? `
${n}${f}` : `
`;
    }
  }
  return s ? (m += `
` + Y(c(s), n), l && l()) : d && i && i(), m;
}
function oo({ items: s }, e, { flowChars: t, itemIndent: a }) {
  const { indent: r, indentStep: o, flowCollectionPadding: i, options: { commentString: l } } = e;
  a += o;
  const n = Object.assign({}, e, {
    indent: a,
    inFlow: !0,
    type: null
  });
  let c = !1, p = 0;
  const d = [];
  for (let g = 0; g < s.length; ++g) {
    const f = s[g];
    let h = null;
    if (T(f))
      f.spaceBefore && d.push(""), yt(e, d, f.commentBefore, !1), f.comment && (h = f.comment);
    else if (L(f)) {
      const k = T(f.key) ? f.key : null;
      k && (k.spaceBefore && d.push(""), yt(e, d, k.commentBefore, !1), k.comment && (c = !0));
      const V = T(f.value) ? f.value : null;
      V ? (V.comment && (h = V.comment), V.commentBefore && (c = !0)) : f.value == null && k?.comment && (h = k.comment);
    }
    h && (c = !0);
    let v = $e(f, n, () => h = null);
    c || (c = d.length > p || v.includes(`
`)), g < s.length - 1 ? v += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = d.reduce((k, V) => k + V.length + 2, 2) + (v.length + 2) > e.options.lineWidth)), c && (v += ",")), h && (v += le(v, a, l(h))), d.push(v), p = d.length;
  }
  const { start: u, end: m } = t;
  if (d.length === 0)
    return u + m;
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
${r}${m}`;
  } else
    return `${u}${i}${d.join(" ")}${i}${m}`;
}
function yt({ indent: s, options: { commentString: e } }, t, a, r) {
  if (a && r && (a = a.replace(/^\n+/, "")), a) {
    const o = Y(e(a), s);
    t.push(o.trimStart());
  }
}
function ne(s, e) {
  const t = E(e) ? e.value : e;
  for (const a of s)
    if (L(a) && (a.key === e || a.key === t || E(a.key) && a.key.value === t))
      return a;
}
class U extends bs {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(ae, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, a) {
    const { keepUndefined: r, replacer: o } = a, i = new this(e), l = (n, c) => {
      if (typeof o == "function")
        c = o.call(t, n, c);
      else if (Array.isArray(o) && !o.includes(n))
        return;
      (c !== void 0 || r) && i.items.push(na(n, c, a));
    };
    if (t instanceof Map)
      for (const [n, c] of t)
        l(n, c);
    else if (t && typeof t == "object")
      for (const n of Object.keys(t))
        l(n, t[n]);
    return typeof e.sortMapEntries == "function" && i.items.sort(e.sortMapEntries), i;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    let a;
    L(e) ? a = e : !e || typeof e != "object" || !("key" in e) ? a = new q(e, e?.value) : a = new q(e.key, e.value);
    const r = ne(this.items, a.key), o = this.schema?.sortMapEntries;
    if (r) {
      if (!t)
        throw new Error(`Key ${a.key} already set`);
      E(r.value) && gs(a.value) ? r.value.value = a.value : r.value = a.value;
    } else if (o) {
      const i = this.items.findIndex((l) => o(a, l) < 0);
      i === -1 ? this.items.push(a) : this.items.splice(i, 0, a);
    } else
      this.items.push(a);
  }
  delete(e) {
    const t = ne(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const r = ne(this.items, e)?.value;
    return (!t && E(r) ? r.value : r) ?? void 0;
  }
  has(e) {
    return !!ne(this.items, e);
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
      As(t, r, o);
    return r;
  }
  toString(e, t, a) {
    if (!e)
      return JSON.stringify(this);
    for (const r of this.items)
      if (!L(r))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(r)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), ws(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: a,
      onComment: t
    });
  }
}
const Ee = {
  collection: "map",
  default: !0,
  nodeClass: U,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return Xe(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => U.from(s, e, t)
};
class me extends bs {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(_e, e), this.items = [];
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
    const t = rt(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const a = rt(e);
    if (typeof a != "number")
      return;
    const r = this.items[a];
    return !t && E(r) ? r.value : r;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = rt(e);
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
    const a = rt(e);
    if (typeof a != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const r = this.items[a];
    E(r) && gs(t) ? r.value = t : this.items[a] = t;
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
    return e ? ws(this, e, {
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
      let i = 0;
      for (let l of t) {
        if (typeof r == "function") {
          const n = t instanceof Set ? l : String(i++);
          l = r.call(t, n, l);
        }
        o.items.push(Ke(l, void 0, a));
      }
    }
    return o;
  }
}
function rt(s) {
  let e = E(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const Ne = {
  collection: "seq",
  default: !0,
  nodeClass: me,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return Ze(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => me.from(s, e, t)
}, $t = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, a) {
    return e = Object.assign({ actualString: !0 }, e), la(s, e, t, a);
  }
}, St = {
  identify: (s) => s == null,
  createNode: () => new H(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new H(null),
  stringify: ({ source: s }, e) => typeof s == "string" && St.test.test(s) ? s : e.options.nullStr
}, ca = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new H(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && ca.test.test(s)) {
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
    let i = o.indexOf(".");
    i < 0 && (i = o.length, o += ".");
    let l = e - (o.length - i - 1);
    for (; l-- > 0; )
      o += "0";
  }
  return o;
}
const Hs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, $s = {
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
}, Ss = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new H(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: K
}, _t = (s) => typeof s == "bigint" || Number.isInteger(s), da = (s, e, t, { intAsBigInt: a }) => a ? BigInt(s) : parseInt(s.substring(e), t);
function _s(s, e, t) {
  const { value: a } = s;
  return _t(a) && a >= 0 ? t + a.toString(e) : K(s);
}
const Cs = {
  identify: (s) => _t(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => da(s, 2, 8, t),
  stringify: (s) => _s(s, 8, "0o")
}, Ms = {
  identify: _t,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => da(s, 0, 10, t),
  stringify: K
}, Es = {
  identify: (s) => _t(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => da(s, 2, 16, t),
  stringify: (s) => _s(s, 16, "0x")
}, io = [
  Ee,
  Ne,
  $t,
  St,
  ca,
  Cs,
  Ms,
  Es,
  Hs,
  $s,
  Ss
];
function Ba(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const ot = ({ value: s }) => JSON.stringify(s), lo = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: ot
  },
  {
    identify: (s) => s == null,
    createNode: () => new H(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: ot
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: ot
  },
  {
    identify: Ba,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => Ba(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: ot
  }
], no = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, co = [Ee, Ne].concat(lo, no), ua = {
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
    const i = t;
    let l;
    if (typeof btoa == "function") {
      let n = "";
      for (let c = 0; c < i.length; ++c)
        n += String.fromCharCode(i[c]);
      l = btoa(n);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = H.BLOCK_LITERAL), e !== H.QUOTE_DOUBLE) {
      const n = Math.max(a.options.lineWidth - a.indent.length, a.options.minContentWidth), c = Math.ceil(l.length / n), p = new Array(c);
      for (let d = 0, u = 0; d < c; ++d, u += n)
        p[d] = l.substr(u, n);
      l = p.join(e === H.BLOCK_LITERAL ? `
` : " ");
    }
    return la({ comment: s, type: e, value: l }, a, r, o);
  }
};
function Ns(s, e) {
  if (Ze(s))
    for (let t = 0; t < s.items.length; ++t) {
      let a = s.items[t];
      if (!L(a)) {
        if (Xe(a)) {
          a.items.length > 1 && e("Each pair must have its own sequence indicator");
          const r = a.items[0] || new q(new H(null));
          if (a.commentBefore && (r.key.commentBefore = r.key.commentBefore ? `${a.commentBefore}
${r.key.commentBefore}` : a.commentBefore), a.comment) {
            const o = r.value ?? r.key;
            o.comment = o.comment ? `${a.comment}
${o.comment}` : a.comment;
          }
          a = r;
        }
        s.items[t] = L(a) ? a : new q(a);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function Os(s, e, t) {
  const { replacer: a } = t, r = new me(s);
  r.tag = "tag:yaml.org,2002:pairs";
  let o = 0;
  if (e && Symbol.iterator in Object(e))
    for (let i of e) {
      typeof a == "function" && (i = a.call(e, String(o++), i));
      let l, n;
      if (Array.isArray(i))
        if (i.length === 2)
          l = i[0], n = i[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${i}`);
      else if (i && i instanceof Object) {
        const c = Object.keys(i);
        if (c.length === 1)
          l = c[0], n = i[l];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        l = i;
      r.items.push(na(l, n, t));
    }
  return r;
}
const fa = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: Ns,
  createNode: Os
};
class Ae extends me {
  constructor() {
    super(), this.add = U.prototype.add.bind(this), this.delete = U.prototype.delete.bind(this), this.get = U.prototype.get.bind(this), this.has = U.prototype.has.bind(this), this.set = U.prototype.set.bind(this), this.tag = Ae.tag;
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
      let o, i;
      if (L(r) ? (o = R(r.key, "", t), i = R(r.value, o, t)) : o = R(r, "", t), a.has(o))
        throw new Error("Ordered maps must not include duplicate keys");
      a.set(o, i);
    }
    return a;
  }
  static from(e, t, a) {
    const r = Os(e, t, a), o = new this();
    return o.items = r.items, o;
  }
}
Ae.tag = "tag:yaml.org,2002:omap";
const pa = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: Ae,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = Ns(s, e), a = [];
    for (const { key: r } of t.items)
      E(r) && (a.includes(r.value) ? e(`Ordered maps must not include duplicate keys: ${r.value}`) : a.push(r.value));
    return Object.assign(new Ae(), t);
  },
  createNode: (s, e, t) => Ae.from(s, e, t)
};
function Ts({ value: s, source: e }, t) {
  return e && (s ? Ls : Is).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const Ls = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new H(!0),
  stringify: Ts
}, Is = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new H(!1),
  stringify: Ts
}, uo = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: K
}, fo = {
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
}, po = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(s) {
    const e = new H(parseFloat(s.replace(/_/g, ""))), t = s.indexOf(".");
    if (t !== -1) {
      const a = s.substring(t + 1).replace(/_/g, "");
      a[a.length - 1] === "0" && (e.minFractionDigits = a.length);
    }
    return e;
  },
  stringify: K
}, et = (s) => typeof s == "bigint" || Number.isInteger(s);
function Ct(s, e, t, { intAsBigInt: a }) {
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
    const i = BigInt(s);
    return r === "-" ? BigInt(-1) * i : i;
  }
  const o = parseInt(s, t);
  return r === "-" ? -1 * o : o;
}
function ma(s, e, t) {
  const { value: a } = s;
  if (et(a)) {
    const r = a.toString(e);
    return a < 0 ? "-" + t + r.substr(1) : t + r;
  }
  return K(s);
}
const mo = {
  identify: et,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => Ct(s, 2, 2, t),
  stringify: (s) => ma(s, 2, "0b")
}, ho = {
  identify: et,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => Ct(s, 1, 8, t),
  stringify: (s) => ma(s, 8, "0")
}, go = {
  identify: et,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => Ct(s, 0, 10, t),
  stringify: K
}, bo = {
  identify: et,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => Ct(s, 2, 16, t),
  stringify: (s) => ma(s, 16, "0x")
};
class we extends U {
  constructor(e) {
    super(e), this.tag = we.tag;
  }
  add(e) {
    let t;
    L(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new q(e.key, null) : t = new q(e, null), ne(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const a = ne(this.items, e);
    return !t && L(a) ? E(a.key) ? a.key.value : a.key : a;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const a = ne(this.items, e);
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
      for (let i of t)
        typeof r == "function" && (i = r.call(t, i, i)), o.items.push(na(i, null, a));
    return o;
  }
}
we.tag = "tag:yaml.org,2002:set";
const ha = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: we,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => we.from(s, e, t),
  resolve(s, e) {
    if (Xe(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new we(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function ga(s, e) {
  const t = s[0], a = t === "-" || t === "+" ? s.substring(1) : s, r = (i) => e ? BigInt(i) : Number(i), o = a.replace(/_/g, "").split(":").reduce((i, l) => i * r(60) + r(l), r(0));
  return t === "-" ? r(-1) * o : o;
}
function Ps(s) {
  let { value: e } = s, t = (i) => i;
  if (typeof e == "bigint")
    t = (i) => BigInt(i);
  else if (isNaN(e) || !isFinite(e))
    return K(s);
  let a = "";
  e < 0 && (a = "-", e *= t(-1));
  const r = t(60), o = [e % r];
  return e < 60 ? o.unshift(0) : (e = (e - o[0]) / r, o.unshift(e % r), e >= 60 && (e = (e - o[0]) / r, o.unshift(e))), a + o.map((i) => String(i).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Bs = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => ga(s, t),
  stringify: Ps
}, js = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => ga(s, !1),
  stringify: Ps
}, Mt = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(Mt.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, a, r, o, i, l] = e.map(Number), n = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, a - 1, r, o || 0, i || 0, l || 0, n);
    const p = e[8];
    if (p && p !== "Z") {
      let d = ga(p, !1);
      Math.abs(d) < 30 && (d *= 60), c -= 6e4 * d;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, ja = [
  Ee,
  Ne,
  $t,
  St,
  Ls,
  Is,
  mo,
  ho,
  go,
  bo,
  uo,
  fo,
  po,
  ua,
  Q,
  pa,
  fa,
  ha,
  Bs,
  js,
  Mt
], qa = /* @__PURE__ */ new Map([
  ["core", io],
  ["failsafe", [Ee, Ne, $t]],
  ["json", co],
  ["yaml11", ja],
  ["yaml-1.1", ja]
]), Da = {
  binary: ua,
  bool: ca,
  float: Ss,
  floatExp: $s,
  floatNaN: Hs,
  floatTime: js,
  int: Ms,
  intHex: Es,
  intOct: Cs,
  intTime: Bs,
  map: Ee,
  merge: Q,
  null: St,
  omap: pa,
  pairs: fa,
  seq: Ne,
  set: ha,
  timestamp: Mt
}, yo = {
  "tag:yaml.org,2002:binary": ua,
  "tag:yaml.org,2002:merge": Q,
  "tag:yaml.org,2002:omap": pa,
  "tag:yaml.org,2002:pairs": fa,
  "tag:yaml.org,2002:set": ha,
  "tag:yaml.org,2002:timestamp": Mt
};
function Lt(s, e, t) {
  const a = qa.get(e);
  if (a && !s)
    return t && !a.includes(Q) ? a.concat(Q) : a.slice();
  let r = a;
  if (!r)
    if (Array.isArray(s))
      r = [];
    else {
      const o = Array.from(qa.keys()).filter((i) => i !== "yaml11").map((i) => JSON.stringify(i)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${o} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const o of s)
      r = r.concat(o);
  else typeof s == "function" && (r = s(r.slice()));
  return t && (r = r.concat(Q)), r.reduce((o, i) => {
    const l = typeof i == "string" ? Da[i] : i;
    if (!l) {
      const n = JSON.stringify(i), c = Object.keys(Da).map((p) => JSON.stringify(p)).join(", ");
      throw new Error(`Unknown custom tag ${n}; use one of ${c}`);
    }
    return o.includes(l) || o.push(l), o;
  }, []);
}
const vo = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class ba {
  constructor({ compat: e, customTags: t, merge: a, resolveKnownTags: r, schema: o, sortMapEntries: i, toStringDefaults: l }) {
    this.compat = Array.isArray(e) ? Lt(e, "compat") : e ? Lt(null, e) : null, this.name = typeof o == "string" && o || "core", this.knownTags = r ? yo : {}, this.tags = Lt(t, this.name, a), this.toStringOptions = l ?? null, Object.defineProperty(this, ae, { value: Ee }), Object.defineProperty(this, F, { value: $t }), Object.defineProperty(this, _e, { value: Ne }), this.sortMapEntries = typeof i == "function" ? i : i === !0 ? vo : null;
  }
  clone() {
    const e = Object.create(ba.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function ko(s, e) {
  const t = [];
  let a = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const n = s.directives.toString(s);
    n ? (t.push(n), a = !0) : s.directives.docStart && (a = !0);
  }
  a && t.push("---");
  const r = vs(s, e), { commentString: o } = r.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const n = o(s.commentBefore);
    t.unshift(Y(n, ""));
  }
  let i = !1, l = null;
  if (s.contents) {
    if (T(s.contents)) {
      if (s.contents.spaceBefore && a && t.push(""), s.contents.commentBefore) {
        const p = o(s.contents.commentBefore);
        t.push(Y(p, ""));
      }
      r.forceBlockIndent = !!s.comment, l = s.contents.comment;
    }
    const n = l ? void 0 : () => i = !0;
    let c = $e(s.contents, r, () => l = null, n);
    l && (c += le(c, "", o(l))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push($e(s.contents, r));
  if (s.directives?.docEnd)
    if (s.comment) {
      const n = o(s.comment);
      n.includes(`
`) ? (t.push("..."), t.push(Y(n, ""))) : t.push(`... ${n}`);
    } else
      t.push("...");
  else {
    let n = s.comment;
    n && i && (n = n.replace(/^\n+/, "")), n && ((!i || l) && t[t.length - 1] !== "" && t.push(""), t.push(Y(o(n), "")));
  }
  return t.join(`
`) + `
`;
}
let ya = class qs {
  constructor(e, t, a) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, z, { value: Rt });
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
    let { version: i } = o;
    a?._directives ? (this.directives = a._directives.atDocument(), this.directives.yaml.explicit && (i = this.directives.yaml.version)) : this.directives = new j({ version: i }), this.setSchema(i, a), this.contents = e === void 0 ? null : this.createNode(e, r, a);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(qs.prototype, {
      [z]: { value: Rt }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = T(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    ge(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    ge(this.contents) && this.contents.addIn(e, t);
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
      const a = ms(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || a.has(t) ? hs(t || "a", a) : t;
    }
    return new ia(e.anchor);
  }
  createNode(e, t, a) {
    let r;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), r = t;
    else if (Array.isArray(t)) {
      const h = (k) => typeof k == "number" || k instanceof String || k instanceof Number, v = t.filter(h).map(String);
      v.length > 0 && (t = t.concat(v)), r = t;
    } else a === void 0 && t && (a = t, t = void 0);
    const { aliasDuplicateObjects: o, anchorPrefix: i, flow: l, keepUndefined: n, onTagObj: c, tag: p } = a ?? {}, { onAnchor: d, setAnchors: u, sourceObjects: m } = Gr(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      i || "a"
    ), g = {
      aliasDuplicateObjects: o ?? !0,
      keepUndefined: n ?? !1,
      onAnchor: d,
      onTagObj: c,
      replacer: r,
      schema: this.schema,
      sourceObjects: m
    }, f = Ke(e, p, g);
    return l && O(f) && (f.flow = !0), u(), f;
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
    return ge(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Ie(e) ? this.contents == null ? !1 : (this.contents = null, !0) : ge(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return O(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Ie(e) ? !t && E(this.contents) ? this.contents.value : this.contents : O(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return O(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Ie(e) ? this.contents !== void 0 : O(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = bt(this.schema, [e], t) : ge(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Ie(e) ? this.contents = t : this.contents == null ? this.contents = bt(this.schema, Array.from(e), t) : ge(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new j({ version: "1.1" }), a = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new j({ version: e }), a = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new ba(Object.assign(a, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: a, maxAliasCount: r, onAnchor: o, reviver: i } = {}) {
    const l = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: a === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof r == "number" ? r : 100
    }, n = R(this.contents, t ?? "", l);
    if (typeof o == "function")
      for (const { count: c, res: p } of l.anchors.values())
        o(p, c);
    return typeof i == "function" ? xe(i, { "": n }, "", n) : n;
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
    return ko(this, e);
  }
};
function ge(s) {
  if (O(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Ds extends Error {
  constructor(e, t, a, r) {
    super(), this.name = e, this.code = a, this.message = r, this.pos = t;
  }
}
class Pe extends Ds {
  constructor(e, t, a) {
    super("YAMLParseError", e, t, a);
  }
}
class xo extends Ds {
  constructor(e, t, a) {
    super("YAMLWarning", e, t, a);
  }
}
const Ua = (s, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((l) => e.linePos(l));
  const { line: a, col: r } = t.linePos[0];
  t.message += ` at line ${a}, column ${r}`;
  let o = r - 1, i = s.substring(e.lineStarts[a - 1], e.lineStarts[a]).replace(/[\n\r]+$/, "");
  if (o >= 60 && i.length > 80) {
    const l = Math.min(o - 39, i.length - 79);
    i = "…" + i.substring(l), o -= l - 1;
  }
  if (i.length > 80 && (i = i.substring(0, 79) + "…"), a > 1 && /^ *$/.test(i.substring(0, o))) {
    let l = s.substring(e.lineStarts[a - 2], e.lineStarts[a - 1]);
    l.length > 80 && (l = l.substring(0, 79) + `…
`), i = l + i;
  }
  if (/[^ ]/.test(i)) {
    let l = 1;
    const n = t.linePos[1];
    n?.line === a && n.col > r && (l = Math.max(1, Math.min(n.col - r, 80 - o)));
    const c = " ".repeat(o) + "^".repeat(l);
    t.message += `:

${i}
${c}
`;
  }
};
function Se(s, { flow: e, indicator: t, next: a, offset: r, onError: o, parentIndent: i, startOnNewline: l }) {
  let n = !1, c = l, p = l, d = "", u = "", m = !1, g = !1, f = null, h = null, v = null, k = null, V = null, A = null, w = null;
  for (const b of s)
    switch (g && (b.type !== "space" && b.type !== "newline" && b.type !== "comma" && o(b.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), f && (c && b.type !== "comment" && b.type !== "newline" && o(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), b.type) {
      case "space":
        !e && (t !== "doc-start" || a?.type !== "flow-collection") && b.source.includes("	") && (f = b), p = !0;
        break;
      case "comment": {
        p || o(b, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const P = b.source.substring(1) || " ";
        d ? d += u + P : d = P, u = "", c = !1;
        break;
      }
      case "newline":
        c ? d ? d += b.source : (!A || t !== "seq-item-ind") && (n = !0) : u += b.source, c = !0, m = !0, (h || v) && (k = b), p = !0;
        break;
      case "anchor":
        h && o(b, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), b.source.endsWith(":") && o(b.offset + b.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), h = b, w ?? (w = b.offset), c = !1, p = !1, g = !0;
        break;
      case "tag": {
        v && o(b, "MULTIPLE_TAGS", "A node can have at most one tag"), v = b, w ?? (w = b.offset), c = !1, p = !1, g = !0;
        break;
      }
      case t:
        (h || v) && o(b, "BAD_PROP_ORDER", `Anchors and tags must be after the ${b.source} indicator`), A && o(b, "UNEXPECTED_TOKEN", `Unexpected ${b.source} in ${e ?? "collection"}`), A = b, c = t === "seq-item-ind" || t === "explicit-key-ind", p = !1;
        break;
      case "comma":
        if (e) {
          V && o(b, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), V = b, c = !1, p = !1;
          break;
        }
      // else fallthrough
      default:
        o(b, "UNEXPECTED_TOKEN", `Unexpected ${b.type} token`), c = !1, p = !1;
    }
  const $ = s[s.length - 1], M = $ ? $.offset + $.source.length : r;
  return g && a && a.type !== "space" && a.type !== "newline" && a.type !== "comma" && (a.type !== "scalar" || a.source !== "") && o(a.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (c && f.indent <= i || a?.type === "block-map" || a?.type === "block-seq") && o(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: V,
    found: A,
    spaceBefore: n,
    comment: d,
    hasNewline: m,
    anchor: h,
    tag: v,
    newlineAfterProp: k,
    end: M,
    start: w ?? M
  };
}
function Ge(s) {
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
        if (Ge(e.key) || Ge(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Gt(s, e, t) {
  if (e?.type === "flow-collection") {
    const a = e.end[0];
    a.indent === s && (a.source === "]" || a.source === "}") && Ge(e) && t(a, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Us(s, e, t) {
  const { uniqueKeys: a } = s.options;
  if (a === !1)
    return !1;
  const r = typeof a == "function" ? a : (o, i) => o === i || E(o) && E(i) && o.value === i.value;
  return e.some((o) => r(o.key, t));
}
const Ra = "All mapping items must start at the same column";
function Vo({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const i = o?.nodeClass ?? U, l = new i(t.schema);
  t.atRoot && (t.atRoot = !1);
  let n = a.offset, c = null;
  for (const p of a.items) {
    const { start: d, key: u, sep: m, value: g } = p, f = Se(d, {
      indicator: "explicit-key-ind",
      next: u ?? m?.[0],
      offset: n,
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !0
    }), h = !f.found;
    if (h) {
      if (u && (u.type === "block-seq" ? r(n, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in u && u.indent !== a.indent && r(n, "BAD_INDENT", Ra)), !f.anchor && !f.tag && !m) {
        c = f.end, f.comment && (l.comment ? l.comment += `
` + f.comment : l.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || Ge(u)) && r(u ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== a.indent && r(n, "BAD_INDENT", Ra);
    t.atKey = !0;
    const v = f.end, k = u ? s(t, u, f, r) : e(t, v, d, null, f, r);
    t.schema.compat && Gt(a.indent, u, r), t.atKey = !1, Us(t, l.items, k) && r(v, "DUPLICATE_KEY", "Map keys must be unique");
    const V = Se(m ?? [], {
      indicator: "map-value-ind",
      next: g,
      offset: k.range[2],
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !u || u.type === "block-scalar"
    });
    if (n = V.end, V.found) {
      h && (g?.type === "block-map" && !V.hasNewline && r(n, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && f.start < V.found.offset - 1024 && r(k.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const A = g ? s(t, g, V, r) : e(t, n, m, null, V, r);
      t.schema.compat && Gt(a.indent, g, r), n = A.range[2];
      const w = new q(k, A);
      t.options.keepSourceTokens && (w.srcToken = p), l.items.push(w);
    } else {
      h && r(k.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), V.comment && (k.comment ? k.comment += `
` + V.comment : k.comment = V.comment);
      const A = new q(k);
      t.options.keepSourceTokens && (A.srcToken = p), l.items.push(A);
    }
  }
  return c && c < n && r(c, "IMPOSSIBLE", "Map comment with trailing content"), l.range = [a.offset, n, c ?? n], l;
}
function Ao({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const i = o?.nodeClass ?? me, l = new i(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let n = a.offset, c = null;
  for (const { start: p, value: d } of a.items) {
    const u = Se(p, {
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
        c = u.end, u.comment && (l.comment = u.comment);
        continue;
      }
    const m = d ? s(t, d, u, r) : e(t, u.end, p, null, u, r);
    t.schema.compat && Gt(a.indent, d, r), n = m.range[2], l.items.push(m);
  }
  return l.range = [a.offset, n, c ?? n], l;
}
function tt(s, e, t, a) {
  let r = "";
  if (s) {
    let o = !1, i = "";
    for (const l of s) {
      const { source: n, type: c } = l;
      switch (c) {
        case "space":
          o = !0;
          break;
        case "comment": {
          t && !o && a(l, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const p = n.substring(1) || " ";
          r ? r += i + p : r = p, i = "";
          break;
        }
        case "newline":
          r && (i += n), o = !0;
          break;
        default:
          a(l, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += n.length;
    }
  }
  return { comment: r, offset: e };
}
const It = "Block collections are not allowed within flow collections", Pt = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function wo({ composeNode: s, composeEmptyNode: e }, t, a, r, o) {
  const i = a.start.source === "{", l = i ? "flow map" : "flow sequence", n = o?.nodeClass ?? (i ? U : me), c = new n(t.schema);
  c.flow = !0;
  const p = t.atRoot;
  p && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let d = a.offset + a.start.source.length;
  for (let h = 0; h < a.items.length; ++h) {
    const v = a.items[h], { start: k, key: V, sep: A, value: w } = v, $ = Se(k, {
      flow: l,
      indicator: "explicit-key-ind",
      next: V ?? A?.[0],
      offset: d,
      onError: r,
      parentIndent: a.indent,
      startOnNewline: !1
    });
    if (!$.found) {
      if (!$.anchor && !$.tag && !A && !w) {
        h === 0 && $.comma ? r($.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`) : h < a.items.length - 1 && r($.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${l}`), $.comment && (c.comment ? c.comment += `
` + $.comment : c.comment = $.comment), d = $.end;
        continue;
      }
      !i && t.options.strict && Ge(V) && r(
        V,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (h === 0)
      $.comma && r($.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`);
    else if ($.comma || r($.start, "MISSING_CHAR", `Missing , between ${l} items`), $.comment) {
      let M = "";
      e: for (const b of k)
        switch (b.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            M = b.source.substring(1);
            break e;
          default:
            break e;
        }
      if (M) {
        let b = c.items[c.items.length - 1];
        L(b) && (b = b.value ?? b.key), b.comment ? b.comment += `
` + M : b.comment = M, $.comment = $.comment.substring(M.length + 1);
      }
    }
    if (!i && !A && !$.found) {
      const M = w ? s(t, w, $, r) : e(t, $.end, A, null, $, r);
      c.items.push(M), d = M.range[2], Pt(w) && r(M.range, "BLOCK_IN_FLOW", It);
    } else {
      t.atKey = !0;
      const M = $.end, b = V ? s(t, V, $, r) : e(t, M, k, null, $, r);
      Pt(V) && r(b.range, "BLOCK_IN_FLOW", It), t.atKey = !1;
      const P = Se(A ?? [], {
        flow: l,
        indicator: "map-value-ind",
        next: w,
        offset: b.range[2],
        onError: r,
        parentIndent: a.indent,
        startOnNewline: !1
      });
      if (P.found) {
        if (!i && !$.found && t.options.strict) {
          if (A)
            for (const B of A) {
              if (B === P.found)
                break;
              if (B.type === "newline") {
                r(B, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          $.start < P.found.offset - 1024 && r(P.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else w && ("source" in w && w.source?.[0] === ":" ? r(w, "MISSING_CHAR", `Missing space after : in ${l}`) : r(P.start, "MISSING_CHAR", `Missing , or : between ${l} items`));
      const X = w ? s(t, w, P, r) : P.found ? e(t, P.end, A, null, P, r) : null;
      X ? Pt(w) && r(X.range, "BLOCK_IN_FLOW", It) : P.comment && (b.comment ? b.comment += `
` + P.comment : b.comment = P.comment);
      const he = new q(b, X);
      if (t.options.keepSourceTokens && (he.srcToken = v), i) {
        const B = c;
        Us(t, B.items, b) && r(M, "DUPLICATE_KEY", "Map keys must be unique"), B.items.push(he);
      } else {
        const B = new U(t.schema);
        B.flow = !0, B.items.push(he);
        const ka = (X ?? b).range;
        B.range = [b.range[0], ka[1], ka[2]], c.items.push(B);
      }
      d = X ? X.range[2] : P.end;
    }
  }
  const u = i ? "}" : "]", [m, ...g] = a.end;
  let f = d;
  if (m?.source === u)
    f = m.offset + m.source.length;
  else {
    const h = l[0].toUpperCase() + l.substring(1), v = p ? `${h} must end with a ${u}` : `${h} in block collection must be sufficiently indented and end with a ${u}`;
    r(d, p ? "MISSING_CHAR" : "BAD_INDENT", v), m && m.source.length !== 1 && g.unshift(m);
  }
  if (g.length > 0) {
    const h = tt(g, f, t.options.strict, r);
    h.comment && (c.comment ? c.comment += `
` + h.comment : c.comment = h.comment), c.range = [a.offset, f, h.offset];
  } else
    c.range = [a.offset, f, f];
  return c;
}
function Bt(s, e, t, a, r, o) {
  const i = t.type === "block-map" ? Vo(s, e, t, a, o) : t.type === "block-seq" ? Ao(s, e, t, a, o) : wo(s, e, t, a, o), l = i.constructor;
  return r === "!" || r === l.tagName ? (i.tag = l.tagName, i) : (r && (i.tag = r), i);
}
function Ho(s, e, t, a, r) {
  const o = a.tag, i = o ? e.directives.tagName(o.source, (u) => r(o, "TAG_RESOLVE_FAILED", u)) : null;
  if (t.type === "block-seq") {
    const { anchor: u, newlineAfterProp: m } = a, g = u && o ? u.offset > o.offset ? u : o : u ?? o;
    g && (!m || m.offset < g.offset) && r(g, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const l = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!o || !i || i === "!" || i === U.tagName && l === "map" || i === me.tagName && l === "seq")
    return Bt(s, e, t, r, i);
  let n = e.schema.tags.find((u) => u.tag === i && u.collection === l);
  if (!n) {
    const u = e.schema.knownTags[i];
    if (u?.collection === l)
      e.schema.tags.push(Object.assign({}, u, { default: !1 })), n = u;
    else
      return u ? r(o, "BAD_COLLECTION_TYPE", `${u.tag} used for ${l} collection, but expects ${u.collection ?? "scalar"}`, !0) : r(o, "TAG_RESOLVE_FAILED", `Unresolved tag: ${i}`, !0), Bt(s, e, t, r, i);
  }
  const c = Bt(s, e, t, r, i, n), p = n.resolve?.(c, (u) => r(o, "TAG_RESOLVE_FAILED", u), e.options) ?? c, d = T(p) ? p : new H(p);
  return d.range = c.range, d.tag = i, n?.format && (d.format = n.format), d;
}
function $o(s, e, t) {
  const a = e.offset, r = So(e, s.options.strict, t);
  if (!r)
    return { value: "", type: null, comment: "", range: [a, a, a] };
  const o = r.mode === ">" ? H.BLOCK_FOLDED : H.BLOCK_LITERAL, i = e.source ? _o(e.source) : [];
  let l = i.length;
  for (let f = i.length - 1; f >= 0; --f) {
    const h = i[f][1];
    if (h === "" || h === "\r")
      l = f;
    else
      break;
  }
  if (l === 0) {
    const f = r.chomp === "+" && i.length > 0 ? `
`.repeat(Math.max(1, i.length - 1)) : "";
    let h = a + r.length;
    return e.source && (h += e.source.length), { value: f, type: o, comment: r.comment, range: [a, h, h] };
  }
  let n = e.indent + r.indent, c = e.offset + r.length, p = 0;
  for (let f = 0; f < l; ++f) {
    const [h, v] = i[f];
    if (v === "" || v === "\r")
      r.indent === 0 && h.length > n && (n = h.length);
    else {
      h.length < n && t(c + h.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), r.indent === 0 && (n = h.length), p = f, n === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += h.length + v.length + 1;
  }
  for (let f = i.length - 1; f >= l; --f)
    i[f][0].length > n && (l = f + 1);
  let d = "", u = "", m = !1;
  for (let f = 0; f < p; ++f)
    d += i[f][0].slice(n) + `
`;
  for (let f = p; f < l; ++f) {
    let [h, v] = i[f];
    c += h.length + v.length + 1;
    const k = v[v.length - 1] === "\r";
    if (k && (v = v.slice(0, -1)), v && h.length < n) {
      const A = `Block scalar lines must not be less indented than their ${r.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - v.length - (k ? 2 : 1), "BAD_INDENT", A), h = "";
    }
    o === H.BLOCK_LITERAL ? (d += u + h.slice(n) + v, u = `
`) : h.length > n || v[0] === "	" ? (u === " " ? u = `
` : !m && u === `
` && (u = `

`), d += u + h.slice(n) + v, u = `
`, m = !0) : v === "" ? u === `
` ? d += `
` : u = `
` : (d += u + v, u = " ", m = !1);
  }
  switch (r.chomp) {
    case "-":
      break;
    case "+":
      for (let f = l; f < i.length; ++f)
        d += `
` + i[f][0].slice(n);
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
function So({ offset: s, props: e }, t, a) {
  if (e[0].type !== "block-scalar-header")
    return a(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: r } = e[0], o = r[0];
  let i = 0, l = "", n = -1;
  for (let u = 1; u < r.length; ++u) {
    const m = r[u];
    if (!l && (m === "-" || m === "+"))
      l = m;
    else {
      const g = Number(m);
      !i && g ? i = g : n === -1 && (n = s + u);
    }
  }
  n !== -1 && a(n, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${r}`);
  let c = !1, p = "", d = r.length;
  for (let u = 1; u < e.length; ++u) {
    const m = e[u];
    switch (m.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        d += m.source.length;
        break;
      case "comment":
        t && !c && a(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += m.source.length, p = m.source.substring(1);
        break;
      case "error":
        a(m, "UNEXPECTED_TOKEN", m.message), d += m.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const g = `Unexpected token in block scalar header: ${m.type}`;
        a(m, "UNEXPECTED_TOKEN", g);
        const f = m.source;
        f && typeof f == "string" && (d += f.length);
      }
    }
  }
  return { mode: o, indent: i, chomp: l, comment: p, length: d };
}
function _o(s) {
  const e = s.split(/\n( *)/), t = e[0], a = t.match(/^( *)/), o = [a?.[1] ? [a[1], t.slice(a[1].length)] : ["", t]];
  for (let i = 1; i < e.length; i += 2)
    o.push([e[i], e[i + 1]]);
  return o;
}
function Co(s, e, t) {
  const { offset: a, type: r, source: o, end: i } = s;
  let l, n;
  const c = (u, m, g) => t(a + u, m, g);
  switch (r) {
    case "scalar":
      l = H.PLAIN, n = Mo(o, c);
      break;
    case "single-quoted-scalar":
      l = H.QUOTE_SINGLE, n = Eo(o, c);
      break;
    case "double-quoted-scalar":
      l = H.QUOTE_DOUBLE, n = No(o, c);
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
  const p = a + o.length, d = tt(i, p, e, t);
  return {
    value: n,
    type: l,
    comment: d.comment,
    range: [a, p, d.offset]
  };
}
function Mo(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Rs(s);
}
function Eo(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), Rs(s.slice(1, -1)).replace(/''/g, "'");
}
function Rs(s) {
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
  let r = a[1], o = " ", i = e.lastIndex;
  for (t.lastIndex = i; a = t.exec(s); )
    a[1] === "" ? o === `
` ? r += o : o = `
` : (r += o + a[1], o = " "), i = t.lastIndex;
  const l = /[ \t]*(.*)/sy;
  return l.lastIndex = i, a = l.exec(s), r + o + (a?.[1] ?? "");
}
function No(s, e) {
  let t = "";
  for (let a = 1; a < s.length - 1; ++a) {
    const r = s[a];
    if (!(r === "\r" && s[a + 1] === `
`))
      if (r === `
`) {
        const { fold: o, offset: i } = Oo(s, a);
        t += o, a = i;
      } else if (r === "\\") {
        let o = s[++a];
        const i = To[o];
        if (i)
          t += i;
        else if (o === `
`)
          for (o = s[a + 1]; o === " " || o === "	"; )
            o = s[++a + 1];
        else if (o === "\r" && s[a + 1] === `
`)
          for (o = s[++a + 1]; o === " " || o === "	"; )
            o = s[++a + 1];
        else if (o === "x" || o === "u" || o === "U") {
          const l = o === "x" ? 2 : o === "u" ? 4 : 8;
          t += Lo(s, a + 1, l, e), a += l;
        } else {
          const l = s.substr(a - 1, 2);
          e(a - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), t += l;
        }
      } else if (r === " " || r === "	") {
        const o = a;
        let i = s[a + 1];
        for (; i === " " || i === "	"; )
          i = s[++a + 1];
        i !== `
` && !(i === "\r" && s[a + 2] === `
`) && (t += a > o ? s.slice(o, a + 1) : r);
      } else
        t += r;
  }
  return (s[s.length - 1] !== '"' || s.length === 1) && e(s.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function Oo(s, e) {
  let t = "", a = s[e + 1];
  for (; (a === " " || a === "	" || a === `
` || a === "\r") && !(a === "\r" && s[e + 2] !== `
`); )
    a === `
` && (t += `
`), e += 1, a = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const To = {
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
function Lo(s, e, t, a) {
  const r = s.substr(e, t), i = r.length === t && /^[0-9a-fA-F]+$/.test(r) ? parseInt(r, 16) : NaN;
  try {
    return String.fromCodePoint(i);
  } catch {
    const l = s.substr(e - 2, t + 2);
    return a(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), l;
  }
}
function zs(s, e, t, a) {
  const { value: r, type: o, comment: i, range: l } = e.type === "block-scalar" ? $o(s, e, a) : Co(e, s.options.strict, a), n = t ? s.directives.tagName(t.source, (d) => a(t, "TAG_RESOLVE_FAILED", d)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[F] : n ? c = Io(s.schema, r, n, t, a) : e.type === "scalar" ? c = Po(s, r, e, a) : c = s.schema[F];
  let p;
  try {
    const d = c.resolve(r, (u) => a(t ?? e, "TAG_RESOLVE_FAILED", u), s.options);
    p = E(d) ? d : new H(d);
  } catch (d) {
    const u = d instanceof Error ? d.message : String(d);
    a(t ?? e, "TAG_RESOLVE_FAILED", u), p = new H(r);
  }
  return p.range = l, p.source = r, o && (p.type = o), n && (p.tag = n), c.format && (p.format = c.format), i && (p.comment = i), p;
}
function Io(s, e, t, a, r) {
  if (t === "!")
    return s[F];
  const o = [];
  for (const l of s.tags)
    if (!l.collection && l.tag === t)
      if (l.default && l.test)
        o.push(l);
      else
        return l;
  for (const l of o)
    if (l.test?.test(e))
      return l;
  const i = s.knownTags[t];
  return i && !i.collection ? (s.tags.push(Object.assign({}, i, { default: !1, test: void 0 })), i) : (r(a, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[F]);
}
function Po({ atKey: s, directives: e, schema: t }, a, r, o) {
  const i = t.tags.find((l) => (l.default === !0 || s && l.default === "key") && l.test?.test(a)) || t[F];
  if (t.compat) {
    const l = t.compat.find((n) => n.default && n.test?.test(a)) ?? t[F];
    if (i.tag !== l.tag) {
      const n = e.tagString(i.tag), c = e.tagString(l.tag), p = `Value may be parsed as either ${n} or ${c}`;
      o(r, "TAG_RESOLVE_FAILED", p, !0);
    }
  }
  return i;
}
function Bo(s, e, t) {
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
const jo = { composeNode: Ws, composeEmptyNode: va };
function Ws(s, e, t, a) {
  const r = s.atKey, { spaceBefore: o, comment: i, anchor: l, tag: n } = t;
  let c, p = !0;
  switch (e.type) {
    case "alias":
      c = qo(s, e, a), (l || n) && a(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = zs(s, e, n, a), l && (c.anchor = l.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = Ho(jo, s, e, t, a), l && (c.anchor = l.source.substring(1));
      } catch (d) {
        const u = d instanceof Error ? d.message : String(d);
        a(e, "RESOURCE_EXHAUSTION", u);
      }
      break;
    default: {
      const d = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      a(e, "UNEXPECTED_TOKEN", d), p = !1;
    }
  }
  return c ?? (c = va(s, e.offset, void 0, null, t, a)), l && c.anchor === "" && a(l, "BAD_ALIAS", "Anchor cannot be an empty string"), r && s.options.stringKeys && (!E(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && a(n ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), o && (c.spaceBefore = !0), i && (e.type === "scalar" && e.source === "" ? c.comment = i : c.commentBefore = i), s.options.keepSourceTokens && p && (c.srcToken = e), c;
}
function va(s, e, t, a, { spaceBefore: r, comment: o, anchor: i, tag: l, end: n }, c) {
  const p = {
    type: "scalar",
    offset: Bo(e, t, a),
    indent: -1,
    source: ""
  }, d = zs(s, p, l, c);
  return i && (d.anchor = i.source.substring(1), d.anchor === "" && c(i, "BAD_ALIAS", "Anchor cannot be an empty string")), r && (d.spaceBefore = !0), o && (d.comment = o, d.range[2] = n), d;
}
function qo({ options: s }, { offset: e, source: t, end: a }, r) {
  const o = new ia(t.substring(1));
  o.source === "" && r(e, "BAD_ALIAS", "Alias cannot be an empty string"), o.source.endsWith(":") && r(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const i = e + t.length, l = tt(a, i, s.strict, r);
  return o.range = [e, i, l.offset], l.comment && (o.comment = l.comment), o;
}
function Do(s, e, { offset: t, start: a, value: r, end: o }, i) {
  const l = Object.assign({ _directives: e }, s), n = new ya(void 0, l), c = {
    atKey: !1,
    atRoot: !0,
    directives: n.directives,
    options: n.options,
    schema: n.schema
  }, p = Se(a, {
    indicator: "doc-start",
    next: r ?? o?.[0],
    offset: t,
    onError: i,
    parentIndent: 0,
    startOnNewline: !0
  });
  p.found && (n.directives.docStart = !0, r && (r.type === "block-map" || r.type === "block-seq") && !p.hasNewline && i(p.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), n.contents = r ? Ws(c, r, p, i) : va(c, p.end, a, null, p, i);
  const d = n.contents.range[2], u = tt(o, d, !1, i);
  return u.comment && (n.comment = u.comment), n.range = [t, d, u.offset], n;
}
function Te(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function za(s) {
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
class Uo {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, a, r, o) => {
      const i = Te(t);
      o ? this.warnings.push(new xo(i, a, r)) : this.errors.push(new Pe(i, a, r));
    }, this.directives = new j({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: a, afterEmptyLine: r } = za(this.prelude);
    if (a) {
      const o = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${a}` : a;
      else if (r || e.directives.docStart || !o)
        e.commentBefore = a;
      else if (O(o) && !o.flow && o.items.length > 0) {
        let i = o.items[0];
        L(i) && (i = i.key);
        const l = i.commentBefore;
        i.commentBefore = l ? `${a}
${l}` : a;
      } else {
        const i = o.commentBefore;
        o.commentBefore = i ? `${a}
${i}` : a;
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
      comment: za(this.prelude).comment,
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
          const o = Te(e);
          o[0] += t, this.onError(o, "BAD_DIRECTIVE", a, r);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = Do(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, a = new Pe(Te(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(a) : this.doc.errors.push(a);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const a = "Unexpected doc-end without preceding document";
          this.errors.push(new Pe(Te(e), "UNEXPECTED_TOKEN", a));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = tt(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const a = this.doc.comment;
          this.doc.comment = a ? `${a}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new Pe(Te(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const a = Object.assign({ _directives: this.directives }, this.options), r = new ya(void 0, a);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), r.range = [0, t, t], this.decorate(r, !1), yield r;
    }
  }
}
const Ks = "\uFEFF", Gs = "", Fs = "", Ft = "";
function Ro(s) {
  switch (s) {
    case Ks:
      return "byte-order-mark";
    case Gs:
      return "doc-mode";
    case Fs:
      return "flow-error-end";
    case Ft:
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
const Wa = new Set("0123456789ABCDEFabcdef"), zo = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), it = new Set(",[]{}"), Wo = new Set(` ,[]{}
\r	`), jt = (s) => !s || Wo.has(s);
class Ko {
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
    if (e[0] === Ks && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield Gs, yield* this.parseLineStart();
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
        return yield* this.pushUntil(jt), "doc";
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
      return this.flowLevel = 0, yield Fs, yield* this.parseLineStart();
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
        return yield* this.pushUntil(jt), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const i = this.charAt(1);
        if (this.flowKey || W(i) || i === ",")
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
          const i = this.buffer[o + 1];
          if (!i && !this.atEnd)
            return this.setNext("block-scalar");
          if (i === `
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
        let o = e - 1, i = this.buffer[o];
        i === "\r" && (i = this.buffer[--o]);
        const l = o;
        for (; i === " "; )
          i = this.buffer[--o];
        if (i === `
` && o >= this.pos && o + 1 + t > l)
          e = o;
        else
          break;
      } while (!0);
    return yield Ft, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, a = this.pos - 1, r;
    for (; r = this.buffer[++a]; )
      if (r === ":") {
        const o = this.buffer[a + 1];
        if (W(o) || e && it.has(o))
          break;
        t = a;
      } else if (W(r)) {
        let o = this.buffer[a + 1];
        if (r === "\r" && (o === `
` ? (a += 1, r = `
`, o = this.buffer[a + 1]) : t = a), o === "#" || e && it.has(o))
          break;
        if (r === `
`) {
          const i = this.continueScalar(a + 1);
          if (i === -1)
            break;
          a = Math.max(a, i - 2);
        }
      } else {
        if (e && it.has(r))
          break;
        t = a;
      }
    return !r && !this.atEnd ? this.setNext("plain-scalar") : (yield Ft, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(jt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, a = this.charAt(1);
          if (W(a) || t && it.has(a)) {
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
        if (zo.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Wa.has(this.buffer[e + 1]) && Wa.has(this.buffer[e + 2]))
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
class Go {
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
function ee(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function Ka(s) {
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
function Js(s) {
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
function lt(s) {
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
function be(s) {
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
function vt(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function Ga(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !ee(e.start, "explicit-key-ind") && !ee(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Js(e.value) ? e.value.end ? vt(e.value.end, e.sep) : e.value.end = e.sep : vt(e.start, e.sep), delete e.sep);
}
class Fo {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Ko(), this.onNewLine = e;
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
    const t = Ro(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in a ? a.indent : 0 : t.type === "flow-collection" && a.type === "document" && (t.indent = 0), t.type === "flow-collection" && Ga(t), a.type) {
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
        r && !r.sep && !r.value && r.start.length > 0 && Ka(r.start) === -1 && (t.indent === 0 || r.start.every((o) => o.type !== "comment" || o.indent < t.indent)) && (a.type === "document" ? a.end = r.start : a.items.push({ start: r.start }), t.items.splice(-1, 1));
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
        Ka(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = lt(this.peek(2)), a = be(t);
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
              vt(r, t.start), r.push(this.sourceToken), e.items.pop();
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
        const i = [];
        for (let l = 0; l < t.sep.length; ++l) {
          const n = t.sep[l];
          switch (n.type) {
            case "newline":
              i.push(l);
              break;
            case "space":
              break;
            case "comment":
              n.indent > e.indent && (i.length = 0);
              break;
            default:
              i.length = 0;
          }
        }
        i.length >= 2 && (o = t.sep.splice(i[1]));
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
              else if (ee(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: null, sep: [this.sourceToken] }]
                });
              else if (Js(t.key) && !ee(t.sep, "newline")) {
                const i = be(t.start), l = t.key, n = t.sep;
                n.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: i, key: l, sep: n }]
                });
              } else o.length > 0 ? t.sep = t.sep.concat(o, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (ee(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const i = be(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: i, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || r ? e.items.push({ start: o, key: null, sep: [this.sourceToken] }) : ee(t.sep, "map-value-ind") ? this.stack.push({
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
          const i = this.flowScalar(this.type);
          r || t.value ? (e.items.push({ start: o, key: i, sep: [] }), this.onKeyLine = !0) : t.sep ? this.stack.push(i) : (Object.assign(t, { key: i, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const i = this.startBlockValue(e);
          if (i) {
            if (i.type === "block-seq") {
              if (!t.explicitKey && t.sep && !ee(t.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else a && e.items.push({ start: o });
            this.stack.push(i);
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
              vt(r, t.start), r.push(this.sourceToken), e.items.pop();
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
        t.value || ee(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const r = lt(a), o = be(r);
        Ga(e);
        const i = e.end.splice(1, e.end.length);
        i.push(this.sourceToken);
        const l = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: o, key: e, sep: i }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = l;
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
        const t = lt(e), a = be(t);
        return a.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: a, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = lt(e), a = be(t);
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
function Jo(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new Go() || null, prettyErrors: e };
}
function Yo(s, e = {}) {
  const { lineCounter: t, prettyErrors: a } = Jo(e), r = new Fo(t?.addNewLine), o = new Uo(e);
  let i = null;
  for (const l of o.compose(r.parse(s), !0, s.length))
    if (!i)
      i = l;
    else if (i.options.logLevel !== "silent") {
      i.errors.push(new Pe(l.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return a && t && (i.errors.forEach(Ua(s, t)), i.warnings.forEach(Ua(s, t))), i;
}
function Qo(s, e, t) {
  let a;
  const r = Yo(s, t);
  if (!r)
    return null;
  if (r.warnings.forEach((o) => ks(r.options.logLevel, o)), r.errors.length > 0) {
    if (r.options.logLevel !== "silent")
      throw r.errors[0];
    r.errors = [];
  }
  return r.toJS(Object.assign({ reviver: a }, t));
}
function Xo(s, e, t) {
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
  return Qe(s) && !a ? s.toString(t) : new ya(s, a, t).toString(t);
}
const Zo = /^[a-z][a-z0-9_-]*$/;
function Z(s) {
  return JSON.parse(JSON.stringify(s));
}
function ft(s, e) {
  return e === "base" ? s.values : s.modes[e];
}
function Fa(s, e) {
  return { ...s.values, ...s.modes[e] };
}
function Le(s, e, t, a) {
  const r = Z(s), o = ft(r, e);
  return a === void 0 || !a.trim() ? delete o[t] : o[t] = a.trim(), r;
}
function Ja(s) {
  const e = Ut(s), t = { ...e.values }, a = {};
  return Object.keys(e.modes.light).length && (a.light = e.modes.light), Object.keys(e.modes.dark).length && (a.dark = e.modes.dark), Object.keys(a).length && (t.modes = a), Xo({ [e.name.trim() || "Mon thème"]: t }, { lineWidth: 0, singleQuote: !1 });
}
function qt(s) {
  return !s || typeof s != "object" || Array.isArray(s) ? {} : Object.fromEntries(
    Object.entries(s).filter(([e, t]) => Zo.test(e) && ["string", "number", "boolean"].includes(typeof t)).map(([e, t]) => [e, String(t)])
  );
}
function ei(s) {
  const e = Qo(s);
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("Le fichier YAML ne contient aucun thème valide.");
  const t = Object.entries(e);
  if (!t.length) throw new Error("Le fichier YAML est vide.");
  const [a, r] = t[0];
  if (!r || typeof r != "object" || Array.isArray(r))
    throw new Error("Le premier thème n’est pas un objet YAML valide.");
  const o = r, i = o.modes && typeof o.modes == "object" && !Array.isArray(o.modes) ? o.modes : {}, l = qt(Object.fromEntries(Object.entries(o).filter(([n]) => n !== "modes")));
  return {
    name: a,
    values: l,
    modes: {
      light: qt(i.light),
      dark: qt(i.dark)
    }
  };
}
function ti(s) {
  return (/* @__PURE__ */ new Set([
    ...Object.keys(s.values),
    ...Object.keys(s.modes.light),
    ...Object.keys(s.modes.dark)
  ])).size;
}
var ai = Object.defineProperty, si = Object.getOwnPropertyDescriptor, N = (s, e, t, a) => {
  for (var r = a > 1 ? void 0 : a ? si(e, t) : e, o = s.length - 1, i; o >= 0; o--)
    (i = s[o]) && (r = (a ? i(e, t, r) : i(r)) || r);
  return a && r && ai(e, t, r), r;
};
const Ya = "ha-theme-builder:draft:v1", ri = /^[a-z][a-z0-9_-]*$/, oi = 8 * 1024 * 1024, re = 120;
function ii(s) {
  return new Promise((e, t) => {
    const a = new FileReader();
    a.onerror = () => t(new Error("Lecture de l’image impossible.")), a.onload = () => {
      const o = (typeof a.result == "string" ? a.result : "").split(",", 2)[1];
      o ? e(o) : t(new Error("Lecture de l’image impossible."));
    }, a.readAsDataURL(s);
  });
}
function Qa(s = 1) {
  const e = gt[s] ?? gt[0];
  return {
    name: e.name,
    values: { ...e.theme.values },
    modes: {
      light: { ...e.theme.modes.light },
      dark: { ...e.theme.modes.dark }
    }
  };
}
let C = class extends ce {
  constructor() {
    super(...arguments), this.narrow = !1, this.theme = Qa(), this.activeMode = "base", this.previewKind = "dashboard", this.previewDevice = "desktop", this.selectedGroup = "all", this.query = "", this.expert = !1, this.showLegacy = !1, this.editorOpen = !1, this.modal = null, this.customName = "", this.customValue = "", this.dirty = !1, this.savedThemes = [], this.libraryLoading = !1, this.backgroundUrl = "", this.backgroundUploading = !1, this.expertLimit = re, this.history = [Z(this.theme)], this.historyIndex = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const s = window.localStorage.getItem(Ya);
      if (s) {
        const e = JSON.parse(s);
        e?.name && e?.values && e?.modes && (this.theme = e, this.history = [Z(e)]);
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
        window.localStorage.setItem(Ya, JSON.stringify(this.theme));
      } catch {
      }
    if (s.has("dirty")) {
      const e = window;
      e.isDirtyState = this.dirty, window.dispatchEvent(new CustomEvent("dirty-state-changed", { detail: { isDirty: this.dirty } }));
    }
  }
  commit(s, e = !0) {
    this.theme = s, this.history = [...this.history.slice(0, this.historyIndex + 1), Z(s)].slice(-80), this.historyIndex = this.history.length - 1, e && (this.dirty = !0);
  }
  undo() {
    this.historyIndex <= 0 || (this.historyIndex -= 1, this.theme = Z(this.history[this.historyIndex]), this.dirty = !0);
  }
  redo() {
    this.historyIndex >= this.history.length - 1 || (this.historyIndex += 1, this.theme = Z(this.history[this.historyIndex]), this.dirty = !0);
  }
  notify(s, e = !1) {
    this.toastTimer && window.clearTimeout(this.toastTimer), this.toast = { message: s, error: e }, this.toastTimer = window.setTimeout(() => {
      this.toast = void 0;
    }, 3400);
  }
  get allDefinitions() {
    const s = new Set(Ta.map((a) => a.id)), t = [...new Set([
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
    return [...Ta, ...t];
  }
  get expertDefinitions() {
    const s = this.query.trim().toLocaleLowerCase();
    return this.allDefinitions.filter((e) => this.showLegacy || !e.legacy).filter((e) => s ? `${e.id} ${e.label}`.toLocaleLowerCase().includes(s) : this.selectedGroup === "all" ? !0 : e.group === this.selectedGroup).sort((e, t) => +!!t.featured - +!!e.featured || e.id.localeCompare(t.id));
  }
  get visibleDefinitions() {
    if (!this.expert) {
      const s = new Map(this.allDefinitions.map((e) => [e.id, e]));
      return wr.flatMap((e) => s.get(e) ?? []);
    }
    return this.expertDefinitions.slice(0, this.expertLimit);
  }
  handleVariableChange(s) {
    this.commit(Le(this.theme, this.activeMode, s.detail.id, s.detail.value));
  }
  toggleSectionBackgroundBlur(s) {
    const e = s.target.checked;
    this.commit(ds(this.theme, e)), this.notify(e ? "Flou des sections activé · Card Mod requis." : "Flou des sections désactivé.");
  }
  setExpert(s) {
    this.expert = s, this.visualMenu = void 0, this.query = "", this.expertLimit = re, s || (this.selectedGroup = "all");
  }
  positionVisualMenu(s, e, t) {
    const r = Math.max(12, Math.min(e + 14, window.innerWidth - 370 - 12)), o = Math.max(72, Math.min(t - 28, window.innerHeight - 520));
    this.visualMenu = { id: s, left: r, top: o };
  }
  openVisualMenu(s) {
    const { id: e, clientX: t, clientY: a } = s.detail;
    this.positionVisualMenu(e, t, a);
  }
  openVisualMenuFromButton(s, e) {
    const t = e.currentTarget.getBoundingClientRect();
    this.positionVisualMenu(s, t.right, t.top + t.height / 2);
  }
  selectPreset(s) {
    this.commit(Qa(s)), this.modal = null, this.selectedGroup = "all", this.query = "", this.notify(`Préréglage « ${gt[s].name} » appliqué.`);
  }
  addCustomVariable() {
    const s = this.customName.trim().replace(/^--/, "");
    if (!ri.test(s)) {
      this.notify("Le nom doit ressembler à state-light-custom-color.", !0);
      return;
    }
    if (!this.customValue.trim()) {
      this.notify("Ajoute une valeur CSS avant de continuer.", !0);
      return;
    }
    this.commit(Le(this.theme, this.activeMode, s, this.customValue)), this.expert = !0, this.selectedGroup = "advanced", this.query = s, this.customName = "", this.customValue = "", this.modal = null, this.notify(`Variable --${s} ajoutée.`);
  }
  openBackground() {
    const s = this.activeMode === "base" ? this.theme.values : Fa(this.theme, this.activeMode);
    this.backgroundUrl = Ot(s["lovelace-background"]), this.modal = "background";
  }
  applyBackgroundUrl() {
    const s = this.backgroundUrl.trim();
    if (!Ir(s)) {
      this.notify("Utilise une URL http(s) ou un chemin Home Assistant commençant par /local/.", !0);
      return;
    }
    this.commit(Le(this.theme, this.activeMode, "lovelace-background", La(s))), this.modal = null, this.notify("Arrière-plan photo appliqué.");
  }
  removeBackground() {
    this.commit(Le(this.theme, this.activeMode, "lovelace-background", void 0)), this.backgroundUrl = "", this.modal = null, this.notify(this.activeMode === "base" ? "Arrière-plan photo retiré." : "Arrière-plan retiré pour ce mode.");
  }
  async uploadBackground(s) {
    const e = s.target, t = e.files?.[0];
    if (e.value = "", !(!t || !this.hass?.callWS)) {
      if (t.size > oi) {
        this.notify("L’image doit faire 8 Mo ou moins.", !0);
        return;
      }
      this.backgroundUploading = !0;
      try {
        const a = await ii(t), r = await this.hass.callWS({
          type: "ha_theme_builder/upload_background",
          content: a
        });
        this.backgroundUrl = r.url, this.commit(Le(this.theme, this.activeMode, "lovelace-background", La(r.url))), this.modal = null, this.notify("Photo téléversée et appliquée.");
      } catch (a) {
        this.notify(a instanceof Error ? a.message : "Téléversement impossible.", !0);
      } finally {
        this.backgroundUploading = !1;
      }
    }
  }
  async importFile(s) {
    const e = s.target, t = e.files?.[0];
    if (e.value = "", !!t)
      try {
        const a = ei(await t.text());
        this.commit(a), this.selectedGroup = "all", this.query = "", this.notify(`Thème « ${a.name} » importé.`);
      } catch (a) {
        this.notify(a instanceof Error ? a.message : "Import YAML impossible.", !0);
      }
  }
  async copyYaml() {
    try {
      await navigator.clipboard.writeText(Ja(this.theme)), this.notify("YAML copié dans le presse-papiers.");
    } catch {
      this.notify("Le navigateur a refusé l’accès au presse-papiers.", !0);
    }
  }
  downloadYaml() {
    const s = new Blob([Ja(this.theme)], { type: "text/yaml;charset=utf-8" }), e = URL.createObjectURL(s), t = document.createElement("a");
    t.href = e, t.download = `${this.theme.name.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ha-theme"}.yaml`, t.click(), URL.revokeObjectURL(e), this.notify("Fichier YAML téléchargé.");
  }
  async saveToHomeAssistant() {
    if (!this.hass?.callWS) {
      this.downloadYaml();
      return;
    }
    try {
      const s = Ut(this.theme);
      await this.hass.callWS({
        type: "ha_theme_builder/save",
        name: s.name,
        values: s.values,
        modes: s.modes
      }), s !== this.theme && (this.theme = s, this.history[this.historyIndex] = Z(s)), this.dirty = !1, this.notify(`« ${s.name} » enregistré dans Home Assistant.`);
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
    return y`
      <header class="topbar">
        <button class="icon-button menu-button" title="Ouvrir l’éditeur" @click=${() => {
      this.editorOpen = !this.editorOpen;
    }}>${x("menu")}</button>
        <div class="brand"><div class="brand-mark">${x("palette", 21)}</div><div class="brand-copy"><strong>Theme Builder</strong><span>Home Assistant</span></div></div>
        <div class="divider"></div>
        <input class="theme-name" aria-label="Nom du thème" .value=${this.theme.name} @change=${(s) => {
      const e = Z(this.theme);
      e.name = s.target.value, this.commit(Ut(e));
    }} />
        ${this.dirty ? y`<span class="dirty-badge" title="Modifications non enregistrées"></span>` : S}
        <div class="top-spacer"></div>
        ${this.hass ? S : y`<span class="demo-pill">Aperçu local</span>`}
        <div class="undo-group">
          <button class="icon-button" title="Annuler" ?disabled=${this.historyIndex === 0} @click=${this.undo}>${x("undo", 18)}</button>
        </div>
        <button class="icon-button" title="Rétablir" ?disabled=${this.historyIndex >= this.history.length - 1} @click=${this.redo}>${x("redo", 18)}</button>
        <button class="button secondary-action" @click=${() => {
      this.modal = "presets";
    }}>${x("sparkles", 16)}<span class="optional">Préréglages</span></button>
        ${this.hass ? y`<button class="button secondary-action" @click=${this.openLibrary}>${x("folder", 16)}<span class="optional">Mes thèmes</span></button>` : S}
        <label class="button secondary-action" title="Importer un thème YAML">${x("upload", 16)}<span class="optional">Importer</span><input class="hidden-input" type="file" accept=".yaml,.yml,text/yaml" @change=${this.importFile} /></label>
        <button class="icon-button copy-action" title="Copier le YAML" @click=${this.copyYaml}>${x("copy", 17)}</button>
        <button class="button primary" @click=${this.saveToHomeAssistant}>${x(this.hass ? "save" : "download", 16)}<span>${this.hass ? "Enregistrer" : "Télécharger"}</span></button>
      </header>
    `;
  }
  renderEditor() {
    const s = ft(this.theme, this.activeMode), e = this.theme.values, t = Nt.find((i) => i.id === this.selectedGroup) ?? Nt[0], a = this.visibleDefinitions, r = this.expert ? this.expertDefinitions.length : a.length, o = cs(this.theme);
    return y`
      <aside class=${`editor ${this.editorOpen ? "open" : ""}`}>
        <div class="editor-head">
          <div class="summary-line">
            <div class="summary-title"><strong>${this.expert ? "Catalogue expert" : "Studio visuel"}</strong><span>${ti(this.theme)} modifiées · ${this.expert ? `${Er.count} variables disponibles` : "réglages essentiels"}</span></div>
            <div class="mode-segments" aria-label="Portée du thème">
              ${["base", "light", "dark"].map((i) => y`<button class=${`segment-button ${this.activeMode === i ? "active" : ""}`} title=${i === "base" ? "Valeurs communes" : i === "light" ? "Mode clair" : "Mode sombre"} @click=${() => {
      this.activeMode = i, this.visualMenu = void 0;
    }}>${i === "base" ? "Base" : x(i === "light" ? "sun" : "moon", 14)}</button>`)}
            </div>
          </div>
          <div class="experience-switch" aria-label="Expérience d’édition">
            <button class=${`experience-button ${this.expert ? "" : "active"}`} @click=${() => this.setExpert(!1)}>${x("sparkles", 15)} Visuel</button>
            <button class=${`experience-button ${this.expert ? "active" : ""}`} @click=${() => this.setExpert(!0)}>${x("settings", 15)} Expert</button>
          </div>
          <label class=${`feature-option ${o ? "active" : ""}`}>
            <input type="checkbox" .checked=${o} @change=${this.toggleSectionBackgroundBlur} />
            <span class="feature-switch" aria-hidden="true"></span>
            <span class="feature-copy">
              <strong>Flouter le fond des sections</strong>
              <small>Ajout automatique au thème enregistré</small>
            </span>
            <span class="dependency-badge">Card Mod requis</span>
          </label>
          ${this.expert ? y`
            <div class="search-row expert-search-row">
              <label class="search">${x("search", 16)}<input type="search" placeholder="Rechercher parmi toutes les variables…" .value=${this.query} @input=${(i) => {
      this.query = i.target.value, this.expertLimit = re;
    }} /></label>
              <button class="icon-button add-variable" title="Ajouter une variable personnalisée" @click=${() => {
      this.modal = "custom";
    }}>${x("plus", 17)}</button>
            </div>
            <div class="filter-row">
              <select class="group-select" aria-label="Groupe de variables" .value=${this.selectedGroup} @change=${(i) => {
      this.selectedGroup = i.target.value, this.query = "", this.expertLimit = re;
    }}>
                ${Nt.map((i) => y`<option value=${i.id}>${i.id === "all" ? "Toutes les variables" : i.label}</option>`)}
              </select>
              <label class="expert-toggle"><input type="checkbox" .checked=${this.showLegacy} @change=${(i) => {
      this.showLegacy = i.target.checked, this.expertLimit = re;
    }} />Legacy</label>
            </div>
          ` : y`
            <div class="visual-guide">
              <span class="visual-guide-icon">${x("sparkles", 16)}</span>
              <span><strong>Modifie directement l’aperçu</strong><small>Clique une pastille pour ouvrir ses réglages.</small></span>
            </div>
            <div class="visual-zone-grid">
              ${Dt.map((i) => y`<button class="visual-zone-button" title=${i.description} @click=${(l) => this.openVisualMenuFromButton(i.id, l)}>${x(i.icon, 14)}<span>${i.label}</span></button>`)}
            </div>
          `}
        </div>
        <div class="variable-list" @variable-change=${this.handleVariableChange}>
          <div class="list-caption"><span>${this.expert ? this.query ? "Résultats" : this.selectedGroup === "all" ? "Toutes les variables" : t.label : "Réglages globaux"}</span><span>${this.expert ? `${a.length}/${r}` : a.length} variable${r > 1 ? "s" : ""}</span></div>
          ${a.length ? a.map((i) => y`
            <theme-variable-control
              .definition=${i}
              .value=${s[i.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? i.defaultValue : e[i.id] ?? i.defaultValue}
              .overridden=${Object.hasOwn(s, i.id)}
            ></theme-variable-control>
          `) : y`<div class="empty"><div><strong>Aucune variable trouvée</strong><span>Essaie un autre terme ou affiche les alias legacy.</span></div></div>`}
          ${this.expert && a.length < r ? y`<button class="load-more" @click=${() => {
      this.expertLimit += re;
    }}>Afficher ${Math.min(re, r - a.length)} variables supplémentaires</button>` : S}
        </div>
      </aside>
    `;
  }
  renderPreview() {
    const s = this.activeMode === "dark" ? "dark" : "light", e = this.activeMode === "base" ? this.theme.values : Fa(this.theme, s), t = !!Ot(e["lovelace-background"]);
    return y`
      <section class="preview-pane">
        <div class="preview-toolbar">
          <span class="preview-label">Aperçu</span>
          <div class="preview-tabs">
            ${["card", "dashboard", "system"].map((a) => y`<button class=${`segment-button ${this.previewKind === a ? "active" : ""}`} @click=${() => {
      this.previewKind = a, this.visualMenu = void 0;
    }}>${x(a === "card" ? "card" : a === "dashboard" ? "dashboard" : "settings", 14)}<span>${a === "card" ? "Cartes" : a === "dashboard" ? "Dashboard" : "Système"}</span></button>`)}
          </div>
          <button class=${`button background-action ${t ? "active" : ""}`} @click=${this.openBackground}>${x("image", 15)}<span>Arrière-plan</span></button>
          ${this.expert ? S : y`<span class="inspector-badge">${x("sparkles", 13)} Pastilles actives</span>`}
          <div class="device-tabs">
            ${["desktop", "tablet", "mobile"].map((a) => y`<button class=${`segment-button ${this.previewDevice === a ? "active" : ""}`} title=${a} @click=${() => {
      this.previewDevice = a;
    }}>${x(a, 15)}</button>`)}
          </div>
        </div>
        <div class="preview-stage"><ha-theme-preview .values=${e} .kind=${this.previewKind} .device=${this.previewDevice} .inspector=${!this.expert} @visual-control-request=${this.openVisualMenu}></ha-theme-preview></div>
      </section>
    `;
  }
  renderVisualMenu() {
    if (!this.visualMenu || this.expert) return S;
    const s = os(this.visualMenu.id), e = new Map(this.allDefinitions.map((o) => [o.id, o])), t = ft(this.theme, this.activeMode), a = this.theme.values, r = s.variables.flatMap((o) => e.get(o) ?? []);
    return y`
      <div class="visual-menu-scrim" @click=${() => {
      this.visualMenu = void 0;
    }}></div>
      <section class="visual-menu" role="dialog" aria-label=${s.label} style=${`left:${this.visualMenu.left}px;top:${this.visualMenu.top}px`}>
        <div class="visual-menu-head">
          <span class="visual-menu-icon">${x(s.icon, 17)}</span>
          <span><strong>${s.label}</strong><small>${s.description}</small></span>
          <button class="icon-button" title="Fermer" @click=${() => {
      this.visualMenu = void 0;
    }}>${x("close", 16)}</button>
        </div>
        <div class="visual-menu-scope">${this.activeMode === "base" ? "Valeurs communes" : this.activeMode === "light" ? "Mode clair" : "Mode sombre"}</div>
        ${s.photo ? y`<button class="photo-menu-button" @click=${() => {
      this.visualMenu = void 0, this.openBackground();
    }}>${x("image", 16)}<span><strong>Photo d’arrière-plan</strong><small>Choisir, remplacer ou retirer l’image</small></span>${x("chevron", 15)}</button>` : S}
        <div class="visual-menu-controls" @variable-change=${this.handleVariableChange}>
          ${r.map((o) => y`
            <theme-variable-control
              .definition=${o}
              .value=${t[o.id] ?? ""}
              .inheritedValue=${this.activeMode === "base" ? o.defaultValue : a[o.id] ?? o.defaultValue}
              .overridden=${Object.hasOwn(t, o.id)}
            ></theme-variable-control>
          `)}
        </div>
      </section>
    `;
  }
  renderModal() {
    return this.modal === "presets" ? y`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Préréglages">
          <div class="dialog-head"><h2>Choisir un point de départ</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${x("close", 18)}</button></div>
          <div class="dialog-body"><div class="preset-grid">${gt.map((s, e) => y`<button class="preset" @click=${() => this.selectPreset(e)}><div class="swatches">${s.swatches.map((t) => y`<span class="swatch" style=${`background:${t}`}></span>`)}</div><strong>${s.name}</strong><p>${s.description}</p></button>`)}</div></div>
        </section>
      </div>
    ` : this.modal === "custom" ? y`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Variable personnalisée">
          <div class="dialog-head"><h2>Ajouter une variable personnalisée</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${x("close", 18)}</button></div>
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
    }}>Annuler</button><button class="button primary" @click=${this.addCustomVariable}>${x("plus", 15)} Ajouter</button></div>
        </section>
      </div>
    ` : this.modal === "background" ? y`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && !this.backgroundUploading && (this.modal = null);
    }}>
        <section class="dialog background-dialog" role="dialog" aria-modal="true" aria-label="Arrière-plan photo">
          <div class="dialog-head"><h2>Arrière-plan photo</h2><button class="icon-button" ?disabled=${this.backgroundUploading} @click=${() => {
      this.modal = null;
    }}>${x("close", 18)}</button></div>
          <div class="dialog-body">
            ${this.backgroundUrl ? y`<div class="background-preview"><img src=${this.backgroundUrl} alt="Aperçu de l’arrière-plan" /></div>` : y`<div class="background-placeholder">${x("image", 28)}<span>Aucune photo pour cette portée</span></div>`}
            ${this.hass ? y`
              <label class=${`button background-upload ${this.backgroundUploading ? "disabled" : ""}`}>
                ${x("upload", 16)} ${this.backgroundUploading ? "Téléversement…" : "Choisir une photo"}
                <input class="hidden-input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" ?disabled=${this.backgroundUploading} @change=${this.uploadBackground} />
              </label>
              <div class="field-hint background-hint">JPEG, PNG, GIF ou WebP · 8 Mo maximum. La photo sera copiée dans <code>/config/www/ha_theme_builder/backgrounds/</code>.</div>
              <div class="or-divider"><span>ou</span></div>
            ` : y`<div class="field-hint background-hint">Dans l’aperçu local, utilise une URL. Le téléversement de fichier est disponible depuis le panneau Home Assistant.</div>`}
            <div class="field background-url-field">
              <label>URL de l’image</label>
              <input type="url" placeholder="https://… ou /local/…" .value=${this.backgroundUrl} @input=${(s) => {
      this.backgroundUrl = s.target.value;
    }} @keydown=${(s) => {
      s.key === "Enter" && this.applyBackgroundUrl();
    }} />
            </div>
            <div class="field-hint">Le réglage s’applique à la portée active : <strong>${this.activeMode === "base" ? "Base" : this.activeMode === "light" ? "Mode clair" : "Mode sombre"}</strong>.</div>
          </div>
          <div class="dialog-actions">
            <button class="button danger" ?disabled=${this.backgroundUploading || !Ot(ft(this.theme, this.activeMode)["lovelace-background"])} @click=${this.removeBackground}>${x("trash", 15)} Retirer</button>
            <span class="dialog-spacer"></span>
            <button class="button ghost" ?disabled=${this.backgroundUploading} @click=${() => {
      this.modal = null;
    }}>Annuler</button>
            <button class="button primary" ?disabled=${this.backgroundUploading} @click=${this.applyBackgroundUrl}>Appliquer l’URL</button>
          </div>
        </section>
      </div>
    ` : this.modal === "library" ? y`
      <div class="modal-backdrop" @click=${(s) => {
      s.target === s.currentTarget && (this.modal = null);
    }}>
        <section class="dialog" role="dialog" aria-modal="true" aria-label="Mes thèmes">
          <div class="dialog-head"><h2>Mes thèmes Home Assistant</h2><button class="icon-button" @click=${() => {
      this.modal = null;
    }}>${x("close", 18)}</button></div>
          <div class="dialog-body">
            ${this.libraryLoading ? y`<div class="empty"><div><strong>Chargement…</strong><span>Lecture de ha_theme_builder.yaml</span></div></div>` : this.savedThemes.length ? y`<div class="library-list">${this.savedThemes.map((s) => y`<button class="library-item" @click=${() => this.loadSavedTheme(s)}><span class="library-icon">${x("palette", 17)}</span><span class="library-copy"><strong>${s}</strong><span>Ouvrir dans l’éditeur</span></span>${x("chevron", 16)}</button>`)}</div>` : y`<div class="empty"><div><strong>Aucun thème enregistré</strong><span>Le premier apparaîtra ici après une sauvegarde.</span></div></div>`}
          </div>
        </section>
      </div>
    ` : S;
  }
  render() {
    return y`
      <div class="app">
        ${this.renderTopbar()}
        <main class="workspace">
          ${this.editorOpen ? y`<div class="editor-scrim" @click=${() => {
      this.editorOpen = !1;
    }}></div>` : S}
          ${this.renderEditor()}
          ${this.renderPreview()}
        </main>
      </div>
      ${this.renderModal()}
      ${this.renderVisualMenu()}
      ${this.toast ? y`<div class=${`toast ${this.toast.error ? "error" : ""}`}>${x(this.toast.error ? "close" : "check", 17)}${this.toast.message}</div>` : S}
    `;
  }
};
C.styles = Tr;
N([
  D({ attribute: !1 })
], C.prototype, "hass", 2);
N([
  D({ type: Boolean })
], C.prototype, "narrow", 2);
N([
  D({ attribute: !1 })
], C.prototype, "route", 2);
N([
  D({ attribute: !1 })
], C.prototype, "panel", 2);
N([
  I()
], C.prototype, "theme", 2);
N([
  I()
], C.prototype, "activeMode", 2);
N([
  I()
], C.prototype, "previewKind", 2);
N([
  I()
], C.prototype, "previewDevice", 2);
N([
  I()
], C.prototype, "selectedGroup", 2);
N([
  I()
], C.prototype, "query", 2);
N([
  I()
], C.prototype, "expert", 2);
N([
  I()
], C.prototype, "showLegacy", 2);
N([
  I()
], C.prototype, "editorOpen", 2);
N([
  I()
], C.prototype, "modal", 2);
N([
  I()
], C.prototype, "customName", 2);
N([
  I()
], C.prototype, "customValue", 2);
N([
  I()
], C.prototype, "dirty", 2);
N([
  I()
], C.prototype, "toast", 2);
N([
  I()
], C.prototype, "savedThemes", 2);
N([
  I()
], C.prototype, "libraryLoading", 2);
N([
  I()
], C.prototype, "backgroundUrl", 2);
N([
  I()
], C.prototype, "backgroundUploading", 2);
N([
  I()
], C.prototype, "visualMenu", 2);
N([
  I()
], C.prototype, "expertLimit", 2);
C = N([
  aa("ha-theme-builder-panel")
], C);
export {
  C as HAThemeBuilderPanel
};
