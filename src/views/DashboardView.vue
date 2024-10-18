<script setup>
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
    <RouterView />
  </main>
</template>
