<script setup lang="ts">
import { useCompanySettingsStore } from '@/stores/companySettings'
import type { CompanyInfo } from '@/stores/companySettings'
import { ref, onMounted } from 'vue'

const companySettingsStore = useCompanySettingsStore()
const companyInfo = ref<CompanyInfo>({ ...companySettingsStore.companyInfo })
const showNotification = ref(false)

/**
 * Handles logo file upload
 * Converts image to base64 and updates store
 */
const handleLogoUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    try {
      await companySettingsStore.setLogo(input.files[0])
      // Update local ref with the new logo
      companyInfo.value.logo = companySettingsStore.companyInfo.logo
      // Automatically save all company info when logo is uploaded
      companySettingsStore.updateCompanyInfo(companyInfo.value)
      // Show success notification
      showNotification.value = true
      setTimeout(() => {
        showNotification.value = false
      }, 3000)
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An error occurred while uploading the logo')
      }
      input.value = ''
    }
  }
}

/**
 * Saves company information to store and shows success notification
 */
const saveCompanyInfo = () => {
  companySettingsStore.updateCompanyInfo(companyInfo.value)
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000) // Hide after 3 seconds
}

// Initialize form with stored values
onMounted(() => {
  companyInfo.value = { ...companySettingsStore.companyInfo }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 sm:py-8">
    <div
      v-if="showNotification"
      class="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300"
      role="alert"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Settings saved successfully!</span>
      </div>
    </div>

    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
      Settings
    </h1>

    <div class="space-y-6">
      <!-- Company Information Section -->
      <section class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 sm:p-6">
          <h2
            class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
          >
            Company Information
          </h2>
          <p class="text-sm sm:text-base text-gray-600 mb-6">
            These details will be used in your PDF exports.
          </p>

          <div class="space-y-4 sm:space-y-6">
            <!-- Logo Upload - Full width on mobile -->
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                @change="handleLogoUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <img
                v-if="companyInfo.logo"
                :src="companyInfo.logo"
                alt="Company Logo"
                class="mt-2 h-16 sm:h-20 object-contain"
              />
            </div>

            <!-- Form Fields - Stack on mobile -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  v-model="companyInfo.name"
                  type="text"
                  class="w-full p-3 sm:p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  v-model="companyInfo.address"
                  type="text"
                  class="w-full p-3 sm:p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter company address"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  v-model="companyInfo.phone"
                  type="text"
                  class="w-full p-3 sm:p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  v-model="companyInfo.email"
                  type="email"
                  class="w-full p-3 sm:p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  v-model="companyInfo.website"
                  type="text"
                  class="w-full p-3 sm:p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter website URL"
                />
              </div>

              <!-- Save Button - Full width on mobile -->
              <div class="sm:col-span-2">
                <button
                  @click="saveCompanyInfo"
                  class="w-full sm:w-auto bg-primary hover:bg-primarydarker text-white font-bold py-3 sm:py-2 px-4 rounded-lg transition-colors"
                >
                  Save Company Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Legal Section - Mobile optimized cards -->
      <section class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
            Legal
          </h2>
          <div class="space-y-3">
            <router-link
              to="/terms-policy"
              class="group flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div class="flex items-center space-x-3 sm:space-x-4">
                <div
                  class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600"
                  >
                    Terms and Conditions
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Review our terms of service
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>

            <router-link
              to="/contact"
              class="group flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div class="flex items-center space-x-3 sm:space-x-4">
                <div
                  class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-600"
                  >
                    Contact Us
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Get in touch with our team
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
