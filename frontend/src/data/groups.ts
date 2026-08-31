import type { ThemeGroup } from "../models/types";

export const THEME_GROUPS: readonly ThemeGroup[] = [
  { id: "all", label: "Essentiels", description: "Les réglages qui définissent le caractère du thème.", icon: "sparkles" },
  { id: "core", label: "Couleurs clés", description: "Accent, états et couleurs sémantiques principales.", icon: "palette" },
  { id: "surfaces", label: "Surfaces", description: "Arrière-plans, panneaux et séparateurs.", icon: "layers" },
  { id: "glass_cards", label: "Cartes & verre", description: "Transparence, blur, bordures et ombres des cartes.", icon: "glass" },
  { id: "text", label: "Texte", description: "Hiérarchie, contraste et liens.", icon: "type" },
  { id: "navigation", label: "Navigation", description: "Barre latérale et en-tête de Home Assistant.", icon: "sidebar" },
  { id: "states", label: "États", description: "Couleurs globales, domaines et états d’entités.", icon: "activity" },
  { id: "typography", label: "Typographie", description: "Familles, tailles, graisses et interlignage.", icon: "type" },
  { id: "shape", label: "Formes", description: "Rayons, contours et épaisseurs.", icon: "shapes" },
  { id: "spacing", label: "Espacements", description: "Échelle d’espace, tailles et zones sûres.", icon: "move" },
  { id: "forms", label: "Formulaires", description: "Champs, listes et contrôles.", icon: "form" },
  { id: "components", label: "Composants", description: "Badges, boutons, puces et sliders.", icon: "component" },
  { id: "data", label: "Graphiques", description: "Historique, énergie et palettes de données.", icon: "chart" },
  { id: "palette", label: "Palette étendue", description: "Couleurs nommées et valeurs RGB dérivées.", icon: "swatches" },
  { id: "system", label: "Pages système", description: "Tables, dialogues, éditeur et calendrier.", icon: "settings" },
  { id: "motion", label: "Mouvement", description: "Durées et courbes d’animation.", icon: "motion" },
  { id: "advanced", label: "Système avancé", description: "Tokens internes et réglages experts.", icon: "code" },
];
