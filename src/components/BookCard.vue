<template>
  <article class="book-card" :aria-labelledby="'book-title-' + book.id">
    <router-link :to="{ name: 'book-detail', params: { id: book.id } }" class="book-link">
      <img
        :src="book.coverImage"
        :alt="'Couverture du livre ' + book.title"
        class="book-image"
        loading="lazy"
      />
      <div class="book-info">
        <h3 :id="'book-title-' + book.id" class="book-title">{{ book.title }}</h3>
        <p class="book-author">par {{ book.author }}</p>
      </div>
    </router-link>
  </article>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
    validator: (book) => {
      return book.id && book.title && book.author && book.coverImage
    },
  },
})
</script>

<style scoped>
.book-card {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hover-shadow);
}

.book-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--header-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.book-card:hover::before {
  opacity: 1;
}

.book-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.book-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.book-card:hover .book-image {
  transform: scale(1.03);
}

.book-info {
  padding: 1.5rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 1));
}

.book-title {
  color: var(--primary-color);
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.book-author {
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.8;
}

.view-details {
  background: var(--accent-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.view-details:hover {
  background: #e65d00;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .book-card {
    border-radius: 20px;
  }

  .book-image {
    height: 220px;
  }

  .book-info {
    padding: 1.2rem;
  }

  .book-title {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }

  .book-author {
    font-size: 0.95rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .book-card,
  .book-card::before,
  .book-image {
    transition: none;
  }

  .book-card:hover .book-image {
    transform: none;
  }
}
</style>
