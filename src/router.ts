import { createRouter, createWebHistory } from 'vue-router'
import ConeOptions from '@/views/ConeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cone',
      component: ConeOptions
    },
  ]
})

export default router
