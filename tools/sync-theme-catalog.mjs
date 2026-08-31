import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED_PATH = path.join(ROOT, "tools", "theme-variable-seed.txt");
const OUTPUT_PATH = path.join(
  ROOT,
  "frontend",
  "src",
  "data",
  "theme-catalog.generated.ts",
);

const FRONTEND_REF = process.env.HA_FRONTEND_REF ?? "dev";
const SOURCE_FILES = [
  "animations.globals.ts",
  "core.globals.ts",
  "main.globals.ts",
  "semantic.globals.ts",
  "typography.globals.ts",
  "wa.globals.ts",
  "color/color.globals.ts",
  "color/core.globals.ts",
  "color/semantic.globals.ts",
  "color/wa.globals.ts",
];

const FEATURED = new Set([
  "primary-color",
  "accent-color",
  "primary-text-color",
  "secondary-text-color",
  "disabled-text-color",
  "primary-background-color",
  "secondary-background-color",
  "card-background-color",
  "divider-color",
  "state-active-color",
  "state-inactive-color",
  "state-unavailable-color",
  "sidebar-background-color",
  "sidebar-text-color",
  "sidebar-icon-color",
  "sidebar-selected-text-color",
  "sidebar-selected-icon-color",
  "app-header-background-color",
  "app-header-text-color",
  "ha-card-background",
  "ha-card-backdrop-filter",
  "ha-card-border-color",
  "ha-card-border-radius",
  "ha-card-border-width",
  "ha-card-box-shadow",
  "ha-card-header-color",
  "ha-font-family-body",
  "ha-font-family-heading",
  "ha-font-size-scale",
  "error-color",
  "warning-color",
  "success-color",
  "info-color",
]);

const LABEL_OVERRIDES = new Map([
  ["primary-color", "Couleur primaire"],
  ["accent-color", "Couleur d’accent"],
  ["primary-text-color", "Texte principal"],
  ["secondary-text-color", "Texte secondaire"],
  ["disabled-text-color", "Texte désactivé"],
  ["primary-background-color", "Arrière-plan principal"],
  ["secondary-background-color", "Arrière-plan secondaire"],
  ["card-background-color", "Arrière-plan des cartes (compatibilité)"],
  ["divider-color", "Séparateurs"],
  ["state-active-color", "État actif"],
  ["state-inactive-color", "État inactif"],
  ["state-unavailable-color", "État indisponible"],
  ["sidebar-background-color", "Arrière-plan de la barre latérale"],
  ["sidebar-text-color", "Texte de la barre latérale"],
  ["sidebar-icon-color", "Icônes de la barre latérale"],
  ["sidebar-selected-text-color", "Texte sélectionné de la barre latérale"],
  ["sidebar-selected-icon-color", "Icône sélectionnée de la barre latérale"],
  ["app-header-background-color", "Arrière-plan de l’en-tête"],
  ["app-header-text-color", "Texte de l’en-tête"],
  ["ha-card-background", "Arrière-plan des cartes"],
  ["ha-card-backdrop-filter", "Blur des cartes"],
  ["ha-card-border-color", "Couleur de bordure des cartes"],
  ["ha-card-border-radius", "Arrondi des cartes"],
  ["ha-card-border-width", "Épaisseur de bordure des cartes"],
  ["ha-card-box-shadow", "Ombre des cartes"],
  ["ha-card-header-color", "Titre des cartes"],
  ["ha-font-family-body", "Police du corps"],
  ["ha-font-family-heading", "Police des titres"],
  ["ha-font-size-scale", "Échelle typographique"],
  ["error-color", "Erreur"],
  ["warning-color", "Avertissement"],
  ["success-color", "Succès"],
  ["info-color", "Information"],
]);

const LEGACY_PREFIXES = ["mdc-", "md-", "paper-"];
const INTERNAL_NAMES = new Set([
  "direction",
  "float-start",
  "float-end",
  "margin-title-ltr",
  "margin-title-rtl",
  "safe-width",
  "safe-height",
  "scale-direction",
]);

function extractDeclarations(source) {
  const values = new Map();
  const declaration = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  for (const match of source.matchAll(declaration)) {
    const value = match[2].replace(/\s+/g, " ").trim();
    if (!value.includes("${") && !values.has(match[1])) {
      values.set(match[1], value);
    }
  }
  return values;
}

function humanize(id) {
  const replacements = new Map([
    ["ha", "HA"],
    ["rgb", "RGB"],
    ["wa", "Web Awesome"],
    ["mdc", "Material (legacy)"],
    ["bg", "arrière-plan"],
    ["background", "arrière-plan"],
    ["color", "couleur"],
    ["text", "texte"],
    ["primary", "primaire"],
    ["secondary", "secondaire"],
    ["accent", "accent"],
    ["active", "actif"],
    ["inactive", "inactif"],
    ["disabled", "désactivé"],
    ["unavailable", "indisponible"],
    ["border", "bordure"],
    ["radius", "rayon"],
    ["width", "largeur"],
    ["height", "hauteur"],
    ["shadow", "ombre"],
    ["card", "carte"],
    ["sidebar", "barre latérale"],
    ["header", "en-tête"],
    ["font", "police"],
    ["size", "taille"],
    ["weight", "graisse"],
    ["warning", "avertissement"],
    ["success", "succès"],
    ["error", "erreur"],
    ["surface", "surface"],
    ["fill", "remplissage"],
    ["quiet", "discret"],
    ["loud", "fort"],
    ["normal", "normal"],
  ]);

  const words = id.split("-").map((word) => replacements.get(word) ?? word.replaceAll("_", " "));
  const label = words.join(" ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function groupFor(id) {
  if (id.includes("backdrop-filter") || id.startsWith("ha-card-") || id.includes("shadow")) return "glass_cards";
  if (id.startsWith("state-") || id.includes("state-icon") || id === "error-state-color") return "states";
  if (id.includes("sidebar") || id.startsWith("app-header") || id === "header-height") return "navigation";
  if (id.includes("font") || id.includes("line-height") || id.includes("smoothing")) return "typography";
  if (id.includes("border") || id.includes("radius") || id === "outline-color" || id === "outline-hover-color") return "shape";
  if (id.includes("space") || id.includes("padding") || id.includes("safe-area") || id.includes("offset")) return "spacing";
  if (id.includes("animation") || id.includes("transition") || id.includes("easing")) return "motion";
  if (id.startsWith("energy-") || id.startsWith("history-") || id.startsWith("graph-") || /^color-\d+$/.test(id)) return "data";
  if (id.includes("input") || id.includes("form-control") || id.startsWith("mdc-text-field") || id.startsWith("mdc-select")) return "forms";
  if (id.includes("badge") || id.includes("button") || id.includes("chip") || id.includes("slider")) return "components";
  if (id.startsWith("codemirror") || id.includes("table-") || id.includes("dialog") || id.includes("calendar") || id === "map-filter") return "system";
  if (id.includes("text") || id.startsWith("ha-color-on-")) return "text";
  if (id.includes("background") || id.includes("surface") || id.includes("divider") || id === "clear-background-color") return "surfaces";
  if (id.startsWith("rgb-") || /(^|-)(red|pink|purple|indigo|blue|cyan|teal|green|lime|yellow|amber|orange|brown|grey|black|white)(-|$)/.test(id)) return "palette";
  if (id.includes("color")) return "core";
  return "advanced";
}

function rangeDefinition(id, value) {
  if (id.includes("opacity")) return { unit: "", min: 0, max: 1, step: 0.01 };
  if (id.includes("duration") || id.includes("transition")) return { unit: "ms", min: 0, max: 2000, step: 10 };
  if (id.includes("font-weight")) return { unit: "", min: 100, max: 900, step: 50 };
  if (id === "ha-font-size-scale") return { unit: "", min: 0.7, max: 1.5, step: 0.01 };
  if (/radius|space|size|width|height|padding|offset|inset/.test(id) && /^-?[\d.]+(px|rem|em|%)$/.test(value)) {
    const unit = value.match(/(px|rem|em|%)$/)?.[1] ?? "px";
    return { unit, min: 0, max: unit === "%" ? 100 : unit === "px" ? 96 : 8, step: unit === "px" ? 1 : 0.05 };
  }
  return undefined;
}

function definitionFor(id, defaultValue) {
  const legacy = LEGACY_PREFIXES.some((prefix) => id.startsWith(prefix));
  const internal = INTERNAL_NAMES.has(id) || id.includes("safe-area") || id.startsWith("app-safe-area");
  const range = rangeDefinition(id, defaultValue);
  let kind = "text";
  let format;
  let options;

  if (id.includes("backdrop-filter")) {
    kind = "filter";
  } else if (range) {
    kind = "range";
  } else if (id === "wa-border-style" || id.endsWith("border-style")) {
    kind = "select";
    options = ["none", "solid", "dashed", "dotted", "double"];
  } else if (id.endsWith("font-smoothing")) {
    kind = "select";
    options = ["auto", "antialiased", "subpixel-antialiased", "grayscale"];
  } else if (id.startsWith("rgb-")) {
    kind = "color";
    format = "rgb-triplet";
  } else if (id.includes("color") || /background$/.test(id)) {
    kind = "color";
    format = "css-color";
  }

  const annotations = [];
  if (legacy) annotations.push("Compatibilité avec un ancien composant Material");
  if (internal) annotations.push("Jeton interne ou dépendant de l’appareil");
  if (!annotations.length) annotations.push("Variable de thème Home Assistant");

  return {
    id,
    label: LABEL_OVERRIDES.get(id) ?? humanize(id),
    description: `${annotations.join(". ")}.`,
    group: internal ? "advanced" : groupFor(id),
    kind,
    defaultValue,
    ...(range ?? {}),
    ...(format ? { format } : {}),
    ...(options ? { options } : {}),
    featured: FEATURED.has(id),
    legacy,
    source: "home-assistant",
  };
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "ha-theme-builder-catalog" } });
  if (!response.ok) throw new Error(`Unable to fetch ${url}: HTTP ${response.status}`);
  return response.text();
}

const seed = (await readFile(SEED_PATH, "utf8"))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.includes("{"));

const defaults = new Map();
for (const file of SOURCE_FILES) {
  const url = `https://raw.githubusercontent.com/home-assistant/frontend/${FRONTEND_REF}/src/resources/theme/${file}`;
  const values = extractDeclarations(await fetchText(url));
  for (const [id, value] of values) if (!defaults.has(id)) defaults.set(id, value);
}

const ids = [...new Set([...seed, ...defaults.keys()])].sort((a, b) => a.localeCompare(b));
const definitions = ids.map((id) => definitionFor(id, defaults.get(id) ?? ""));
const generatedAt = new Date().toISOString();
const source = `/* This file is generated by tools/sync-theme-catalog.mjs. */
import type { ThemeVariable } from "../models/types";

export const CATALOG_SOURCE = ${JSON.stringify({ ref: FRONTEND_REF, generatedAt, count: definitions.length }, null, 2)} as const;

export const THEME_VARIABLES: readonly ThemeVariable[] = ${JSON.stringify(definitions, null, 2)};
`;

await writeFile(OUTPUT_PATH, source, "utf8");
console.log(`Wrote ${definitions.length} theme variables to ${path.relative(ROOT, OUTPUT_PATH)}.`);
