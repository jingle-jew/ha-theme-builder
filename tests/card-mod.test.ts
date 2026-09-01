import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import {
  CARD_MOD_GRID_SECTION_KEY,
  CARD_MOD_THEME_KEY,
  CARD_MOD_VIEW_YAML_KEY,
  hasSectionBackgroundBlur,
  setSectionBackgroundBlur,
  syncCardModThemeName,
} from "../frontend/src/utils/card-mod";
import { createTheme, themeFromYaml, themeToYaml } from "../frontend/src/utils/theme-document";

describe("Card Mod section background blur", () => {
  it("adds the theme binding and a view-level shadow DOM rule", () => {
    const theme = setSectionBackgroundBlur(createTheme("Verre doux"), true);
    const viewRules = parse(theme.values[CARD_MOD_VIEW_YAML_KEY]) as Record<string, string>;
    const sectionRule = viewRules["hui-sections-view:not(.ha-theme-builder-section-blur-disabled)$"];

    expect(theme.values[CARD_MOD_THEME_KEY]).toBe("Verre doux");
    expect(theme.values[CARD_MOD_GRID_SECTION_KEY]).toBeUndefined();
    expect(sectionRule).toContain(".section {");
    expect(sectionRule).toContain("-webkit-backdrop-filter: blur(10px)");
    expect(sectionRule).toContain("backdrop-filter: blur(10px)");
    expect(hasSectionBackgroundBlur(theme)).toBe(true);
  });

  it("removes only the generated block and preserves custom Card Mod rules", () => {
    const theme = createTheme("Personnalisé");
    const customViewRules = '"hui-view-badges$": |\n  .badges { display: none; }';
    theme.values[CARD_MOD_VIEW_YAML_KEY] = customViewRules;
    const enabled = setSectionBackgroundBlur(theme, true);
    enabled.values["card-mod-card"] = "ha-card { box-shadow: none; }";
    const disabled = setSectionBackgroundBlur(enabled, false);

    expect(disabled.values[CARD_MOD_VIEW_YAML_KEY]).toBe(customViewRules);
    expect(disabled.values[CARD_MOD_THEME_KEY]).toBe("Personnalisé");
    expect(hasSectionBackgroundBlur(disabled)).toBe(false);
  });

  it("removes the Card Mod binding when no Card Mod rule remains", () => {
    const disabled = setSectionBackgroundBlur(
      setSectionBackgroundBlur(createTheme("Minimal"), true),
      false,
    );

    expect(disabled.values[CARD_MOD_VIEW_YAML_KEY]).toBeUndefined();
    expect(disabled.values[CARD_MOD_THEME_KEY]).toBeUndefined();
  });

  it("migrates the ineffective v0.1.6 grid-section rule on save", () => {
    const legacy = createTheme("Ancien thème");
    legacy.values[CARD_MOD_THEME_KEY] = "Ancien thème";
    legacy.values[CARD_MOD_GRID_SECTION_KEY] = `/* ha-theme-builder: section-background-blur:start */
.section { backdrop-filter: blur(10px); }
/* ha-theme-builder: section-background-blur:end */`;

    const migrated = syncCardModThemeName(legacy);

    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toBeUndefined();
    expect(migrated.values[CARD_MOD_VIEW_YAML_KEY]).toContain("hui-sections-view:not");
    expect(hasSectionBackgroundBlur(migrated)).toBe(true);
  });

  it("keeps card-mod-theme synchronized after a rename and YAML round-trip", () => {
    const renamed = setSectionBackgroundBlur(createTheme("Avant"), true);
    renamed.name = "Après";
    const synced = syncCardModThemeName(renamed);
    const imported = themeFromYaml(themeToYaml(synced));

    expect(synced.values[CARD_MOD_THEME_KEY]).toBe("Après");
    expect(imported).toEqual(synced);
    expect(hasSectionBackgroundBlur(imported)).toBe(true);
  });
});
