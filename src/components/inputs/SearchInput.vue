<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from '@/utils/utils'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const route = useRouter()
const router = useRouter()
const inputValue = ref(props.modelValue)

// debounce for updarte url
const updateUrl = debounce((value: string) => {
  const query = { ...route.currentRoute.value.query }
  if (value) {
    query.title = value
  } else {
    delete query.title
  }
  router.replace({ query })
}, 500)

// monitor input changes
watch(inputValue, newValue => {
  emit('update:modelValue', newValue)
  updateUrl(newValue)
})

// Initialize from URL params if params exist
onMounted(() => {
  const searchParam = route.currentRoute.value.query.title
  if (searchParam && typeof searchParam === 'string') {
    inputValue.value = searchParam
    emit('update:modelValue', searchParam)
  }
})
</script>

<template>
  <span class="relative flex items-center">
    <span class="absolute ml-4">🔎</span>
    <input
      type="text"
      placeholder="Search..."
      class="input input-bordered w-full rounded-md text-base py-3 pl-10"
      v-model="inputValue"
    />
  </span>
</template>
