<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Animated QR-like pixel grid background
const pixels = ref<Array<{ x: number; y: number; active: boolean; delay: number }>>([])

onMounted(() => {
  // Generate pixel grid (21x21 like QR codes)
  const gridSize = 21
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      pixels.value.push({
        x: i,
        y: j,
        active: Math.random() > 0.7,
        delay: Math.random() * 3
      })
    }
  }

  // Animate pixels
  setInterval(() => {
    const randomPixel = pixels.value[Math.floor(Math.random() * pixels.value.length)]
    if (randomPixel) {
      randomPixel.active = !randomPixel.active
    }
  }, 150)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Animated QR Pixel Grid Background -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="grid grid-cols-21 gap-2 p-8 transform rotate-12 scale-150">
        <div
          v-for="(pixel, i) in pixels"
          :key="i"
          class="w-4 h-4 transition-all duration-500 ease-in-out"
          :class="pixel.active ? 'bg-cyan-400' : 'bg-transparent'"
          :style="{ transitionDelay: `${pixel.delay}s` }"
        />
      </div>
    </div>

    <!-- Gradient Mesh Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 opacity-80" />

    <!-- Noise Texture Overlay -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise" />

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center justify-center px-6 py-20">

      <!-- Hero Section with Asymmetric Layout -->
      <div class="max-w-7xl w-full mb-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <!-- Left: Text Content -->
          <div class="space-y-8 animate-slide-in-left">
            <!-- Brutalist Label -->
            <div class="inline-block">
              <div class="font-mono text-xs tracking-widest text-cyan-400 uppercase border border-cyan-400/30 px-4 py-2 backdrop-blur-sm bg-cyan-400/5">
                [ QR × AI × AUTH ]
              </div>
            </div>

            <!-- Main Headline -->
            <h1 class="font-mono text-6xl lg:text-7xl font-bold leading-tight">
              <span class="text-white block animate-glitch">Transform</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 block mt-2 animate-gradient">
                QR Codes
              </span>
              <span class="text-white/90 block mt-2">Into Art</span>
            </h1>

            <!-- Subheadline -->
            <p class="text-xl text-gray-300 leading-relaxed max-w-lg font-light">
              Generate AI-powered QR codes that blend seamlessly with your images.
              <span class="text-cyan-400 font-medium">30% error correction.</span>
              <span class="text-white font-medium">100% scannable.</span>
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 pt-4">
              <VoltButton
                label="Start Creating →"
                severity="primary"
                size="large"
                class="font-mono tracking-wide hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/20"
                @click="$router.push('/dashboard')"
              />

              <VoltSecondaryButton
                label="Sign In"
                size="large"
                class="font-mono tracking-wide border-2 border-white/10 hover:border-cyan-400/50 transition-colors"
                @click="$router.push('/auth/signin')"
              />
            </div>

            <!-- Social Proof / Stats -->
            <div class="flex gap-8 pt-8 border-t border-white/10">
              <div>
                <div class="font-mono text-3xl font-bold text-white">30%</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Error Correction</div>
              </div>
              <div>
                <div class="font-mono text-3xl font-bold text-cyan-400">AI</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Powered</div>
              </div>
              <div>
                <div class="font-mono text-3xl font-bold text-white">∞</div>
                <div class="text-sm text-gray-400 uppercase tracking-wide">Possibilities</div>
              </div>
            </div>
          </div>

          <!-- Right: Visual QR Demo -->
          <div class="relative animate-slide-in-right">
            <!-- Large QR Code with Glow -->
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse-slow" />

              <div class="relative bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-cyan-400/30 transition-all duration-300">
                <Icon
                  name="heroicons:qr-code"
                  class="w-full h-64 text-white/90 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />

                <!-- Scanline Effect -->
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none" />
              </div>
            </div>

            <!-- Floating Labels -->
            <div class="absolute -top-6 -right-6 bg-cyan-400 text-slate-900 font-mono text-xs px-4 py-2 font-bold uppercase tracking-wider rotate-3 shadow-xl animate-float">
              Scannable
            </div>
            <div class="absolute -bottom-4 -left-4 bg-purple-600 text-white font-mono text-xs px-4 py-2 font-bold uppercase tracking-wider -rotate-3 shadow-xl animate-float" style="animation-delay: 0.5s">
              Beautiful
            </div>
          </div>

        </div>
      </div>

      <!-- Features Grid - Brutalist Cards -->
      <div class="max-w-7xl w-full">
        <h2 class="font-mono text-4xl font-bold text-white mb-12 tracking-tight">
          <span class="text-cyan-400">[</span> Features <span class="text-cyan-400">]</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <!-- Feature 1: QR Education -->
          <div class="group relative overflow-hidden animate-slide-up" style="animation-delay: 0.1s">
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <VoltCard class="border-2 border-white/10 hover:border-cyan-400/50 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm">
              <template #content>
                <div class="p-4">
                  <!-- Icon with Background -->
                  <div class="relative mb-6">
                    <div class="absolute inset-0 bg-cyan-400/10 blur-xl" />
                    <Icon name="heroicons:academic-cap" class="relative h-14 w-14 text-cyan-400" />
                  </div>

                  <!-- Title -->
                  <h3 class="font-mono text-2xl font-bold text-white mb-3 tracking-tight">
                    QR Education
                  </h3>

                  <!-- Description -->
                  <p class="text-gray-300 leading-relaxed mb-4">
                    Master QR code technology with error correction level H (30%).
                    Learn how data encoding works.
                  </p>

                  <!-- Metric Badge -->
                  <div class="inline-block bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded">
                    <span class="font-mono text-xs text-cyan-400 font-bold">LEVEL H</span>
                  </div>
                </div>
              </template>
            </VoltCard>
          </div>

          <!-- Feature 2: Mobile Auth -->
          <div class="group relative overflow-hidden animate-slide-up" style="animation-delay: 0.2s">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <VoltCard class="border-2 border-white/10 hover:border-blue-400/50 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm">
              <template #content>
                <div class="p-4">
                  <!-- Icon with Background -->
                  <div class="relative mb-6">
                    <div class="absolute inset-0 bg-blue-400/10 blur-xl" />
                    <Icon name="heroicons:device-phone-mobile" class="relative h-14 w-14 text-blue-400" />
                  </div>

                  <!-- Title -->
                  <h3 class="font-mono text-2xl font-bold text-white mb-3 tracking-tight">
                    Mobile Auth
                  </h3>

                  <!-- Description -->
                  <p class="text-gray-300 leading-relaxed mb-4">
                    Secure device-flow authentication using dynamic QR codes.
                    No passwords needed.
                  </p>

                  <!-- Metric Badge -->
                  <div class="inline-block bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded">
                    <span class="font-mono text-xs text-blue-400 font-bold">MAGIC LINK</span>
                  </div>
                </div>
              </template>
            </VoltCard>
          </div>

          <!-- Feature 3: AI-Generated Art -->
          <div class="group relative overflow-hidden animate-slide-up" style="animation-delay: 0.3s">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <VoltCard class="border-2 border-white/10 hover:border-purple-400/50 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm">
              <template #content>
                <div class="p-4">
                  <!-- Icon with Background -->
                  <div class="relative mb-6">
                    <div class="absolute inset-0 bg-purple-400/10 blur-xl" />
                    <Icon name="heroicons:sparkles" class="relative h-14 w-14 text-purple-400" />
                  </div>

                  <!-- Title -->
                  <h3 class="font-mono text-2xl font-bold text-white mb-3 tracking-tight">
                    AI-Generated Art
                  </h3>

                  <!-- Description -->
                  <p class="text-gray-300 leading-relaxed mb-4">
                    Create beautiful blended QR codes with ControlNet AI.
                    Art meets function.
                  </p>

                  <!-- Metric Badge -->
                  <div class="inline-block bg-purple-400/10 border border-purple-400/30 px-3 py-1 rounded">
                    <span class="font-mono text-xs text-purple-400 font-bold">CONTROLNET</span>
                  </div>
                </div>
              </template>
            </VoltCard>
          </div>

        </div>
      </div>

      <!-- Bottom CTA Section -->
      <div class="max-w-4xl w-full mt-32 mb-20">
        <div class="relative group">
          <!-- Glow Effect -->
          <div class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />

          <!-- Card -->
          <div class="relative bg-slate-900/90 backdrop-blur-sm border-2 border-white/10 rounded-lg p-12 text-center">
            <h3 class="font-mono text-3xl font-bold text-white mb-4">
              Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Transform</span>?
            </h3>
            <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Start creating AI-powered QR codes that are both functional and beautiful.
              No credit card required.
            </p>
            <VoltButton
              label="Get Started Free →"
              severity="primary"
              size="large"
              class="font-mono tracking-wide hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/20"
              @click="$router.push('/dashboard')"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom Animations */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(3deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes glitch {
  0%, 100% {
    text-shadow: 0 0 0 transparent;
  }
  10%, 30%, 50%, 70%, 90% {
    text-shadow: -2px 0 0 rgba(0, 255, 255, 0.3), 2px 0 0 rgba(255, 0, 255, 0.3);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-scan {
  animation: scan 3s linear infinite;
}

.animate-glitch {
  animation: glitch 5s infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Noise Texture */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Grid for QR pixels */
.grid-cols-21 {
  grid-template-columns: repeat(21, minmax(0, 1fr));
}
</style>
