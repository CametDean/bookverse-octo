import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Accueil - BookVerse'
    }
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/BooksView.vue'),
    meta: {
      title: 'Liste des livres - BookVerse'
    }
  },
  {
    path: '/books/:id',
    name: 'book-detail',
    component: () => import('../views/BookDetailView.vue'),
    meta: {
      title: 'Détail du livre - BookVerse'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: {
      title: 'Recherche - BookVerse'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string || 'BookVerse'
  next()
})

export default router 