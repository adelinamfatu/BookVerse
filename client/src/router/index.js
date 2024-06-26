// Composables
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/reset-password',
        name: 'PasswordReset',
        component: () => import('@/components/PasswordReset.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        components: {
          default: () => import('@/views/Dashboard.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/bookshelves',
        name: 'Bookshelves',
        components: {
          default: () => import('@/views/Bookshelves.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/favorites',
        name: 'Favorites',
        components: {
          default: () => import('@/views/Favorites.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'Profile',
        components: {
          default: () => import('@/views/Profile.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/book/:isbn',
        name: 'BookDetails',
        component: () => import('@/components/BookDetails.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/bookshelf/:bookshelfId',
        name: 'BookshelfBooks',
        components: {
          default: () => import('@/views/BookshelfBooks.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/top/:genre',
        name: 'TopGenre',
        component: () => import('@/views/TopGenre.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/topbestsellers',
        name: 'TopBestsellers',
        components: {
          default: () => import('@/views/TopBestsellers.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged'];

  if (to.path === '/') {
    if (!isLogged) {
      next({ name: 'Login' });
    } else {
      next({ name: 'Dashboard' });
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLogged) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
