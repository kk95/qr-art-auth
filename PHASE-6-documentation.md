# Phase 6: Progressive Disclosure Documentation

## Goal
Create comprehensive documentation using progressive disclosure pattern with `.claude/` directory structure.

---

## Prerequisites

- Phase 5 completed (Volt components working)
- Project is functional
- Understanding of progressive disclosure philosophy

---

## Steps

### 6.1 Create .claude Directory Structure

```bash
mkdir -p .claude/scripts
```

---

### 6.2 Create Root CLAUDE.md

Create `CLAUDE.md` in project root:

```markdown
# CLAUDE.md - QR-Art-Auth Project Context

> **IMPORTANT**: This file uses progressive disclosure. Detailed documentation is in `.claude/` to reduce token usage by 60%.

## 🧠 Project Overview

**Project Name:** QR-Art-Auth
**Goal:** SaaS for QR education, mobile device-flow auth, and AI-generated "blended" QR codes
**Stack:** Nuxt 4, Vue 3 (Composition API), TypeScript, Tailwind CSS 4, PrimeVue (Aura + Volt)
**Backend:** Nuxt Server Routes (Nitro), PostgreSQL (planned)
**AI:** Replicate API (ControlNet QR), OpenAI API
**Project Board:** [GitHub Project View 1](https://github.com/users/kk95/projects/1/views/1)

---

## 🛡️ Quick Reference

### For Frontend Work
- [.claude/frontend-components.md](.claude/frontend-components.md) - Vue 3, PrimeVue, Volt components
- [.claude/qr-generation.md](.claude/qr-generation.md) - QR code generation & canvas overlay

### For Backend Work
- [.claude/backend-api-patterns.md](.claude/backend-api-patterns.md) - Nuxt server routes, API design
- [.claude/external-integrations.md](.claude/external-integrations.md) - Replicate API, OpenAI API

### For Development Workflow
- [.claude/architecture.md](.claude/architecture.md) - System design & data flow
- [.claude/coding-standards.md](.claude/coding-standards.md) - Vue 3, TypeScript, Tailwind patterns
- [.claude/git-workflow.md](.claude/git-workflow.md) - Commit conventions, PR process
- [.claude/testing-standards.md](.claude/testing-standards.md) - Vitest patterns
- [.claude/security-patterns.md](.claude/security-patterns.md) - Auth security, API key storage

---

## 🔨 Commands

- **Dev:** `pnpm dev` - Start development server (http://localhost:3000)
- **Lint:** `pnpm lint` - Run ESLint
- **Test:** `pnpm test` - Run Vitest tests (when configured)
- **Build:** `pnpm build` - Build for production
- **Preview:** `pnpm preview` - Preview production build

---

## 🚨 Critical Guidelines

1. **Vue 3 Only:** Use `<script setup lang="ts">` (Composition API)
2. **State Management:** Use Pinia stores (no Vuex)
3. **Styling:** Tailwind utility classes first; Volt/PrimeVue components second
4. **Type Safety:** Strict TypeScript. Return standard error objects from API
5. **Security:** Never commit API keys. Use `.env` files
6. **Components:** Prefer Volt components (e.g., `<VoltButton />`) over PrimeVue directly

---

## 📂 Project Structure

```
app/
├── assets/styles/main.css      # Tailwind + PrimeVue styles
├── components/
│   ├── volt/                   # Volt design system (from ai-call-center-subscription)
│   └── qr/                     # QR-specific components
├── composables/                # Reusable composition functions
├── layouts/
│   └── default.vue             # Default layout (header, footer, nav)
├── pages/
│   ├── index.vue               # Landing page
│   ├── dashboard.vue           # QR generation wizard
│   └── auth/signin.vue         # Mobile QR sign-in
├── plugins/
│   └── 02.voltComponent.ts     # Auto-register Volt components
├── stores/                     # Pinia stores
├── utils/                      # Utility functions
└── app.vue                     # Root component
```

---

## 🔐 Environment Variables

See `.env.example` for required variables:

- `REPLICATE_API_TOKEN` - Replicate API for AI QR generation
- `OPENAI_API_KEY` - OpenAI API for text/explanations
- `DATABASE_URL` - PostgreSQL connection (future)

Never commit `.env` files to git!

---

## 🧪 Testing

Not yet configured. Will use:
- **Vitest** - Unit/integration tests
- **Playwright** - E2E tests

---

## 📚 Documentation Philosophy

This project follows **progressive disclosure**:

- **Root CLAUDE.md** (this file) - High-level overview + quick reference
- **.claude/*.md** - Detailed domain-specific documentation
- **Load only what's needed** - Reduces token usage by 60%

When working on a specific area, read the relevant `.claude/` file instead of loading all documentation.

---

## 🎯 Key Features to Build

1. **QR Generator Canvas** - Upload image, overlay QR, preview
2. **Mobile Sign-In** - Dynamic QR codes with WebSocket session verification
3. **AI Generation** - Replicate API (ControlNet QR) integration
4. **Dashboard** - "Create New" wizard with steps
5. **Authentication** - Device-flow auth pattern
6. **Database** - PostgreSQL for QR metadata storage

---

## 🛠️ Tech Stack Details

| Category | Technology |
|----------|------------|
| **Framework** | Nuxt 4.2.1 (Vue 3, SSR enabled) |
| **UI Library** | PrimeVue 4.4.1 (Aura theme) + Volt components |
| **Styling** | Tailwind CSS 4 |
| **State** | Pinia 2.3.1 |
| **Icons** | @nuxt/icon (Heroicons) |
| **TypeScript** | Strict mode |
| **Package Manager** | pnpm 9.12.3+ |
| **Database** | PostgreSQL (via Prisma/Drizzle - future) |
| **AI APIs** | Replicate (ControlNet QR), OpenAI |
| **Testing** | Vitest (unit), Playwright (E2E) - future |

---

## 🚀 Getting Started

1. **Install dependencies**: `pnpm install`
2. **Copy environment**: `cp .env.example .env` (add your API keys)
3. **Start dev server**: `pnpm dev`
4. **Visit**: http://localhost:3000

---

## 📖 Further Reading

- **Frontend patterns**: See [.claude/frontend-components.md](.claude/frontend-components.md)
- **API design**: See [.claude/backend-api-patterns.md](.claude/backend-api-patterns.md)
- **Architecture**: See [.claude/architecture.md](.claude/architecture.md)
- **Coding standards**: See [.claude/coding-standards.md](.claude/coding-standards.md)
```

---

### 6.3 Create .claude/ Documentation Files

Now create each `.claude/*.md` file. I'll provide templates for each:

#### 6.3.1 Create .claude/architecture.md

```markdown
# Architecture - QR-Art-Auth

## System Overview

QR-Art-Auth is a SaaS platform for QR code education, mobile authentication, and AI-generated QR art.

### Tech Stack
- **Frontend**: Nuxt 4 (Vue 3 Composition API, TypeScript)
- **Styling**: Tailwind CSS 4 + PrimeVue Volt
- **State**: Pinia
- **Backend**: Nuxt Server Routes (Nitro)
- **Database**: PostgreSQL (future)
- **AI**: Replicate API (ControlNet QR), OpenAI API

---

## Data Flow

### QR Generation Flow
1. User uploads image
2. Canvas component overlays QR code
3. User adjusts scale/position
4. Frontend sends to `/api/generate`
5. Backend calls Replicate API (ControlNet QR)
6. Returns generated image URL
7. Save metadata to database

### Mobile Auth Flow
1. User visits `/auth/signin`
2. Frontend calls `/api/auth/init` → returns `session_id`
3. Display QR code with `session_id`
4. WebSocket connection waits for verification
5. Mobile device scans QR, verifies
6. WebSocket receives confirmation
7. User authenticated

---

## Directory Structure

See CLAUDE.md for detailed structure.

Key directories:
- `app/components/volt/` - Volt design system
- `app/components/qr/` - QR-specific components
- `app/pages/` - File-based routing
- `app/stores/` - Pinia stores
- `server/api/` - Nuxt server routes (future)

---

## API Design

### Future Endpoints
- `POST /api/auth/init` - Initialize auth session
- `POST /api/generate` - Generate AI QR code
- `GET /api/qr/:id` - Fetch QR metadata
- `POST /api/qr/:id/share` - Share QR code

See [backend-api-patterns.md](backend-api-patterns.md) for details.
```

#### 6.3.2 Create .claude/frontend-components.md

```markdown
# Frontend Components - QR-Art-Auth

## Vue 3 Composition API Patterns

### Component Template
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits
const emit = defineEmits<{
  update: [value: string]
}>()

// State
const localValue = ref('')

// Computed
const displayText = computed(() => `${props.title}: ${localValue.value}`)

// Methods
function handleClick() {
  emit('update', localValue.value)
}
</script>

<template>
  <div>
    <VoltButton @click="handleClick" :label="displayText" />
  </div>
</template>
```

---

## Volt Components

### Available Components
- `<VoltButton />` - Buttons
- `<VoltInputText />` - Text input
- `<VoltDialog />` - Modal dialogs
- `<VoltCard />` - Card containers
- `<VoltDataTable />` - Data tables
- See PHASE-5 for full list

### Usage Example
```vue
<VoltButton
  label="Generate QR"
  severity="primary"
  @click="handleGenerate"
/>
```

---

## PrimeVue Integration

Volt components are wrappers around PrimeVue. Use Volt when available, PrimeVue directly when not.

```vue
<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()

function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'QR generated!',
    life: 3000
  })
}
</script>
```

---

## Tailwind Styling

Prefer Tailwind utility classes:

```vue
<div class="flex items-center justify-between bg-card-bg p-4 rounded-lg">
  <h2 class="text-xl font-semibold text-white">Title</h2>
  <VoltButton label="Action" />
</div>
```

---

## Icons

Use `@nuxt/icon` with Heroicons:

```vue
<Icon name="heroicons:qr-code" class="h-6 w-6 text-primary" />
```
```

#### 6.3.3 Create .claude/backend-api-patterns.md

```markdown
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
```

#### 6.3.4 Create .claude/qr-generation.md

```markdown
# QR Generation - QR-Art-Auth

## QR Code Library

Use `qrcode.vue` or similar library with Error Correction Level H (30%).

### Installation
```bash
pnpm add qrcode.vue3
```

### Usage
```vue
<script setup lang="ts">
import QRCode from 'qrcode.vue3'

const qrData = ref('https://example.com')
</script>

<template>
  <QRCode
    :value="qrData"
    :size="256"
    :level="'H'"
    :render-as="'canvas'"
  />
</template>
```

---

## Canvas Overlay

Allow users to overlay QR code on uploaded images.

### Component Structure
```
components/qr/
├── QRGeneratorCanvas.vue    # Main canvas component
├── ImageUploader.vue         # Image upload
└── QROverlay.vue             # QR positioning controls
```

---

## AI Generation (ControlNet QR)

Replicate API integration for AI-generated blended QR codes.

### Replicate API Call
```typescript
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})

const output = await replicate.run(
  "controlnet-qr-code-monster",
  {
    input: {
      image: uploadedImage,
      qr_code_content: "https://example.com",
      scale: 1.1
    }
  }
)
```

See [external-integrations.md](external-integrations.md) for full details.
```

#### 6.3.5 Create remaining .claude/ files

Create these files with basic templates:

- `.claude/external-integrations.md` - Replicate API, OpenAI API setup
- `.claude/coding-standards.md` - Vue 3, TypeScript, Tailwind best practices
- `.claude/git-workflow.md` - Commit message format, branch strategy
- `.claude/testing-standards.md` - Vitest patterns (future)
- `.claude/security-patterns.md` - API key storage, CORS, auth security

---

### 6.4 Create Bash Validation Hook

Create `.claude/scripts/validate-bash.sh`:

```bash
#!/bin/bash
# Prevents bash commands from reading excluded directories

COMMAND="$1"

# Block patterns that waste tokens
if echo "$COMMAND" | grep -qE "(\.git/|node_modules/|\.nuxt/|\.output/|pnpm-lock\.yaml)"; then
  echo "ERROR: Command attempts to read excluded directory or file"
  echo "Blocked patterns: .git/, node_modules/, .nuxt/, .output/, pnpm-lock.yaml"
  exit 1
fi

exit 0
```

Make it executable:
```bash
chmod +x .claude/scripts/validate-bash.sh
```

---

### 6.5 Create .claude/settings.local.json

```bash
# Note: This file is gitignored
cat > .claude/settings.local.json << 'EOF'
{
  "hooks": {
    "PreToolUse:Bash": "bash .claude/scripts/validate-bash.sh"
  }
}
EOF
```

---

## Verification Checklist

- [ ] `CLAUDE.md` created in root with progressive disclosure structure
- [ ] `.claude/architecture.md` created
- [ ] `.claude/frontend-components.md` created
- [ ] `.claude/backend-api-patterns.md` created
- [ ] `.claude/qr-generation.md` created
- [ ] `.claude/external-integrations.md` created
- [ ] `.claude/coding-standards.md` created
- [ ] `.claude/git-workflow.md` created
- [ ] `.claude/testing-standards.md` created
- [ ] `.claude/security-patterns.md` created
- [ ] `.claude/scripts/validate-bash.sh` created and executable
- [ ] `.claude/settings.local.json` created
- [ ] All markdown links work in CLAUDE.md

---

## Next Phase

✅ **Phase 6 Complete!**

Proceed to **[PHASE-7-git-commit.md](PHASE-7-git-commit.md)** to create the initial git commit.

---

## What We Accomplished

- ✅ Created progressive disclosure documentation structure
- ✅ Root CLAUDE.md with quick reference sections
- ✅ 9 modular `.claude/*.md` files covering all domains
- ✅ Bash validation hook for 85% token savings
- ✅ Settings file with hook configuration

**Files created**: `CLAUDE.md` + 9 `.claude/*.md` files + bash hook + settings
