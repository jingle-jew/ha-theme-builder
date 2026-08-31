import { describe, expect, it } from "vitest";
import { THEME_PRESETS } from "../frontend/src/data/presets";

const CATPPUCCIN_EXPECTED = {
  "catppuccin-latte": {
    primary: "#8839ef",
    blue: "#1e66f5",
    base: "#eff1f5",
    surface: "#ccd0da",
    text: "#4c4f69",
  },
  "catppuccin-frappe": {
    primary: "#ca9ee6",
    blue: "#8caaee",
    base: "#303446",
    surface: "#414559",
    text: "#c6d0f5",
  },
  "catppuccin-macchiato": {
    primary: "#c6a0f6",
    blue: "#8aadf4",
    base: "#24273a",
    surface: "#363a4f",
    text: "#cad3f5",
  },
  "catppuccin-mocha": {
    primary: "#cba6f7",
    blue: "#89b4fa",
    base: "#1e1e2e",
    surface: "#313244",
    text: "#cdd6f4",
  },
} as const;

describe("theme presets", () => {
  it("includes the four official Catppuccin flavors", () => {
    const catppuccin = THEME_PRESETS.filter((preset) => preset.id.startsWith("catppuccin-"));

    expect(catppuccin.map((preset) => preset.id)).toEqual(Object.keys(CATPPUCCIN_EXPECTED));
  });

  it("maps each Catppuccin palette to Home Assistant theme variables", () => {
    for (const [id, expected] of Object.entries(CATPPUCCIN_EXPECTED)) {
      const preset = THEME_PRESETS.find((candidate) => candidate.id === id);
      expect(preset).toBeDefined();

      const values = preset?.theme.values;
      expect(values?.["primary-color"]).toBe(expected.primary);
      expect(values?.["accent-color"]).toBe(expected.blue);
      expect(values?.["primary-background-color"]).toBe(expected.base);
      expect(values?.["card-background-color"]).toBe(expected.surface);
      expect(values?.["primary-text-color"]).toBe(expected.text);
      expect(preset?.swatches).toEqual([
        expected.primary,
        expected.blue,
        expected.base,
        expected.text,
      ]);
    }
  });

  it("provides matching RGB companions for Home Assistant", () => {
    const mocha = THEME_PRESETS.find((preset) => preset.id === "catppuccin-mocha");

    expect(mocha?.theme.values["rgb-primary-color"]).toBe("203, 166, 247");
    expect(mocha?.theme.values["rgb-accent-color"]).toBe("137, 180, 250");
    expect(mocha?.theme.values["rgb-card-background-color"]).toBe("49, 50, 68");
  });
});
