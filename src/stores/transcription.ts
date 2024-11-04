import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranscriptionStore = defineStore('transcription', () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const transcription = ref('')
  const error = ref('')
  const isTokenRunout = ref(false)

  async function uploadAudio(file: File, userID: string) {
    if (!userID) {
      error.value = 'User not authenticated'
      return
    }

    const formData = new FormData();
    formData.append('recordID', userID);
    formData.append('file', file);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/transcribe', {
        method: 'POST',
        body: formData
      });

      let result
      try {
        result = await response.json()
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError)
        result = { message: 'Error parsing server response' }
      }

      if (!response.ok) {
        if (response.status === 403) {
          isTokenRunout.value = true
          error.value = 'Out of tokens, please add more'
        } else if (response.status === 409) {
          error.value =
            result.message || 'An error occurred during transcription.'
        } else {
          error.value =
            result.message || `HTTP error! status: ${response.status}`
        }
        transcription.value = ''
        return
      }

      if (typeof result.transcription === 'string') {
        transcription.value = result.transcription
      } else {
        transcription.value = JSON.stringify(result)
      }
      error.value = ''
      isTokenRunout.value = false
    } catch (err) {
      console.error('Error:', err)
      transcription.value = ''
      error.value = err instanceof Error ? err.message : String(err)
    }
  }

  return { transcription, error, isTokenRunout, uploadAudio }
})
