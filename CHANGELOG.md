# Changelog

## 0.1.10 — 2026-09-01

- Le flou des sections est maintenant limité aux conteneurs portant la classe native `.has-background`; une section sans couleur de fond configurée reste entièrement transparente.
- Migration automatique de la règle générée par la version 0.1.9 lors du prochain enregistrement du thème.

## 0.1.9 — 2026-09-01

- Le flou déborde maintenant de `8px` autour de `hui-grid-section` afin de couvrir aussi le padding natif du conteneur de section, sans modifier le layout ni les interactions.
- Migration automatique de la règle générée par la version 0.1.8 lors du prochain enregistrement du thème.

## 0.1.8 — 2026-09-01

- Le flou cible directement `:host` dans `card-mod-grid-section`, un point d’injection confirmé fonctionnel avec Card Mod 4.2.1.
- Migration automatique des règles générées par les versions 0.1.6 et 0.1.7 lors du prochain enregistrement du thème.

## 0.1.7 — 2026-09-01

- Correction du flou des sections : la règle cible maintenant `.section` dans le Shadow DOM de `hui-sections-view` via `card-mod-view-yaml`.
- Migration automatique de la règle `card-mod-grid-section` générée par la version 0.1.6 lors du prochain enregistrement du thème.

## 0.1.6 — 2026-09-01

- Nouvelle option **Flouter le fond des sections**, avec génération automatique et réversible des règles `card-mod-theme` et `card-mod-grid-section`.
- La dépendance optionnelle à Card Mod est indiquée directement dans l’éditeur et dans la documentation.

## 0.1.5 — 2026-08-31

- Suppression ciblée du fond et du blur sur les en-têtes texte natifs, tout en conservant la surface verre des chips.
- Nouveau studio visuel par défaut avec pastilles contextuelles et menus de réglage directement liés aux surfaces de l’aperçu.
- Le mode expert donne désormais accès à l’intégralité du catalogue filtrable, tandis que la liste par défaut est limitée aux variables globales essentielles.

## 0.1.4 — 2026-08-31

- Ajout d’un arrière-plan photo par URL ou téléversement local, avec aperçu et portées Base/clair/sombre.
- Validation des images JPEG, PNG, GIF et WebP avant leur stockage dans `config/www/ha_theme_builder/backgrounds/`.

## 0.1.1 — 2026-08-31

- Ajout du schéma explicite pour une intégration uniquement configurable par config entry.
- Ajout de l’IoT class `calculated` requise par hassfest.
- Ajout des icônes de marque locales utilisées par HACS et Home Assistant.

## 0.1.0 — 2026-08-31

- Premier éditeur graphique avec 757 variables concrètes Home Assistant.
- Valeurs communes et variantes clair/sombre.
- Aperçus cartes, dashboard et pages système, sur desktop/tablette/mobile.
- Blur et effet frosted glass via les variables natives `ha-card`.
- Import, copie et export YAML.
- Enregistrement atomique dans Home Assistant et rechargement des thèmes.
- Paquets de release dédiés à HACS et à l’installation manuelle.
