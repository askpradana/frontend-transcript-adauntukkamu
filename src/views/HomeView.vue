<script setup lang="ts">
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Benefit from '../components/Benefit.vue'
import Pricing from '../components/Pricing.vue'
import FAQ from '../components/Faq.vue'
import Footer from '../components/Footer.vue'
import router from '@/router'
import { usePocketbaseStore } from '@/stores/pocketbase'

const pocketbaseStore = usePocketbaseStore()

function loginWithGoogle() {
  pocketbaseStore
    .doLogin()
    .then(() => {
      router.push('/dashboard')
    })
    .catch(error => {
      console.error('Login failed:', error)
    })
}
</script>

<template>
  <Header />
  <Banner
    title="Transcript faster, better, cheaper"
    subtitle="More free time for you"
    :login-with-google="loginWithGoogle"
  />
  <Benefit :login-with-google="loginWithGoogle" />
  <Pricing :discount-percent="45" :base-price="20000" />
  <FAQ />
  <Footer />
</template>
