<script setup lang="ts">
interface Props {
  /**
   * Base price in Rupiah
   * @default 15000
   */
  basePrice?: number
  /**
   * Discount percentage (0-100)
   * @default 0
   */
  discountPercent?: number
}

const props = withDefaults(defineProps<Props>(), {
  basePrice: 15000,
  discountPercent: 0,
})

/**
 * Calculates the discounted price based on base price and discount percentage
 * @returns {number} Final price after discount
 */
const calculateDiscountedPrice = (): number => {
  if (!props.discountPercent) return props.basePrice
  return props.basePrice * (1 - props.discountPercent / 100)
}

/**
 * Formats number to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} Formatted price string
 */
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 select-none">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
        Harga transkripsi
      </h2>
      <p class="mt-4 text-gray-600">
        Transkripsi kelas profesional dengan harga 1 kali makan.
      </p>
    </div>

    <div class="rounded-2xl border border-indigo-600 p-8 shadow-lg bg-white">
      <div class="text-center">
        <div
          class="inline-block bg-indigo-50 rounded-full px-4 py-1 text-indigo-700 text-sm font-medium mb-4"
        >
          Harga terbaik
        </div>

        <div class="hover:scale-110 duration-300 ease-out">
          <div v-if="discountPercent > 0" class="mb-2">
            <span class="text-2xl text-gray-400 line-through">
              {{ formatPrice(basePrice) }}
            </span>
            <span
              class="ml-2 inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded"
            >
              {{ discountPercent }}% OFF
            </span>
          </div>

          <div class="text-4xl font-bold text-gray-900">
            {{ formatPrice(calculateDiscountedPrice()) }}
            <span class="text-lg text-gray-600 font-normal">/transkrip</span>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Yang di dapatkan
          </h3>
          <ul class="space-y-3">
            <li
              v-for="feature in [
                'Transkripsi hitungan menit.',
                'Hasil yang akurat.',
                'Mendukung banyak format file.',
                'Layanan purnajual di sosial media.',
              ]"
              :key="feature"
              class="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Kenapa pilih kami
          </h3>
          <ul class="space-y-3">
            <li
              v-for="benefit in [
                'Privasi dan keamanan terjaga.',
                'Tidak perlu konversi file audio/video-mu.',
                'Semua layanan online, 24 jam.',
                'Dedicated customer support',
              ]"
              :key="benefit"
              class="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span class="text-gray-700">{{ benefit }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 text-center">
        <a
          href="#"
          class="inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition hover:bg-primarydarker"
        >
          Mulai sekarang
        </a>
        <p class="mt-4 text-sm text-gray-500">Tanpa biaya tersembunyi.</p>
      </div>
    </div>
  </div>
</template>
