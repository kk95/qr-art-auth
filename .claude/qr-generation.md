# QR Generation - QR-Art-Auth

## QR Code Library

Use `qrcode.vue3` library with Error Correction Level H (30%).

### Installation
```bash
pnpm add qrcode.vue3
```

### Basic Usage
```vue
<script setup lang="ts">
import QRCodeVue3 from 'qrcode.vue3'

const qrData = ref('https://example.com')
const qrSize = ref(256)
</script>

<template>
  <QRCodeVue3
    :value="qrData"
    :size="qrSize"
    :level="'H'"
    :render-as="'canvas'"
  />
</template>
```

---

## Error Correction Levels

| Level | Error Correction | Use Case |
|-------|------------------|----------|
| L | ~7% | Simple QR codes |
| M | ~15% | Standard use |
| Q | ~25% | High durability |
| **H** | ~30% | **AI-generated art (our choice)** |

**Why Level H?** Allows 30% of QR code to be damaged/obscured while remaining scannable. Perfect for blending with artistic images.

---

## Canvas Overlay Component

### Component Structure
```
components/qr/
├── QRGeneratorCanvas.vue    # Main canvas component
├── ImageUploader.vue         # Image upload
└── QROverlay.vue             # QR positioning controls
```

### Example: QRGeneratorCanvas.vue
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const uploadedImage = ref<string | null>(null)
const qrData = ref('https://qr-art-auth.app')
const qrScale = ref(1.0)
const qrPosition = ref({ x: 50, y: 50 }) // percentage

const canvasStyle = computed(() => ({
  backgroundImage: uploadedImage.value ? `url(${uploadedImage.value})` : 'none',
  backgroundSize: 'cover'
}))

function handleImageUpload(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImage.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

async function generateAIQR() {
  const response = await $fetch('/api/generate', {
    method: 'POST',
    body: {
      image: uploadedImage.value,
      qrData: qrData.value,
      scale: qrScale.value
    }
  })
  return response.url
}
</script>

<template>
  <div class="qr-canvas-container">
    <div class="canvas" :style="canvasStyle">
      <QRCodeVue3
        :value="qrData"
        :size="256"
        :level="'H'"
        :style="{
          transform: `scale(${qrScale})`,
          top: `${qrPosition.y}%`,
          left: `${qrPosition.x}%`
        }"
      />
    </div>

    <div class="controls">
      <VoltButton @click="handleImageUpload" label="Upload Image" />
      <VoltButton @click="generateAIQR" label="Generate AI QR" />
    </div>
  </div>
</template>
```

---

## AI Generation Integration

See [external-integrations.md](external-integrations.md) for Replicate API details.

### Workflow
1. User uploads base image
2. User positions QR code overlay
3. Frontend sends to `/api/generate`
4. Backend calls Replicate ControlNet QR API
5. Returns AI-blended QR image
6. Display result to user

---

## Best Practices

1. **Always use Level H** for AI-generated QR codes
2. **Validate QR data** before generation (URL format, length)
3. **Preview before AI generation** to show user what will be sent
4. **Test scannability** after generation
5. **Provide download option** for generated QR codes
