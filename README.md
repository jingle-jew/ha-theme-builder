# HA Theme Builder

Un constructeur de thèmes entièrement graphique pour Home Assistant. Il s’installe comme intégration custom via HACS, ajoute un panneau **Theme Builder** à la sidebar et permet d’ajuster les variables du thème sans écrire de YAML.

**Dépôt HACS custom :** [jingle-jew/ha-theme-builder](https://github.com/jingle-jew/ha-theme-builder)

## Ce qui fonctionne

- 757 variables concrètes provenant de la liste de référence, classées par usage ;
- variables communes et surcharges séparées pour les modes clair et sombre ;
- sélecteurs de couleur avec opacité, sliders numériques, listes et champs CSS ;
- recherche instantanée, catégories, mode expert et filtre legacy ;
- ajout graphique des variables dynamiques, par exemple `state-light-reading-color` ;
- blur/frosted natif avec `ha-card-background` et `ha-card-backdrop-filter` ;
- flou optionnel du fond de toutes les sections, généré automatiquement pour Card Mod ;
- arrière-plan photo par URL ou téléversement local, avec variantes Base/clair/sombre ;
- en-têtes texte natifs sans fond ni blur, sans modifier les chips de l’en-tête ;
- studio visuel par défaut avec pastilles contextuelles sur les surfaces, bordures, rayons, textes et zones de navigation ;
- catalogue complet conservé dans un mode expert séparé ;
- aperçus dédiés aux cartes dashboard, à un dashboard complet et aux pages système ;
- cadres desktop, tablette et mobile ;
- préréglages, annuler/rétablir, brouillon local, import, copie et export YAML ;
- sauvegarde admin dans `config/themes/ha_theme_builder.yaml`, écriture atomique puis rechargement des thèmes.

Les alias `mdc-*`/`md-*` conservés pour compatibilité sont masqués par défaut. Les quatre modèles contenant des placeholders (`state-{domain}…`) ne sont pas exportés littéralement : le bouton **+** permet de créer leur forme concrète pour le domaine et l’état voulus.

Le mode **Visuel** expose une sélection courte de réglages globaux. Les pastilles affichées dans l’aperçu ouvrent le menu correspondant à la zone sélectionnée, avec les contrôles couleur, opacité, blur, bordure, rayon ou ombre adaptés. Le mode **Expert** donne accès au catalogue complet, à ses catégories, à la recherche et aux alias legacy.

## Développement local

Prérequis : Node.js 22+, npm, Python 3 et `zip`.

```bash
npm install
npm run dev
```

Le serveur de développement s’ouvre sur `http://127.0.0.1:4173`. Pour exécuter toute la validation :

```bash
npm run check
```

Le catalogue est vendored et le build ne dépend pas du réseau. Pour le resynchroniser avec la branche `dev` du frontend Home Assistant :

```bash
npm run catalog:sync
```

## Installation Home Assistant

1. Dans HACS, ajouter `https://github.com/jingle-jew/ha-theme-builder` comme **Custom repository**, catégorie **Integration**.
2. Installer **HA Theme Builder** et redémarrer Home Assistant.
3. Dans **Paramètres → Appareils et services → Ajouter une intégration**, chercher **HA Theme Builder**.
4. Vérifier que la configuration charge les thèmes d’un dossier :

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

5. Redémarrer après cette modification de `configuration.yaml`. Les sauvegardes suivantes peuvent être rechargées directement depuis le panneau.

Le panneau est réservé aux administrateurs, car il peut écrire un thème dans le dossier de configuration.

## Blur et frosted glass

Home Assistant applique directement `--ha-card-backdrop-filter` sur `ha-card`. Le groupe **Cartes & verre** expose donc :

- la couleur/transparence de `ha-card-background` ;
- le blur et la saturation de `ha-card-backdrop-filter` ;
- la bordure, le rayon et l’ombre de la carte.

Pour rendre le blur visible, l’arrière-plan de la carte doit être partiellement transparent et le dashboard doit avoir une image, un dégradé ou des éléments colorés derrière les cartes.

### Flou du fond des sections avec Card Mod

L’option **Flouter le fond des sections** ajoute automatiquement au thème enregistré les entrées `card-mod-theme` et `card-mod-grid-section`. Card Mod injecte la règle dans chaque `hui-grid-section`; un pseudo-élément de `:host` étend le flou sur les `8px` de padding natif du conteneur, sans devoir répéter du YAML dans chaque dashboard.

Cette fonctionnalité nécessite que [Card Mod](https://github.com/thomasloven/lovelace-card-mod) soit installé et chargé dans Home Assistant. Sans Card Mod, les entrées du thème restent sans effet, mais le reste du thème continue de fonctionner normalement. Le bloc généré est balisé : désactiver l’option retire uniquement la règle créée par Theme Builder et conserve les styles Card Mod ajoutés manuellement autour d’elle.

## Arrière-plan photo

Le bouton **Arrière-plan** de la barre d’aperçu accepte une URL `http(s)`, un chemin Home Assistant `/local/…` ou un fichier JPEG, PNG, GIF ou WebP de 8 Mo maximum. Les fichiers téléversés sont validés puis enregistrés dans `config/www/ha_theme_builder/backgrounds/`. Le thème conserve une référence `/local/ha_theme_builder/backgrounds/…`, donc la photo reste disponible après un redémarrage.

Comme les autres variables, la photo peut être commune (**Base**) ou différente en mode clair et sombre. Le YAML généré utilise la variable native `lovelace-background`.

## Releases HACS

`hacs.json` utilise `zip_release: true`. Chaque release GitHub contient l’asset exact `ha-theme-builder-hacs.zip`, dont la racine est le contenu de l’intégration. Le workflow de release produit aussi `ha-theme-builder.zip` pour une installation manuelle sous `custom_components/`.

Une release est déclenchée par le push d’un tag `vX.Y.Z`. Le workflow vérifie que le tag, `package.json` et le manifeste Home Assistant ont la même version, construit les archives sur une release brouillon, puis la publie seulement après le téléversement des deux assets.

## Licence

MIT
