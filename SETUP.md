# QR-Art-Auth - Project Setup Guide

## Overview
This guide will walk you through initializing the QR-Art-Auth project with Nuxt 4, progressive disclosure documentation, and the Volt design system.

**Tech Stack**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4, PrimeVue (Aura + Volt), Pinia
**GitHub Account**: kk95 (Personal)
**Project Path**: `/Users/kshitijkarke/Documents/github/qr-art-auth`

---

## Setup Phases

This setup is broken into 7 phases. Each phase has a dedicated file with detailed instructions:

1. **[PHASE-1-initialization.md](PHASE-1-initialization.md)** - Create project directory, initialize Nuxt, initialize Git
2. **[PHASE-2-dependencies.md](PHASE-2-dependencies.md)** - Install core dependencies (PrimeVue, Pinia, Tailwind)
3. **[PHASE-3-configuration.md](PHASE-3-configuration.md)** - Configure Nuxt, Tailwind, TypeScript
4. **[PHASE-4-structure.md](PHASE-4-structure.md)** - Create project structure (layouts, pages, components)
5. **[PHASE-5-volt-components.md](PHASE-5-volt-components.md)** - Copy Volt design system components
6. **[PHASE-6-documentation.md](PHASE-6-documentation.md)** - Create progressive disclosure docs (.claude/)
7. **[PHASE-7-git-commit.md](PHASE-7-git-commit.md)** - Stage files and create initial commit

---

## Quick Start (All Phases)

If you want to run all phases at once:

```bash
# Phase 1: Initialize
cd /Users/kshitijkarke/Documents/github/qr-art-auth
pnpm dlx nuxi@latest init . --packageManager pnpm
git init

# Phase 2: Install dependencies
pnpm add @primevue/nuxt-module primevue @primeuix/themes
pnpm add @pinia/nuxt pinia
pnpm add tailwindcss @tailwindcss/vite tailwindcss-primeui
pnpm add @nuxt/icon @heroicons/vue
pnpm add -D @nuxt/eslint typescript

# Phase 3-6: Follow individual phase files for file creation
# Phase 7: Git commit
git add .
git commit -m "Initial project setup"
```

---

## Recommended Approach

**Work phase-by-phase in a fresh Claude session:**

1. Open this directory in Claude Code
2. Say "Let's execute PHASE-1-initialization.md"
3. Claude will read and execute that phase
4. Move to the next phase when complete

This approach:
- ✅ Keeps context focused on one phase at a time
- ✅ Allows verification after each phase
- ✅ Makes troubleshooting easier
- ✅ Follows progressive disclosure philosophy

---

## After Setup Complete

Verify everything works:

```bash
pnpm dev  # Should start on http://localhost:3000
```

You should see:
- Dark background (Tailwind working)
- "Welcome to QR Art Auth" landing page
- No TypeScript errors
- Hot reload working

---

## Project Goal

**QR-Art-Auth** is a SaaS platform for:
- QR code education
- Mobile device-flow authentication
- AI-generated "blended" QR codes using ControlNet

**Key Features**:
- QR generator with error correction level H (30%)
- Mobile sign-in via dynamic QR codes
- Dashboard wizard: Image upload → Canvas overlay → AI generation
- Integration with Replicate API (ControlNet QR)
- Future: OpenAI integration for explanations

---

## Documentation Strategy

This project uses **progressive disclosure**:

- **Root CLAUDE.md** - Table of contents with quick reference
- **.claude/ directory** - Modular documentation files
  - `architecture.md` - System design
  - `frontend-components.md` - Vue/PrimeVue patterns
  - `backend-api-patterns.md` - Nuxt server routes
  - `qr-generation.md` - QR-specific logic
  - `external-integrations.md` - Replicate/OpenAI APIs
  - `coding-standards.md` - Vue 3, TypeScript, Tailwind
  - `git-workflow.md` - Commit conventions
  - `testing-standards.md` - Vitest patterns
  - `security-patterns.md` - Auth security

This reduces token usage by 60% compared to monolithic docs.

---

## Next Steps After Setup

1. Set up GitHub repository:
   ```bash
   gh repo create qr-art-auth --private --source=. --remote=origin
   git push -u origin main
   ```

2. Create GitHub Project board (if not exists):
   - https://github.com/users/kk95/projects/1/views/1

3. Start building features:
   - QR generation canvas component
   - Mobile sign-in flow
   - Replicate API integration

---

## Support

- **Phase-specific questions**: Open the relevant PHASE-*.md file
- **Architecture questions**: See `.claude/architecture.md` (after Phase 6)
- **Coding standards**: See `.claude/coding-standards.md` (after Phase 6)

---

**Ready to begin?** Start with [PHASE-1-initialization.md](PHASE-1-initialization.md)
