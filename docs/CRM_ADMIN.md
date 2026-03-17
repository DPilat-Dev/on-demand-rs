# CRM / Admin Dashboard — Technical Documentation

> **Status tracker** — update this table as phases are completed.

| Phase | Description | Status |
|---|---|---|
| 0 | Foundation: deps, Prisma, env setup | ✅ In Progress |
| 1 | DB schema, content access layer, contact form DB writes | ✅ In Progress |
| 2 | Auth + admin shell + login page | ✅ In Progress |
| 3 | Content editors (pages + services) | 🔲 Pending |
| 4 | Feature flags | 🔲 Pending |
| 5 | Email settings + Resend integration | 🔲 Pending |
| 6 | Google Reviews config + caching | 🔲 Pending |
| 7 | Inbox (contact form submissions) | 🔲 Pending |

---

## Architecture Decisions

### Backend
Stay inside Next.js as a monorepo. Route Handlers (`app/api/**`) and Server Actions (`'use server'`) cover all backend needs. No separate Express/FastAPI service — avoids CORS complexity, two deployment units, and duplicated auth.

### Deployment (Vercel)
Single Next.js project deployed to Vercel. All API routes deploy as **Serverless Functions** (Node.js runtime). **Do not use Edge Runtime** — Prisma's native query engine binary is incompatible with it.

Build command override in Vercel dashboard:
```
npx prisma migrate deploy && next build
```

### Database: PostgreSQL on Neon
- Install the **Neon integration from the Vercel Marketplace** (one-click, auto-injects `DATABASE_URL` and `DATABASE_URL_UNPOOLED`).
- Prisma 7 uses `prisma.config.ts` for connection config (not `schema.prisma`). The config picks up `DATABASE_URL_UNPOOLED` for migrations (DDL requires a direct non-pooled connection) and `DATABASE_URL` (pooled) for the runtime client.
- Uses `@prisma/adapter-pg` + `pg` for both local Docker and Neon production.

### Auth: Auth.js v5 (NextAuth)
- Credentials provider: email + bcrypt-hashed password against `AdminUser` table.
- Sessions stored as signed JWTs in `httpOnly` cookies.
- Route protection via `middleware.ts` — scoped exclusively to `/admin/**`. No public routes are affected.
- Admin lives at `/admin/login`. Auth.js redirects there automatically for unauthenticated requests.

### Content Migration Strategy: DB-first with TypeScript fallback
The `./data/` files remain **untouched** as static defaults. A `lib/content.ts` data access layer:
1. Tries to fetch content from the database first.
2. If no DB record exists (or the DB is unreachable), falls back to the static TypeScript file data.

This means zero migration risk — pages work identically before and after the DB is seeded.

---

## Environment Variables

| Variable | Description | Source |
|---|---|---|
| `DATABASE_URL` | Neon pooled connection string | Neon Vercel integration (auto-injected) |
| `DATABASE_URL_UNPOOLED` | Neon direct connection (for migrations only) | Neon Vercel integration (auto-injected) |
| `AUTH_SECRET` | 32-byte secret for Auth.js JWT signing | `openssl rand -base64 32` |
| `AUTH_URL` | Canonical app URL | `http://localhost:3000` (dev), auto on Vercel |
| `RESEND_API_KEY` | Resend email API key | Phase 5 |
| `GOOGLE_PLACES_API_KEY` | Google Places API key | Phase 6 |

Copy `.env.local.example` to `.env.local` and fill in values.

---

## Local Development with Docker

`docker-compose.yml` spins up two containers:

| Container | Image | Port | Purpose |
|---|---|---|---|
| `ondemand_postgres` | `postgres:16-alpine` | `5432` | PostgreSQL database |
| `ondemand_pgadmin` | `dpage/pgadmin4` | `5050` | pgAdmin web UI |

**Credentials:**

| | Value |
|---|---|
| DB user | `ondemand` |
| DB password | `ondemand_dev` |
| DB name | `ondemand_rs` |
| pgAdmin login | `admin@ondemandrs.com` / `admin` |

**Quick start:**

```bash
# 1. Start containers
docker compose up -d

# 2. Copy env (Docker connection strings are pre-filled)
cp .env.local.example .env.local
# Fill in AUTH_SECRET: openssl rand -base64 32

# 3. Run migrations
npm run db:migrate

# 4. Seed from ./data/ files
npm run db:seed

# 5. Start Next.js
npm run dev
```

pgAdmin is pre-configured with the local server — open `http://localhost:5050` and the connection to `OnDemand RS (local)` is ready. You will be prompted for the DB password (`ondemand_dev`) on first connect.

**Stop / reset:**

```bash
docker compose down          # Stop containers, keep data
docker compose down -v       # Stop and delete all data volumes
```

---

## Entity Schema

All models live in `prisma/schema.prisma`. Content is stored as **JSONB blobs** (`Json` type in Prisma) rather than normalized tables — the TypeScript types in `./types/` enforce shape at the application layer, and this avoids schema migrations on every content field addition.

---

### `AdminUser`
Single admin user for CMS access. Seeded via `prisma/seed.ts`.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `email` | `String` | Unique — used as login username |
| `hashedPassword` | `String` | bcrypt hash |
| `name` | `String` | Display name in admin UI |
| `createdAt` | `DateTime` | Auto-set |

---

### `PageContent`
Stores editable content for static pages: `homepage`, `about`, `contact`, `footer`.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `pageKey` | `String` | Unique — e.g. `"homepage"`, `"about"`, `"contact"`, `"footer"` |
| `contentJson` | `Json` | Full page data blob matching the TypeScript data shape in `./data/` |
| `updatedAt` | `DateTime` | Auto-updated |
| `updatedBy` | `String?` | Admin user ID who last saved |

**Fallback mapping** (when no DB row exists):
- `"homepage"` → `data/homepage.ts` → `homePageData`
- `"about"` → `data/about.ts` → `aboutUsData`
- `"contact"` → `data/contact.ts` → `contactPageData`
- `"footer"` → `data/footer.ts` → `footerData`

---

### `ServicePage`
One row per service page. Supports adding new services and enabling/disabling existing ones.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `slug` | `String` | Unique — URL slug, e.g. `"commercial-refrigeration"` |
| `name` | `String` | Display name — denormalized from `contentJson` for list queries |
| `isEnabled` | `Boolean` | Default `true`. Disabled pages return 404 on the public site |
| `sortOrder` | `Int` | Controls display order on `/services` listing page |
| `contentJson` | `Json` | Full `ServiceData` blob matching `types/service.ts` |
| `createdAt` | `DateTime` | Auto-set |
| `updatedAt` | `DateTime` | Auto-updated |
| `updatedBy` | `String?` | Admin user ID |

**Seeded slugs:** `commercial-refrigeration`, `commercial-hvac`, `food-service-equipment`, `ice-machines`, `preventive-maintenance`

---

### `FeatureFlag`
Global on/off switches for page sections and integrations.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `key` | `String` | Unique — dot-separated namespace, e.g. `"homepage.testimonials"` |
| `label` | `String` | Human-readable name shown in admin UI |
| `description` | `String?` | Explanation of what this flag controls |
| `isEnabled` | `Boolean` | Default `true` |
| `updatedAt` | `DateTime` | Auto-updated |

**Seeded flags:**

| Key | Label | Default |
|---|---|---|
| `homepage.testimonials` | Homepage Testimonials Section | `true` |
| `homepage.whyChooseUs` | Homepage Why Choose Us Section | `true` |
| `homepage.emergencyCTA` | Homepage Emergency CTA Section | `true` |
| `service.brands` | Service Page Brands Section (global) | `true` |
| `service.faq` | Service Page FAQ Section (global) | `true` |
| `service.commonIssues` | Service Page Common Issues (global) | `true` |
| `contact.googleMap` | Contact Page Google Map | `true` |
| `googleReviews.enabled` | Google Reviews Integration | `false` |

---

### `ContactSubmission`
Stores all contact form submissions. Replaces the current `console.log` in `app/api/contact/route.ts`.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `name` | `String` | |
| `email` | `String` | |
| `phone` | `String` | |
| `serviceType` | `String?` | e.g. `"commercial-refrigeration"` |
| `message` | `String` | |
| `isRead` | `Boolean` | Default `false` — drives unread badge in admin sidebar |
| `isArchived` | `Boolean` | Default `false` |
| `submittedAt` | `DateTime` | Auto-set |
| `ipAddress` | `String?` | Optional — from `x-forwarded-for` header |

---

### `SiteSettings`
Single-row table (key = `"global"`) for email and Google Reviews configuration.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | PK — always `"global"` (use `upsert`) |
| `emailProvider` | `String?` | `"resend"` or `"smtp"` |
| `emailConfig` | `Json?` | Provider-specific config (API keys stored **encrypted**) |
| `notificationEmail` | `String?` | Where contact form alerts are sent |
| `fromEmail` | `String?` | Sender address for outbound emails |
| `googlePlacesId` | `String?` | Google Place ID for the business |
| `googleReviewsEnabled` | `Boolean` | Default `false` |
| `googleReviewsMinRating` | `Int` | Default `4` — minimum stars to display |
| `googleReviewsMaxCount` | `Int` | Default `10` — max reviews to show |
| `googleReviewsCacheTtlHours` | `Int` | Default `24` — cache refresh interval |
| `cachedReviews` | `Json?` | Cached Google reviews response blob |
| `cachedReviewsAt` | `DateTime?` | Timestamp of last cache refresh |
| `updatedAt` | `DateTime` | Auto-updated |

---

### `EmailTemplate`
Editable email templates used by the email service integration.

| Field | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | PK |
| `key` | `String` | Unique — e.g. `"contact_notification"`, `"contact_confirmation"` |
| `subject` | `String` | Email subject line |
| `body` | `String` | Email body — plain text or HTML |
| `isActive` | `Boolean` | Default `true` |
| `updatedAt` | `DateTime` | Auto-updated |

**Seeded templates:**

| Key | Purpose |
|---|---|
| `contact_notification` | Sent to business when a contact form is submitted |
| `contact_confirmation` | Sent to the customer confirming their request was received |

---

## File Structure

```
on-demand-rs/
├── auth.ts                              ← Auth.js v5 config (Credentials provider)
├── middleware.ts                        ← Protects /admin/** only — public routes unaffected
├── .env.local.example                  ← Copy to .env.local and fill in values
├── lib/
│   ├── prisma.ts                        ← Prisma singleton with Neon adapter
│   ├── content.ts                       ← DB-first content access layer (with TS fallback)
│   ├── email.ts                         ← Resend/SMTP abstraction
│   └── crypto.ts                        ← Encrypt/decrypt API keys stored in SiteSettings
├── prisma/
│   ├── schema.prisma                    ← Full DB schema (all 6 models above)
│   ├── seed.ts                          ← Seeds DB from existing ./data/ files
│   └── migrations/                     ← Auto-generated by prisma migrate
├── app/
│   ├── admin/
│   │   ├── layout.tsx                   ← Admin shell — no public Header/Footer
│   │   ├── page.tsx                     ← Dashboard overview (counts, recent submissions)
│   │   ├── login/page.tsx              ← Email + password login form
│   │   ├── components/
│   │   │   ├── Sidebar.tsx              ← Nav with unread inbox badge
│   │   │   └── TopBar.tsx              ← Admin topbar with sign-out
│   │   ├── content/[pageKey]/page.tsx  ← Editor: homepage / about / contact / footer
│   │   ├── services/
│   │   │   ├── page.tsx                 ← List + enable/disable + Add New
│   │   │   └── [slug]/page.tsx         ← Full service editor
│   │   ├── flags/page.tsx              ← Feature flags toggle table
│   │   ├── settings/
│   │   │   ├── email/page.tsx          ← Email provider config + templates
│   │   │   └── google-reviews/page.tsx ← Google Reviews config
│   │   └── inbox/
│   │       ├── page.tsx                 ← Paginated submissions list
│   │       └── [id]/page.tsx           ← Submission detail + reply
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts ← Auth.js handler
│   │   ├── contact/route.ts            ← MODIFIED: writes to ContactSubmission + sends email
│   │   └── google-reviews/route.ts    ← Google Places proxy + cache layer
│   ├── services/
│   │   └── [slug]/
│   │       ├── page.tsx                 ← Async server component (data fetcher)
│   │       └── ServicePageClient.tsx   ← 'use client' component (all JSX + useState)
│   └── components/
│       ├── Hero.tsx                     ← MODIFIED: async, uses lib/content.ts
│       ├── Services.tsx                 ← MODIFIED: async, uses lib/content.ts
│       ├── Testimonials.tsx             ← MODIFIED: async, uses lib/content.ts + feature flag
│       ├── WhyChooseUs.tsx              ← MODIFIED: async, uses lib/content.ts + feature flag
│       ├── ContactCTA.tsx               ← MODIFIED: async, uses lib/content.ts + feature flag
│       └── Footer.tsx                   ← MODIFIED: async, uses lib/content.ts
└── data/                                ← UNTOUCHED — static fallbacks for all content
```

---

## Key Patterns

### Content Access
All page components call `lib/content.ts` instead of importing from `./data/` directly:
```typescript
// Before (static import)
import { homePageData } from '@/data/homepage';
const { hero } = homePageData;

// After (async DB-first with fallback)
import { getPageContent } from '@/lib/content';
const { hero } = await getPageContent('homepage');
```
Components become `async` server components. The `./data/` files are unchanged.

### Feature Flags in Components
```typescript
const flags = await getFeatureFlags();
// Default is enabled — flag must be explicitly false to hide
{flags['homepage.testimonials'] !== false && <Testimonials data={...} />}
```

### Cache Invalidation on Vercel (ISR)
Every admin save Server Action calls `revalidatePath()`:
```typescript
revalidatePath('/');                          // homepage changes
revalidatePath('/services');                  // service list changes
revalidatePath('/services/' + slug);          // individual service changes
```
Vercel purges the ISR cache for those routes. Public site reflects changes within seconds.

### Server Actions (admin saves)
Admin forms use `'use server'` functions — no separate REST API needed for CRUD. Built-in CSRF protection when called from same origin.

### `app/services/[slug]/page.tsx` Split
The original file is `'use client'` entirely (due to `useState` for FAQ accordion). Split into:
- `page.tsx` — async Server Component: fetches `ServiceData` from DB, passes as prop
- `ServicePageClient.tsx` — `'use client'`: receives `serviceData` prop, all JSX unchanged

### Sensitive Settings Encryption
Email API keys and credentials stored in `SiteSettings.emailConfig` (JSONB) are encrypted using Node `crypto.createCipheriv` with `AUTH_SECRET` as key material. See `lib/crypto.ts`.

---

## Admin Routes Reference

| Route | Purpose |
|---|---|
| `GET /admin` | Dashboard overview |
| `GET /admin/login` | Login page |
| `GET /admin/content/homepage` | Edit homepage content |
| `GET /admin/content/about` | Edit about page content |
| `GET /admin/content/contact` | Edit contact page content |
| `GET /admin/content/footer` | Edit footer content |
| `GET /admin/services` | List all services (with enable/disable) |
| `GET /admin/services/[slug]` | Edit a service page |
| `GET /admin/flags` | Feature flags toggle table |
| `GET /admin/settings/email` | Email provider configuration |
| `GET /admin/settings/google-reviews` | Google Reviews configuration |
| `GET /admin/inbox` | Contact form submissions inbox |
| `GET /admin/inbox/[id]` | Submission detail + reply |

---

## API Routes Reference

| Route | Method | Purpose |
|---|---|---|
| `/api/contact` | `POST` | Contact form submission — saves to DB + sends email |
| `/api/google-reviews` | `GET` | Returns cached Google reviews (proxies Places API) |
| `/api/auth/[...nextauth]` | `GET/POST` | Auth.js session handler |
