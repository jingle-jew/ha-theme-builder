import type { ThemeDocument } from "../models/types";

export const CARD_MOD_THEME_KEY = "card-mod-theme";
export const CARD_MOD_GRID_SECTION_KEY = "card-mod-grid-section";
export const CARD_MOD_VIEW_YAML_KEY = "card-mod-view-yaml";

const SECTION_BLUR_CSS_START = "/* ha-theme-builder: section-background-blur:start */";
const SECTION_BLUR_CSS_END = "/* ha-theme-builder: section-background-blur:end */";
const SECTION_BLUR_YAML_START = "# ha-theme-builder: section-background-blur:start";
const SECTION_BLUR_YAML_END = "# ha-theme-builder: section-background-blur:end";

const SECTION_BLUR_STYLE = `${SECTION_BLUR_CSS_START}
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
${SECTION_BLUR_CSS_END}`;

function cloneTheme(theme: ThemeDocument): ThemeDocument {
  return JSON.parse(JSON.stringify(theme)) as ThemeDocument;
}

function removeGeneratedBlock(style: string, startMarker: string, endMarker: string): string {
  let result = style;
  let start = result.indexOf(startMarker);
  while (start >= 0) {
    const end = result.indexOf(endMarker, start + startMarker.length);
    if (end < 0) break;
    result = `${result.slice(0, start)}${result.slice(end + endMarker.length)}`.trim();
    start = result.indexOf(startMarker);
  }
  return result.trim();
}

function removeLegacyGridSectionBlur(style: string): string {
  return removeGeneratedBlock(style, SECTION_BLUR_CSS_START, SECTION_BLUR_CSS_END);
}

function removeGeneratedViewBlur(style: string): string {
  return removeGeneratedBlock(style, SECTION_BLUR_YAML_START, SECTION_BLUR_YAML_END);
}

function hasOtherCardModRules(values: Record<string, string>): boolean {
  return Object.keys(values).some((key) => key.startsWith("card-mod-") && key !== CARD_MOD_THEME_KEY);
}

export function hasSectionBackgroundBlur(theme: ThemeDocument): boolean {
  return Boolean(
    theme.values[CARD_MOD_VIEW_YAML_KEY]?.includes(SECTION_BLUR_YAML_START)
    || theme.values[CARD_MOD_GRID_SECTION_KEY]?.includes(SECTION_BLUR_CSS_START),
  );
}

export function syncCardModThemeName(theme: ThemeDocument): ThemeDocument {
  if (!hasSectionBackgroundBlur(theme)) return theme;
  const expectedName = theme.name.trim() || "Mon thème";
  const generatedGridStyle = theme.values[CARD_MOD_GRID_SECTION_KEY] ?? "";
  const generatedViewStyle = theme.values[CARD_MOD_VIEW_YAML_KEY] ?? "";
  const needsMigration = generatedViewStyle.includes(SECTION_BLUR_YAML_START)
    || (generatedGridStyle.includes(SECTION_BLUR_CSS_START)
      && !generatedGridStyle.includes(":host::before"));
  if (theme.values[CARD_MOD_THEME_KEY] === expectedName && !needsMigration) return theme;
  if (needsMigration) return setSectionBackgroundBlur(theme, true);
  const next = cloneTheme(theme);
  next.values[CARD_MOD_THEME_KEY] = expectedName;
  return next;
}

export function setSectionBackgroundBlur(theme: ThemeDocument, enabled: boolean): ThemeDocument {
  const next = cloneTheme(theme);
  const currentGridStyle = next.values[CARD_MOD_GRID_SECTION_KEY] ?? "";
  const customGridStyle = removeLegacyGridSectionBlur(currentGridStyle);

  const currentViewStyle = next.values[CARD_MOD_VIEW_YAML_KEY] ?? "";
  const customViewStyle = removeGeneratedViewBlur(currentViewStyle);
  if (customViewStyle) next.values[CARD_MOD_VIEW_YAML_KEY] = customViewStyle;
  else delete next.values[CARD_MOD_VIEW_YAML_KEY];

  if (enabled) {
    next.values[CARD_MOD_GRID_SECTION_KEY] = customGridStyle
      ? `${customGridStyle}\n\n${SECTION_BLUR_STYLE}`
      : SECTION_BLUR_STYLE;
    next.values[CARD_MOD_THEME_KEY] = next.name.trim() || "Mon thème";
    return next;
  }

  if (customGridStyle) next.values[CARD_MOD_GRID_SECTION_KEY] = customGridStyle;
  else delete next.values[CARD_MOD_GRID_SECTION_KEY];

  if (!hasOtherCardModRules(next.values)) delete next.values[CARD_MOD_THEME_KEY];
  return next;
}
