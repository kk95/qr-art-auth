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
