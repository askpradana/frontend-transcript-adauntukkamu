<script setup>
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
  <nav class="flex h-screen w-16 flex-col justify-between border-e bg-white">
    <div>
      <div class="inline-flex size-16 items-center justify-center">
        <RouterLink to="/dashboard">
          <span
            class="grid size-10 place-content-center rounded-lg bg-primary text-xs text-gray-600"
          >
            🔥
          </span>
        </RouterLink>
      </div>

      <div class="border-t border-black flex gap-4 flex-col items-center">
        <div class="px-2 pt-4">
          <RouterLink
            to="/settings"
            class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <button
              href="#"
              class="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span
                class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-primary py-1.5 text-xs font-medium text-black group-hover:visible px-4"
              >
                General
              </span>
            </button>
          </RouterLink>

          <ul class="space-y-1">
            <li>
              <RouterLink
                to="/profile"
                class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span
                  class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-primary py-1.5 text-xs font-medium text-black group-hover:visible px-4"
                >
                  Profile
                </span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/new">
                <a
                  href="#"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>

                  <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-primary py-1.5 text-xs font-medium text-black group-hover:visible px-4"
                  >
                    New
                  </span>
                </a>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-primary p-2"
    >
      <button
        @click="initiateLogout"
        class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-primary py-1.5 text-xs font-medium text-black group-hover:visible px-4"
        >
          Logout
        </span>
      </button>
    </div>
  </nav>

  <!-- Logout Confirmation Modal -->
  <div
    v-if="showLogoutModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg border border-black">
      <h2 class="text-xl font-bold mb-4">Confirm Logout</h2>
      <p class="mb-4">Are you sure you want to log out?</p>
      <div class="flex justify-end">
        <button
          @click="cancelLogout"
          class="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:border-black border border-white"
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
