<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  loginWithGoogle: Function,
})
</script>

<template>
  <section class="bg-gradient-to-b from-white to-realwhite">
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl text-black select-none">
          {{ title }}
          <strong class="font-extrabold text-dark sm:block select-none">
            {{ subtitle }}
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed select-none">
          Experience lightning-fast, highly accurate transcriptions powered by
          cutting-edge AI technology. Notula makes converting speech to text
          effortless and accessible for all.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <button
            class="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primarydarker duration-200 sm:w-auto"
            @click="$props.loginWithGoogle"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
