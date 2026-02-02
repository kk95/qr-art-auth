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
