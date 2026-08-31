import { describe, expect, it } from "vitest";
import { parseCssColor, withAlpha, withHexColor } from "../frontend/src/utils/colors";

describe("color controls", () => {
  it("parses CSS hex, rgba and RGB triplets", () => {
    expect(parseCssColor("#abc")?.rgb).toEqual([170, 187, 204]);
    expect(parseCssColor("rgba(10, 20, 30, 0.4)")?.alpha).toBe(0.4);
    expect(parseCssColor("1, 2, 3")?.hex).toBe("#010203");
  });

  it("preserves alpha when changing a color", () => {
    expect(withHexColor("rgba(10, 20, 30, 0.25)", "#ff0000")).toBe("rgba(255, 0, 0, 0.25)");
    expect(withAlpha("#ffffff", 0.65)).toBe("rgba(255, 255, 255, 0.65)");
  });

  it("formats RGB companion tokens", () => {
    expect(withHexColor("3, 4, 5", "#102030", "rgb-triplet")).toBe("16, 32, 48");
  });
});
