<script setup lang="ts">
import type { ResultTranscribeInterface } from '@/types/types'

const props = defineProps<{
  modelValue: string
}>()

const transcription: ResultTranscribeInterface = JSON.parse(props.modelValue)
</script>

<template>
  <div class="my-6 p-4 bg-green-50 rounded-lg border border-green-200">
    <h2
      class="text-base md:text-lg text-primarydarker font-semibold text-green-800 mb-3"
    >
      Transcription Result:
    </h2>
    <p class="text-sm md:text-base text-justify whitespace-normal">
      {{ transcription.result.fullTranscription }}
    </p>
    <h2
      class="text-base md:text-lg text-primarydarker font-semibold text-green-800 my-3"
    >
      Transcription details per second:
    </h2>
    <div v-for="word in transcription.result.words" :key="word.id">
      <ul class="my-3 ml-4">
        <li class="text-sm text-primary font-semibold list-disc">
          {{ word.start }}s - {{ word.end }}s
        </li>
        <p class="text-sm md:text-base">{{ word.text }}</p>
      </ul>
    </div>
  </div>
</template>
