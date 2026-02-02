<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  showOverlay?: boolean
  autoAnimate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showOverlay: true,
  autoAnimate: true
})

const canvas = ref<HTMLCanvasElement | null>(null)
const activeRegion = ref<number | null>(null)

interface OverlayRegion {
  name: string
  description: string
  color: string
  coordinates: { x: number; y: number; width: number; height: number }[]
}

const regions: OverlayRegion[] = [
  {
    name: 'Finder Patterns',
    description: 'The three squares in the corners help scanners orient the QR code',
    color: 'rgba(6, 182, 212, 0.4)', // cyan-500
    coordinates: [
      { x: 20, y: 20, width: 70, height: 70 }, // Top-left
      { x: 310, y: 20, width: 70, height: 70 }, // Top-right
      { x: 20, y: 310, width: 70, height: 70 } // Bottom-left
    ]
  },
  {
    name: 'Timing Patterns',
    description: 'Alternating modules that help determine module coordinates',
    color: 'rgba(59, 130, 246, 0.4)', // blue-500
    coordinates: [
      { x: 96, y: 20, width: 208, height: 8 }, // Horizontal
      { x: 20, y: 96, width: 8, height: 208 } // Vertical
    ]
  },
  {
    name: 'Data Modules',
    description: 'These black and white modules encode your actual data',
    color: 'rgba(168, 85, 247, 0.4)', // purple-500
    coordinates: [
      { x: 100, y: 100, width: 180, height: 180 }
    ]
  },
  {
    name: 'Error Correction',
    description: 'Redundant data (30% with Level H) that allows scanning even if partially damaged',
    color: 'rgba(34, 197, 94, 0.4)', // green-500
    coordinates: [
      { x: 290, y: 290, width: 90, height: 90 }
    ]
  }
]

function drawQRBase() {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const size = 400
  ctx.clearRect(0, 0, size, size)

  // Draw QR code base pattern (simplified)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  // Draw finder patterns (three corners)
  const finderSize = 70
  const positions = [
    { x: 20, y: 20 }, // Top-left
    { x: 310, y: 20 }, // Top-right
    { x: 20, y: 310 } // Bottom-left
  ]

  positions.forEach(pos => {
    // Outer black square
    ctx.fillStyle = '#000000'
    ctx.fillRect(pos.x, pos.y, finderSize, finderSize)

    // White square
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(pos.x + 10, pos.y + 10, finderSize - 20, finderSize - 20)

    // Inner black square
    ctx.fillStyle = '#000000'
    ctx.fillRect(pos.x + 20, pos.y + 20, finderSize - 40, finderSize - 40)
  })

  // Draw timing patterns
  ctx.fillStyle = '#000000'
  for (let i = 96; i < 304; i += 16) {
    ctx.fillRect(i, 20, 8, 8) // Horizontal
    ctx.fillRect(20, i, 8, 8) // Vertical
  }

  // Draw random data modules
  const moduleSize = 8
  for (let y = 100; y < 280; y += moduleSize) {
    for (let x = 100; x < 280; x += moduleSize) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(x, y, moduleSize, moduleSize)
      }
    }
  }

  // Draw error correction area
  for (let y = 290; y < 380; y += moduleSize) {
    for (let x = 290; x < 380; x += moduleSize) {
      if (Math.random() > 0.4) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(x, y, moduleSize, moduleSize)
      }
    }
  }
}

function drawOverlay() {
  if (!canvas.value || !props.showOverlay) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Draw overlays for each region
  regions.forEach((region, index) => {
    const isActive = activeRegion.value === index
    ctx.fillStyle = isActive ? region.color.replace('0.4', '0.6') : region.color
    ctx.strokeStyle = region.color.replace('0.4', '1')
    ctx.lineWidth = isActive ? 3 : 2

    region.coordinates.forEach(coord => {
      ctx.fillRect(coord.x, coord.y, coord.width, coord.height)
      ctx.strokeRect(coord.x, coord.y, coord.width, coord.height)
    })

    // Draw label if active
    if (isActive && region.coordinates[0]) {
      const coord = region.coordinates[0]
      ctx.fillStyle = region.color.replace('0.4', '1')
      ctx.font = 'bold 12px monospace'
      ctx.fillText(region.name, coord.x, coord.y - 8)
    }
  })
}

function draw() {
  drawQRBase()
  if (props.showOverlay) {
    drawOverlay()
  }
}

// Auto-animate through regions
let animationInterval: NodeJS.Timeout | null = null

function startAnimation() {
  if (!props.autoAnimate) return

  animationInterval = setInterval(() => {
    if (activeRegion.value === null) {
      activeRegion.value = 0
    } else {
      activeRegion.value = (activeRegion.value + 1) % regions.length
    }
  }, 2000)
}

function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

onMounted(() => {
  draw()
  if (props.autoAnimate) {
    startAnimation()
  }
})

watch(() => props.showOverlay, draw)
watch(activeRegion, draw)

defineExpose({
  setActiveRegion: (index: number | null) => {
    activeRegion.value = index
  }
})
</script>

<template>
  <div class="educational-overlay relative">
    <!-- Canvas with QR Code -->
    <div class="relative group">
      <!-- Glow effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse-slow" />

      <!-- Canvas container -->
      <div class="relative bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden">
        <canvas
          ref="canvas"
          width="400"
          height="400"
          class="w-full h-auto drop-shadow-2xl"
        />

        <!-- Scanline Effect -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none" />
      </div>
    </div>

    <!-- Legend with all regions -->
    <div class="mt-6 space-y-2">
      <div
        v-for="(region, index) in regions"
        :key="region.name"
        class="flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer backdrop-blur-sm"
        :class="activeRegion === index ? 'bg-slate-800/80 border border-white/20' : 'bg-slate-900/40 border border-white/5 hover:bg-slate-800/60'"
        @mouseenter="() => { stopAnimation(); activeRegion = index }"
        @mouseleave="() => { if (props.autoAnimate) startAnimation() }"
      >
        <div
          class="w-4 h-4 rounded flex-shrink-0 mt-1 border-2 transition-all duration-200"
          :style="{
            backgroundColor: region.color.replace('0.4', activeRegion === index ? '0.8' : '0.6'),
            borderColor: region.color.replace('0.4', '1')
          }"
        />
        <div class="flex-1">
          <h4 class="font-mono text-sm font-bold text-white mb-1">{{ region.name }}</h4>
          <p class="text-xs text-gray-400 leading-relaxed">{{ region.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
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

.animate-scan {
  animation: scan 3s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
