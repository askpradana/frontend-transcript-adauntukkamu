<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTokenStore } from '../../stores/token'
import { usePocketbaseStore } from '../../stores/pocketbase'
import { onBeforeUnmount } from 'vue'
import RecentlyTranscriptTable from '../tables/RecentlyTranscriptTable.vue'
import { makePostRequest } from '../../utils/utils'

const tokenStore = useTokenStore()
const pbStore = usePocketbaseStore()
const userID = pbStore.currentUser.id
const isLoading = ref(false)
const isProcessing = ref(false)

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

const showTopUp = ref(false)
const showConfirmation = ref(false)
const topUpAmount = ref('')
const confirmationAmount = ref(0)

const handleTopUp = (amount: number) => {
  confirmationAmount.value = amount
  showConfirmation.value = true
}

const confirmTopUp = async () => {
  if (isProcessing.value) return

  // Show maintenance notification
  alert(
    'Payment system is currently under maintenance. Please try again later.',
  )
  showConfirmation.value = false

  /* Original payment implementation - archived for future reference
  isProcessing.value = true
  try {
    const amount = confirmationAmount.value
    const response = await makePostRequest({
      recordID: userID,
      customerName: pbStore.currentUser.name,
      customerEmail: pbStore.currentUser.email,
      itemQuantity: amount,
    })

    console.log('Full response:', response)

    // The response itself contains urlPayment, not in a data property
    console.log('Response:', response)
    const paymentUrl = response.data?.urlPayment || response.urlPayment
    if (paymentUrl) {
      console.log('Redirecting to:', paymentUrl)
      window.location.href = paymentUrl
    } else {
      console.error('No payment URL received:', response)
    }
  } catch (error) {
    console.error('Error during top up:', error)
  } finally {
    isProcessing.value = false
    showConfirmation.value = false
  }
  */
}

const handleCustomTopUp = () => {
  showTopUp.value = true
  topUpAmount.value = ''
}

const processCustomTopUp = () => {
  const amount = parseInt(topUpAmount.value)
  if (amount && amount > 0) {
    handleTopUp(amount)
    showTopUp.value = false
  } else {
    console.error('Invalid amount')
  }
}
</script>

<template>
  <main class="p-6 max-w-screen-xl md:ml-48 lg:ml-52">
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
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Top up Tokens</h2>
        </div>
        <div class="space-y-6">
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="amount in [1, 10, 20]"
              :key="amount"
              @click="handleTopUp(amount)"
              class="relative bg-white border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
            >
              <span class="block text-lg font-semibold">{{ amount }}</span>
              <span class="block text-sm text-gray-600">Tokens</span>
              <div
                class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200"
              ></div>
            </button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-4 text-sm text-gray-500">or</span>
            </div>
          </div>
          <button
            @click="handleCustomTopUp"
            class="w-full bg-white border-2 border-dashed border-gray-300 text-gray-600 px-4 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Custom Amount</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Recent Transcripts</h2>
      <RecentlyTranscriptTable />
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmation"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-6 border w-[28rem] shadow-xl rounded-lg bg-white"
      >
        <div class="mt-2">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-900">Confirm Top Up</h3>
            <button
              @click="showConfirmation = false"
              :disabled="isProcessing"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p class="text-gray-600 mb-4">
            Are you sure you want to top up {{ confirmationAmount }} tokens?
          </p>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="showConfirmation = false"
              class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              @click="confirmTopUp"
              :disabled="isProcessing"
              class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              <span :class="{ 'opacity-0': isProcessing }">Confirm</span>
              <div
                v-if="isProcessing"
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="animate-spin h-5 w-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Amount Modal -->
    <div
      v-if="showTopUp"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-6 border w-[28rem] shadow-xl rounded-lg bg-white"
      >
        <div class="mt-2">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-900">
              Custom Token Amount
            </h3>
            <button
              @click="showTopUp = false"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div>
              <label
                for="topup-amount"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Tokens
              </label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="topup-amount"
                  type="number"
                  v-model="topUpAmount"
                  class="block w-full rounded-md border-0 py-2.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                @click="showTopUp = false"
                class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                @click="processCustomTopUp"
                :disabled="isProcessing"
                class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                <span :class="{ 'opacity-0': isProcessing }">Proceed</span>
                <div
                  v-if="isProcessing"
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    class="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
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
