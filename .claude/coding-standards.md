# Coding Standards - QR-Art-Auth

## Vue 3 Composition API

### Always Use `<script setup lang="ts">`

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Component logic here
</script>
```

**Never use Options API** (`export default { data, methods, ... }`)

---

## TypeScript

### Strict Mode Enabled

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Type Props and Emits

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
</script>
```

---

## Pinia State Management

### Store Structure

```typescript
// stores/qr.ts
import { defineStore } from 'pinia'

export const useQRStore = defineStore('qr', () => {
  // State
  const qrCodes = ref<QRCode[]>([])
  const isLoading = ref(false)

  // Getters
  const qrCount = computed(() => qrCodes.value.length)

  // Actions
  async function fetchQRCodes() {
    isLoading.value = true
    try {
      const data = await $fetch('/api/qr')
      qrCodes.value = data
    } finally {
      isLoading.value = false
    }
  }

  return {
    qrCodes,
    isLoading,
    qrCount,
    fetchQRCodes
  }
})
```

---

## Tailwind CSS

### Utility-First Approach

```vue
<template>
  <div class="flex items-center justify-between bg-card-bg p-4 rounded-lg">
    <h2 class="text-xl font-semibold text-white">Title</h2>
    <VoltButton label="Action" />
  </div>
</template>
```

### Custom Theme Variables

Use CSS variables defined in `main.css`:

```css
/* Use these in Tailwind classes */
bg-background-dark
bg-card-bg
bg-primary
text-white
border-border
```

---

## Component Organization

### File Naming
- **Components**: PascalCase - `QRGenerator.vue`
- **Pages**: kebab-case - `auth/signin.vue`
- **Composables**: camelCase - `useQRGenerator.ts`
- **Stores**: kebab-case - `qr-store.ts`

### Component Structure
```vue
<script setup lang="ts">
// 1. Imports
import { ref } from 'vue'

// 2. Props/Emits
interface Props { ... }
const props = defineProps<Props>()

// 3. Composables
const store = useQRStore()

// 4. State
const localState = ref('')

// 5. Computed
const computed = computed(() => ...)

// 6. Methods
function handleClick() { ... }

// 7. Lifecycle (if needed)
onMounted(() => { ... })
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Minimal scoped styles if needed */
</style>
```

---

## Error Handling

### API Calls

```typescript
async function generateQR() {
  try {
    const result = await $fetch('/api/generate', {
      method: 'POST',
      body: { ... }
    })
    return result
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
    throw error
  }
}
```

---

## Code Quality

### No Magic Numbers

```typescript
// ❌ Bad
if (qrCode.errorLevel === 3) { ... }

// ✅ Good
const ERROR_LEVEL_H = 3
if (qrCode.errorLevel === ERROR_LEVEL_H) { ... }
```

### No Commented Code

Remove unused code instead of commenting:

```typescript
// ❌ Bad
// const oldFunction = () => { ... }

// ✅ Good
// (just delete it - git history preserves it)
```

### Max File Length
- **Components**: 300 lines max
- **Functions**: 50 lines max

If exceeded, split into smaller files.

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `qrData`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `MAX_QR_SIZE` |
| Functions | camelCase | `generateQR()` |
| Components | PascalCase | `QRGenerator.vue` |
| Stores | use + PascalCase | `useQRStore()` |
| Props | camelCase | `qrData`, `imageUrl` |
| Events | kebab-case | `@update-qr`, `@generate-complete` |

---

## Security

### Never Hardcode Secrets

```typescript
// ❌ Bad
const apiKey = 'sk-1234567890'

// ✅ Good
const apiKey = process.env.OPENAI_API_KEY
```

### Validate Input

```typescript
function validateQRData(data: string) {
  if (!data || data.length === 0) {
    throw new Error('QR data cannot be empty')
  }
  if (data.length > 2953) {
    throw new Error('QR data too long for Level H')
  }
  return true
}
```
