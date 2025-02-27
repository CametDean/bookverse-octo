# BookVerse

BookVerse est une application web progressive (PWA) de bibliothèque numérique permettant aux utilisateurs de parcourir, rechercher et commenter des livres.

## Fonctionnalités

- 📚 Catalogue de livres avec pagination
- 🔍 Recherche de livres par titre ou auteur
- 📖 Page détaillée pour chaque livre
- 💬 Système de commentaires
- 📱 Installation en tant qu'application (PWA)
- ♿ Accessibilité (a11y) optimisée

## Prérequis

- Node.js (version 16 ou supérieure)
- npm (inclus avec Node.js)

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/bookverse.git
cd bookverse
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Pour construire la version de production :
```bash
npm run build
```

## Structure du projet

```
bookverse/
├── src/
│   ├── components/    # Composants réutilisables
│   ├── views/         # Pages de l'application
│   ├── router/        # Configuration du routeur
│   ├── App.vue        # Composant racine
│   └── main.js        # Point d'entrée
├── public/            # Ressources statiques
└── vite.config.js     # Configuration de Vite et PWA
```

## Accessibilité

L'application a été développée en suivant les meilleures pratiques d'accessibilité :
- Navigation au clavier
- Attributs ARIA appropriés
- Structure sémantique HTML5
- Contraste des couleurs optimisé
- Support des lecteurs d'écran

## PWA

L'application peut être installée sur les appareils mobiles et de bureau. Elle fonctionne hors ligne grâce au service worker et met en cache les ressources essentielles.

## Technologies utilisées

- Vue.js 3
- Vue Router
- Vite
- vite-plugin-pwa

## Licence

MIT 