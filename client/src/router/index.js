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
        path: '/Feed',
        name: 'Feed',
        component: () => import('@/views/Feed.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
