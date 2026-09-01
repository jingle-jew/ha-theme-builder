import { parse, stringify } from "yaml";
import type { ThemeDocument, ThemeMode } from "../models/types";
import { syncCardModThemeName } from "./card-mod";

const VARIABLE_NAME = /^[a-z][a-z0-9_-]*$/;

export function createTheme(name = "Mon thème"): ThemeDocument {
  return { name, values: {}, modes: { light: {}, dark: {} } };
}

export function cloneTheme(theme: ThemeDocument): ThemeDocument {
  return JSON.parse(JSON.stringify(theme)) as ThemeDocument;
}

export function modeValues(theme: ThemeDocument, mode: ThemeMode): Record<string, string> {
  return mode === "base" ? theme.values : theme.modes[mode];
}

export function resolvedValues(theme: ThemeDocument, mode: Exclude<ThemeMode, "base">): Record<string, string> {
  return { ...theme.values, ...theme.modes[mode] };
}

export function setThemeValue(
  theme: ThemeDocument,
  mode: ThemeMode,
  variable: string,
  value: string | undefined,
): ThemeDocument {
  const next = cloneTheme(theme);
  const target = modeValues(next, mode);
  if (value === undefined || !value.trim()) delete target[variable];
  else target[variable] = value.trim();
  return next;
}

export function themeToYaml(theme: ThemeDocument): string {
  const prepared = syncCardModThemeName(theme);
  const body: Record<string, unknown> = { ...prepared.values };
  const modes: Record<string, Record<string, string>> = {};
  if (Object.keys(prepared.modes.light).length) modes.light = prepared.modes.light;
  if (Object.keys(prepared.modes.dark).length) modes.dark = prepared.modes.dark;
  if (Object.keys(modes).length) body.modes = modes;
  return stringify({ [prepared.name.trim() || "Mon thème"]: body }, { lineWidth: 0, singleQuote: false });
}

function stringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => VARIABLE_NAME.test(key) && ["string", "number", "boolean"].includes(typeof item))
      .map(([key, item]) => [key, String(item)]),
  );
}

export function themeFromYaml(source: string): ThemeDocument {
  const parsed: unknown = parse(source);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Le fichier YAML ne contient aucun thème valide.");
  }
  const entries = Object.entries(parsed as Record<string, unknown>);
  if (!entries.length) throw new Error("Le fichier YAML est vide.");
  const [name, rawTheme] = entries[0];
  if (!rawTheme || typeof rawTheme !== "object" || Array.isArray(rawTheme)) {
    throw new Error("Le premier thème n’est pas un objet YAML valide.");
  }
  const raw = rawTheme as Record<string, unknown>;
  const rawModes = raw.modes && typeof raw.modes === "object" && !Array.isArray(raw.modes)
    ? raw.modes as Record<string, unknown>
    : {};
  const values = stringRecord(Object.fromEntries(Object.entries(raw).filter(([key]) => key !== "modes")));
  return {
    name,
    values,
    modes: {
      light: stringRecord(rawModes.light),
      dark: stringRecord(rawModes.dark),
    },
  };
}

export function customPropertyStyle(values: Record<string, string>): string {
  return Object.entries(values)
    .filter(([key, value]) => VARIABLE_NAME.test(key) && value.trim())
    .map(([key, value]) => `--${key}: ${value}`)
    .join(";");
}

export function changedCount(theme: ThemeDocument): number {
  return new Set([
    ...Object.keys(theme.values),
    ...Object.keys(theme.modes.light),
    ...Object.keys(theme.modes.dark),
  ]).size;
}
