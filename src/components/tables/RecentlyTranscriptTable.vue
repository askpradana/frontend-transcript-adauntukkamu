<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/utils'
import { useHistoryStore } from '@/stores/historyStore'
import { usePocketbaseStore } from '@/stores/pocketbase'

const historyStore = useHistoryStore()
const pocketbaseStore = usePocketbaseStore()
const router = useRouter()
const latestHistory = ref([])

async function fetchLatestHistory() {
  const userId = pocketbaseStore.currentUser.id

  await historyStore.fetchHistory(userId)

  latestHistory.value = historyStore.historyItems
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    )
    .slice(0, 10)
}

onMounted(async () => {
  await fetchLatestHistory()
})

const toDetailsTrancriptionPage = (id: string) => {
  router.push(`/transcript/${id}`)
}
</script>

<template>
  <div
    v-if="historyStore.isLoading"
    class="text-center flex justify-center items-center min-h-[50vh]"
  >
    <div
      class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"
    ></div>
  </div>

  <div
    v-else-if="historyStore.error"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
  >
    {{ historyStore.error }}
  </div>
  <ul class="bg-white rounded-lg shadow">
    <li
      v-if="historyStore.historyItems.length <= 0"
      class="border-b p-4 cursor-pointer transition duration-300 hover:bg-primary/10"
    >
      <p>Anda belum pernah melakukan transkripsi</p>
    </li>
    <li
      v-else
      @click="toDetailsTrancriptionPage(item.id)"
      v-for="item in latestHistory"
      :key="item.id"
      class="border-b p-4 cursor-pointer transition duration-300 hover:bg-primary/10"
    >
      <p class="text-sm truncate">
        {{ item.text }}
      </p>
      <p class="text-xs mt-2 font-semibold text-dark">
        {{ formatDate(item.created) }}
      </p>
    </li>
  </ul>
</template>
