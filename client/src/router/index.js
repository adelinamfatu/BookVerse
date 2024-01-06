// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
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
        path: '/dashboard',
        name: 'Dashboard',
        components: {
          default: () => import('@/views/Dashboard.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
      },
      {
        path: '/bookshelves',
        name: 'Bookshelves',
        components: {
          default: () => import('@/views/Bookshelves.vue'),
          sidebar: () => import('@/components/Sidebar.vue')
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
