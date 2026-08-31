export interface ParsedColor {
  hex: string;
  alpha: number;
  rgb: [number, number, number];
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const byteToHex = (value: number): string =>
  Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");

export function parseCssColor(value: string): ParsedColor | undefined {
  const input = value.trim();
  const hex = input.match(/^#([\da-f]{3,8})$/i)?.[1];
  if (hex) {
    const normalized = hex.length === 3 || hex.length === 4
      ? [...hex].map((part) => `${part}${part}`).join("")
      : hex;
    if (normalized.length === 6 || normalized.length === 8) {
      const rgb: [number, number, number] = [
        Number.parseInt(normalized.slice(0, 2), 16),
        Number.parseInt(normalized.slice(2, 4), 16),
        Number.parseInt(normalized.slice(4, 6), 16),
      ];
      return {
        hex: `#${normalized.slice(0, 6).toLowerCase()}`,
        alpha: normalized.length === 8 ? Number.parseInt(normalized.slice(6), 16) / 255 : 1,
        rgb,
      };
    }
  }

  const rgbMatch = input.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+)%?)?\s*\)$/i,
  );
  if (rgbMatch) {
    const rgb: [number, number, number] = [
      clamp(Number(rgbMatch[1]), 0, 255),
      clamp(Number(rgbMatch[2]), 0, 255),
      clamp(Number(rgbMatch[3]), 0, 255),
    ];
    return {
      hex: `#${rgb.map(byteToHex).join("")}`,
      alpha: clamp(rgbMatch[4] === undefined ? 1 : Number(rgbMatch[4]), 0, 1),
      rgb,
    };
  }

  const triplet = input.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);
  if (triplet) {
    const rgb: [number, number, number] = [
      clamp(Number(triplet[1]), 0, 255),
      clamp(Number(triplet[2]), 0, 255),
      clamp(Number(triplet[3]), 0, 255),
    ];
    return { hex: `#${rgb.map(byteToHex).join("")}`, alpha: 1, rgb };
  }

  return undefined;
}

export function withHexColor(
  currentValue: string,
  hex: string,
  format: "css-color" | "rgb-triplet" = "css-color",
): string {
  const parsed = parseCssColor(hex);
  if (!parsed) return currentValue;
  if (format === "rgb-triplet") return parsed.rgb.map(Math.round).join(", ");

  const alpha = parseCssColor(currentValue)?.alpha ?? 1;
  if (alpha >= 0.999) return parsed.hex;
  return `rgba(${parsed.rgb.map(Math.round).join(", ")}, ${alpha.toFixed(2)})`;
}

export function withAlpha(currentValue: string, alpha: number): string {
  const parsed = parseCssColor(currentValue);
  if (!parsed) return currentValue;
  return `rgba(${parsed.rgb.map(Math.round).join(", ")}, ${clamp(alpha, 0, 1).toFixed(2)})`;
}
