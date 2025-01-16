<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { usePocketbaseStore } from '@/stores/pocketbase'
import router from '@/router'

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
})

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
    :class="isShow ? 'translate-x-0' : '-translate-x-full'"
    class="z-50 -translate-x-full transition-all duration-700 fixed flex h-screen flex-col justify-between border-e bg-white select-none md:translate-x-0"
  >
    <div class="px-4 py-6">
      <span
        class="grid h-10 w-32 -mt-3 place-content-end rounded-lg bg-gray-100 md:mt-0 md:place-content-center"
      >
        <img src="/notula.png" width="40" alt="Logo" />
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <RouterLink
            to="/dashboard"
            class="group flex items-center gap-3 rounded-lg px-4 py-3 text-black transition-all duration-200 hover:shadow-md"
            :class="{
              'bg-primarydarker text-realwhite': $route.path === '/dashboard',
              'hover:shadow-sm': $route.path !== '/dashboard',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path
                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              />
            </svg>
            Dashboard
          </RouterLink>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="group flex items-center gap-3 rounded-lg px-4 py-3 text-black transition-all duration-200 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-folder"
              >
                <path
                  d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                />
              </svg>
              Transcriptions
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
                  class="group flex items-center gap-3 rounded-lg px-4 py-3 text-black transition-all duration-200 hover:shadow-md"
                  :class="{
                    'bg-primarydarker text-realwhite': $route.path === '/new',
                    'hover:shadow-sm': $route.path !== '/new',
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-notebook-pen"
                  >
                    <path
                      d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
                    />
                    <path d="M2 6h4" />
                    <path d="M2 10h4" />
                    <path d="M2 14h4" />
                    <path d="M2 18h4" />
                    <path
                      d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
                    />
                  </svg>
                  New Transcript
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/history"
                  class="group flex items-center gap-3 rounded-lg px-4 py-3 text-black transition-all duration-200 hover:shadow-md"
                  :class="{
                    'bg-primarydarker text-realwhite':
                      $route.path === '/history',
                    'hover:shadow-sm': $route.path !== '/history',
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-file-clock"
                  >
                    <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <circle cx="8" cy="16" r="6" />
                    <path d="M9.5 17.5 8 16.25V14" />
                  </svg>
                  History
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <RouterLink
            to="/settings"
            class="group flex items-center gap-3 rounded-lg px-4 py-3 text-black transition-all duration-200 hover:shadow-md"
            :class="{
              'bg-primarydarker text-realwhite': $route.path === '/settings',
              'hover:shadow-sm': $route.path !== '/settings',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-settings"
            >
              <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </RouterLink>
        </li>

        <li>
          <button
            @click="initiateLogout"
            class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 text-left hover:bg-warning hover:text-white flex flex-row gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
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
