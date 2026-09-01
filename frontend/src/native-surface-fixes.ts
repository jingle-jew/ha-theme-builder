const STYLE_MARKER = "data-ha-theme-builder-surface-fix";
const PATCH_MARKER = Symbol.for("ha-theme-builder:surface-fix");

export const NATIVE_SURFACE_FIXES: Readonly<Record<string, string>> = {
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
  `,
};

function installFix(element: Element, cssText: string): void {
  const root = element.shadowRoot;
  if (!root || root.querySelector(`style[${STYLE_MARKER}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(STYLE_MARKER, "");
  style.textContent = cssText;
  root.append(style);
}

function visitOpenRoots(root: Document | ShadowRoot): void {
  for (const [tagName, cssText] of Object.entries(NATIVE_SURFACE_FIXES)) {
    root.querySelectorAll(tagName).forEach((element) => installFix(element, cssText));
  }
  root.querySelectorAll("*").forEach((element) => {
    if (element.shadowRoot) visitOpenRoots(element.shadowRoot);
  });
}

function patchConnectedCallback(tagName: string, cssText: string): void {
  void customElements.whenDefined(tagName).then(() => {
    const constructor = customElements.get(tagName);
    if (!constructor || (constructor as unknown as Record<symbol, boolean>)[PATCH_MARKER]) return;

    const prototype = constructor.prototype as HTMLElement & {
      connectedCallback?: () => void;
    };
    const originalConnected = prototype.connectedCallback;
    prototype.connectedCallback = function connectedCallback(this: HTMLElement): void {
      originalConnected?.call(this);
      queueMicrotask(() => installFix(this, cssText));
    };
    (constructor as unknown as Record<symbol, boolean>)[PATCH_MARKER] = true;
    visitOpenRoots(document);
  });
}

export function installNativeSurfaceFixes(): void {
  for (const [tagName, cssText] of Object.entries(NATIVE_SURFACE_FIXES)) {
    patchConnectedCallback(tagName, cssText);
  }
  visitOpenRoots(document);
}

if (typeof document !== "undefined" && typeof customElements !== "undefined") {
  installNativeSurfaceFixes();
}
