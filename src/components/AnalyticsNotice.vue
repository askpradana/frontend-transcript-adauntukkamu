<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'analytics-notice-acknowledged'
const isVisible = ref(true)

onMounted(() => {
  const hasAcknowledged = localStorage.getItem(STORAGE_KEY)
  if (hasAcknowledged) {
    isVisible.value = false
  }
})

const handleGotIt = () => {
  isVisible.value = false
  localStorage.setItem(STORAGE_KEY, 'true')
}
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-opacity duration-300 ease-in-out"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-medium text-gray-900">Pemberitahuan Analitik</h3>
    </div>
    <p class="mt-2 text-sm text-gray-600">
      Kami menggunakan Posthog untuk menganalisa bagaimana website ini
      digunakan. Jika Anda merasa keberatan, silahkan gunakan adblocker seperti
      ublock origin untuk memblokir analitik kami.
    </p>

    <div class="mt-4 flex space-x-4">
      <button
        @click="handleGotIt"
        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm bg-primary hover:bg-primarydarker"
      >
        Oke
      </button>
    </div>
  </div>
</template>
