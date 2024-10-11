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
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <a class="flex items-center justify-center" href="#">
        <span class="sr-only">Notula</span>
        <span
          class="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
        >
          Notula
        </span>
      </a>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <a
          class="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </a>
        <a
          class="text-sm font-medium hover:underline underline-offset-4"
          href="#how-it-works"
        >
          How It Works
        </a>
        <a
          class="text-sm font-medium hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </a>
        <a
          class="text-sm font-medium hover:underline underline-offset-4"
          href="#faq"
        >
          FAQ
        </a>
      </nav>
    </header>
    <main class="flex-1">
      <section
        class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-blue-50"
      >
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center space-y-4 text-center">
            <div class="space-y-2">
              <h1
                class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                Transform Speech to Text with
                <span
                  class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
                >
                  Notula
                </span>
              </h1>
              <p
                class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                AI-Powered Transcription for Everyone
              </p>
            </div>
            <p
              class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
            >
              Experience lightning-fast, highly accurate transcriptions powered
              by cutting-edge AI technology. Notula makes converting speech to
              text effortless and accessible for all.
            </p>
            <div class="space-x-4">
              <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                @click="loginWithGoogle"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="features" class="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div class="container px-4 md:px-6">
          <h2
            class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          >
            Why Choose <span class="text-blue-600">Notula</span>?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex flex-col items-center text-center">
              <i class="fas fa-microphone text-4xl text-blue-600 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">Unmatched Accuracy</h3>
              <p class="text-gray-500">
                Our AI-powered engine delivers industry-leading transcription
                accuracy, even for complex audio.
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <i class="fas fa-fast-forward text-4xl text-blue-600 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">Lightning Fast</h3>
              <p class="text-gray-500">
                Get your transcriptions in minutes, not hours. Notula processes
                audio at superhuman speeds.
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <i class="fas fa-check-circle text-4xl text-blue-600 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">Easy to Use</h3>
              <p class="text-gray-500">
                Simple, intuitive interface makes transcription accessible to
                everyone, no technical skills required.
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- ... (rest of the sections follow the same pattern) ... -->
    </main>
    <footer
      class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
    >
      <p class="text-xs text-gray-500">© 2024 Notula. All rights reserved.</p>
      <nav class="sm:ml-auto flex gap-4 sm:gap-6">
        <a class="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </a>
        <a class="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </a>
        <a class="text-xs hover:underline underline-offset-4" href="#">
          About
        </a>
        <a class="text-xs hover:underline underline-offset-4" href="#">
          Contact
        </a>
      </nav>
    </footer>
  </div>
</template>
