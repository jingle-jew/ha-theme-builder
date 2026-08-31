import type { ThemePreset } from "../models/types";

interface CatppuccinPalette {
  rosewater: string;
  pink: string;
  mauve: string;
  red: string;
  peach: string;
  yellow: string;
  green: string;
  teal: string;
  sky: string;
  blue: string;
  lavender: string;
  text: string;
  subtext1: string;
  subtext0: string;
  overlay1: string;
  overlay0: string;
  surface2: string;
  surface1: string;
  surface0: string;
  base: string;
  mantle: string;
  crust: string;
}

const CATPPUCCIN_PALETTES = {
  latte: {
    rosewater: "#dc8a78",
    pink: "#ea76cb",
    mauve: "#8839ef",
    red: "#d20f39",
    peach: "#fe640b",
    yellow: "#df8e1d",
    green: "#40a02b",
    teal: "#179299",
    sky: "#04a5e5",
    blue: "#1e66f5",
    lavender: "#7287fd",
    text: "#4c4f69",
    subtext1: "#5c5f77",
    subtext0: "#6c6f85",
    overlay1: "#8c8fa1",
    overlay0: "#9ca0b0",
    surface2: "#acb0be",
    surface1: "#bcc0cc",
    surface0: "#ccd0da",
    base: "#eff1f5",
    mantle: "#e6e9ef",
    crust: "#dce0e8",
  },
  frappe: {
    rosewater: "#f2d5cf",
    pink: "#f4b8e4",
    mauve: "#ca9ee6",
    red: "#e78284",
    peach: "#ef9f76",
    yellow: "#e5c890",
    green: "#a6d189",
    teal: "#81c8be",
    sky: "#99d1db",
    blue: "#8caaee",
    lavender: "#babbf1",
    text: "#c6d0f5",
    subtext1: "#b5bfe2",
    subtext0: "#a5adce",
    overlay1: "#838ba7",
    overlay0: "#737994",
    surface2: "#626880",
    surface1: "#51576d",
    surface0: "#414559",
    base: "#303446",
    mantle: "#292c3c",
    crust: "#232634",
  },
  macchiato: {
    rosewater: "#f4dbd6",
    pink: "#f5bde6",
    mauve: "#c6a0f6",
    red: "#ed8796",
    peach: "#f5a97f",
    yellow: "#eed49f",
    green: "#a6da95",
    teal: "#8bd5ca",
    sky: "#91d7e3",
    blue: "#8aadf4",
    lavender: "#b7bdf8",
    text: "#cad3f5",
    subtext1: "#b8c0e0",
    subtext0: "#a5adcb",
    overlay1: "#8087a2",
    overlay0: "#6e738d",
    surface2: "#5b6078",
    surface1: "#494d64",
    surface0: "#363a4f",
    base: "#24273a",
    mantle: "#1e2030",
    crust: "#181926",
  },
  mocha: {
    rosewater: "#f5e0dc",
    pink: "#f5c2e7",
    mauve: "#cba6f7",
    red: "#f38ba8",
    peach: "#fab387",
    yellow: "#f9e2af",
    green: "#a6e3a1",
    teal: "#94e2d5",
    sky: "#89dceb",
    blue: "#89b4fa",
    lavender: "#b4befe",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    subtext0: "#a6adc8",
    overlay1: "#7f849c",
    overlay0: "#6c7086",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b",
  },
} as const satisfies Record<string, CatppuccinPalette>;

function rgbTriplet(hex: string): string {
  const value = hex.slice(1);
  return [0, 2, 4]
    .map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
    .join(", ");
}

function catppuccinPreset(
  flavor: keyof typeof CATPPUCCIN_PALETTES,
  name: string,
  description: string,
): ThemePreset {
  const palette = CATPPUCCIN_PALETTES[flavor];

  return {
    id: `catppuccin-${flavor}`,
    name,
    description,
    swatches: [palette.mauve, palette.blue, palette.base, palette.text],
    theme: {
      values: {
        "primary-color": palette.mauve,
        "accent-color": palette.blue,
        "dark-primary-color": palette.mauve,
        "light-primary-color": palette.lavender,
        "primary-text-color": palette.text,
        "secondary-text-color": palette.subtext1,
        "disabled-text-color": palette.overlay0,
        "text-primary-color": palette.base,
        "primary-background-color": palette.base,
        "secondary-background-color": palette.mantle,
        "card-background-color": palette.surface0,
        "ha-card-background": palette.surface0,
        "ha-card-border-color": palette.surface1,
        "ha-card-border-radius": "16px",
        "ha-card-border-width": "1px",
        "ha-card-box-shadow": "none",
        "divider-color": palette.surface1,
        "outline-color": palette.surface2,
        "outline-hover-color": palette.mauve,
        "sidebar-background-color": palette.mantle,
        "sidebar-text-color": palette.text,
        "sidebar-icon-color": palette.subtext0,
        "sidebar-selected-text-color": palette.mauve,
        "sidebar-selected-icon-color": palette.mauve,
        "sidebar-menu-button-background-color": palette.surface0,
        "sidebar-menu-button-text-color": palette.text,
        "app-header-background-color": palette.mantle,
        "app-header-text-color": palette.text,
        "state-active-color": palette.green,
        "state-inactive-color": palette.overlay1,
        "state-unavailable-color": palette.overlay0,
        "state-icon-color": palette.subtext0,
        "state-icon-active-color": palette.green,
        "state-icon-unavailable-color": palette.overlay0,
        "state-icon-error-color": palette.red,
        "error-color": palette.red,
        "error-state-color": palette.red,
        "warning-color": palette.yellow,
        "success-color": palette.green,
        "info-color": palette.blue,
        "red-color": palette.red,
        "pink-color": palette.pink,
        "purple-color": palette.mauve,
        "blue-color": palette.blue,
        "cyan-color": palette.sky,
        "teal-color": palette.teal,
        "green-color": palette.green,
        "yellow-color": palette.yellow,
        "orange-color": palette.peach,
        "ha-color-text-primary": palette.text,
        "ha-color-text-secondary": palette.subtext1,
        "ha-color-text-disabled": palette.overlay0,
        "ha-color-text-link": palette.blue,
        "ha-color-text-primary-inverted": palette.base,
        "ha-color-text-secondary-inverted": palette.mantle,
        "ha-color-surface-default": palette.base,
        "ha-color-surface-low": palette.mantle,
        "ha-color-surface-lower": palette.crust,
        "ha-color-surface-default-inverted": palette.text,
        "scrollbar-thumb-color": palette.overlay0,
        "rgb-primary-color": rgbTriplet(palette.mauve),
        "rgb-accent-color": rgbTriplet(palette.blue),
        "rgb-primary-text-color": rgbTriplet(palette.text),
        "rgb-secondary-text-color": rgbTriplet(palette.subtext1),
        "rgb-text-primary-color": rgbTriplet(palette.base),
        "rgb-card-background-color": rgbTriplet(palette.surface0),
        "rgb-error-color": rgbTriplet(palette.red),
        "rgb-warning-color": rgbTriplet(palette.yellow),
        "rgb-success-color": rgbTriplet(palette.green),
        "rgb-info-color": rgbTriplet(palette.blue),
      },
      modes: { light: {}, dark: {} },
    },
  };
}

const CATPPUCCIN_PRESETS: readonly ThemePreset[] = [
  catppuccinPreset(
    "latte",
    "Catppuccin Latte",
    "La déclinaison claire Catppuccin, douce et lumineuse.",
  ),
  catppuccinPreset(
    "frappe",
    "Catppuccin Frappé",
    "Un thème sombre adouci aux contrastes feutrés.",
  ),
  catppuccinPreset(
    "macchiato",
    "Catppuccin Macchiato",
    "Un thème sombre équilibré au contraste intermédiaire.",
  ),
  catppuccinPreset(
    "mocha",
    "Catppuccin Mocha",
    "La déclinaison Catppuccin la plus sombre et contrastée.",
  ),
];

export const THEME_PRESETS: readonly ThemePreset[] = [
  {
    id: "ha-clean",
    name: "HA essentiel",
    description: "Une base claire, proche du thème Home Assistant moderne.",
    swatches: ["#03a9f4", "#ffffff", "#f4f6f8", "#202124"],
    theme: {
      values: {
        "primary-color": "#03a9f4",
        "accent-color": "#ff9800",
        "primary-text-color": "#202124",
        "secondary-text-color": "#5f6368",
        "primary-background-color": "#f4f6f8",
        "secondary-background-color": "#eef1f4",
        "card-background-color": "#ffffff",
        "ha-card-background": "#ffffff",
        "ha-card-border-radius": "16px",
        "ha-card-border-color": "rgba(0, 0, 0, 0.10)",
        "ha-card-border-width": "1px",
        "sidebar-background-color": "#ffffff",
        "app-header-background-color": "#ffffff",
      },
      modes: { light: {}, dark: {} },
    },
  },
  {
    id: "aurora-glass",
    name: "Verre boréal",
    description: "Surfaces translucides, blur natif et accents cyan-violet.",
    swatches: ["#6ee7f9", "#8b7cff", "#10172a", "#ffffff"],
    theme: {
      values: {
        "primary-color": "#7c6df2",
        "accent-color": "#55d8ee",
        "primary-text-color": "#f7f8ff",
        "secondary-text-color": "rgba(238, 242, 255, 0.72)",
        "disabled-text-color": "rgba(238, 242, 255, 0.42)",
        "primary-background-color": "#11172a",
        "secondary-background-color": "#171f36",
        "card-background-color": "rgba(23, 31, 54, 0.64)",
        "ha-card-background": "rgba(23, 31, 54, 0.64)",
        "ha-card-backdrop-filter": "blur(18px) saturate(135%)",
        "ha-card-border-radius": "22px",
        "ha-card-border-color": "rgba(255, 255, 255, 0.14)",
        "ha-card-border-width": "1px",
        "ha-card-box-shadow": "0 18px 55px rgba(4, 8, 20, 0.28)",
        "divider-color": "rgba(255, 255, 255, 0.11)",
        "sidebar-background-color": "rgba(13, 19, 35, 0.78)",
        "sidebar-text-color": "#eef2ff",
        "sidebar-icon-color": "rgba(238, 242, 255, 0.68)",
        "sidebar-selected-text-color": "#ffffff",
        "sidebar-selected-icon-color": "#6ee7f9",
        "app-header-background-color": "rgba(13, 19, 35, 0.72)",
        "app-header-text-color": "#ffffff",
        "state-active-color": "#6ee7f9",
        "state-inactive-color": "#75809b",
      },
      modes: { light: {}, dark: {} },
    },
  },
  {
    id: "oled-night",
    name: "OLED minuit",
    description: "Noir profond, contrastes nets et consommation réduite.",
    swatches: ["#00d4ff", "#000000", "#111318", "#f7fbff"],
    theme: {
      values: {
        "primary-color": "#00bfe8",
        "accent-color": "#8be9fd",
        "primary-text-color": "#f7fbff",
        "secondary-text-color": "#aeb7c3",
        "primary-background-color": "#000000",
        "secondary-background-color": "#090a0d",
        "card-background-color": "#111318",
        "ha-card-background": "#111318",
        "ha-card-border-radius": "12px",
        "ha-card-border-color": "#252a33",
        "divider-color": "#252a33",
        "sidebar-background-color": "#07080a",
        "app-header-background-color": "#07080a",
        "state-active-color": "#00d4ff",
      },
      modes: { light: {}, dark: {} },
    },
  },
  {
    id: "warm-minimal",
    name: "Sable doux",
    description: "Palette chaude et organique pour des interfaces calmes.",
    swatches: ["#c86b46", "#f5efe5", "#fffaf2", "#342e29"],
    theme: {
      values: {
        "primary-color": "#b85f3d",
        "accent-color": "#d58a52",
        "primary-text-color": "#342e29",
        "secondary-text-color": "#766b61",
        "primary-background-color": "#f5efe5",
        "secondary-background-color": "#eee5d8",
        "card-background-color": "#fffaf2",
        "ha-card-background": "rgba(255, 250, 242, 0.88)",
        "ha-card-backdrop-filter": "blur(10px) saturate(112%)",
        "ha-card-border-radius": "20px",
        "ha-card-border-color": "rgba(93, 70, 50, 0.14)",
        "ha-card-box-shadow": "0 12px 34px rgba(93, 70, 50, 0.10)",
        "divider-color": "rgba(93, 70, 50, 0.14)",
        "sidebar-background-color": "#fffaf2",
        "app-header-background-color": "rgba(255, 250, 242, 0.90)",
        "state-active-color": "#c86b46",
      },
      modes: { light: {}, dark: {} },
    },
  },
  ...CATPPUCCIN_PRESETS,
];
