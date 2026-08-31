import { describe, expect, it } from "vitest";
import {
  backgroundImageUrl,
  backgroundImageValue,
  isSupportedBackgroundUrl,
} from "../frontend/src/utils/background";

describe("photo backgrounds", () => {
  it("builds and reads a Home Assistant lovelace background", () => {
    const value = backgroundImageValue("https://example.com/my photo.jpg");
    expect(value).toBe('center / cover no-repeat fixed url("https://example.com/my photo.jpg")');
    expect(backgroundImageUrl(value)).toBe("https://example.com/my photo.jpg");
  });

  it("accepts web and Home Assistant local URLs only", () => {
    expect(isSupportedBackgroundUrl("https://example.com/photo.webp")).toBe(true);
    expect(isSupportedBackgroundUrl("http://camera.local/snapshot.jpg")).toBe(true);
    expect(isSupportedBackgroundUrl("/local/ha_theme_builder/backgrounds/photo.jpg")).toBe(true);
    expect(isSupportedBackgroundUrl("javascript:alert(1)")).toBe(false);
    expect(isSupportedBackgroundUrl("photo.jpg")).toBe(false);
  });
});
