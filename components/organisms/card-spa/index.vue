<script setup lang="ts">
import './card-spa.scss'

const { image, imageAlt, title, address, email, phone } = defineProps<{
  image: string
  imageAlt: string
  title: string
  address: {
    street: string
    suite: string
    city: string
    state: string
    zip: string
  }
  email: string
  phone: string
}>()

</script>

<template>

    <div class="card-spa">

      <NuxtPicture
        class="card-spa-logo"
        :src="image"
        :alt="imageAlt"
        densities="x1"
        sizes="xs:100px md:100px xl:100px"
        format="webp"
      />

      <div class="card-spa-details">

        <h3 class="title">
          {{ title }}
        </h3>

        <div class="details">
          <p>Address</p>
          <div class="address">
            <span>{{ address.street }}</span>
            <span>{{ address.suite }}</span>
            <span>{{ address.city }}, {{ address.state }} {{ address.zip }}</span>
          </div>
        </div>

        <div class="details">
          <p>Email</p>
          <span class="item">{{ email }}</span>
        </div>

        <div class="details">
          <p>Phone</p>
          <span class="item">{{ phone }}</span>
        </div>

      </div>

    </div>

</template>