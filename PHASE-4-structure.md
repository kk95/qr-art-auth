# Phase 4: Project Structure

## Goal
Create initial project structure including layouts, pages, components, stores, and plugins directories.

---

## Prerequisites

- Phase 3 completed (configuration files created)
- `pnpm dev` runs without errors

---

## Steps

### 4.1 Create Directory Structure

```bash
mkdir -p app/layouts
mkdir -p app/pages
mkdir -p app/components/volt
mkdir -p app/components/qr
mkdir -p app/stores
mkdir -p app/plugins
mkdir -p app/composables
mkdir -p app/utils
```

---

### 4.2 Create Default Layout

Create `app/layouts/default.vue`:

```vue
<script setup lang="ts">
// Default layout for QR Art Auth
</script>

<template>
  <div class="min-h-screen bg-background-dark">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-border bg-header-bg">
      <div class="container mx-auto flex items-center justify-between px-4 py-4">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:qr-code" class="h-8 w-8 text-primary" />
          <h1 class="text-xl font-bold text-white">QR Art Auth</h1>
        </div>

        <nav class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-gray-300 hover:text-white">
            Home
          </NuxtLink>
          <NuxtLink to="/dashboard" class="text-gray-300 hover:text-white">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/auth/signin" class="text-gray-300 hover:text-white">
            Sign In
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main role="main" class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-header-bg py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2026 QR Art Auth. AI-powered QR code generation.</p>
      </div>
    </footer>
  </div>
</template>
```

---

### 4.3 Create Landing Page

Create `app/pages/index.vue`:

```vue
<script setup lang="ts">
// Landing page for QR Art Auth
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl">
      <Icon name="heroicons:qr-code" class="mx-auto h-20 w-20 text-primary mb-6" />

      <h1 class="text-5xl font-bold text-white mb-6">
        Welcome to QR Art Auth
      </h1>

      <p class="text-xl text-gray-300 mb-8">
        SaaS for QR education, mobile device-flow auth, and AI-generated "blended" QR codes
      </p>

      <div class="flex justify-center space-x-4">
        <NuxtLink
          to="/dashboard"
          class="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Get Started
        </NuxtLink>

        <NuxtLink
          to="/auth/signin"
          class="bg-card-bg hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
      <div class="bg-card-bg p-6 rounded-lg">
        <Icon name="heroicons:academic-cap" class="h-12 w-12 text-primary mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">QR Education</h3>
        <p class="text-gray-400">
          Learn about QR codes with error correction level H (30%)
        </p>
      </div>

      <div class="bg-card-bg p-6 rounded-lg">
        <Icon name="heroicons:device-phone-mobile" class="h-12 w-12 text-primary mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">Mobile Auth</h3>
        <p class="text-gray-400">
          Secure device-flow authentication using dynamic QR codes
        </p>
      </div>

      <div class="bg-card-bg p-6 rounded-lg">
        <Icon name="heroicons:sparkles" class="h-12 w-12 text-primary mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">AI-Generated Art</h3>
        <p class="text-gray-400">
          Create beautiful blended QR codes with ControlNet AI
        </p>
      </div>
    </div>
  </div>
</template>
```

---

### 4.4 Create Dashboard Page (Placeholder)

Create `app/pages/dashboard.vue`:

```vue
<script setup lang="ts">
// Dashboard - QR generation wizard
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">Dashboard</h1>

    <div class="bg-card-bg p-8 rounded-lg">
      <h2 class="text-xl font-semibold text-white mb-4">Create New QR Code</h2>
      <p class="text-gray-400">
        Coming soon: Image upload → Canvas overlay → AI Generation
      </p>
    </div>
  </div>
</template>
```

---

### 4.5 Create Auth Pages Directory

```bash
mkdir -p app/pages/auth
```

Create `app/pages/auth/signin.vue`:

```vue
<script setup lang="ts">
// Mobile sign-in with dynamic QR code
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-card-bg p-8 rounded-lg max-w-md w-full">
      <h1 class="text-2xl font-bold text-white mb-6 text-center">
        Sign In with QR Code
      </h1>

      <!-- QR Code placeholder -->
      <div class="bg-background-dark p-8 rounded-lg mb-6 flex items-center justify-center">
        <div class="w-64 h-64 bg-white rounded flex items-center justify-center">
          <Icon name="heroicons:qr-code" class="h-32 w-32 text-gray-400" />
        </div>
      </div>

      <p class="text-gray-400 text-center text-sm">
        Scan this QR code with your mobile device to sign in
      </p>
    </div>
  </div>
</template>
```

---

### 4.6 Test Pages

Start dev server:

```bash
pnpm dev
```

Visit these URLs:
- http://localhost:3000 - Landing page ✅
- http://localhost:3000/dashboard - Dashboard ✅
- http://localhost:3000/auth/signin - Sign in page ✅

**Verify**:
- Header shows "QR Art Auth" with QR icon
- Navigation links work
- Landing page shows hero and features
- Dark theme applied (dark background)
- Icons render (heroicons)
- Footer visible

---

## Verification Checklist

- [ ] Directory structure created (layouts, pages, components, stores, plugins)
- [ ] `app/layouts/default.vue` created with header, footer, navigation
- [ ] `app/pages/index.vue` created with hero and features
- [ ] `app/pages/dashboard.vue` created (placeholder)
- [ ] `app/pages/auth/signin.vue` created (placeholder)
- [ ] All pages load without errors
- [ ] Navigation works between pages
- [ ] Icons render (heroicons QR code icon visible)
- [ ] Dark theme applied correctly

---

## File Structure After Phase 4

```
qr-art-auth/
├── app/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── layouts/
│   │   └── default.vue           ✅ NEW
│   ├── pages/
│   │   ├── index.vue              ✅ NEW
│   │   ├── dashboard.vue          ✅ NEW
│   │   └── auth/
│   │       └── signin.vue         ✅ NEW
│   ├── components/
│   │   ├── volt/                  (empty for now)
│   │   └── qr/                    (empty for now)
│   ├── stores/                    (empty for now)
│   ├── plugins/                   (empty for now)
│   ├── composables/               (empty for now)
│   ├── utils/                     (empty for now)
│   └── app.vue
├── nuxt.config.ts
├── package.json
└── ...
```

---

## Troubleshooting

### Icons not showing
Make sure `@nuxt/icon` is in `nuxt.config.ts` modules:
```typescript
modules: [
  '@nuxt/icon',
  // ...
]
```

### Navigation doesn't work
Nuxt file-based routing requires files in `app/pages/` or `pages/` (not both).
We're using `app/pages/` for Nuxt 4.

### "Layout not found"
Make sure `app/layouts/default.vue` exists. Nuxt auto-detects layouts from this directory.

### Tailwind classes not working
Verify `main.css` is imported in `app.vue`:
```vue
<script setup lang="ts">
import '~/assets/styles/main.css'
</script>
```

---

## Next Phase

✅ **Phase 4 Complete!**

Proceed to **[PHASE-5-volt-components.md](PHASE-5-volt-components.md)** to copy Volt design system components.

---

## What We Accomplished

- ✅ Created project directory structure
- ✅ Built default layout with header, nav, footer
- ✅ Created landing page with hero and features
- ✅ Created dashboard and auth pages (placeholders)
- ✅ Tested file-based routing
- ✅ Verified icons and dark theme working

**Files created**: `default.vue`, `index.vue`, `dashboard.vue`, `signin.vue`
