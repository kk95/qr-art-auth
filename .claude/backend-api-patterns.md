# Backend API Patterns - QR-Art-Auth

## Nuxt Server Routes

Nuxt 4 uses Nitro for server-side APIs.

### File Structure
```
server/
├── api/
│   ├── auth/
│   │   └── init.post.ts
│   ├── generate.post.ts
│   └── qr/
│       └── [id].get.ts
├── middleware/
└── utils/
```

---

## API Route Template

```typescript
// server/api/generate.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate
  if (!body.image) {
    throw createError({
      statusCode: 400,
      message: 'Image is required'
    })
  }

  // Process
  const result = await generateQRCode(body)

  // Return
  return {
    success: true,
    data: result
  }
})
```

---

## Error Handling

```typescript
try {
  const result = await replicateAPI.generate(...)
  return { success: true, data: result }
} catch (error) {
  throw createError({
    statusCode: 500,
    message: 'Generation failed'
  })
}
```

---

## Database (Future)

Will use PostgreSQL with Prisma or Drizzle ORM.

### Schema Design
```sql
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  qr_data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Request Validation

Use Zod for input validation:

```typescript
import { z } from 'zod'

const GenerateSchema = z.object({
  image: z.string().url(),
  qrData: z.string().min(1),
  scale: z.number().min(0.5).max(2).default(1.1)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validated = GenerateSchema.parse(body)
  // ...
})
```

---

## Environment Variables

Access in server routes:

```typescript
const replicateToken = process.env.REPLICATE_API_TOKEN
if (!replicateToken) {
  throw createError({
    statusCode: 500,
    message: 'REPLICATE_API_TOKEN not configured'
  })
}
```
