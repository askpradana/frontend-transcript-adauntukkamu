<script setup lang="ts">
import Header from '../components/HeaderSection.vue'
import Banner from '../components/BannerSection.vue'
import Benefit from '../components/BenefitSection.vue'
import Pricing from '../components/PricingSection.vue'
import FAQ from '../components/FaqSection.vue'
import Footer from '../components/FooterSection.vue'
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
