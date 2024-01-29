import { createRouter, createWebHistory } from 'vue-router'
import CityView from '@/views/CityView.vue'
import AppView from '@/views/AppView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppView
    },
    
    {
      path: '/city',
      name: 'city',
      component: () => import('../views/CityView.vue')
    }
    
  ]
})

export default router
