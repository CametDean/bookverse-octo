<template>
  <div class="book-detail" v-if="book">
    <div class="book-header">
      <img :src="book.coverImage" :alt="'Couverture du livre ' + book.title" class="book-cover">
      <div class="book-info">
        <h1>{{ book.title }}</h1>
        <p class="book-author">par {{ book.author }}</p>
        <p class="book-id">ID: {{ book.id }}</p>
      </div>
    </div>

    <section class="book-description" aria-label="Description du livre">
      <h2>Description</h2>
      <p>{{ book.summary }}</p>
    </section>

    <section class="book-comments" aria-label="Commentaires">
      <h2>Commentaires</h2>
      
      <div class="comments-list">
        <article v-for="comment in book.comments" :key="comment.id" class="comment">
          <div class="comment-header">
            <strong class="comment-author">{{ comment.author }}</strong>
            <time :datetime="comment.createdAt" class="comment-date">
              {{ new Date(comment.createdAt).toLocaleDateString() }}
            </time>
          </div>
          <StrapiBlocks :content="comment.content" :modifiers="modifiers" :blocks="blocks" />
        </article>
      </div>

      <form @submit.prevent="submitComment" class="comment-form">
        <h3>Ajouter un commentaire</h3>
        <div class="form-group">
          <label for="comment-author">Votre nom</label>
          <input
            type="text"
            id="comment-author"
            v-model="newComment.author"
            required
            aria-required="true"
          >
        </div>
        <div class="form-group">
          <label for="comment-content">Votre commentaire</label>
          <textarea
            id="comment-content"
            v-model="newComment.content"
            required
            aria-required="true"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Publier le commentaire</button>
      </form>
    </section>
  </div>
  <div v-else class="loading" role="alert" aria-busy="true">
    Chargement du livre...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBookById } from '../lib/api'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';

const route = useRoute()
const book = ref(null)
const newComment = ref({
  author: '',
  content: ''
})

onMounted(async () => {
  book.value = await getBookById(route.params.id)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const submitComment = () => {
  if (!newComment.value.author || !newComment.value.content) return

  book.value.comments.unshift({
    id: Date.now(),
    author: newComment.value.author,
    date: new Date().toISOString(),
    content: newComment.value.content
  })

  newComment.value = {
    author: '',
    content: ''
  }
}
</script>

<style scoped>
.book-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.book-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.book-cover {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-info {
  flex: 1;
}

.book-info h1 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.book-author {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.book-id {
  color: #999;
  font-size: 0.9rem;
}

.book-description,
.book-comments {
  margin-top: 3rem;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.comments-list {
  margin-bottom: 2rem;
}

.comment {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-date {
  color: #666;
  font-size: 0.9rem;
}

.comment-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-button:hover,
.submit-button:focus {
  background-color: #3aa876;
  outline: none;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .book-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-cover {
    width: 200px;
    height: 300px;
  }
}
</style> 