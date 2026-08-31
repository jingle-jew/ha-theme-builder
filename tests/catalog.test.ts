import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CATALOG_SOURCE, THEME_VARIABLES } from "../frontend/src/data/theme-catalog.generated";

describe("theme catalog", () => {
  it("contains every concrete variable from the supplied source list", () => {
    const seed = readFileSync(resolve("tools/theme-variable-seed.txt"), "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const concrete = seed.filter((id) => !id.includes("{"));
    const catalogIds = new Set(THEME_VARIABLES.map((definition) => definition.id));

    expect(seed).toHaveLength(761);
    expect(concrete).toHaveLength(757);
    expect(CATALOG_SOURCE.count).toBe(757);
    expect(THEME_VARIABLES).toHaveLength(757);
    expect(catalogIds.size).toBe(757);
    expect(concrete.filter((id) => !catalogIds.has(id))).toEqual([]);
  });

  it("keeps concrete variables typed and grouped", () => {
    for (const definition of THEME_VARIABLES) {
      expect(definition.id).toMatch(/^[a-z][a-z0-9_-]*$/);
      expect(definition.group).not.toBe("");
      expect(["color", "range", "select", "filter", "text"]).toContain(definition.kind);
    }
  });

  it("exposes native frosted-glass controls", () => {
    const filter = THEME_VARIABLES.find((definition) => definition.id === "ha-card-backdrop-filter");
    const background = THEME_VARIABLES.find((definition) => definition.id === "ha-card-background");
    expect(filter?.kind).toBe("filter");
    expect(background?.kind).toBe("color");
  });
});
