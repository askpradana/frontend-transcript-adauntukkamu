<script setup lang="ts">
import { formatDate } from '@/utils/utils'
import type { HistoryItemInterface } from '@/types/types'

defineProps<{
  items: HistoryItemInterface
}>()

// const emit = defineEmits<{
//   (e: 'item-click', id: number): void
// }>()
</script>

<template>
  <article
    class="bg-white rounded-md border border-gray-200 p-4 cursor-pointer transition duration-200 hover:bg-primary"
  >
    <p class="text-base line-clamp-1">
      {{ items.text }}
    </p>
    <p class="text-sm mt-2">{{ formatDate(items.updated) }}</p>
  </article>
</template>
