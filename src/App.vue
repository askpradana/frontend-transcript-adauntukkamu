<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { usePocketbaseStore } from './stores/pocketbase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const pocketbaseStore = usePocketbaseStore()
const router = useRouter()

onMounted(() => {
  // Check if the user is already authenticated
  if (pocketbaseStore.pb.authStore.isValid) {
    // User is authenticated, redirect to dashboard
    router.push('/dashboard')
  }
})
</script>

<template>
  <RouterView />
</template>
