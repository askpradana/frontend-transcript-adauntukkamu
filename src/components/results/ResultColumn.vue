<script setup lang="ts">
import type { ResultTranscribeInterface } from '@/types/types'

const props = defineProps<{
  modelValue: string
}>()

const transcription: ResultTranscribeInterface = JSON.parse(props.modelValue)
</script>

<template>
  <div class="my-6 p-4 bg-green-50 rounded-lg border border-green-200">
    <h2 class="text-lg font-semibold text-green-800 mb-3">
      Transcription Result:
    </h2>
    <p class="text-sm">
      {{ transcription.result.fullTranscription }}
    </p>
    <h2 class="text-lg font-semibold text-green-800 my-3">
      Transcription details per second:
    </h2>
    <div v-for="word in transcription.result.words" :key="word.id">
      <div class="my-3">
        <p class="text-sm text-primary font-semibold">
          {{ word.start }}s - {{ word.end }}s
        </p>
        <p class="text-sm">{{ word.text }}</p>
      </div>
    </div>
  </div>
</template>
