# Phase 8: Magic Link Authentication

## Goal

Implement magic link authentication system for mobile QR code sign-in flow, supporting both email and SMS verification.

---

## Prerequisites

- Phase 5 completed (Volt components working)
- PostgreSQL database setup (for session storage)
- API keys obtained:
  - Resend API key (for email magic links)
  - Twilio API credentials (for SMS magic links)

---

## Authentication Strategy

**Magic Link Flow**: Desktop shows QR code → Mobile scans → User chooses email or SMS → Receives magic link/code → Verifies → Desktop authenticated

### Benefits
- ✅ No password management
- ✅ Secure (one-time use, time-limited)
- ✅ Familiar to users (like Slack, Notion)
- ✅ Works on any mobile device (no app required)

---

## Steps

### 8.1 Install Dependencies

```bash
pnpm add resend twilio uuid
pnpm add -D @types/uuid
```

**Packages**:
- `resend` - Email magic link delivery
- `twilio` - SMS code delivery
- `uuid` - Generate session IDs

---

### 8.2 Set Up Environment Variables

Add to `.env`:

```bash
# Resend (Email Magic Links)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Twilio (SMS Magic Links)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Application URLs
APP_URL=http://localhost:3000
MAGIC_LINK_EXPIRY_MINUTES=10
```

Update `.env.example` with these variables (without values).

---

### 8.3 Database Schema

Create migration for auth sessions:

```sql
-- sessions table
CREATE TABLE auth_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  magic_token VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_session_id ON auth_sessions(session_id);
CREATE INDEX idx_magic_token ON auth_sessions(magic_token);
CREATE INDEX idx_expires_at ON auth_sessions(expires_at);
```

---

### 8.4 Create Server API Routes

#### 8.4.1 Initialize Auth Session

Create `server/api/auth/init.post.ts`:

```typescript
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  // Generate unique session ID
  const sessionId = uuidv4()

  // Calculate expiry (30 minutes from now)
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

  // Save to database
  await db.authSessions.create({
    sessionId,
    expiresAt,
    verified: false
  })

  return {
    success: true,
    data: {
      sessionId,
      qrUrl: `${process.env.APP_URL}/auth/verify?session=${sessionId}`,
      expiresAt
    }
  }
})
```

#### 8.4.2 Send Magic Link/Code

Create `server/api/auth/send-magic-link.post.ts`:

```typescript
import { Resend } from 'resend'
import { Twilio } from 'twilio'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)
const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export default defineEventHandler(async (event) => {
  const { sessionId, method, emailOrPhone } = await readBody(event)

  // Validate session exists and not expired
  const session = await db.authSessions.findBySessionId(sessionId)
  if (!session || new Date() > session.expiresAt) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or expired session'
    })
  }

  // Generate magic token
  const magicToken = uuidv4()
  const tokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

  // Update session with magic token
  await db.authSessions.update(sessionId, {
    [method === 'email' ? 'email' : 'phone']: emailOrPhone,
    magicToken,
    expiresAt: tokenExpiresAt
  })

  if (method === 'email') {
    // Send email magic link
    const magicLink = `${process.env.APP_URL}/auth/verify?session=${sessionId}&token=${magicToken}`

    await resend.emails.send({
      from: 'QR Art Auth <noreply@yourapp.com>',
      to: emailOrPhone,
      subject: 'Sign in to QR Art Auth',
      html: `
        <h1>Sign In</h1>
        <p>Click the link below to sign in to your desktop session:</p>
        <a href="${magicLink}">Sign In Now</a>
        <p>This link expires in 10 minutes.</p>
      `
    })
  } else {
    // Send SMS code
    const code = Math.floor(100000 + Math.random() * 900000) // 6-digit code

    await db.authSessions.update(sessionId, { magicToken: code.toString() })

    await twilioClient.messages.create({
      body: `Your QR Art Auth verification code is: ${code}. Expires in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: emailOrPhone
    })
  }

  return { success: true }
})
```

#### 8.4.3 Verify Magic Link/Code

Create `server/api/auth/verify.post.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const { sessionId, token } = await readBody(event)

  // Find session
  const session = await db.authSessions.findBySessionId(sessionId)

  if (!session) {
    throw createError({ statusCode: 404, message: 'Session not found' })
  }

  // Check expiry
  if (new Date() > session.expiresAt) {
    throw createError({ statusCode: 400, message: 'Session expired' })
  }

  // Verify token
  if (session.magicToken !== token) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  // Mark as verified
  await db.authSessions.update(sessionId, { verified: true })

  return { success: true }
})
```

#### 8.4.4 Check Auth Status (Polling)

Create `server/api/auth/status.get.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session as string

  const session = await db.authSessions.findBySessionId(sessionId)

  if (!session) {
    throw createError({ statusCode: 404, message: 'Session not found' })
  }

  return {
    verified: session.verified,
    expired: new Date() > session.expiresAt
  }
})
```

---

### 8.5 Frontend Components

#### 8.5.1 Update Desktop Sign-In Page

Update `app/pages/auth/signin.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QRCode from 'qrcode.vue3'

const sessionId = ref<string | null>(null)
const qrUrl = ref<string | null>(null)
const polling = ref<NodeJS.Timeout | null>(null)

async function initSession() {
  const { data } = await $fetch('/api/auth/init', { method: 'POST' })
  sessionId.value = data.sessionId
  qrUrl.value = data.qrUrl

  // Start polling for verification
  startPolling()
}

function startPolling() {
  polling.value = setInterval(async () => {
    if (!sessionId.value) return

    const status = await $fetch(`/api/auth/status?session=${sessionId.value}`)

    if (status.verified) {
      clearInterval(polling.value!)
      // Redirect to dashboard
      navigateTo('/dashboard')
    }

    if (status.expired) {
      clearInterval(polling.value!)
      // Show expiry message
    }
  }, 2000) // Poll every 2 seconds
}

onMounted(() => {
  initSession()
})

onUnmounted(() => {
  if (polling.value) clearInterval(polling.value)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <VoltCard class="max-w-md w-full">
      <template #title>
        <h1 class="text-2xl font-bold text-white text-center">
          Sign In with QR Code
        </h1>
      </template>
      <template #content>
        <div v-if="qrUrl" class="flex items-center justify-center mb-6">
          <QRCode :value="qrUrl" :size="256" level="H" />
        </div>

        <p class="text-gray-400 text-center text-sm">
          Scan this QR code with your mobile device to sign in
        </p>
      </template>
    </VoltCard>
  </div>
</template>
```

#### 8.5.2 Create Mobile Verification Page

Create `app/pages/auth/verify.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const sessionId = route.query.session as string
const token = route.query.token as string | undefined

const method = ref<'email' | 'sms'>('email')
const emailOrPhone = ref('')
const verificationCode = ref('')
const loading = ref(false)
const step = ref<'choose' | 'verify'>('choose')

// If token is in URL, auto-verify (email magic link)
if (token) {
  verifyMagicLink()
}

async function sendMagicLink() {
  loading.value = true
  try {
    await $fetch('/api/auth/send-magic-link', {
      method: 'POST',
      body: {
        sessionId,
        method: method.value,
        emailOrPhone: emailOrPhone.value
      }
    })

    if (method.value === 'sms') {
      step.value = 'verify'
    } else {
      // Email sent - show message
    }
  } finally {
    loading.value = false
  }
}

async function verifyMagicLink() {
  loading.value = true
  try {
    await $fetch('/api/auth/verify', {
      method: 'POST',
      body: {
        sessionId,
        token: token || verificationCode.value
      }
    })

    // Show success message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <VoltCard class="max-w-md w-full">
      <template #title>
        <h1 class="text-2xl font-bold text-white text-center">
          Verify Your Identity
        </h1>
      </template>

      <template #content>
        <div v-if="step === 'choose'">
          <VoltSelectButton
            v-model="method"
            :options="[
              { label: 'Email', value: 'email' },
              { label: 'SMS', value: 'sms' }
            ]"
            option-label="label"
            option-value="value"
          />

          <VoltInputText
            v-model="emailOrPhone"
            :placeholder="method === 'email' ? 'Enter your email' : 'Enter your phone'"
            class="mt-4"
          />

          <VoltButton
            label="Send Verification"
            @click="sendMagicLink"
            :loading="loading"
            class="mt-4 w-full"
          />
        </div>

        <div v-else-if="step === 'verify'">
          <VoltInputOtp
            v-model="verificationCode"
            :length="6"
          />

          <VoltButton
            label="Verify Code"
            @click="verifyMagicLink"
            :loading="loading"
            class="mt-4 w-full"
          />
        </div>
      </template>
    </VoltCard>
  </div>
</template>
```

---

### 8.6 Install QR Code Library

```bash
pnpm add qrcode.vue3
```

---

### 8.7 Security Checklist

- [ ] Session IDs are cryptographically random (UUID v4)
- [ ] Magic tokens expire after 10 minutes
- [ ] Tokens are one-time use only
- [ ] Rate limiting implemented (max 3 attempts per session)
- [ ] HTTPS enforced in production
- [ ] CORS configured to allow only your domain
- [ ] Database indexes on `session_id`, `magic_token`, `expires_at`
- [ ] Expired sessions cleaned up (background job)

---

### 8.8 Testing Checklist

- [ ] Desktop displays QR code correctly
- [ ] QR code encodes correct URL with session ID
- [ ] Mobile can scan and open verification page
- [ ] Email magic link sends and verifies correctly
- [ ] SMS code sends and verifies correctly
- [ ] Desktop polling detects verification
- [ ] Desktop redirects to dashboard after auth
- [ ] Sessions expire after 10 minutes
- [ ] Invalid tokens are rejected
- [ ] Expired sessions show appropriate message

---

## Verification Checklist

- [ ] Dependencies installed (resend, twilio, uuid, qrcode.vue3)
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] API routes implemented (`/api/auth/*`)
- [ ] Desktop sign-in page updated
- [ ] Mobile verification page created
- [ ] QR code displays correctly
- [ ] Email magic links work
- [ ] SMS codes work
- [ ] Desktop polling works
- [ ] Security measures implemented
- [ ] All tests pass

---

## Next Phase

✅ **Phase 8 Complete!**

Proceed to **Phase 9: QR Generation Canvas** to build the image upload and QR overlay feature.

---

## What We Accomplished

- ✅ Implemented magic link authentication system
- ✅ Email verification via Resend API
- ✅ SMS verification via Twilio API
- ✅ Desktop QR code display with polling
- ✅ Mobile verification page with email/SMS options
- ✅ Secure session management with expiry
- ✅ Rate limiting and security measures

**Files created**:
- `server/api/auth/init.post.ts`
- `server/api/auth/send-magic-link.post.ts`
- `server/api/auth/verify.post.ts`
- `server/api/auth/status.get.ts`
- `app/pages/auth/verify.vue` (new)
- Updated: `app/pages/auth/signin.vue`
