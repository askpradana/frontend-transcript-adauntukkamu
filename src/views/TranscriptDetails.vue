<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHistoryStore } from '@/stores/historyStore'
// import { usePocketbaseStore } from '@/stores/pocketbase'
import { useRoute } from 'vue-router'
import ResultColumn from '@/components/results/ResultColumn.vue'

const route = useRoute()
const historyStore = useHistoryStore()
const transcription = ref({
  result: {
    fullTranscription: '',
    duration: 0,
    language: '',
    words: [],
  },
})
const isLoading = ref(true)
onMounted(async () => {
  try {
    const resultData = await historyStore.getHistoryItemById(
      route.params.id as string,
    )

    if (resultData) {
      transcription.value.result = {
        fullTranscription: resultData.text,
        duration: resultData.duration,
        language: resultData.language,
        words: resultData.words,
      }
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="ml-16 min-h-screen">
    <div class="mx-2 md:max-w-2xl md:mx-auto my-8">
      <h1 class="text-xl text-center font-bold text-gray-800 my-8 md:text-3xl">
        Transcript details page
      </h1>

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

      <span
        v-else-if="!isLoading && !historyStore.error && !historyStore.isLoading"
      >
        <ResultColumn :model-value="JSON.stringify(transcription)" />
      </span>
    </div>
  </div>
</template>
