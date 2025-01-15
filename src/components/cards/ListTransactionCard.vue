<script setup lang="ts">
import { formatDateLong } from '@/utils/utils'

defineProps<{
  quantity: number
  status: string
  date: string
}>()
</script>

<template>
  <span class="flex items-center justify-between">
    <p class="text-sm font-medium">Top up : {{ quantity }} Token</p>
  </span>
  <span class="flex justify-between items-center">
    <p class="mt-2 text-xs text-primarydarker">
      {{ formatDateLong(date) }}
    </p>
    <p
      class="font-semibold text-sm text-primarydarker"
      :class="{
        'text-primarydarker': status === 'PAID',
        'text-warning': status === 'UNPAID',
      }"
    >
      {{ status }}
    </p>
  </span>
</template>
