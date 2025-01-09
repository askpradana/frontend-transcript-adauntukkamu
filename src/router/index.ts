import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { usePocketbaseStore } from '../stores/pocketbase'
import HomeView from '../views/HomeView.vue'
import DashboardViewVue from '../views/DashboardView.vue'
import ContentDashboardVue from '../components/loggedin/ContentDashboard.vue'
import SettingsView from '../views/SettingsView.vue'
import HistoryViewVue from '../views/HistoryView.vue'
import NewTranscriptVue from '../views/NewTranscript.vue'
import TranscriptDetails from '../views/TranscriptDetails.vue'
import TermsView from '../views/TermsView.vue'
import ContactView from '../views/ContactView.vue'
import PublicContactView from '../views/PublicContactView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: PublicContactView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardViewVue,
    beforeEnter: (to, from, next) => {
      const pocketbaseStore = usePocketbaseStore()
      if (pocketbaseStore.pb.authStore.isValid) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: '',
        name: 'dashboard-content',
        component: ContentDashboardVue,
      },
      {
        path: '/settings',
        name: 'dashboard-settings',
        component: SettingsView,
      },
      {
        path: '/terms-policy',
        name: 'dashboard-terms',
        component: TermsView,
      },
      {
        path: '/contact',
        name: 'dashboard-contact',
        component: ContactView,
      },
      {
        path: '/history',
        name: 'dashboard-history',
        component: HistoryViewVue,
      },
      {
        path: '/transcript/:id',
        name: 'dashboard-transcribe',
        component: TranscriptDetails,
      },
      {
        path: '/new',
        name: 'dashboard-new-transcript',
        component: NewTranscriptVue,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
