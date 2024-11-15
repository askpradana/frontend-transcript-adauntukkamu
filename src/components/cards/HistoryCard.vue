<script setup lang="ts">
import { formatDate } from '@/utils/utils'
import { useRouter } from 'vue-router'
import type { HistoryItemInterface } from '@/types/types'

defineProps<{
  items: HistoryItemInterface
}>()

const router = useRouter()

const toDetailsTrancriptionPage = (id: string) => {
  router.push(`/transcript/${id}`)
}
</script>

<template>
  <article
    @click="toDetailsTrancriptionPage(items.id)"
    class="bg-white rounded-md border border-gray-200 p-4 cursor-pointer transition duration-200 hover:bg-primary"
  >
    <p class="text-base line-clamp-1">
      {{ items.text }}
    </p>
    <p class="text-xs mt-2 font-semibold text-dark">
      {{ formatDate(items.updated) }}
    </p>
  </article>
</template>
