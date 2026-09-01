import { describe, expect, it } from "vitest";
import {
  CARD_MOD_GRID_SECTION_KEY,
  CARD_MOD_THEME_KEY,
  hasSectionBackgroundBlur,
  setSectionBackgroundBlur,
  syncCardModThemeName,
} from "../frontend/src/utils/card-mod";
import { createTheme, themeFromYaml, themeToYaml } from "../frontend/src/utils/theme-document";

describe("Card Mod section background blur", () => {
  it("adds the theme binding and a prefixed blur rule", () => {
    const theme = setSectionBackgroundBlur(createTheme("Verre doux"), true);

    expect(theme.values[CARD_MOD_THEME_KEY]).toBe("Verre doux");
    expect(theme.values[CARD_MOD_GRID_SECTION_KEY]).toContain(".section {");
    expect(theme.values[CARD_MOD_GRID_SECTION_KEY]).toContain("-webkit-backdrop-filter: blur(10px)");
    expect(theme.values[CARD_MOD_GRID_SECTION_KEY]).toContain("backdrop-filter: blur(10px)");
    expect(hasSectionBackgroundBlur(theme)).toBe(true);
  });

  it("removes only the generated block and preserves custom Card Mod rules", () => {
    const theme = createTheme("Personnalisé");
    theme.values[CARD_MOD_GRID_SECTION_KEY] = ".section { border: 1px solid red; }";
    const enabled = setSectionBackgroundBlur(theme, true);
    enabled.values["card-mod-card"] = "ha-card { box-shadow: none; }";
    const disabled = setSectionBackgroundBlur(enabled, false);

    expect(disabled.values[CARD_MOD_GRID_SECTION_KEY]).toBe(".section { border: 1px solid red; }");
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
