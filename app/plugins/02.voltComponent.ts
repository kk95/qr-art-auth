import Column from 'primevue/column'

export default defineNuxtPlugin(async (nuxtApp) => {
  const modules = import.meta.glob('~/components/volt/**/*.vue')

  for (const path in modules) {
    const mod: any = await modules[path]()
    // Extract filename (e.g. Button.vue → Button)
    const fileName = path.split('/').pop()!.replace('.vue', '')
    // Register with Volt prefix (e.g. Button → VoltButton)
    nuxtApp.vueApp.component('Volt' + fileName, mod.default)
  }

  // Register PrimeVue Column component (used by DataTable)
  nuxtApp.vueApp.component('Column', Column)
})
