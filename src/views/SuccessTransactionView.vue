<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  getDetailTransaction,
  formatRupiah,
  formatDateLong,
} from '@/utils/utils'

const router = useRouter()
const route = useRoute()
const { transaction_id } = route.params
const transactionData = ref()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  const getDetailTransactionData = await getDetailTransaction(
    transaction_id.toString(),
  )

  transactionData.value = getDetailTransactionData.transaction

  if (transactionData.value) {
    isLoading.value = false
  }
})

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

      <div
        v-if="isLoading"
        class="text-center flex justify-center items-center my-4"
      >
        <div
          class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mx-auto"
        ></div>
      </div>

      <div
        class="w-full md:w-[80%] text-sm md:text-base text-border/95 mt-4"
        v-else
      >
        <span class="flex justify-between">
          <p>Name :</p>
          <p>{{ transactionData?.customer_name }}</p>
        </span>
        <span class="flex justify-between">
          <p>Email :</p>
          <p>{{ transactionData?.email }}</p>
        </span>

        <span class="flex justify-between">
          <p>Created at :</p>
          <p>{{ formatDateLong(transactionData?.created_at) }}</p>
        </span>
        <span class="flex justify-between">
          <p>Paid at :</p>
          <p>{{ formatDateLong(transactionData?.paid_at) }}</p>
        </span>

        <span class="flex justify-between">
          <p>Quantity top up :</p>
          <p>{{ transactionData?.quantity }} Token</p>
        </span>
        <span class="flex justify-between">
          <p>Payment amount :</p>
          <p>{{ formatRupiah(transactionData?.paid_amount) }}</p>
        </span>
        <span class="flex justify-between">
          <p>Status :</p>
          <p
            class="font-semibold"
            :class="{
              'text-primarydarker': transactionData?.status === 'PAID',
              'text-warning': transactionData?.status === 'UNPAID',
            }"
          >
            {{ transactionData?.status }}
          </p>
        </span>
      </div>

      <button
        class="bg-primary mt-6 px-16 py-4 rounded-md text-white font-semibold text-sm md:text-base"
        @click="moveToDashboard"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
</template>
