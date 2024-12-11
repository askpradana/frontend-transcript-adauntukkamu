<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import router from '@/router'

const store = usePocketbaseStore()
const showLogoutModal = ref(false)

function initiateLogout() {
  showLogoutModal.value = true
}

function confirmLogout() {
  store.doLogout()
  router.push('/')
  showLogoutModal.value = false
}

function cancelLogout() {
  showLogoutModal.value = false
}
</script>

<template>
  <div
    class="fixed flex h-screen flex-col justify-between border-e bg-white select-none"
  >
    <div class="px-4 py-6">
      <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100">
        <img src="/notula.png" width="40" alt="Logo" />
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <RouterLink
            to="/dashboard"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            :class="{ 'bg-gray-100': $route.path === '/dashboard' }"
          >
            Dashboard
          </RouterLink>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              <span class="text-sm font-medium">Transcriptions</span>
              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <RouterLink
                  to="/new"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
                  :class="{ 'bg-gray-100': $route.path === '/new' }"
                >
                  New Transcript
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/history"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
                  :class="{ 'bg-gray-100': $route.path === '/history' }"
                >
                  History
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <RouterLink
            to="/settings"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            :class="{ 'bg-gray-100': $route.path === '/settings' }"
          >
            Settings
          </RouterLink>
        </li>

        <li>
          <button
            @click="initiateLogout"
            class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 text-left hover:bg-warning hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <div class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <p class="text-xs truncate flex-1">{{ store.currentUser.email }}</p>
      </div>
    </div>
  </div>

  <!-- Logout Confirmation Modal -->
  <div
    v-if="showLogoutModal"
    class="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg border border-black">
      <h2 class="text-xl font-bold mb-4">Confirm Logout</h2>
      <p class="mb-4">Are you sure you want to log out?</p>
      <div class="flex justify-end">
        <button
          @click="cancelLogout"
          class="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded border border-white hover:border-black"
        >
          Cancel
        </button>
        <button
          @click="confirmLogout"
          class="px-4 py-2 bg-red-500 text-black rounded border border-warning hover:bg-warning hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
