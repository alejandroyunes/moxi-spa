import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.scss"],
  modules: [    
  '@formkit/nuxt',
  '@pinia/nuxt',
  '@nuxtjs/seo',
  '@nuxt/image'
],
app: {
  head: {
    htmlAttrs: { lang: 'en' },
    title: 'Moxie booking system',
    titleTemplate: '%s',
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
  },
  rootAttrs: {
    id: 'moxi-booking-page',
  },
},
image: {
  format: ['webp', 'png'],
  screens: {
    xs: 320,
    md: 1024,
    xl: 1280,
  },
},
  compatibilityDate: "2024-10-22",
})