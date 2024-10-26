<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: File | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

// watch to sync local state with prop
watch(
  () => props.modelValue,
  newValue => {
    if (newValue === null && fileInput.value) {
      fileInput.value.value = ''
    }
  },
)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    emit('update:modelValue', target.files[0])
  }
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  const target = event.relatedTarget as HTMLElement
  if (!target || !target.closest('.group')) {
    isDragging.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    isDragging.value = false
    emit('update:modelValue', event.dataTransfer.files[0])
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const removeFile = () => {
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:modelValue', null)
}
</script>

<template>
  <div
    :class="[
      'group h-[200px] flex flex-col bg-primary items-center justify-center border-2 border-dashed border-dark rounded-lg p-6 transition duration-700 hover:bg-primary/70 md:h-[300px]',
      isDragging ? 'bg-dark/70 border-white ' : 'bg-primary',
    ]"
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragEnter"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
  >
    <input
      type="file"
      id="audioFile"
      ref="fileInput"
      class="hidden"
      accept="audio/*"
      @change="handleFileChange"
    />

    <p
      v-if="!modelValue"
      :class="[
        'text-dark text-center transition duration-500 ease-in-out text-sm font-semibold md:text-base',
        isDragging ? 'hidden' : '',
      ]"
    >
      Drag & drop your files here
    </p>
    <p
      :class="[
        isDragging ? '' : 'hidden',
        'font-bold text-2xl text-white transition duration-500 ease-in-out',
      ]"
    >
      📤 DROP HERE
    </p>
    <p v-if="!modelValue" :class="[isDragging ? 'hidden' : '', 'py-2']">or</p>
    <button
      v-if="!modelValue"
      type="button"
      :class="[
        isDragging ? 'hidden' : '',
        'mt-2 px-4 py-2 font-bold bg-secondary text-white rounded transition duration-500 ease-in-out shadow-xl group-hover:bg-secondary_darker group-hover:shadow-2xl group-hover:shadow-black group-hover:-translate-y-1',
      ]"
      @click="triggerFileInput"
    >
      📤 Upload Files
    </button>
    <div v-if="modelValue" class="mt-4">
      <h3
        :class="[
          'text-lg text-dark font-semibold text-center',
          isDragging ? 'hidden' : '',
        ]"
      >
        Uploaded File:
      </h3>
      <div class="flex justify-center items-center z-50">
        <p
          class="text-dark text-center mt-2 font-semibold border p-2 border-black rounded-md bg-white"
        >
          {{ modelValue.name }}
        </p>
        <button
          type="button"
          title="Remove file"
          @click="removeFile"
          class="ml-2 rounded-md bg-white border border-dark p-2 mt-2 transition duration-300 hover:bg-primary/60"
        >
          ❌
        </button>
      </div>
    </div>
  </div>
</template>
