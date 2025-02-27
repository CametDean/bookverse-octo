<template>
    <div class="search-view">
      <h1>Rechercher des livres</h1>
  
      <form @submit.prevent="performSearch" class="search-form" role="search">
        <div class="search-input-group">
          <label for="search-input">Rechercher par titre ou auteur</label>
          <input
            type="search"
            id="search-input"
            v-model="searchQuery"
            placeholder="Entrez votre recherche..."
            aria-label="Rechercher des livres par titre ou auteur"
          >
        </div>
        <button type="submit" class="search-button">
          Rechercher
        </button>
      </form>
  
      <div v-if="isLoading" class="loading" role="alert" aria-busy="true">
        Recherche en cours...
      </div>
  
      <div v-else-if="searchPerformed" class="search-results" role="region" aria-label="Résultats de recherche">
        <h2 class="results-title">
          {{ searchResults.length }} résultat(s) trouvé(s)
        </h2>
  
        <div v-if="searchResults.length" class="results-grid">
          <BookCard
            v-for="book in searchResults"
            :key="book.id"
            :book="book"
          />
        </div>
        <p v-else class="no-results">
          Aucun livre ne correspond à votre recherche.
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BookCard from '../components/BookCard.vue'
  import { searchBooks } from '../lib/api'
  import type { Book } from '../lib/types'
  
  const searchQuery = ref('')
  const searchResults = ref<Book[]>([])
  const isLoading = ref(false)
  const searchPerformed = ref(false)
  
  const performSearch = async () => {
    if (!searchQuery.value.trim()) return
  
    isLoading.value = true
    searchPerformed.value = true
  
    try {
      searchResults.value = await searchBooks(searchQuery.value)
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  .search-view {
    padding: 3rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 3rem;
    font-size: 2.8rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }
  
  h1::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 3px;
    background: var(--header-gradient);
    border-radius: 2px;
  }
  
  .search-form {
    max-width: 800px;
    margin: 0 auto 4rem;
    padding: 2.5rem;
    background: white;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(74, 103, 65, 0.08);
    position: relative;
    display: flex;
    gap: 1.5rem;
  }
  
  .search-form::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: var(--header-gradient);
    border-radius: 30px 30px 0 0;
  }
  
  .search-input-group {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 1rem;
    color: var(--primary-color);
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  input[type="search"] {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid rgba(74, 103, 65, 0.1);
    border-radius: 25px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    background-color: rgba(74, 103, 65, 0.02);
    color: var(--text-color);
  }
  
  input[type="search"]:focus {
    border-color: var(--secondary-color);
    outline: none;
    box-shadow: 0 4px 15px rgba(74, 103, 65, 0.08);
    background-color: white;
  }
  
  .search-button {
    padding: 0 2.5rem;
    background: var(--header-gradient);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    align-self: flex-end;
    height: 48px;
    box-shadow: 0 4px 15px rgba(74, 103, 65, 0.15);
  }
  
  .search-button:hover,
  .search-button:focus {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 103, 65, 0.2);
    outline: none;
  }
  
  .results-title {
    margin-bottom: 2.5rem;
    color: var(--primary-color);
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2.5rem;
    padding: 1.5rem;
    margin: 0 auto;
    max-width: 1400px;
  }
  
  .loading,
  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--primary-color);
    font-size: 1.2rem;
    background: white;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(74, 103, 65, 0.08);
    position: relative;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .loading::before,
  .no-results::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: var(--header-gradient);
    border-radius: 30px 30px 0 0;
  }
  
  @media (max-width: 768px) {
    .search-view {
      padding: 2rem 0.5rem;
    }
  
    h1 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }
  
    .search-form {
      flex-direction: column;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border-radius: 20px;
    }
  
    .search-button {
      width: 100%;
      margin-top: 1rem;
    }
  
    .results-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }
  
    .results-title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  
    .loading,
    .no-results {
      padding: 2rem;
      border-radius: 20px;
      font-size: 1.1rem;
    }
  }
  </style>