# Security Patterns - QR-Art-Auth

## API Key Management

### Environment Variables

**NEVER commit API keys to git.**

```bash
# .env (gitignored)
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=postgresql://...
```

### Access in Server Routes

```typescript
// server/api/generate.post.ts
export default defineEventHandler(async (event) => {
  const apiKey = process.env.REPLICATE_API_TOKEN

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'API key not configured'
    })
  }

  // Use apiKey...
})
```

### Never Expose to Client

```typescript
// ❌ Bad - Exposes secret to client
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      replicateToken: process.env.REPLICATE_API_TOKEN // WRONG!
    }
  }
})

// ✅ Good - Server-side only
export default defineNuxtConfig({
  runtimeConfig: {
    replicateToken: process.env.REPLICATE_API_TOKEN // Correct
  }
})
```

---

## Input Validation

### Validate User Input

```typescript
import { z } from 'zod'

const QRGenerateSchema = z.object({
  qrData: z.string().min(1).max(2953), // Max for Level H
  image: z.string().url(),
  scale: z.number().min(0.5).max(2.0)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate
  const validated = QRGenerateSchema.parse(body)

  // Safe to use validated data
})
```

### Sanitize File Uploads

```typescript
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

function validateUpload(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }

  return true
}
```

---

## CORS Configuration

### Nuxt Server Routes

```typescript
// server/middleware/cors.ts
export default defineEventHandler((event) => {
  const allowedOrigins = [
    'https://qr-art-auth.app',
    'http://localhost:3000'
  ]

  const origin = getHeader(event, 'origin')

  if (origin && allowedOrigins.includes(origin)) {
    setHeader(event, 'Access-Control-Allow-Origin', origin)
    setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type')
  }
})
```

---

## Authentication (Future)

### Device-Flow Auth Pattern

```typescript
// server/api/auth/init.post.ts
export default defineEventHandler(async (event) => {
  const sessionId = crypto.randomUUID()

  // Store session in database/cache
  await redis.set(`auth:${sessionId}`, {
    status: 'pending',
    createdAt: Date.now()
  }, { ex: 300 }) // 5 minute expiry

  return { sessionId }
})
```

### Session Verification

```typescript
// server/api/auth/verify.post.ts
export default defineEventHandler(async (event) => {
  const { sessionId, code } = await readBody(event)

  const session = await redis.get(`auth:${sessionId}`)

  if (!session) {
    throw createError({
      statusCode: 404,
      message: 'Session not found or expired'
    })
  }

  // Verify code and update session
})
```

---

## Rate Limiting

### API Route Protection

```typescript
// server/middleware/rateLimit.ts
import { RateLimiter } from 'limiter'

const limiters = new Map()

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event)

  if (!limiters.has(ip)) {
    limiters.set(ip, new RateLimiter({
      tokensPerInterval: 10,
      interval: 'minute'
    }))
  }

  const limiter = limiters.get(ip)
  const remaining = await limiter.removeTokens(1)

  if (remaining < 0) {
    throw createError({
      statusCode: 429,
      message: 'Rate limit exceeded'
    })
  }
})
```

---

## XSS Prevention

### Sanitize User Content

```typescript
import DOMPurify from 'isomorphic-dompurify'

function sanitizeHTML(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
  })
}
```

### Vue Auto-Escapes

Vue automatically escapes content in templates:

```vue
<template>
  <!-- Safe - Vue escapes automatically -->
  <div>{{ userInput }}</div>

  <!-- Dangerous - Only use with trusted content -->
  <div v-html="sanitizedContent"></div>
</template>
```

---

## SQL Injection Prevention

### Use ORM (Prisma/Drizzle)

```typescript
// ✅ Good - Parameterized query
const qrCodes = await prisma.qrCode.findMany({
  where: {
    userId: userId
  }
})

// ❌ Bad - String concatenation
const query = `SELECT * FROM qr_codes WHERE user_id = ${userId}` // VULNERABLE!
```

---

## HTTPS Only

### Force HTTPS in Production

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    }
  }
})
```

---

## Security Checklist

Before deploying:

- [ ] All API keys in `.env`, not committed
- [ ] Input validation on all API routes
- [ ] File upload validation (type, size)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] SQL injection protection (ORM)
- [ ] XSS prevention (sanitize user content)
- [ ] Authentication implemented
- [ ] Session expiry configured
