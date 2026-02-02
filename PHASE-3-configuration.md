# Phase 3: Configuration Files

## Goal
Configure Nuxt, Tailwind CSS, PrimeVue, and TypeScript with production-ready settings.

---

## Prerequisites

- Phase 2 completed (all dependencies installed)
- `nuxt.config.ts` exists from Phase 1

---

## Steps

### 3.1 Update nuxt.config.ts

Replace the contents of `nuxt.config.ts` with:

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  compatibilityVersion: 4,

  ssr: true,

  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        allowArbitraryExtensions: true
      }
    }
  },

  devtools: { enabled: true }
})
```

---

### 3.2 Create Tailwind CSS File

Create `app/assets/styles/main.css`:

```bash
mkdir -p app/assets/styles
```

Then create the file with this content:

```css
@import "tailwindcss";
@import "tailwindcss-primeui";

@custom-variant dark (&:not(*));

@theme {
  /* QR-Art-Auth Brand Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-background-dark: #0f172a;
  --color-header-bg: #1e293b;
  --color-card-bg: #334155;
  --color-input-bg: #1e293b;
  --color-border: #475569;

  /* Semantic colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

/* Body background */
body {
  background-color: var(--color-background-dark);
  color: #f1f5f9;
  font-family: system-ui, -apple-system, sans-serif;
}
```

---

### 3.3 Update app.vue (Root Component)

Replace `app.vue` with:

```vue
<script setup lang="ts">
import '~/assets/styles/main.css'
</script>

<template>
  <NuxtLayout>
    <DynamicDialog />
    <ConfirmDialog />
    <Toast />
    <NuxtPage />
  </NuxtLayout>
</template>
```

**What this does**:
- Imports Tailwind CSS styles
- Adds PrimeVue dialog components (DynamicDialog, ConfirmDialog)
- Adds Toast for notifications
- Wraps content in NuxtLayout and NuxtPage

---

### 3.4 Create .gitignore

Create `.gitignore` file:

```bash
# Nuxt
.nuxt
.output
.env
.env.*
!.env.example

# Dependencies
node_modules
pnpm-lock.yaml

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode
.idea
*.swp
*.swo

# Claude local files
.claude/settings.local.json
CLAUDE.local.md
todos/latest-todos.json
todos/latest-todos.md

# MCP
.mcp.json

# Build artifacts
dist
```

---

### 3.5 Create .env.example

Create `.env.example` file:

```bash
# Replicate API (for AI-generated QR codes)
REPLICATE_API_TOKEN=your_replicate_token_here

# OpenAI API (for explanations and text generation)
OPENAI_API_KEY=your_openai_key_here

# Database (PostgreSQL - future)
DATABASE_URL=postgresql://user:password@localhost:5432/qr_art_auth

# App Configuration
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 3.6 Test Configuration

Start the dev server:

```bash
pnpm dev
```

**Expected**:
- No TypeScript errors
- No module import errors
- Server starts successfully
- Default Nuxt page loads (we'll replace this in Phase 4)

**Press Ctrl+C to stop.**

---

## Verification Checklist

- [ ] `nuxt.config.ts` updated with modules and configuration
- [ ] `app/assets/styles/main.css` created with Tailwind imports
- [ ] `app.vue` imports main.css and includes PrimeVue components
- [ ] `.gitignore` created
- [ ] `.env.example` created
- [ ] `pnpm dev` runs without errors
- [ ] No TypeScript compilation errors

---

## File Structure After Phase 3

```
qr-art-auth/
├── app/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          ✅ NEW
│   └── app.vue                    ✅ MODIFIED
├── nuxt.config.ts                 ✅ MODIFIED
├── .gitignore                     ✅ NEW
├── .env.example                   ✅ NEW
├── package.json
├── tsconfig.json
└── node_modules/
```

---

## Configuration Details

### Nuxt Config Breakdown

| Setting | Purpose |
|---------|---------|
| `compatibilityVersion: 4` | Use Nuxt 4 features |
| `ssr: true` | Server-side rendering enabled |
| `modules` | PrimeVue, Pinia, Icons, ESLint |
| `primevue.theme.preset: Aura` | Use Aura design theme |
| `vite.plugins: [tailwindcss()]` | Tailwind CSS 4 integration |
| `typescript.strict: true` | Strict TypeScript checking |
| `allowArbitraryExtensions` | Import .vue, .css files safely |

### Tailwind Config

- Uses Tailwind CSS 4 syntax (`@import`, `@theme`)
- Imports `tailwindcss-primeui` for PrimeVue integration
- Defines custom brand colors as CSS variables
- Dark mode configured with `@custom-variant dark`

---

## Troubleshooting

### "Cannot find module '@tailwindcss/vite'"
```bash
pnpm add @tailwindcss/vite
```

### "Cannot import 'tailwindcss'"
Make sure you're using Tailwind CSS 4, not 3:
```bash
pnpm list tailwindcss
# Should show 4.1.17 or higher
```

### TypeScript errors about PrimeVue
These will resolve after Phase 5 (Volt components). Ignore for now.

### "DynamicDialog not found"
This is expected - PrimeVue will resolve these at runtime. No action needed.

---

## Next Phase

✅ **Phase 3 Complete!**

Proceed to **[PHASE-4-structure.md](PHASE-4-structure.md)** to create layouts, pages, and initial components.

---

## What We Accomplished

- ✅ Configured Nuxt 4 with PrimeVue, Pinia, Tailwind, Icons
- ✅ Set up Tailwind CSS 4 with custom theme
- ✅ Updated app.vue with PrimeVue dialogs
- ✅ Created .gitignore and .env.example
- ✅ Verified TypeScript strict mode working

**Files created/modified**: `nuxt.config.ts`, `app.vue`, `main.css`, `.gitignore`, `.env.example`
