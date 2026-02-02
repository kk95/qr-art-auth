# QR Art - Educational QR Code Generator

> Create beautiful, artistic QR codes with AI while learning how they work

An educational SaaS platform that teaches users about QR code anatomy through interactive visualizations while generating stunning AI-powered artistic QR codes.

## ✨ Features

- **Simple Mode Generator**: Upload an image, choose a preset (Subtle/Balanced/Artistic), generate stunning QR codes
- **Educational Overlay**: Interactive canvas that highlights QR code parts (finder patterns, data modules, error correction)
- **AI-Powered**: Uses Replicate's ControlNet QR model for high-quality artistic effects
- **Credits System**: 5 free credits per user, transparent usage tracking
- **Gallery**: Save and manage all your generated QR codes
- **Supabase Auth**: Secure magic link authentication (no passwords!)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account ([supabase.com](https://supabase.com))
- Replicate API key ([replicate.com](https://replicate.com))

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Add your credentials to .env
# - SUPABASE_URL
# - SUPABASE_KEY
# - REPLICATE_API_TOKEN

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Nuxt 4 (Vue 3 Composition API, SSR) |
| **UI Library** | PrimeVue 4 + Volt Design System |
| **Styling** | Tailwind CSS 4 |
| **State** | Pinia |
| **Backend** | Supabase (Auth, PostgreSQL, Storage) |
| **AI** | Replicate (ControlNet QR) |
| **Icons** | @nuxt/icon (Heroicons) |

## 📖 Documentation

Detailed documentation is in `.claude/` for progressive disclosure:

- **[CLAUDE.md](CLAUDE.md)** - Project overview & quick reference
- **[.claude/architecture.md](.claude/architecture.md)** - System design & data flow
- **[.claude/frontend-components.md](.claude/frontend-components.md)** - Component specs
- **[.claude/backend-api-patterns.md](.claude/backend-api-patterns.md)** - API patterns

### Phase Guides

Implementation is broken into phases:

- **[PHASE-2-dependencies.md](PHASE-2-dependencies.md)** - Install dependencies
- **[PHASE-8-authentication.md](PHASE-8-authentication.md)** - Supabase auth setup
- More phases coming soon...

## 🎯 How It Works

### 1. Simple Mode Generator

Users don't write complex prompts. Instead:
1. Upload an image
2. Enter QR data (URL or text)
3. Select a preset:
   - **Subtle** (control_scale: 0.8) - High scannability, minimal art
   - **Balanced** (control_scale: 1.1) - Good balance (default)
   - **Artistic** (control_scale: 1.4) - High artistic effect

### 2. Educational Overlay

After generation, users can toggle "How does this work?" to see:
- **Red borders**: Finder patterns (3 corner squares)
- **Blue overlay**: Data modules (encoded data)
- **Green overlay**: Error correction blocks

Each region includes an explanation of its purpose.

### 3. Credits & Gallery

- Users start with 5 free credits
- Each generation costs 1 credit
- All generated QR codes saved to gallery
- Safety flag (`is_flagged`) for content moderation

## 🔐 Environment Variables

```bash
# Supabase (Required)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Replicate API (Required)
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenAI API (Optional - for future features)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🗄️ Database Schema

See [.claude/backend-api-patterns.md](.claude/backend-api-patterns.md) for full schema.

Key tables:
- **profiles** - User profiles with credits
- **qr_codes** - Generated QR metadata
- **Storage bucket** - `qr-art` for images

## 🧪 Testing

```bash
# Unit tests (future)
pnpm test

# E2E tests (future)
pnpm test:e2e

# Lint
pnpm lint
```

## 📦 Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🤝 Contributing

See development phases in GitHub Issues:
- [Phase 8: Supabase Authentication](https://github.com/kk95/qr-art-auth/issues/11)
- [Phase 9: Simple Mode Generator](https://github.com/kk95/qr-art-auth/issues/13)
- [Phase 10: Educational Overlay](https://github.com/kk95/qr-art-auth/issues/14)
- [Phase 11: Gallery & Credits](https://github.com/kk95/qr-art-auth/issues/15)

## 📄 License

MIT

## 🙏 Acknowledgments

- **PrimeVue Volt** - Brutalist design system
- **Replicate** - AI model hosting
- **Supabase** - Backend infrastructure
- **Nuxt** - Full-stack framework
