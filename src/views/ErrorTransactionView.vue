<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const moveToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-primary/40 flex justify-center items-center">
    <div
      class="flex flex-col justify-center items-center bg-white p-8 rounded-md border border-black shadow-md max-w-xl mx-4 md:p-16"
    >
      <img
        class="w-28 md:w-32 mb-4 bg-warning/20 p-4 rounded-full"
        src="../assets/error.webp"
        alt="success-icon"
      />
      <h1 class="text-center font-bold text-xl md:text-lg">Payment Failed</h1>
      <p class="text-center mt-2 text-sm text-border/95">
        Sorry, the payment process failed, please try again in a few moments. If
        you still experience problems, please contact the admin.
      </p>
      <button
        class="bg-warning mt-6 px-16 py-4 rounded-md text-white font-semibold text-sm md:text-base"
        @click="moveToDashboard"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
</template>
