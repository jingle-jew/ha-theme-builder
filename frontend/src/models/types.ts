export type ThemeMode = "base" | "light" | "dark";
export type PreviewKind = "card" | "dashboard" | "system";
export type PreviewDevice = "desktop" | "tablet" | "mobile";
export type ControlKind = "color" | "range" | "select" | "filter" | "text";

export interface HomeAssistantLike {
  language?: string;
  themes?: {
    default_theme?: string;
    default_dark_theme?: string | null;
    darkMode?: boolean;
  };
  callWS?<T>(message: Record<string, unknown>): Promise<T>;
}

export interface ThemeVariable {
  id: string;
  label: string;
  description: string;
  group: string;
  kind: ControlKind;
  defaultValue: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  format?: "css-color" | "rgb-triplet";
  options?: readonly string[];
  featured?: boolean;
  legacy?: boolean;
  source?: "home-assistant" | "builder";
}

export interface ThemeGroup {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ThemeDocument {
  name: string;
  values: Record<string, string>;
  modes: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  updated?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  swatches: readonly string[];
  theme: Omit<ThemeDocument, "name">;
}

export interface HassThemeSummary {
  name: string;
  updated?: string;
}
