<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import LeftBar from '@/components/loggedin/LeftBar.vue'

const router = useRouter()
const pocketbaseStore = usePocketbaseStore()

onMounted(() => {
  if (!pocketbaseStore.pb.authStore.isValid) {
    // User is not logged in, redirect to home or login page
    router.push('/')
  }
})
</script>

<template>
  <main v-if="pocketbaseStore.pb.authStore.isValid" class="flex flex-row">
    <LeftBar />
    <div class="flex flex-col w-screen">
      <header class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div
              class="flex-1 md:flex md:items-center md:gap-12 text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path
                  d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
                ></path>
              </svg>
            </div>

            <div class="md:flex md:items-center md:gap-12">
              <div class="flex items-center gap-4 cursor-default">
                <p>{{ pocketbaseStore.currentUser.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <RouterView />
    </div>
  </main>
</template>
