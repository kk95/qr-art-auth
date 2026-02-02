# Phase 8: Supabase Magic Link Authentication

## Goal

Implement simple email-based authentication using Supabase Magic Links. No passwords, no SMS, no complex flows.

---

## Prerequisites

- Phase 2 completed (`@nuxtjs/supabase` installed)
- Supabase project created at [supabase.com](https://supabase.com)
- Environment variables configured

---

## Authentication Strategy

**Supabase Magic Link**: User enters email → Receives link → Clicks link → Authenticated

### Benefits
- ✅ No password management (more secure)
- ✅ Supabase handles all auth complexity
- ✅ Built-in email templates
- ✅ Free tier (50,000 monthly active users)
- ✅ Row Level Security (RLS) for database

---

## Steps

### 8.1 Create Supabase Project

1. Visit [supabase.com](https://supabase.com) and create account
2. Create new project:
   - **Project name**: `qr-art-auth`
   - **Database password**: Save securely
   - **Region**: Choose closest to you
3. Wait for project to provision (~2 minutes)

---

### 8.2 Get Supabase Credentials

1. Go to **Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

---

### 8.3 Configure Environment Variables

Create `.env` file in project root:

```bash
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANT**: Add `.env` to `.gitignore` (should already be there)

Update `.env.example`:

```bash
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
```

---

### 8.4 Configure Nuxt Module

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/icon'
  ],

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth/signin',
      callback: '/dashboard',
      exclude: ['/', '/auth/*']
    }
  },

  // ... rest of config
})
```

---

### 8.5 Create Database Tables

Go to Supabase **SQL Editor** and run:

```sql
-- Profiles table (extends auth.users)
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

-- QR Codes table
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

-- Users can read their own QR codes (only if not flagged)
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

---

### 8.6 Create Storage Bucket

1. Go to **Storage** > **Create bucket**
2. **Name**: `qr-art`
3. **Public bucket**: Yes (so images are accessible via URL)
4. Click **Create bucket**

Go to **Policies** tab and add:

```sql
-- Users can upload to their own folder
CREATE POLICY "Users can upload own images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'qr-art' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Public read access
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'qr-art');
```

---

### 8.7 Create Auth Pages

#### Sign In Page

Create `app/pages/auth/signin.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const emailSent = ref(false)

async function signIn() {
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      console.error('Sign in error:', error)
    } else {
      emailSent.value = true
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 p-4">
    <VoltCard class="max-w-md w-full">
      <template #title>
        <h1 class="text-2xl font-bold text-white text-center">
          Sign In to QR Art
        </h1>
      </template>

      <template #content>
        <div v-if="!emailSent">
          <p class="text-gray-400 mb-4 text-center">
            Enter your email to receive a magic link
          </p>

          <VoltInputText
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="mb-4 w-full"
          />

          <VoltButton
            label="Send Magic Link"
            @click="signIn"
            :loading="loading"
            :disabled="!email"
            class="w-full"
          />
        </div>

        <div v-else class="text-center">
          <Icon name="heroicons:envelope" class="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-white mb-2">Check your email</h2>
          <p class="text-gray-400">
            We sent a magic link to <strong>{{ email }}</strong>
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Click the link in your email to sign in
          </p>
        </div>
      </template>
    </VoltCard>
  </div>
</template>
```

---

### 8.8 Create Dashboard Page (Protected)

Create `app/pages/dashboard.vue`:

```vue
<script setup lang="ts">
const user = useSupabaseUser()

// Redirect if not authenticated
definePageMeta({
  middleware: 'auth'
})

async function signOut() {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">Dashboard</h1>
        <VoltButton label="Sign Out" @click="signOut" severity="secondary" />
      </div>

      <div class="text-white">
        <p>Welcome, {{ user?.email }}!</p>
      </div>

      <!-- QR Generator Component will go here -->
    </div>
  </div>
</template>
```

---

### 8.9 Create Profile Trigger (Auto-create on signup)

In Supabase **SQL Editor**, create a trigger to auto-create profiles:

```sql
-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits_remaining)
  VALUES (NEW.id, NEW.email, 5);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

### 8.10 Update Landing Page

Update `app/pages/index.vue` to add sign-in button:

```vue
<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold text-white mb-4 text-center">
        Create Artistic QR Codes
      </h1>
      <p class="text-xl text-gray-400 mb-8 text-center">
        Educational tool for generating beautiful, scannable QR codes with AI
      </p>

      <div class="flex justify-center">
        <VoltButton
          v-if="!user"
          label="Get Started"
          @click="navigateTo('/auth/signin')"
          size="large"
        />
        <VoltButton
          v-else
          label="Go to Dashboard"
          @click="navigateTo('/dashboard')"
          size="large"
        />
      </div>
    </div>
  </div>
</template>
```

---

## Testing Checklist

- [ ] Can visit `/auth/signin` and see sign-in form
- [ ] Enter email and receive magic link
- [ ] Click magic link in email → Redirected to `/dashboard`
- [ ] User session persists on page refresh
- [ ] Profile created automatically with 5 credits
- [ ] Sign out works correctly
- [ ] Protected pages redirect to sign-in when not authenticated

---

## Verification Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Nuxt module configured
- [ ] Database tables created (profiles, qr_codes)
- [ ] Storage bucket created (qr-art)
- [ ] Auth pages created (`/auth/signin`, `/dashboard`)
- [ ] Profile auto-creation trigger works
- [ ] Magic link authentication works end-to-end
- [ ] RLS policies protect user data

---

## Next Phase

✅ **Phase 8 Complete!**

Proceed to **Phase 9: QR Generation** to build the Simple Mode Generator with AI integration.

---

## What We Accomplished

- ✅ Supabase project setup
- ✅ Magic Link authentication (no passwords!)
- ✅ Auto-created user profiles with 5 free credits
- ✅ Protected routes with middleware
- ✅ Database tables with Row Level Security
- ✅ Storage bucket for QR images
- ✅ Sign in/sign out flow

**Files created**:
- `app/pages/auth/signin.vue`
- `app/pages/dashboard.vue`
- Updated: `app/pages/index.vue`
- Updated: `nuxt.config.ts`

**Total implementation time**: ~30 minutes (much simpler than mobile auth!)
