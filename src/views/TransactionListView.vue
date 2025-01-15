<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTransactionList } from '@/utils/utils'
import { usePocketbaseStore } from '@/stores/pocketbase'
import ListTransactionCard from '@/components/cards/ListTransactionCard.vue'

const router = useRouter()
const dataTransactionList = ref([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  const userId = usePocketbaseStore().currentUser.id

  const getDataListTransaction = await getTransactionList(userId)
  dataTransactionList.value = getDataListTransaction.transactions

  if (getDataListTransaction) {
    isLoading.value = false
  }
})

const moveToDetailTransaction = (transaction_id: string) => {
  router.push(`/success/${transaction_id}`)
}
</script>

<template>
  <div class="ml-16 min-h-screen">
    <div class="mx-2 md:max-w-2xl md:mx-auto">
      <div
        v-if="isLoading"
        class="text-center flex justify-center items-center min-h-[80vh]"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"
        ></div>
      </div>

      <span v-else>
        <p class="my-6 text-sm">
          You have {{ dataTransactionList.length }}
          transaction
        </p>
        <div class="list-container">
          <div class="my-4 grid gap-2">
            <div
              class="p-3 rounded-md border border-primarykindadark cursor-pointer transition duration-300 hover:bg-primary/10"
              v-for="transaction in dataTransactionList"
              :key="transaction.id"
              @click="moveToDetailTransaction(transaction.transaction_id)"
            >
              <ListTransactionCard
                :date="transaction.created_at"
                :status="transaction.status"
                :quantity="transaction.quantity"
              />
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>
