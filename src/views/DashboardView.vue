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
      <header class="bg-realwhite">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div />
            <div class="md:flex md:items-center md:gap-12">
              <div class="flex items-center gap-4 cursor-default">
                <p>{{ pocketbaseStore.currentUser.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <RouterView />
    </div>
  </main>
</template>
