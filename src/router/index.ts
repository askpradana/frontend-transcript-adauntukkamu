import { createRouter, createWebHistory } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import SettingsView from '../views/SettingsView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        const pocketbaseStore = usePocketbaseStore()
        if (!pocketbaseStore.pb.authStore.isValid) {
          next('/')
        } else {
          next()
        }
      },
      children: [
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        }
      ]
    }
  ],
})

export default router
