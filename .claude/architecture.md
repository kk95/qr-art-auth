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

### Mobile Auth Flow (Magic Link)

**Authentication Strategy**: Magic link sent to email or phone (SMS)

#### Desktop → Mobile QR Flow

1. User visits `/auth/signin` on desktop
2. Frontend calls `/api/auth/init` → returns `session_id`
3. Display QR code with URL: `https://yourapp.com/auth/verify?session={session_id}`
4. Desktop polls `/api/auth/status?session={session_id}` or uses WebSocket

#### Mobile Verification Flow

1. User scans QR code on mobile
2. Mobile opens `/auth/verify?session={session_id}`
3. User chooses authentication method:
   - **Email Magic Link**: Enter email → Receives link → Click to verify
   - **SMS Magic Link**: Enter phone → Receives code → Enter to verify
4. Backend verifies magic link/code
5. Backend marks `session_id` as authenticated
6. Desktop polling detects auth success
7. Desktop redirects to dashboard

#### Magic Link Generation

- **Email**: Use Resend API or similar (free tier available)
- **SMS**: Use Twilio API (pay-per-SMS)
- Links expire after 10 minutes
- One-time use only
- Rate limiting: Max 3 attempts per session

#### Security Considerations

- Session IDs are UUID v4 (cryptographically random)
- Magic links/codes expire after 10 minutes
- Desktop session expires after successful auth or 30 minutes
- HTTPS only for all auth endpoints
- CORS configured to allow only your domain

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
