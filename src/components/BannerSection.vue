<script setup lang="ts">
import router from '@/router'
import { usePocketbaseStore } from '@/stores/pocketbase'

const pocketbaseStore = usePocketbaseStore()

function loginWithGoogle() {
  pocketbaseStore
    .doLogin()
    .then(() => {
      router.push('/dashboard')
    })
    .catch(error => {
      console.error('Login failed:', error)
    })
}

defineProps({
  title: String,
  subtitle: String,
})
</script>
<template>
  <section class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl text-black">
          {{ title }}
          <strong class="font-extrabold text-secondary sm:block">
            {{ subtitle }}
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          Experience lightning-fast, highly accurate transcriptions powered by
          cutting-edge AI technology. Notula makes converting speech to text
          effortless and accessible for all.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <button
            class="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-black shadow focus:outline-none focus:ring ring-primary sm:w-auto"
            @click="loginWithGoogle"
          >
            Get Started
          </button>

          <!-- <a
            class="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            href="#"
          >
            Learn More
          </a> -->
        </div>
      </div>
    </div>
  </section>
</template>
