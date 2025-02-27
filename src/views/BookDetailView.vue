<template>
  <div v-if="book" class="book-detail">
    <img :src="book.coverImage" :alt="'Couverture du livre ' + book.title" class="book-cover">
    
    <div class="book-info">
      <h1>{{ book.title }}</h1>
      <p class="book-author">par {{ book.author }}</p>
      <p class="book-id">ID: {{ book.id }}</p>
    </div>

    <section class="book-summary">
      <h2>Résumé</h2>
      <p>{{ book.summary }}</p>
    </section>

    <section class="book-comments">
      <h2>Commentaires</h2>
      
      <div class="comments-list">
        <article v-for="comment in book.comments" :key="comment.id" class="comment">
          <div class="comment-header">
            <strong>{{ comment.author }}</strong>
            <time :datetime="comment.createdAt">{{ formatDate(comment.createdAt) }}</time>
          </div>
          <StrapiBlocks :content="comment.content" />
        </article>
      </div>

      <form @submit.prevent="submitComment" class="comment-form">
        <h3>Ajouter un commentaire</h3>
        <div class="form-group">
          <label for="author">Votre nom</label>
          <input
            type="text"
            id="author"
            v-model="newComment.author"
            required
            placeholder="Entrez votre nom"
          >
        </div>

        <div class="form-group">
          <label for="content">Votre commentaire</label>
          <textarea
            id="content"
            v-model="newComment.content"
            required
            placeholder="Écrivez votre commentaire"
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Ajouter un commentaire</button>
      </form>
    </section>
  </div>
  <div v-else class="loading" role="alert" aria-busy="true">
    Chargement du livre...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBookById } from '../lib/api'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'

const route = useRoute()
const book = ref(null)
const newComment = ref({
  author: '',
  content: '',
  createdAt: new Date().toISOString()
})

onMounted(async () => {
  const fetchedBook = await getBookById(route.params.id)
  if (fetchedBook) {
    book.value = fetchedBook
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const submitComment = () => {
  if (book.value && newComment.value.author && newComment.value.content) {
    book.value.comments.unshift({
      id: Date.now(),
      author: newComment.value.author,
      content: newComment.value.content,
      createdAt: new Date().toISOString()
    })
    newComment.value = {
      author: '',
      content: '',
      createdAt: new Date().toISOString()
    }
  }
}
</script>

<style scoped>
.book-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.book-cover {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto 2rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.book-info {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.book-author {
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
}

.book-id {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.6;
  margin-top: 0.5rem;
}

.book-summary {
  margin-bottom: 3rem;
}

h2 {
  color: var(--primary-color);
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.book-comments {
  background: var(--background-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.comments-list {
  margin-bottom: 2rem;
}

.comment {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.comment-header strong {
  color: var(--primary-color);
}

.comment-header time {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.6;
}

.comment-content {
  line-height: 1.6;
}

.comment-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

button[type="submit"] {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .book-detail {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .book-comments {
    padding: 1.5rem;
  }

  .comment-form {
    padding: 1.5rem;
  }
}
</style> 