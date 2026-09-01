import { describe, expect, it } from "vitest";
import { NATIVE_SURFACE_FIXES } from "../frontend/src/native-surface-fixes";

describe("native surface exclusions", () => {
  it("removes every glass surface effect from text-only Markdown cards", () => {
    const styles = NATIVE_SURFACE_FIXES["hui-markdown-card"];
    expect(styles).toContain("ha-card.text-only");
    expect(styles).toContain("background: none !important");
    expect(styles).toContain("backdrop-filter: none !important");
    expect(styles).toContain("border: none !important");
    expect(styles).toContain("box-shadow: none !important");
  });

  it("keeps native header chips outside the exclusion", () => {
    const styles = Object.values(NATIVE_SURFACE_FIXES).join("\n");
    expect(styles).not.toContain("ha-badge");
    expect(styles).not.toContain("hui-view-badges");
    expect(styles).not.toContain("--ha-card-background");
    expect(styles).not.toContain("--ha-card-backdrop-filter");
  });
});
