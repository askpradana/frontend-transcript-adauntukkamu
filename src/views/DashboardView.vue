<script setup>
import LeftBar from '@/components/loggedin/LeftBar.vue'
</script>

<template>
  <main class="flex flex-row">
    <!-- <p>Dashboard gengs</p>
      <p>Loggedin as, {{ store.pb.authStore.model?.email }}</p>
      <p>Hello, {{ store.pb.authStore.model?.name }}</p>
      <button @click="logout">Logout</button> -->
    <LeftBar />
    <RouterView />
  </main>
</template>
