# Frontend Components - QR-Art-Auth

## Vue 3 Composition API Patterns

### Component Template
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits
const emit = defineEmits<{
  update: [value: string]
}>()

// State
const localValue = ref('')

// Computed
const displayText = computed(() => `${props.title}: ${localValue.value}`)

// Methods
function handleClick() {
  emit('update', localValue.value)
}
</script>

<template>
  <div>
    <VoltButton @click="handleClick" :label="displayText" />
  </div>
</template>
```

---

## Volt Components

### Available Components
- `<VoltButton />` - Buttons
- `<VoltInputText />` - Text input
- `<VoltDialog />` - Modal dialogs
- `<VoltCard />` - Card containers
- `<VoltDataTable />` - Data tables
- See PHASE-5 for full list

### Usage Example
```vue
<VoltButton
  label="Generate QR"
  severity="primary"
  @click="handleGenerate"
/>
```

---

## PrimeVue Integration

Volt components are wrappers around PrimeVue. Use Volt when available, PrimeVue directly when not.

```vue
<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()

function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'QR generated!',
    life: 3000
  })
}
</script>
```

---

## Tailwind Styling

Prefer Tailwind utility classes:

```vue
<div class="flex items-center justify-between bg-card-bg p-4 rounded-lg">
  <h2 class="text-xl font-semibold text-white">Title</h2>
  <VoltButton label="Action" />
</div>
```

---

## Icons

Use `@nuxt/icon` with Heroicons:

```vue
<Icon name="heroicons:qr-code" class="h-6 w-6 text-primary" />
```

---

## Simple Mode Generator Component

### Overview
Users upload an image and select one of three preset buttons (no text prompts).

### Component Spec: `SimpleQRGenerator.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue'

type Preset = 'subtle' | 'balanced' | 'artistic'

interface PresetConfig {
  label: string
  description: string
  controlScale: number
}

const presets: Record<Preset, PresetConfig> = {
  subtle: {
    label: 'Subtle',
    description: 'High scannability, minimal artistic effect',
    controlScale: 0.8
  },
  balanced: {
    label: 'Balanced',
    description: 'Good balance of art and scannability',
    controlScale: 1.1
  },
  artistic: {
    label: 'Artistic',
    description: 'High artistic effect, lower scannability',
    controlScale: 1.4
  }
}

const selectedPreset = ref<Preset>('balanced')
const uploadedImage = ref<File | null>(null)
const qrData = ref('')
const isGenerating = ref(false)

async function handleGenerate() {
  if (!uploadedImage.value || !qrData.value) return

  isGenerating.value = true
  try {
    const formData = new FormData()
    formData.append('image', uploadedImage.value)
    formData.append('qr_data', qrData.value)
    formData.append('preset', selectedPreset.value)
    formData.append('control_scale', presets[selectedPreset.value].controlScale.toString())

    const response = await $fetch('/api/generate', {
      method: 'POST',
      body: formData
    })

    // Handle success
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <VoltCard>
    <template #title>Create Artistic QR Code</template>
    <template #content>
      <!-- QR Data Input -->
      <VoltInputText
        v-model="qrData"
        placeholder="Enter URL or text for QR code"
        class="mb-4"
      />

      <!-- Image Upload -->
      <VoltFileUpload
        accept="image/*"
        @select="uploadedImage = $event.files[0]"
        class="mb-6"
      />

      <!-- Preset Buttons -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2 text-white">
          Choose Style Preset
        </label>
        <div class="flex gap-3">
          <VoltButton
            v-for="(config, key) in presets"
            :key="key"
            :label="config.label"
            :severity="selectedPreset === key ? 'primary' : 'secondary'"
            @click="selectedPreset = key as Preset"
            class="flex-1"
          >
            <template #default>
              <div class="flex flex-col items-center">
                <span class="font-semibold">{{ config.label }}</span>
                <span class="text-xs opacity-80">{{ config.description }}</span>
              </div>
            </template>
          </VoltButton>
        </div>
      </div>

      <!-- Generate Button -->
      <VoltButton
        label="Generate QR Code"
        @click="handleGenerate"
        :loading="isGenerating"
        :disabled="!uploadedImage || !qrData"
        class="w-full"
      />
    </template>
  </VoltCard>
</template>
```

---

## Educational Overlay Component

### Overview
Interactive canvas that highlights QR code anatomy with colorful overlays.

### Component Spec: `EducationalOverlay.vue`

```vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  qrImageUrl: string
  showOverlay: boolean
}

const props = defineProps<Props>()

const canvas = ref<HTMLCanvasElement | null>(null)
const showExplanation = ref(false)

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
    color: 'rgba(255, 0, 0, 0.3)',
    coordinates: [
      { x: 0, y: 0, width: 50, height: 50 }, // Top-left
      { x: 250, y: 0, width: 50, height: 50 }, // Top-right
      { x: 0, y: 250, width: 50, height: 50 } // Bottom-left
    ]
  },
  {
    name: 'Data Modules',
    description: 'These black and white modules encode your actual data',
    color: 'rgba(0, 0, 255, 0.3)',
    coordinates: [
      { x: 60, y: 60, width: 180, height: 180 }
    ]
  },
  {
    name: 'Error Correction',
    description: 'Redundant data that allows the QR code to work even if partially damaged',
    color: 'rgba(0, 255, 0, 0.3)',
    coordinates: [
      { x: 250, y: 250, width: 50, height: 50 }
    ]
  }
]

function drawOverlay() {
  if (!canvas.value || !props.showOverlay) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Draw QR code image first
  const img = new Image()
  img.src = props.qrImageUrl
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.value!.width, canvas.value!.height)

    // Draw overlay regions
    regions.forEach(region => {
      ctx.fillStyle = region.color
      ctx.strokeStyle = region.color.replace('0.3', '1')
      ctx.lineWidth = 2

      region.coordinates.forEach(coord => {
        ctx.fillRect(coord.x, coord.y, coord.width, coord.height)
        ctx.strokeRect(coord.x, coord.y, coord.width, coord.height)
      })
    })
  }
}

onMounted(() => {
  drawOverlay()
})

watch(() => props.showOverlay, drawOverlay)
</script>

<template>
  <div class="educational-overlay">
    <canvas
      ref="canvas"
      width="300"
      height="300"
      class="border border-gray-700 rounded"
    />

    <!-- Toggle Explanation -->
    <VoltButton
      :label="showExplanation ? 'Hide Explanation' : 'How does this work?'"
      @click="showExplanation = !showExplanation"
      severity="secondary"
      class="mt-4"
    />

    <!-- Explanation Panel -->
    <div v-if="showExplanation" class="mt-4 space-y-3">
      <div
        v-for="region in regions"
        :key="region.name"
        class="flex items-start gap-3 p-3 bg-surface-900 rounded"
      >
        <div
          class="w-4 h-4 rounded flex-shrink-0 mt-1"
          :style="{ backgroundColor: region.color.replace('0.3', '0.8') }"
        />
        <div>
          <h4 class="font-semibold text-white">{{ region.name }}</h4>
          <p class="text-sm text-gray-400">{{ region.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Composables

### useCredits (Pinia Store)
```typescript
// stores/credits.ts
import { defineStore } from 'pinia'

export const useCreditsStore = defineStore('credits', () => {
  const credits = ref(0)
  const supabase = useSupabaseClient()

  async function fetchCredits() {
    const user = useSupabaseUser()
    if (!user.value) return

    const { data } = await supabase
      .from('profiles')
      .select('credits_remaining')
      .eq('id', user.value.id)
      .single()

    if (data) {
      credits.value = data.credits_remaining
    }
  }

  async function deductCredit() {
    credits.value = Math.max(0, credits.value - 1)
    await fetchCredits() // Sync with backend
  }

  return {
    credits: readonly(credits),
    fetchCredits,
    deductCredit
  }
})
```

Usage:
```vue
<script setup lang="ts">
const creditsStore = useCreditsStore()

onMounted(() => {
  creditsStore.fetchCredits()
})
</script>

<template>
  <div>
    <p>Credits Remaining: {{ creditsStore.credits }}</p>
  </div>
</template>
```
