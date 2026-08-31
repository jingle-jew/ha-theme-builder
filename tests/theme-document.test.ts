import { describe, expect, it } from "vitest";
import {
  changedCount,
  createTheme,
  resolvedValues,
  setThemeValue,
  themeFromYaml,
  themeToYaml,
} from "../frontend/src/utils/theme-document";

describe("theme document", () => {
  it("resolves common and mode-specific values", () => {
    let theme = createTheme("Modes");
    theme = setThemeValue(theme, "base", "primary-color", "#123456");
    theme = setThemeValue(theme, "dark", "primary-color", "#abcdef");
    theme = setThemeValue(theme, "dark", "card-background-color", "#000000");

    expect(resolvedValues(theme, "light")).toEqual({ "primary-color": "#123456" });
    expect(resolvedValues(theme, "dark")).toEqual({
      "primary-color": "#abcdef",
      "card-background-color": "#000000",
    });
    expect(changedCount(theme)).toBe(2);
  });

  it("round-trips a Home Assistant theme YAML document", () => {
    let theme = createTheme("Verre doux");
    theme = setThemeValue(theme, "base", "ha-card-backdrop-filter", "blur(18px) saturate(135%)");
    theme = setThemeValue(theme, "light", "ha-card-background", "rgba(255, 255, 255, 0.68)");
    theme = setThemeValue(theme, "dark", "ha-card-background", "rgba(20, 24, 36, 0.68)");

    expect(themeFromYaml(themeToYaml(theme))).toEqual(theme);
  });

  it("drops an override when its value is cleared", () => {
    let theme = createTheme();
    theme = setThemeValue(theme, "base", "primary-color", "#000000");
    theme = setThemeValue(theme, "base", "primary-color", undefined);
    expect(theme.values).toEqual({});
  });
});
