<template>
  <div class="books-view">
    <h1>Catalogue des livres</h1>
    
    <div class="books-grid" role="grid">
      <BookCard
        v-for="book in displayedBooks"
        :key="book.id"
        :book="book"
        role="gridcell"
      />
    </div>

    <nav class="pagination" role="navigation" aria-label="Pagination">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="previousPage"
        aria-label="Page précédente"
      >
        Précédent
      </button>
      
      <span class="page-info" role="status" aria-live="polite">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
      
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="nextPage"
        aria-label="Page suivante"
      >
        Suivant
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BookCard from '../components/BookCard.vue'
import { getBooks } from '../lib/api'
import type { Book } from '../lib/types'

const displayedBooks = ref<Book[]>([])
const currentPage = ref(1)
const totalPages = ref(0)

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    const {books} = await getBooks(currentPage.value)
    displayedBooks.value = books
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    const {books} = await getBooks(currentPage.value)
    displayedBooks.value = books
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(async () => {
  const {books, totalPages: total} = await getBooks(1)
  displayedBooks.value = books
  totalPages.value = total
})

</script>

<style scoped>
.books-view {
  padding: 3rem 1rem;
  background: var(--background-color);
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
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
  background: var(--accent-color);
  border-radius: 2px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 1.5rem;
  margin: 0 auto;
  max-width: 1400px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 1.5rem;
  background: var(--card-background);
  border-radius: 50px;
  box-shadow: var(--card-shadow);
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.pagination-button {
  padding: 0.8rem 2rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.pagination-button:disabled {
  background: #E0E0E0;
  cursor: not-allowed;
  opacity: 0.7;
}

.pagination-button:not(:disabled):hover,
.pagination-button:not(:disabled):focus {
  background: #E65D00;
  transform: translateY(-2px);
  outline: none;
}

.page-info {
  font-size: 1.1rem;
  color: var(--primary-color);
  background: var(--background-color);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .books-view {
    padding: 2rem 0.5rem;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;
    border-radius: 25px;
    padding: 1rem;
  }

  .pagination-button {
    width: 100%;
    padding: 0.7rem 1.5rem;
  }
}
</style> 