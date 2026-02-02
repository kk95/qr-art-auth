# External Integrations - QR-Art-Auth

## Replicate API (ControlNet QR)

### Setup

```bash
pnpm add replicate
```

### Configuration

```typescript
// server/utils/replicate.ts
import Replicate from 'replicate'

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})
```

### ControlNet QR Code Generation

```typescript
// server/api/generate.post.ts
export default defineEventHandler(async (event) => {
  const { image, qrData, scale = 1.1 } = await readBody(event)

  const output = await replicate.run(
    "controlnet-qr-code-monster",
    {
      input: {
        prompt: "artistic QR code, high quality, detailed",
        qr_code_content: qrData,
        image: image,
        scale: scale,
        num_inference_steps: 50,
        guidance_scale: 7.5
      }
    }
  )

  return {
    success: true,
    url: output[0]
  }
})
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | - | Text description for image style |
| `qr_code_content` | string | - | URL or text to encode in QR |
| `image` | string | - | Base image URL or data URI |
| `scale` | number | 1.1 | ControlNet conditioning scale |
| `num_inference_steps` | number | 50 | Number of denoising steps |
| `guidance_scale` | number | 7.5 | Classifier-free guidance scale |

---

## OpenAI API

### Setup

```bash
pnpm add openai
```

### Configuration

```typescript
// server/utils/openai.ts
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

export const openai = new OpenAIApi(configuration)
```

### Use Cases

1. **QR Code Explanations** - Generate educational content about QR codes
2. **Image Descriptions** - Describe uploaded images for accessibility
3. **Content Moderation** - Check user-generated content

### Example: Generate QR Explanation

```typescript
// server/api/explain.post.ts
export default defineEventHandler(async (event) => {
  const { topic } = await readBody(event)

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a QR code expert educator."
      },
      {
        role: "user",
        content: `Explain: ${topic}`
      }
    ]
  })

  return {
    explanation: completion.data.choices[0].message?.content
  }
})
```

---

## Error Handling

### Replicate Errors

```typescript
try {
  const output = await replicate.run(...)
  return { success: true, url: output[0] }
} catch (error) {
  if (error.response?.status === 402) {
    throw createError({
      statusCode: 402,
      message: 'Replicate API quota exceeded'
    })
  }
  throw createError({
    statusCode: 500,
    message: 'AI generation failed'
  })
}
```

### OpenAI Errors

```typescript
try {
  const completion = await openai.createChatCompletion(...)
  return completion.data
} catch (error) {
  if (error.response?.status === 429) {
    throw createError({
      statusCode: 429,
      message: 'OpenAI rate limit exceeded'
    })
  }
  throw createError({
    statusCode: 500,
    message: 'OpenAI request failed'
  })
}
```

---

## Environment Variables

Required in `.env`:

```bash
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

Never commit these to git!

---

## Rate Limiting

Implement rate limiting to avoid API quota issues:

```typescript
// server/middleware/rateLimit.ts
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
})

export default defineEventHandler(async (event) => {
  const remaining = await limiter.removeTokens(1)
  if (remaining < 0) {
    throw createError({
      statusCode: 429,
      message: 'Rate limit exceeded'
    })
  }
})
```
