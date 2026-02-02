<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const isScrolled = ref(false)

// Track scroll for header effects
if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
    <!-- Header - Brutalist Design -->
    <header
      class="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md"
      :class="isScrolled ? 'bg-slate-900/95 border-b-2 border-cyan-400/30 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/80 border-b border-white/10'"
    >
      <div class="container mx-auto">
        <!-- Top accent line -->
        <div class="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

        <div class="flex items-center justify-between px-6 py-4">
          <!-- Logo Section -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <!-- Glowing QR Icon -->
            <div class="relative">
              <div class="absolute inset-0 bg-cyan-400/20 blur-lg group-hover:bg-cyan-400/40 transition-all" />
              <Icon
                name="heroicons:qr-code"
                class="relative h-10 w-10 text-cyan-400 transform group-hover:scale-110 transition-transform duration-200"
              />
            </div>

            <!-- Brand Name -->
            <div>
              <h1 class="font-mono text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                QR<span class="text-cyan-400">×</span>ART
              </h1>
              <div class="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Auth Platform
              </div>
            </div>
          </NuxtLink>

          <!-- Navigation - Brutalist Style -->
          <nav class="hidden md:flex items-center space-x-1">
            <NuxtLink
              to="/"
              class="relative px-6 py-2 font-mono text-sm font-medium tracking-wide transition-all duration-200 group"
              :class="route.path === '/' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'"
            >
              <span class="relative z-10">[ HOME ]</span>
              <div
                v-if="route.path === '/'"
                class="absolute inset-0 bg-cyan-400/10 border border-cyan-400/30"
              />
              <div
                v-else
                class="absolute inset-0 bg-white/0 border border-white/0 group-hover:bg-white/5 group-hover:border-white/20 transition-all"
              />
            </NuxtLink>

            <NuxtLink
              to="/dashboard"
              class="relative px-6 py-2 font-mono text-sm font-medium tracking-wide transition-all duration-200 group"
              :class="route.path === '/dashboard' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'"
            >
              <span class="relative z-10">[ DASHBOARD ]</span>
              <div
                v-if="route.path === '/dashboard'"
                class="absolute inset-0 bg-cyan-400/10 border border-cyan-400/30"
              />
              <div
                v-else
                class="absolute inset-0 bg-white/0 border border-white/0 group-hover:bg-white/5 group-hover:border-white/20 transition-all"
              />
            </NuxtLink>

            <NuxtLink
              to="/auth/signin"
              class="relative px-6 py-2 font-mono text-sm font-medium tracking-wide transition-all duration-200 group"
              :class="route.path === '/auth/signin' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'"
            >
              <span class="relative z-10">[ SIGN IN ]</span>
              <div
                v-if="route.path === '/auth/signin'"
                class="absolute inset-0 bg-cyan-400/10 border border-cyan-400/30"
              />
              <div
                v-else
                class="absolute inset-0 bg-white/0 border border-white/0 group-hover:bg-white/5 group-hover:border-white/20 transition-all"
              />
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 text-cyan-400 hover:bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all">
            <Icon name="heroicons:bars-3" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main role="main" class="min-h-[calc(100vh-200px)]">
      <slot />
    </main>

    <!-- Footer - Brutalist Design -->
    <footer class="relative mt-20 border-t-2 border-white/10 bg-slate-900/90 backdrop-blur-sm">
      <!-- Top accent line -->
      <div class="h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400" />

      <div class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <Icon name="heroicons:qr-code" class="h-8 w-8 text-cyan-400" />
              <h3 class="font-mono text-lg font-bold text-white">
                QR<span class="text-cyan-400">×</span>ART
              </h3>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Transform QR codes into art with AI-powered generation.
              <span class="text-cyan-400 font-medium">30% error correction.</span>
              <span class="text-white font-medium">100% scannable.</span>
            </p>

            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-2">
              <div class="inline-block bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded">
                <span class="font-mono text-xs text-cyan-400 font-bold">AI POWERED</span>
              </div>
              <div class="inline-block bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded">
                <span class="font-mono text-xs text-blue-400 font-bold">SECURE AUTH</span>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-mono text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <span class="text-cyan-400">[</span> Quick Links <span class="text-cyan-400">]</span>
            </h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm flex items-center group">
                  <span class="text-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard" class="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm flex items-center group">
                  <span class="text-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Dashboard
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/auth/signin" class="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm flex items-center group">
                  <span class="text-cyan-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Sign In
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Technology Stack -->
          <div>
            <h4 class="font-mono text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <span class="text-cyan-400">[</span> Powered By <span class="text-cyan-400">]</span>
            </h4>
            <ul class="space-y-2 font-mono text-xs text-gray-400">
              <li class="flex items-center">
                <span class="text-cyan-400 mr-2">▸</span>
                Nuxt 4 + Vue 3
              </li>
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">▸</span>
                ControlNet QR AI
              </li>
              <li class="flex items-center">
                <span class="text-purple-400 mr-2">▸</span>
                Magic Link Auth
              </li>
              <li class="flex items-center">
                <span class="text-cyan-400 mr-2">▸</span>
                PrimeVue Volt
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="font-mono text-xs text-gray-500 uppercase tracking-widest">
            &copy; 2026 QR×ART <span class="text-cyan-400 mx-2">×</span> AI-POWERED QR GENERATION
          </p>

          <!-- System Status Indicator -->
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-1">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span class="font-mono text-xs text-gray-500 uppercase">System Online</span>
            </div>
            <span class="text-gray-700">|</span>
            <span class="font-mono text-xs text-gray-600">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
