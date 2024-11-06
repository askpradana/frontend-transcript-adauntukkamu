import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { HistoryItemInterface } from '@/types/types'

export const useHistoryStore = defineStore('history', () => {
  const historyItems = ref<HistoryItemInterface[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const filteredHistoryItems = computed(() => {
    if (!searchQuery.value) return historyItems.value

    const query = searchQuery.value.toLowerCase()

    return historyItems.value.filter(item =>
      item.text.toLowerCase().includes(query),
    )
  })

  const fetchHistory = async (userId: string) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordID: userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      historyItems.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const getHistoryItemById = (id: string): HistoryItemInterface | undefined => {
    return historyItems.value.find(item => item.id === id.toString())
  }

  return {
    historyItems,
    filteredHistoryItems,
    searchQuery,
    isLoading,
    error,
    fetchHistory,
    setSearchQuery,
    getHistoryItemById,
  }
})
