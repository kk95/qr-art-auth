# Phase 1: Project Initialization

## Goal
Initialize the basic project structure, Nuxt 4 framework, and Git repository.

---

## Prerequisites

- pnpm installed (check with `pnpm --version`)
- Git installed and configured
- Node.js 18+ installed

---

## Steps

### 1.1 Navigate to GitHub Directory

```bash
cd /Users/kshitijkarke/Documents/github/qr-art-auth
```

You should already be in this directory since you're reading this file!

---

### 1.2 Initialize Nuxt 4 Project

```bash
pnpm dlx nuxi@latest init . --packageManager pnpm
```

**What this does**:
- Scaffolds Nuxt 4 project structure
- Creates `nuxt.config.ts`, `app.vue`, `tsconfig.json`
- Installs core dependencies
- Sets up TypeScript configuration

**Expected output**:
```
✔ Which package manager would you like to use? pnpm
✔ Initialize git repository? Yes
```

Say **Yes** to git initialization.

---

### 1.3 Verify Nuxt Installation

Check that these files were created:

```bash
ls -la
```

You should see:
- ✅ `nuxt.config.ts` - Nuxt configuration
- ✅ `app.vue` - Root component
- ✅ `tsconfig.json` - TypeScript config
- ✅ `package.json` - Dependencies
- ✅ `.nuxt/` - Build directory
- ✅ `node_modules/` - Installed packages

---

### 1.4 Configure Git for Personal Account (kk95)

```bash
git config user.name "kk95"
git config user.email "YOUR_PERSONAL_EMAIL"  # Replace with your actual email
```

**Important**: Use your **personal email** (not @spillcenter.com) since this is a personal project.

---

### 1.5 Verify Git Configuration

```bash
git config --get user.name
git config --get user.email
```

Should show:
```
kk95
your-personal-email@example.com
```

---

### 1.6 Test Dev Server

```bash
pnpm dev
```

**Expected**:
- Server starts on http://localhost:3000
- Browser shows default Nuxt welcome page
- No errors in terminal

**Press Ctrl+C to stop the server.**

---

## Verification Checklist

- [ ] Nuxt 4 project created successfully
- [ ] `nuxt.config.ts` exists
- [ ] `app.vue` exists
- [ ] Git initialized (`.git/` directory exists)
- [ ] Git configured with kk95 / personal email
- [ ] Dev server runs without errors
- [ ] Default Nuxt page loads at localhost:3000

---

## Troubleshooting

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### "Node version too old"
```bash
node --version  # Should be 18+ or 20+
```

Use nvm to upgrade if needed:
```bash
nvm install 20
nvm use 20
```

### "Port 3000 already in use"
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev --port 3001
```

---

## Next Phase

✅ **Phase 1 Complete!**

Proceed to **[PHASE-2-dependencies.md](PHASE-2-dependencies.md)** to install PrimeVue, Tailwind, and Pinia.

---

## What We Accomplished

- ✅ Created qr-art-auth project directory
- ✅ Initialized Nuxt 4.2.1 with TypeScript
- ✅ Configured Git with personal account (kk95)
- ✅ Verified dev server works

**Files created**: `nuxt.config.ts`, `app.vue`, `tsconfig.json`, `package.json`, `.gitignore`
