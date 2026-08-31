import { svg, type SVGTemplateResult } from "lit";

const paths: Record<string, SVGTemplateResult> = {
  menu: svg`<path d="M4 6h16M4 12h16M4 18h16"/>`,
  search: svg`<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,
  undo: svg`<path d="m9 14-4-4 4-4"/><path d="M5 10h8a6 6 0 0 1 6 6v2"/>`,
  redo: svg`<path d="m15 14 4-4-4-4"/><path d="M19 10h-8a6 6 0 0 0-6 6v2"/>`,
  download: svg`<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>`,
  upload: svg`<path d="M12 16V4m0 0 4 4m-4-4L8 8M5 20h14"/>`,
  save: svg`<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/>`,
  folder: svg`<path d="M3 6h7l2 2h9v11H3z"/>`,
  copy: svg`<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2"/>`,
  reset: svg`<path d="M4 7v5h5"/><path d="M5.5 11a7 7 0 1 1 1.9 6.6"/>`,
  sun: svg`<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,
  moon: svg`<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>`,
  desktop: svg`<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>`,
  tablet: svg`<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>`,
  mobile: svg`<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>`,
  card: svg`<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h4m-4 4h10"/>`,
  activity: svg`<path d="M3 12h4l2-7 4 14 2-7h6"/>`,
  dashboard: svg`<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>`,
  settings: svg`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>`,
  plus: svg`<path d="M12 5v14M5 12h14"/>`,
  trash: svg`<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>`,
  close: svg`<path d="m6 6 12 12M18 6 6 18"/>`,
  check: svg`<path d="m5 12 4 4L19 6"/>`,
  chevron: svg`<path d="m9 18 6-6-6-6"/>`,
  palette: svg`<path d="M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h2a7 7 0 0 0-2-11Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="9.5" cy="6.5" r="1"/><circle cx="14.5" cy="6.5" r="1"/>`,
  sparkles: svg`<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm13-2 1 2.8 3 1.2-3 1.2L18 20l-1-2.8-3-1.2 3-1.2 1-2.8Z"/>`,
};

export function icon(name: string, size = 20): SVGTemplateResult {
  return svg`<svg
    width=${size}
    height=${size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${paths[name] ?? paths.palette}</svg>`;
}
