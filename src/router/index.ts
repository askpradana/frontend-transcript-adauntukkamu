import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardViewVue from '@/views/DashboardView.vue'
import SettingsViewVue from '@/views/SettingsView.vue'
import ProfileViewVue from '@/views/ProfileView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardViewVue,
      children: [
        {
          path: '/settings',
          name: 'settings',
          component: SettingsViewVue
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileViewVue
        }
      ]
    }
  ],
})

export default router
