import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { posthogPlugin } from "@/plugins/posthog";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(posthogPlugin);

app.mount('#app')
