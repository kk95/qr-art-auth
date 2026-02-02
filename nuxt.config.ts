// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  compatibilityVersion: 4,

  ssr: true,

  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        allowArbitraryExtensions: true
      }
    }
  },

  devtools: { enabled: true }
})
