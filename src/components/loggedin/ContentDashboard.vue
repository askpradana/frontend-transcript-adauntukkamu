<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { usePocketbaseStore } from '@/stores/pocketbase'
import { onBeforeUnmount } from 'vue'

const tokenStore = useTokenStore()
const pbStore = usePocketbaseStore()
const userID = pbStore.currentUser.id
const isLoading = ref(false)

onMounted(() => {
  checkTokenLeftWithDelay()
})

onBeforeUnmount(() => {
  userID == null
})

const checkTokenLeftWithDelay = async () => {
  isLoading.value = true
  const startTime = Date.now()

  await tokenStore.checkTokenLeft(userID)

  const elapsedTime = Date.now() - startTime
  const remainingTime = Math.max(1500 - elapsedTime, 0)

  setTimeout(() => {
    isLoading.value = false
  }, remainingTime)
}
</script>

<template>
  <main class="p-6 ml-14">
    <h1 class="text-3xl font-bold mb-6">
      Hello 👋 {{ pbStore.currentUser.name }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Token</h2>
        <div class="flex flex-row gap-4 items-center">
          <p v-if="tokenStore.tokenLeft">
            Token left : {{ tokenStore.tokenLeft.token_left }}
          </p>
          <p v-else>Loading...</p>
          <button
            @click="checkTokenLeftWithDelay"
            :disabled="isLoading"
            class="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{ 'animate-spin': isLoading }"
            >
              <path
                d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">User status</h2>
        <div class="flex space-x-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Transcript
          </button>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View All
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Recent Transcripts</h2>
      <ul class="bg-white rounded-lg shadow">
        <li class="border-b p-4 hover:bg-gray-50">
          Transcript 1 - Created on 2023-05-01
        </li>
        <li class="border-b p-4 hover:bg-gray-50">
          Transcript 2 - Created on 2023-04-28
        </li>
        <li class="p-4 hover:bg-gray-50">
          Transcript 3 - Created on 2023-04-25
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
