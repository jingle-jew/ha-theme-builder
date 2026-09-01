import { describe, expect, it } from "vitest";
import { THEME_VARIABLES } from "../frontend/src/data/theme-catalog.generated";
import {
  DEFAULT_VARIABLE_IDS,
  VISUAL_CONTROLS,
} from "../frontend/src/data/visual-controls";

describe("visual editing catalog", () => {
  const definitions = new Map(THEME_VARIABLES.map((definition) => [definition.id, definition]));

  it("keeps the default editor intentionally small and global", () => {
    expect(DEFAULT_VARIABLE_IDS.length).toBeLessThanOrEqual(16);
    expect(new Set(DEFAULT_VARIABLE_IDS).size).toBe(DEFAULT_VARIABLE_IDS.length);
    for (const id of DEFAULT_VARIABLE_IDS) {
      expect(definitions.has(id), `missing default variable ${id}`).toBe(true);
      expect(definitions.get(id)?.legacy, `${id} should not be legacy`).toBe(false);
    }
  });

  it("maps every visual hotspot to concrete Home Assistant variables", () => {
    expect(VISUAL_CONTROLS.length).toBeGreaterThanOrEqual(10);
    expect(new Set(VISUAL_CONTROLS.map((control) => control.id)).size).toBe(VISUAL_CONTROLS.length);
    for (const control of VISUAL_CONTROLS) {
      expect(control.variables.length, `${control.id} has no variables`).toBeGreaterThan(0);
      for (const id of control.variables) {
        expect(definitions.has(id), `${control.id} references missing ${id}`).toBe(true);
      }
    }
  });

  it("covers graphical surface controls", () => {
    expect(VISUAL_CONTROLS.find((control) => control.id === "card-surface")?.variables).toContain("ha-card-background");
    expect(VISUAL_CONTROLS.find((control) => control.id === "card-glass")?.variables).toContain("ha-card-backdrop-filter");
    expect(VISUAL_CONTROLS.find((control) => control.id === "card-border")?.variables).toContain("ha-card-border-width");
    expect(VISUAL_CONTROLS.find((control) => control.id === "card-radius")?.variables).toContain("ha-card-border-radius");
  });
});
