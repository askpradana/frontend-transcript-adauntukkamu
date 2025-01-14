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
        class="w-28 md:w-32 mb-4 bg-primary/25 p-4 rounded-full"
        src="../assets/success.webp"
        alt="success-icon"
      />
      <h1 class="text-center font-bold text-xl md:text-lg">
        Payment Successful
      </h1>
      <p class="text-center mt-2 text-sm text-border/95">
        Congratulations, the payment has been successful. Your token has been
        added.
      </p>
      <button
        class="bg-primary mt-6 px-16 py-4 rounded-md text-white font-semibold text-sm md:text-base"
        @click="moveToDashboard"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
</template>
