<script setup lang="ts">
interface BenefitProps {
  loginWithGoogle: Function
}

defineProps<BenefitProps>()
</script>

<template>
  <section>
    <div
      class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:mx-auto lg:py-16 select-none"
    >
      <div
        class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
      >
        <!-- Hero Section -->
        <div class="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left">
          <h2 class="text-3xl font-bold sm:text-4xl text-secondary">
            Transkirpsi lebih cepat dalam hitungan menit, bukan jam.
          </h2>

          <p class="mt-4 text-gray-600">
            "Kakak saya adalah seorang pegawai negeri sipil, dia sering menyuruh
            saya untuk melakukan tugas transkripsinya, tugasnya mudah dan dapat
            bayaran, tetapi itu menyita waktu saya. Akhirnya saya menciptakan
            transkripsi menggunakan AI untuk mengerjakannya lebih cepat." --
            Naufal.
          </p>

          <button
            @click="$props.loginWithGoogle"
            class="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primarydarker"
          >
            Mulai transkripsi
          </button>
        </div>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <!-- Time Saving -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Hemat waktu</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Gunakan waktumu untuk hal produktif lainnya.
            </p>
          </div>

          <!-- Easy to Use -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <path
                  d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                ></path>
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Mudah</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Upload. Tunggu beberapa menit. Beres.
            </p>
          </div>

          <!-- Error Free -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Error</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Manusia dapat lelah. AI sih tidak.
            </p>
          </div>

          <!-- Local -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <circle cx="12" cy="10" r="3" />
                <path
                  d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"
                />
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Lokal</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Dibuat oleh developer lokal, kiw kiw.
            </p>
          </div>

          <!-- Flexible -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <path
                  d="M3.8 3.8l16.4 16.4M20.2 3.8L3.8 20.2M15 3h6v6M9 3H3v6M15 21h6v-6M9 21H3v-6"
                />
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Fleksibel</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Dari mp3? ok, dari video? aman, dari link youtube? bisa ...?
              sepertinya hehe.
            </p>
          </div>

          <!-- Affordable -->
          <div class="block rounded-xl border border-gray-100 p-4 shadow-sm">
            <span class="inline-block rounded-lg bg-gray-50 p-3">
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
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path
                  d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                ></path>
              </svg>
            </span>

            <h2 class="mt-2 font-bold">Murah</h2>
            <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
              Menurut saya sih murah ya, hehe.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
