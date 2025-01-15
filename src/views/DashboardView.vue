<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import LeftBar from '@/components/loggedin/LeftBar.vue'

const router = useRouter()
const pocketbaseStore = usePocketbaseStore()
const isShow = ref(false)

const isShowLeftBar = () => {
  isShow.value = !isShow.value
}

onMounted(() => {
  if (!pocketbaseStore.pb.authStore.isValid) {
    // User is not logged in, redirect to home or login page
    router.push('/')
  }
})
</script>

<template>
  <main v-if="pocketbaseStore.pb.authStore.isValid" class="flex flex-row">
    <LeftBar :isShow="isShow" />
    <div class="flex flex-col w-screen">
      <header class="bg-realwhite md:-mt-10">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <button
              class="z-50 p-2 rounded-md transition duration-700 ease-in-out md:hidden hover:border hover:border-black"
              @click="isShowLeftBar"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div />
            <!-- <div class="md:flex md:items-center md:gap-12">
              <div class="flex items-center gap-4 cursor-default">
                <p>{{ pocketbaseStore.currentUser.name }}</p>
              </div>
            </div> -->
          </div>
        </div>
      </header>
      <RouterView />
    </div>
  </main>
</template>
