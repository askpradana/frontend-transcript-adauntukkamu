<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTranscriptionStore } from '@/stores/transcription'
import { usePocketbaseStore } from '@/stores/pocketbase'

const pbStore = usePocketbaseStore()
const id = pbStore.currentUser.id
const transcriptionStore = useTranscriptionStore()
const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)

const transcriptionText = computed(() => {
  if (!transcriptionStore.transcription) return ''
  try {
    const parsed = JSON.parse(transcriptionStore.transcription)
    return parsed.result?.fullTranscription || transcriptionStore.transcription
  } catch {
    return transcriptionStore.transcription
  }
})

const handleSubmit = async () => {
  if (fileInput.value && fileInput.value.files && fileInput.value.files[0]) {
    const file = fileInput.value.files[0]
    isLoading.value = true
    transcriptionStore.error = ''
    transcriptionStore.isTokenRunout = false
    await transcriptionStore.uploadAudio(file, id)
    isLoading.value = false
  } else {
    transcriptionStore.error = 'Please select an audio file.'
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Upload Audio for Transcription
    </h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          for="audioFile"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Audio File
        </label>
        <input
          type="file"
          id="audioFile"
          ref="fileInput"
          accept="audio/*"
          class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary_darker"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary_darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Transcribing...' : 'Transcribe Audio' }}
      </button>
    </form>
    <div
      v-if="transcriptionStore.transcription"
      class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
    >
      <h2 class="text-lg font-semibold text-green-800 mb-2">
        Transcription Result:
      </h2>
      <p class="text-sm text-green-700">
        {{ transcriptionText }}
      </p>
    </div>
    <div
      v-if="transcriptionStore.error"
      class="mt-6 p-4 bg-red-50 rounded-lg border border-warning"
    >
      <p class="text-sm text-red-700">{{ transcriptionStore.error }}</p>
    </div>
  </div>
</template>
