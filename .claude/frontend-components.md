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

## Composables

### Example: useQRGenerator
```typescript
// composables/useQRGenerator.ts
export function useQRGenerator() {
  const isGenerating = ref(false)
  const generatedUrl = ref<string | null>(null)

  async function generate(image: File, qrData: string) {
    isGenerating.value = true
    try {
      const response = await $fetch('/api/generate', {
        method: 'POST',
        body: { image, qrData }
      })
      generatedUrl.value = response.url
    } finally {
      isGenerating.value = false
    }
  }

  return {
    isGenerating,
    generatedUrl,
    generate
  }
}
```

Usage:
```vue
<script setup lang="ts">
const { isGenerating, generatedUrl, generate } = useQRGenerator()
</script>
```
