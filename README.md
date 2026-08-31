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
- aperçus dédiés aux cartes dashboard, à un dashboard complet et aux pages système ;
- cadres desktop, tablette et mobile ;
- préréglages, annuler/rétablir, brouillon local, import, copie et export YAML ;
- sauvegarde admin dans `config/themes/ha_theme_builder.yaml`, écriture atomique puis rechargement des thèmes.

Les alias `mdc-*`/`md-*` conservés pour compatibilité sont masqués par défaut. Les quatre modèles contenant des placeholders (`state-{domain}…`) ne sont pas exportés littéralement : le bouton **+** permet de créer leur forme concrète pour le domaine et l’état voulus.

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

## Releases HACS

`hacs.json` utilise `zip_release: true`. Chaque release GitHub contient l’asset exact `ha-theme-builder-hacs.zip`, dont la racine est le contenu de l’intégration. Le workflow de release produit aussi `ha-theme-builder.zip` pour une installation manuelle sous `custom_components/`.

## Licence

MIT
