<template>
  <div class="space-y-4 mb-12 max-w-3xl sm:mx-auto">
    <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Apakah transcipt AI ini berbayar?
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Tentu, kami perlu membayar biaya server dan API untuk transkrib kami.
      </p>
    </details>

    <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Tipe file apa saja yang di dukung
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Untuk sekarang kami mendukung semua jenis file audio seperti mp3, m4a,
        wav dan beberapa jenis video seperti mp4 webm
      </p>
    </details>

    <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Apakah hasil transkrip saya dapat di edit?
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Untuk sekarang kami mendukung hasil plain text dan output PDF.
      </p>
    </details>

    <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Apakah saya perlu settings atau mendownlaod sesuatu untuk melakukan
          transkrip?
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Tentu tidak, tinggal unggah file kamu dan unduh hasil transkripsi.
      </p>
    </details>

    <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Berapa lama transkripsi di lakukan?
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Jika kamu melakukan manual mungkin akan menyita waktu utama + ~30 menit,
        dengan transkrip AI kamu tidak perlu menunggu lebih daripada mendidihkan
        air.
      </p>
    </details>

    <!-- <details
      class="group border-s-4 border-primary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-black">
          Apakah akan ada promo di transkrip AI?
        </h2>

        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-black">
        Untuk sekarang kami sedang mencari harga yang cocok untuk transkripsi,
        sementara waktu nikmati diskon up to 50% yang kami berikan!
      </p>
    </details> -->
  </div>
</template>
