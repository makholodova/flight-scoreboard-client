import { createRouter, createWebHistory } from 'vue-router'
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
    },
    {
      path: '/airline',
      name: 'airline',
      component: () => import('../views/AirlineView.vue')
    },
    {
      path: '/pilot',
      name: 'pilot',
      component: () => import('../views/PilotView.vue')
    },
    {
      path: '/airplane',
      name: 'airplane',
      component: () => import('../views/AirplaneView.vue')
    }

  ]
})

export default router
