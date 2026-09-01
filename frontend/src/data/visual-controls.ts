export type VisualControlId =
  | "palette"
  | "background"
  | "card-surface"
  | "card-glass"
  | "card-border"
  | "card-radius"
  | "card-shadow"
  | "text"
  | "sidebar"
  | "header"
  | "states";

export interface VisualControlDefinition {
  id: VisualControlId;
  label: string;
  description: string;
  icon: string;
  variables: readonly string[];
  photo?: boolean;
}

export interface VisualControlRequestDetail {
  id: VisualControlId;
  clientX: number;
  clientY: number;
}

export const DEFAULT_VARIABLE_IDS: readonly string[] = [
  "primary-color",
  "accent-color",
  "primary-background-color",
  "secondary-background-color",
  "primary-text-color",
  "secondary-text-color",
  "ha-card-background",
  "ha-card-backdrop-filter",
  "ha-card-border-color",
  "ha-card-border-radius",
  "sidebar-background-color",
  "app-header-background-color",
  "state-active-color",
  "divider-color",
];

export const VISUAL_CONTROLS: readonly VisualControlDefinition[] = [
  {
    id: "palette",
    label: "Palette globale",
    description: "Couleurs d’accent principales du thème.",
    icon: "palette",
    variables: ["primary-color", "accent-color"],
  },
  {
    id: "background",
    label: "Arrière-plan",
    description: "Fond général du dashboard et image d’arrière-plan.",
    icon: "image",
    variables: ["primary-background-color", "secondary-background-color"],
    photo: true,
  },
  {
    id: "card-surface",
    label: "Surface des cartes",
    description: "Couleur et transparence de la surface des cartes.",
    icon: "card",
    variables: ["ha-card-background", "card-background-color"],
  },
  {
    id: "card-glass",
    label: "Verre et flou",
    description: "Flou et saturation derrière les cartes transparentes.",
    icon: "sparkles",
    variables: ["ha-card-backdrop-filter"],
  },
  {
    id: "card-border",
    label: "Bordures",
    description: "Couleur et épaisseur du contour des cartes.",
    icon: "card",
    variables: ["ha-card-border-color", "ha-card-border-width", "divider-color"],
  },
  {
    id: "card-radius",
    label: "Rayons",
    description: "Arrondi global des cartes Home Assistant.",
    icon: "card",
    variables: ["ha-card-border-radius"],
  },
  {
    id: "card-shadow",
    label: "Ombres",
    description: "Profondeur et ombre portée des cartes.",
    icon: "layers",
    variables: ["ha-card-box-shadow"],
  },
  {
    id: "text",
    label: "Textes",
    description: "Hiérarchie des textes principaux et secondaires.",
    icon: "type",
    variables: ["primary-text-color", "secondary-text-color", "ha-card-header-color"],
  },
  {
    id: "sidebar",
    label: "Barre latérale",
    description: "Surface, texte et icônes de navigation.",
    icon: "sidebar",
    variables: ["sidebar-background-color", "sidebar-text-color", "sidebar-icon-color"],
  },
  {
    id: "header",
    label: "En-tête système",
    description: "Surface et texte de la barre supérieure.",
    icon: "menu",
    variables: ["app-header-background-color", "app-header-text-color"],
  },
  {
    id: "states",
    label: "États et actions",
    description: "Couleurs globales des éléments actifs et inactifs.",
    icon: "activity",
    variables: ["state-active-color", "state-inactive-color"],
  },
];

export const visualControl = (id: VisualControlId): VisualControlDefinition =>
  VISUAL_CONTROLS.find((control) => control.id === id) ?? VISUAL_CONTROLS[0];
