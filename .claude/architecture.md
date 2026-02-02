# Architecture - QR-Art-Auth

## System Overview

QR-Art-Auth is an educational SaaS platform for creating artistic QR codes with AI, teaching users how QR codes work through interactive visualizations.

### Tech Stack
- **Frontend**: Nuxt 4 (Vue 3 Composition API, TypeScript)
- **Styling**: Tailwind CSS 4 + PrimeVue Volt
- **State**: Pinia
- **Backend**: Nuxt Server Routes (Nitro) + Supabase
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage (for QR images)
- **Authentication**: Supabase Auth (Magic Link)
- **AI**: Replicate API (ControlNet QR), OpenAI API (optional)

---

## Data Flow

### Authentication Flow (Supabase Magic Link)

1. User visits landing page, clicks "Sign In"
2. User enters email address
3. Frontend calls `supabase.auth.signInWithOtp({ email })`
4. Supabase sends magic link to user's email
5. User clicks link in email → Redirected to `/dashboard`
6. Supabase session established, user authenticated
7. Profile created automatically (if first login) with 5 free credits

**No passwords, no SMS, no complex flows** - just email magic links via Supabase.

---

### Simple Mode QR Generation Flow

1. **User Input**:
   - User uploads image file
   - User enters QR data (URL or text)
   - User selects preset: **Subtle** (0.8), **Balanced** (1.1), or **Artistic** (1.4)

2. **Credit Check**:
   - Frontend checks user's credits via Pinia store
   - If credits < 1, show "Buy More Credits" message

3. **API Call**:
   - Frontend sends FormData to `/api/generate`:
     ```typescript
     {
       image: File,
       qr_data: string,
       preset: 'subtle' | 'balanced' | 'artistic',
       control_scale: number
     }
     ```

4. **Backend Processing**:
   - Verify user authentication (Supabase middleware)
   - Check user has credits remaining
   - Upload image to Supabase Storage
   - Call Replicate API (ControlNet QR) with `control_scale`
   - Download generated image from Replicate
   - Upload generated image to Supabase Storage
   - Save metadata to `qr_codes` table
   - Deduct 1 credit from user's profile

5. **Response**:
   - Return generated image URL + metadata
   - Frontend updates credits display
   - Show Educational Overlay toggle

---

### Educational Overlay Flow

1. Generated QR code displays on canvas
2. User toggles "How does this work?" button
3. Canvas overlay activates:
   - **Red borders**: Highlight 3 finder patterns (corners)
   - **Blue overlay**: Highlight data modules
   - **Green overlay**: Highlight error correction blocks
4. Explanation panel shows:
   - What each colored region does
   - Why QR codes are resilient
   - How scanners read the code

---

### Gallery & Storage Flow

1. User navigates to `/gallery`
2. Frontend calls `/api/gallery/list` (authenticated)
3. Backend fetches user's QR codes from database (WHERE user_id = auth.uid() AND is_flagged = FALSE)
4. Display grid of saved QR codes with metadata
5. User can:
   - View full-size image
   - Download image
   - Delete QR code (soft delete or hard delete)
   - Share QR code (public URL)

---

### Safety & Moderation

**Problem**: Users could generate QR codes linking to malicious sites.

**Solution**: `is_flagged` column
- Admin dashboard (future) to review flagged QR codes
- Flagged QR codes hidden from gallery
- RLS policies prevent access to flagged content
- Protects platform from liability

---

## Security Considerations

- **Authentication**: Supabase handles all auth (magic links, session management, CSRF protection)
- **Row Level Security (RLS)**: Users can only read/update their own data
- **Storage Security**: Supabase Storage policies enforce user-scoped uploads
- **API Keys**: Replicate API key stored server-side only, never exposed to client
- **Credits System**: Prevents abuse via rate limiting (5 free credits per user)
- **Content Safety**: `is_flagged` column allows moderation of malicious QR codes

---

## Directory Structure

See [CLAUDE.md](../CLAUDE.md) for detailed structure.

Key directories:
- `app/components/volt/` - Volt design system
- `app/components/qr/` - QR-specific components (SimpleQRGenerator, EducationalOverlay)
- `app/pages/` - File-based routing
  - `index.vue` - Landing page
  - `dashboard.vue` - QR generator
  - `gallery.vue` - User's saved QR codes
- `app/stores/` - Pinia stores (credits)
- `server/api/` - Nuxt server routes
  - `generate.post.ts` - AI QR generation
  - `gallery/list.get.ts` - Fetch user's QR codes
  - `qr/[id].get.ts` - Get QR metadata
  - `qr/[id].delete.ts` - Delete QR code

---

## API Endpoints

### Core Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/generate` | POST | Generate AI QR code | Yes |
| `/api/gallery/list` | GET | List user's QR codes | Yes |
| `/api/qr/:id` | GET | Get QR metadata | Yes |
| `/api/qr/:id` | DELETE | Delete QR code | Yes |

See [backend-api-patterns.md](backend-api-patterns.md) for implementation details.
