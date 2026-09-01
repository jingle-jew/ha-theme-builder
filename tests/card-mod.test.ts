import { describe, expect, it } from "vitest";
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
  it("extends the blur over the section container padding without changing layout", () => {
    const theme = setSectionBackgroundBlur(createTheme("Verre doux"), true);
    const sectionRule = theme.values[CARD_MOD_GRID_SECTION_KEY];

    expect(theme.values[CARD_MOD_THEME_KEY]).toBe("Verre doux");
    expect(theme.values[CARD_MOD_VIEW_YAML_KEY]).toBeUndefined();
    expect(sectionRule).toContain(":host {");
    expect(sectionRule).toContain(":host::before {");
    expect(sectionRule).not.toContain(":host-context(");
    expect(sectionRule).toContain("inset: calc(-1 * var(--ha-space-2, 8px))");
    expect(sectionRule).toContain("pointer-events: none");
    expect(sectionRule).toContain("-webkit-backdrop-filter: blur(10px)");
    expect(sectionRule).toContain("backdrop-filter: blur(10px)");
    expect(hasSectionBackgroundBlur(theme)).toBe(true);
  });

  it("removes only the generated block and preserves custom Card Mod rules", () => {
    const theme = createTheme("Personnalisé");
    const customGridRules = ":host { border: 1px solid red; }";
    theme.values[CARD_MOD_GRID_SECTION_KEY] = customGridRules;
    const enabled = setSectionBackgroundBlur(theme, true);
    enabled.values["card-mod-card"] = "ha-card { box-shadow: none; }";
    const disabled = setSectionBackgroundBlur(enabled, false);

    expect(disabled.values[CARD_MOD_GRID_SECTION_KEY]).toBe(customGridRules);
    expect(disabled.values[CARD_MOD_THEME_KEY]).toBe("Personnalisé");
    expect(hasSectionBackgroundBlur(disabled)).toBe(false);
  });

  it("removes the Card Mod binding when no Card Mod rule remains", () => {
    const disabled = setSectionBackgroundBlur(
      setSectionBackgroundBlur(createTheme("Minimal"), true),
      false,
    );

    expect(disabled.values[CARD_MOD_GRID_SECTION_KEY]).toBeUndefined();
    expect(disabled.values[CARD_MOD_THEME_KEY]).toBeUndefined();
  });

  it("migrates the ineffective v0.1.6 grid-section selector on save", () => {
    const legacy = createTheme("Ancien thème");
    legacy.values[CARD_MOD_THEME_KEY] = "Ancien thème";
    legacy.values[CARD_MOD_GRID_SECTION_KEY] = `/* ha-theme-builder: section-background-blur:start */
.section { backdrop-filter: blur(10px); }
/* ha-theme-builder: section-background-blur:end */`;

    const migrated = syncCardModThemeName(legacy);

    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toContain(":host {");
    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).not.toContain(".section {");
    expect(hasSectionBackgroundBlur(migrated)).toBe(true);
  });

  it("migrates the ineffective v0.1.7 view rule on save", () => {
    const legacy = createTheme("Ancien thème");
    legacy.values[CARD_MOD_THEME_KEY] = "Ancien thème";
    legacy.values[CARD_MOD_VIEW_YAML_KEY] = `# ha-theme-builder: section-background-blur:start
"hui-sections-view$": |
  .section { backdrop-filter: blur(10px); }
# ha-theme-builder: section-background-blur:end`;

    const migrated = syncCardModThemeName(legacy);

    expect(migrated.values[CARD_MOD_VIEW_YAML_KEY]).toBeUndefined();
    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toContain(":host {");
    expect(hasSectionBackgroundBlur(migrated)).toBe(true);
  });

  it("migrates the v0.1.8 host-only rule so the blur covers the section padding", () => {
    const legacy = createTheme("Ancien thème");
    legacy.values[CARD_MOD_THEME_KEY] = "Ancien thème";
    legacy.values[CARD_MOD_GRID_SECTION_KEY] = `/* ha-theme-builder: section-background-blur:start */
:host { backdrop-filter: blur(10px); }
/* ha-theme-builder: section-background-blur:end */`;

    const migrated = syncCardModThemeName(legacy);

    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toContain(":host::before {");
    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toContain("inset: calc(-1 * var(--ha-space-2, 8px))");
    expect(hasSectionBackgroundBlur(migrated)).toBe(true);
  });

  it("migrates the v0.1.10 conditional pseudo-element rule", () => {
    const legacy = createTheme("Ancien thème");
    legacy.values[CARD_MOD_THEME_KEY] = "Ancien thème";
    legacy.values[CARD_MOD_GRID_SECTION_KEY] = `/* ha-theme-builder: section-background-blur:start */
:host-context(.has-background)::before { content: ""; backdrop-filter: blur(10px); }
/* ha-theme-builder: section-background-blur:end */`;

    const migrated = syncCardModThemeName(legacy);

    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).toContain(":host::before {");
    expect(migrated.values[CARD_MOD_GRID_SECTION_KEY]).not.toContain(":host-context(");
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
