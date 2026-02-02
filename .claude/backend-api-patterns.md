# Backend API Patterns - QR-Art-Auth

## Nuxt Server Routes

Nuxt 4 uses Nitro for server-side APIs. We use Supabase for authentication, database, and storage.

### File Structure
```
server/
├── api/
│   ├── generate.post.ts        # AI QR generation
│   ├── gallery/
│   │   └── list.get.ts         # User's saved QR codes
│   └── qr/
│       ├── [id].get.ts         # Get QR metadata
│       └── [id].delete.ts      # Delete QR code
├── middleware/
│   └── auth.ts                 # Supabase auth middleware
└── utils/
    └── supabase.ts             # Supabase client
```

---

## Supabase Authentication

### Magic Link Flow

```typescript
// Client-side (Vue component)
const supabase = useSupabaseClient()

async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`
    }
  })

  if (error) {
    console.error('Magic link error:', error)
  } else {
    // Show "Check your email" message
  }
}
```

### Protected API Routes

```typescript
// server/middleware/auth.ts
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  // Attach user to event context
  event.context.user = user
})
```

---

## API Route Template

```typescript
// server/api/generate.post.ts
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Get authenticated user
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await serverSupabaseClient(event)
  const body = await readBody(event)

  // Check user has credits
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_remaining')
    .eq('id', user.id)
    .single()

  if (!profile || profile.credits_remaining < 1) {
    throw createError({
      statusCode: 402,
      message: 'Insufficient credits'
    })
  }

  // Validate
  if (!body.image) {
    throw createError({
      statusCode: 400,
      message: 'Image is required'
    })
  }

  // Process
  const result = await generateQRCode(body)

  // Deduct credit
  await supabase
    .from('profiles')
    .update({ credits_remaining: profile.credits_remaining - 1 })
    .eq('id', user.id)

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

## Database Schema (Supabase)

Supabase provides PostgreSQL with auth built-in.

### Profiles Table (Credits System)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  credits_remaining INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### QR Codes Table (Gallery)
```sql
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  qr_data TEXT NOT NULL,
  preset TEXT NOT NULL CHECK (preset IN ('subtle', 'balanced', 'artistic')),
  control_scale DECIMAL(3, 2) NOT NULL,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX idx_qr_codes_created_at ON qr_codes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Users can read their own QR codes (and only if not flagged)
CREATE POLICY "Users can read own QR codes"
  ON qr_codes FOR SELECT
  USING (auth.uid() = user_id AND is_flagged = FALSE);

-- Users can insert their own QR codes
CREATE POLICY "Users can insert own QR codes"
  ON qr_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own QR codes
CREATE POLICY "Users can delete own QR codes"
  ON qr_codes FOR DELETE
  USING (auth.uid() = user_id);
```

### Supabase Storage Bucket
```sql
-- Create storage bucket for QR images
INSERT INTO storage.buckets (id, name, public)
VALUES ('qr-art', 'qr-art', true);

-- Storage policies
CREATE POLICY "Users can upload own images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'qr-art' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'qr-art');
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
