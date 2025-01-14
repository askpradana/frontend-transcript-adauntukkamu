<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import { getTransactionList, formatDateLong } from '@/utils/utils'

defineProps<{
  name: string
  tokenLeft: number
  isLoading: boolean
  refreshTokenFunc: () => void
}>()

const latestTransactions = ref([])

onMounted(async () => {
  const userId = usePocketbaseStore().currentUser.id

  const transactionListData = await getTransactionList(userId)

  latestTransactions.value = transactionListData.transactions
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 3)
})

const router = useRouter()

const moveToDetailTransaction = (transaction_id: string, status: string) => {
  if (status === 'PAID') {
    router.push(`/success/${transaction_id}`)
  }
}

const move = () => {
  router.push('/failed')
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h1 class="text-3xl font-bold mb-6">Hello 👋 {{ name }}</h1>
    <div class="flex gap-4 items-center">
      <span class="flex justify-center items-center gap-4">
        <p class="font-semibold" v-if="tokenLeft">
          Token left : {{ tokenLeft }}
        </p>
        <p v-else>Loading...</p>
        <button
          @click="refreshTokenFunc"
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
      </span>
    </div>
    <div class="my-4">
      <h1 class="font-semibold text-xl">Last Transactions</h1>
      <div class="my-4 flex flex-col card-container gap-2">
        <!-- list Transactions -->

        <div
          class="p-3 rounded-md border border-primarykindadark cursor-pointer transition duration-300 hover:bg-primary/10"
          v-for="transaction in latestTransactions"
          :key="transaction.id"
          @click="
            moveToDetailTransaction(
              transaction.transaction_id,
              'PAID',
              // transaction.status,
            )
          "
        >
          <span class="flex items-center justify-between">
            <p class="text-sm font-medium">
              Top up : {{ transaction.quantity }} Token
            </p>
          </span>
          <span class="flex justify-between items-center">
            <p class="mt-2 text-xs text-primarydarker">
              {{ formatDateLong(transaction?.created_at) }}
            </p>
            <p
              class="font-semibold text-sm text-primarydarker"
              :class="{
                'text-primarydarker': transaction.status === 'PAID',
                'text-warning': transaction.status === 'UNPAID',
              }"
            >
              {{ transaction.status }}
            </p>
          </span>
        </div>
      </div>

      <p
        class="text-sm text-primary hover:underline hover:cursor-pointer"
        @click="move"
      >
        Show more trasnsaction
      </p>
    </div>
  </div>
</template>
