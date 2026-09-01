import type { ThemeDocument } from "../models/types";

export const CARD_MOD_THEME_KEY = "card-mod-theme";
export const CARD_MOD_GRID_SECTION_KEY = "card-mod-grid-section";

const SECTION_BLUR_START = "/* ha-theme-builder: section-background-blur:start */";
const SECTION_BLUR_END = "/* ha-theme-builder: section-background-blur:end */";

const SECTION_BLUR_STYLE = `${SECTION_BLUR_START}
.section {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
${SECTION_BLUR_END}`;

function cloneTheme(theme: ThemeDocument): ThemeDocument {
  return JSON.parse(JSON.stringify(theme)) as ThemeDocument;
}

function removeGeneratedSectionBlur(style: string): string {
  const start = style.indexOf(SECTION_BLUR_START);
  const end = style.indexOf(SECTION_BLUR_END, start + SECTION_BLUR_START.length);
  if (start < 0 || end < 0) return style;
  return `${style.slice(0, start)}${style.slice(end + SECTION_BLUR_END.length)}`.trim();
}

function hasOtherCardModRules(values: Record<string, string>): boolean {
  return Object.keys(values).some((key) => key.startsWith("card-mod-") && key !== CARD_MOD_THEME_KEY);
}

export function hasSectionBackgroundBlur(theme: ThemeDocument): boolean {
  return theme.values[CARD_MOD_GRID_SECTION_KEY]?.includes(SECTION_BLUR_START) ?? false;
}

export function syncCardModThemeName(theme: ThemeDocument): ThemeDocument {
  if (!hasSectionBackgroundBlur(theme)) return theme;
  const expectedName = theme.name.trim() || "Mon thème";
  if (theme.values[CARD_MOD_THEME_KEY] === expectedName) return theme;
  const next = cloneTheme(theme);
  next.values[CARD_MOD_THEME_KEY] = expectedName;
  return next;
}

export function setSectionBackgroundBlur(theme: ThemeDocument, enabled: boolean): ThemeDocument {
  const next = cloneTheme(theme);
  const currentStyle = next.values[CARD_MOD_GRID_SECTION_KEY] ?? "";

  if (enabled) {
    const customStyle = removeGeneratedSectionBlur(currentStyle);
    next.values[CARD_MOD_GRID_SECTION_KEY] = customStyle
      ? `${customStyle}\n\n${SECTION_BLUR_STYLE}`
      : SECTION_BLUR_STYLE;
    next.values[CARD_MOD_THEME_KEY] = next.name.trim() || "Mon thème";
    return next;
  }

  const remainingStyle = removeGeneratedSectionBlur(currentStyle);
  if (remainingStyle) next.values[CARD_MOD_GRID_SECTION_KEY] = remainingStyle;
  else delete next.values[CARD_MOD_GRID_SECTION_KEY];

  if (!hasOtherCardModRules(next.values)) delete next.values[CARD_MOD_THEME_KEY];
  return next;
}
