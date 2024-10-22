<script setup lang="ts">
import Loading from '~/components/atoms/loading/loading-background/index.vue'

const loading = ref(true)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme')

    if (theme === null) {
      localStorage.setItem('theme', 'light')
      document.documentElement.setAttribute("data-color-scheme", "light")
      loading.value = false
    } else {
      document.documentElement.setAttribute("data-color-scheme", theme === "dark" ? "light" : "dark")
      loading.value = false
    }
  }
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
  ],
})

</script>

<template>
  <Loading v-if="loading" />

  <article v-else>
    <NuxtPage />
  </article>
</template>
