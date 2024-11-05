<script setup lang="ts">
import { ref } from 'vue'
import { useTranscriptionStore } from '@/stores/transcription'
import { usePocketbaseStore } from '@/stores/pocketbase'
import UploadAudioFile from '@/components/inputs/UploadAudioFile.vue'
import ResultColumn from '@/components/results/ResultColumn.vue'

const pbStore = usePocketbaseStore()
const id = pbStore.currentUser.id
const transcriptionStore = useTranscriptionStore()
const audioFile = ref<File | null>(null)
const isLoading = ref(false)

const handleSubmit = async () => {
  if (audioFile.value) {
    isLoading.value = true
    transcriptionStore.error = ''
    transcriptionStore.isTokenRunout = false

    try {
      await transcriptionStore.uploadAudio(audioFile.value, id)
    } catch (error) {
      console.log(error)
      transcriptionStore.error = '❗ Failed to upload audio file.'
    } finally {
      isLoading.value = false
    }
  } else {
    transcriptionStore.error = '⚠️ Please select an audio file.'
  }
}
</script>

<template>
  <div class="ml-16">
    <div class="mx-2 md:max-w-2xl md:mx-auto">
      <h1 class="text-xl text-center font-bold text-gray-800 my-8 md:text-3xl">
        Upload Audio for Transcription
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <UploadAudioFile v-model="audioFile" />

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full p-3 border border-black rounded-md shadow-sm text-sm font-semibold text-dark transition duration-300 ease-in-out bg-white hover:bg-secondary_darker hover:border-dark/15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Transcribing...' : 'Transcribe Audio' }}
        </button>
      </form>

      <div
        v-if="transcriptionStore.error"
        class="mt-6 p-4 bg-red-50 rounded-lg border border-warning"
      >
        <p class="text-sm text-red-700">{{ transcriptionStore.error }}</p>
      </div>

      <span v-if="transcriptionStore.transcription">
        <ResultColumn v-model="transcriptionStore.transcription" />
      </span>
    </div>
  </div>
</template>
