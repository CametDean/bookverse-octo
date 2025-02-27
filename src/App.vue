<template>
  <header role="banner">
    <nav role="navigation" aria-label="Navigation principale">
      <ul>
        <li>
          <router-link to="/" aria-label="Accueil">Accueil</router-link>
        </li>
        <li>
          <router-link to="/books" aria-label="Liste des livres">Livres</router-link>
        </li>
        <li>
          <router-link to="/search" aria-label="Rechercher des livres">Recherche</router-link>
        </li>
      </ul>
    </nav>
  </header>

  <main role="main">
    <router-view></router-view>
  </main>

  <InstallPWA />

  <footer role="contentinfo">
    <p>&copy; 2024 BookVerse - Tous droits réservés</p>
  </footer>
</template>

<script setup lang="ts">
import InstallPWA from './components/InstallPWA.vue'
</script>

<style>
:root {
  --primary-color: #1B1464;
  --accent-color: #FF6B00;
  --background-color: #F5F5F5;
  --text-color: #333333;
  --card-background: #FFFFFF;
  --header-gradient: linear-gradient(135deg, #1B1464 0%, #2E279D 100%);
  --card-shadow: 0 4px 15px rgba(27, 20, 100, 0.1);
  --hover-shadow: 0 6px 20px rgba(27, 20, 100, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  background-image: 
    linear-gradient(120deg, rgba(168, 198, 159, 0.1) 0%, rgba(244, 247, 242, 0.1) 100%);
}

header {
  background: var(--header-gradient);
  padding: 1.2rem;
  color: white;
  box-shadow: 0 2px 15px rgba(74, 103, 65, 0.1);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
  justify-content: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
}

nav a:hover,
nav a:focus {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  outline: none;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  min-height: calc(100vh - 140px);
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(74, 103, 65, 0.08);
}

footer {
  background: var(--header-gradient);
  color: white;
  text-align: center;
  padding: 1.2rem;
  margin-top: auto;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

/* Ajout d'animations douces pour les transitions de page */
.router-view-enter-active,
.router-view-leave-active {
  transition: opacity 0.3s ease;
}

.router-view-enter-from,
.router-view-leave-to {
  opacity: 0;
}
</style> 