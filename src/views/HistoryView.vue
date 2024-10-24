<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryStore } from '@/stores/historyStore'
import { usePocketbaseStore } from '@/stores/pocketbase'
import HistoryCard from '@/components/cards/HistoryCard.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'

// const router = useRouter()
const route = useRoute()
const historyStore = useHistoryStore()

onMounted(async () => {
  const userId = usePocketbaseStore().currentUser.id
  await historyStore.fetchHistory(userId)

  const searchParam = route.query.title
  if (searchParam && typeof searchParam === 'string') {
    historyStore.setSearchQuery(searchParam)
  }
})

// const handleItemClick = (id: number) => {
//   router.push(`/history/${id}`)
// }
</script>

<template>
  <div class="ml-16 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <SearchInput v-model="historyStore.searchQuery" />
      <div
        v-if="historyStore.isLoading"
        class="text-center flex justify-center items-center min-h-[80vh]"
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
      <span v-else>
        <p class="my-6 text-sm">
          You have {{ historyStore.historyItems.length }} previous transcribe
        </p>
        <div class="list-container">
          <div class="my-4 grid gap-2">
            <HistoryCard
              v-for="item in historyStore.filteredHistoryItems"
              :key="item.id"
              :items="item"
            />
          </div>
        </div>
      </span>
    </div>
  </div>
</template>
