<script setup lang="ts">
import './booking-page.scss'
import goldSpa from '/images/gold-spa.webp'
import BookingForm from '~/components/organisms/forms/booking/index.vue'
import CardSpa from '~/components/organisms/card-spa/index.vue'

useSeoMeta({
  title: 'Gold Spa booking | San Diego',
  description: 'Discover the ultimate luxury spa experience in San Diego with Gold Spa. Our expert team offers a wide range of services to rejuvenate your mind, body, and soul.',
  ogSiteName: 'Gold Spa booking',
  ogTitle: 'Gold Spa booking',
  ogDescription: 'Discover the ultimate luxury spa experience in San Diego with Gold Spa. Our expert team offers a wide range of services to rejuvenate your mind, body, and soul.',
  ogImage: '/meta/default.webp',
  ogUrl: 'https://www.goldspa.com',
  ogLocale: 'en',
  twitterTitle: 'Gold Spa booking',
  twitterDescription: 'Discover the ultimate luxury spa experience in San Diego with Gold Spa. Our expert team offers a wide range of services to rejuvenate your mind, body, and soul.',
  twitterImage: '/meta/default.webp',
  twitterCard: 'summary_large_image',
})

const spaInfo = {
  image: goldSpa,
  imageAlt: 'gold spa image',
  title: 'Gold Spa',
  address: {
    street: '2525 Camino del Rio S',
    suite: 'Suite 315 Room 8',
    city: 'San Diego',
    state: 'CA',
    zip: '92108',
  },
  email: 'goldspa@gmail.com',
  phone: '+11 123 4567 222',
}

const status = ref(false)

const handleBookingStatusUpdate = (newStatus: boolean) => {
  status.value = newStatus
}

</script>

<template>
  <section class="booking-page" :class="{ 'booking-page-success': status }">
    <h2 class="mobile-only">Book appointment</h2>
    <CardSpa v-bind="spaInfo" :class="{ 'card-spa-success': status }" />

    <BookingForm @updateBookingStatus="handleBookingStatusUpdate" />

  </section>
</template>
