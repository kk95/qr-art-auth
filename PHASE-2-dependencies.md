# Phase 2: Install Dependencies

## Goal
Install all core dependencies: PrimeVue, Pinia, Tailwind CSS 4, icons, and development tools.

---

## Prerequisites

- Phase 1 completed (Nuxt 4 initialized)
- `package.json` exists
- pnpm working

---

## Steps

### 2.1 Install PrimeVue + Themes

```bash
pnpm add @primevue/nuxt-module primevue @primeuix/themes tailwindcss-primeui
```

**What this installs**:
- `@primevue/nuxt-module` - Nuxt integration for PrimeVue
- `primevue` - PrimeVue component library (v4.4.1)
- `@primeuix/themes` - PrimeVue theme system (Aura preset)
- `tailwindcss-primeui` - Tailwind integration for PrimeVue

---

### 2.2 Install Pinia (State Management)

```bash
pnpm add @pinia/nuxt pinia
```

**What this installs**:
- `@pinia/nuxt` - Nuxt module for Pinia
- `pinia` - Vue state management library

---

### 2.3 Install Tailwind CSS 4

```bash
pnpm add tailwindcss @tailwindcss/vite
```

**What this installs**:
- `tailwindcss` - Tailwind CSS 4 framework
- `@tailwindcss/vite` - Vite plugin for Tailwind 4

---

### 2.4 Install Icon Libraries

```bash
pnpm add @nuxt/icon @heroicons/vue
```

**What this installs**:
- `@nuxt/icon` - Nuxt icon module (supports multiple icon sets)
- `@heroicons/vue` - Heroicons for Vue 3

---

### 2.5 Install Development Tools

```bash
pnpm add -D @nuxt/eslint typescript
```

**What this installs**:
- `@nuxt/eslint` - ESLint configuration for Nuxt
- `typescript` - TypeScript compiler

---

## Verification

### 2.6 Check package.json

```bash
cat package.json
```

Verify these dependencies exist in `dependencies`:
- `@primevue/nuxt-module`
- `primevue`
- `@primeuix/themes`
- `tailwindcss-primeui`
- `@pinia/nuxt`
- `pinia`
- `tailwindcss`
- `@tailwindcss/vite`
- `@nuxt/icon`
- `@heroicons/vue`

And in `devDependencies`:
- `@nuxt/eslint`
- `typescript`

---

### 2.7 Verify Installation

```bash
pnpm list primevue pinia tailwindcss
```

Should show versions installed:
```
primevue 4.4.1
pinia 2.3.1
tailwindcss 4.1.17
```

---

## Package Versions Expected

| Package | Version |
|---------|---------|
| `nuxt` | ^4.2.1 |
| `primevue` | ^4.4.1 |
| `@primevue/nuxt-module` | ^4.4.1 |
| `@primeuix/themes` | ^2.0.3 |
| `pinia` | ^2.3.1 |
| `@pinia/nuxt` | ^0.9.0 |
| `tailwindcss` | ^4.1.17 |
| `@tailwindcss/vite` | ^4.1.17 |
| `tailwindcss-primeui` | ^0.6.1 |
| `@nuxt/icon` | ^1.10.3 |
| `@heroicons/vue` | ^2.2.0 |

---

## Optional: Future Dependencies

**Don't install these yet** - we'll add them later when needed:

### For Database (PostgreSQL)
```bash
# Later: pnpm add pg @pgtyped/runtime
```

### For AI Integration
```bash
# Later: pnpm add replicate openai
```

### For Testing
```bash
# Later: pnpm add -D vitest @nuxt/test-utils @playwright/test
```

### For Forms & Validation
```bash
# Later: pnpm add vee-validate @vee-validate/zod zod
```

---

## Verification Checklist

- [ ] PrimeVue packages installed (`@primevue/nuxt-module`, `primevue`, `@primeuix/themes`)
- [ ] Pinia installed (`@pinia/nuxt`, `pinia`)
- [ ] Tailwind CSS 4 installed (`tailwindcss`, `@tailwindcss/vite`, `tailwindcss-primeui`)
- [ ] Icons installed (`@nuxt/icon`, `@heroicons/vue`)
- [ ] Dev tools installed (`@nuxt/eslint`, `typescript`)
- [ ] `pnpm list` shows no errors
- [ ] `package.json` has all dependencies

---

## Troubleshooting

### "WARN deprecated" messages
These are safe to ignore - they're warnings about old packages, not errors.

### "ERR_PNPM_PEER_DEP_ISSUES"
```bash
pnpm install --force
```

### "Lockfile is up to date, resolution step is skipped"
This is normal - pnpm is efficient and reuses existing resolutions.

### Install fails with network error
```bash
# Clear pnpm cache and retry
pnpm store prune
pnpm install
```

---

## Next Phase

✅ **Phase 2 Complete!**

Proceed to **[PHASE-3-configuration.md](PHASE-3-configuration.md)** to configure Nuxt, Tailwind, and PrimeVue.

---

## What We Accomplished

- ✅ Installed PrimeVue 4.4.1 with Aura theme
- ✅ Installed Pinia for state management
- ✅ Installed Tailwind CSS 4 with Vite plugin
- ✅ Installed icon libraries
- ✅ Installed ESLint and TypeScript dev tools

**Dependencies added**: 11 packages total
