import { createRouter, createWebHistory } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import HomeView from '@/views/HomeView.vue'
import DashboardViewVue from '@/views/DashboardView.vue'
import ContentDashboardVue from '@/components/loggedin/ContentDashboard.vue'
import SettingsView from '@/views/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NewTranscriptVue from '@/components/loggedin/NewTranscript.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardViewVue,
    // @ts-ignore
    beforeEnter: (to, from, next) => {
      const pocketbaseStore = usePocketbaseStore()
      pocketbaseStore.pb.authStore.isValid ? next() : next('/')
    },
    children: [
      {
        path: '',
        name: 'dashboard-content',
        component: ContentDashboardVue
      },
      {
        path: '/settings',
        name: 'dashboard-settings',
        component: SettingsView
      },
      {
        path: '/profile',
        name: 'dashboard-profile',
        component: ProfileView
      },
      {
        path: '/new',
        name: 'dashboard-new-transcript',
        component: NewTranscriptVue
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router