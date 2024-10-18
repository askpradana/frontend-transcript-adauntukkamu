<script setup lang="ts">
import router from '@/router'
import { usePocketbaseStore } from '@/stores/pocketbase'

const store = usePocketbaseStore()

function logout() {
  store.doLogout()
  router.push('/')
}
</script>

<template>
  <p>Dashboard gengs</p>
  <p>Loggedin as, {{ store.pb.authStore.model?.email }}</p>
  <p>Hello, {{ store.pb.authStore.model?.name }}</p>
  <button @click="logout">Logout</button>
</template>
