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
  <button @click="logout">Logout</button>
</template>
