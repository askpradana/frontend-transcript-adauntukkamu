<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900">Settings</h1>

    <div class="space-y-8">
      <!-- Settings sections -->
      <section class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Account Settings
          </h2>
          <p class="text-gray-600 mb-4">
            Manage your account preferences and settings.
          </p>
          <!-- Account settings content will go here -->
        </div>
      </section>

      <!-- <section class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Notifications
          </h2>
          <p class="text-gray-600 mb-4">
            Configure how you receive notifications.
          </p>
          Notification settings content will go here
        </div>
      </section> -->

      <section class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Legal</h2>
          <div class="space-y-4">
            <router-link
              to="/terms-policy"
              class="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 group-hover:text-blue-600"
                  >
                    Terms and Conditions
                  </h3>
                  <p class="text-sm text-gray-500">
                    Review our terms of service
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors"
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
              class="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-600"
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
                    class="text-lg font-medium text-gray-900 group-hover:text-blue-600"
                  >
                    Contact Us
                  </h3>
                  <p class="text-sm text-gray-500">
                    Get in touch with our team
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors"
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
