const BACKGROUND_URL = /url\(\s*(["']?)(.*?)\1\s*\)/i;

export function backgroundImageValue(url: string): string {
  const escaped = url.trim().replaceAll("\\", "\\\\").replaceAll('"', '\\"').replace(/[\r\n]/g, "");
  return `center / cover no-repeat fixed url("${escaped}")`;
}

export function backgroundImageUrl(value: string | undefined): string {
  if (!value) return "";
  return value.match(BACKGROUND_URL)?.[2]?.replaceAll('\\"', '"').replaceAll("\\\\", "\\") ?? "";
}

export function isSupportedBackgroundUrl(value: string): boolean {
  const url = value.trim();
  if (url.startsWith("/local/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
