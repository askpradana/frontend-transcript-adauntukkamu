<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryStore } from '@/stores/historyStore'
import { usePocketbaseStore } from '@/stores/pocketbase'
import HistoryCard from '@/components/cards/HistoryCard.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'

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
</script>

<template>
  <div class="ml-0 sm:ml-16 min-h-screen px-4 sm:px-0">
    <div class="w-full max-w-2xl mx-auto">
      <!-- Search Input -->
      <SearchInput v-model="historyStore.searchQuery" class="mt-4 sm:mt-6" />

      <!-- Loading State -->
      <div
        v-if="historyStore.isLoading"
        class="flex justify-center items-center min-h-[60vh] sm:min-h-[80vh]"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-gray-900"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="historyStore.error"
        class="mt-4 sm:mt-6 bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded text-sm sm:text-base"
      >
        {{ historyStore.error }}
      </div>

      <!-- Content -->
      <div v-else>
        <p class="my-4 sm:my-6 text-sm sm:text-base text-gray-600">
          You have {{ historyStore.historyItems.length }} previous
          transcriptions
        </p>

        <div class="list-container">
          <div class="grid gap-2 sm:gap-3 pb-6">
            <HistoryCard
              v-for="item in historyStore.filteredHistoryItems"
              :key="item.id"
              :items="item"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
