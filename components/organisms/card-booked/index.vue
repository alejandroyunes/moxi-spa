<script setup lang="ts">
import './card-booked.scss'

</script>

<template>

    <div class="card-booked">

      <NuxtPicture
        class="card-booked-logo"
        src="/images/spa-booked.webp"
        alt="spa booked"
        densities="x1"
        sizes="xs:120px md:120px xl:120px"
        format="webp"
      />

      <div class="card-booked-details">

        <h3 class="title">
          Your appointment has been booked
        </h3>

        <p class="description">
          A confirmation has been sent to your email address.
        </p>

      </div>

    </div>

</template>