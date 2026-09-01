# Changelog

## Non publié

- Suppression ciblée du fond et du blur sur les en-têtes texte natifs, tout en conservant la surface verre des chips.

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
