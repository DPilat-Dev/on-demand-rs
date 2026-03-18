# OnDemand Restaurant Service

Business website and CMS for **OnDemand Restaurant Service** — Oklahoma's commercial restaurant equipment repair company. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, PostgreSQL (Neon), and Vercel Blob storage.

---

## Features

### Public Website
- **Homepage** — Hero section with video/image support (random video selection per load), services grid, testimonials, why choose us, and contact CTA
- **Services listing** (`/services`) — Dynamic grid pulled from the database, showing all enabled services with hero images, descriptions, and feature bullet points
- **Service detail pages** (`/services/[slug]`) — Per-service pages with service types, equipment we service (with image support), brands carousel, common issues, FAQs, and a CTA section
- **About page** (`/about`) — Company story, team values, stats, and hero with video support
- **Contact page** (`/contact`) — Contact form wired to the CRM inbox with email notifications

### Admin CMS (`/admin`)
Protected dashboard for managing all site content. Login at `/admin/login`.

| Section | Description |
|---|---|
| **Dashboard** | Overview and quick links |
| **Page Content** | Edit Homepage, About, Contact, Footer, and Services Listing page content including hero videos, text, images, and JSON-structured sections |
| **Services** | Add, edit, enable/disable, and reorder service pages. Each service has full content editing including equipment, brands, FAQs, common issues, and listing card snippets |
| **Feature Flags** | Toggle individual page sections on/off without code changes |
| **Media Library** | Upload and manage images and videos (MP4, WebM, MOV) stored on Vercel Blob. Client-side direct upload bypasses serverless size limits |
| **Inbox** | View, read, archive, and delete contact form submissions |
| **Google Reviews** | Configure Google Places API integration to display live reviews on the homepage. Supports min rating filter, max count, and TTL-based caching |
| **Email Settings** | Configure Resend or SMTP for contact form notifications and confirmations. API keys stored AES-256-GCM encrypted |
| **Users** | Add and manage admin users with role-based access (Admin / Editor) |
| **Account Settings** | Update your own name, email, and password |

### Integrations
- **Google Tag Manager** (`GTM-WJ7GJ8H6`) — loaded in the root layout
- **Vercel Speed Insights** — Core Web Vitals tracking
- **Vercel Blob** — Media storage with direct client-side uploads
- **Neon PostgreSQL** — Serverless Postgres via Prisma ORM
- **Resend / SMTP** — Transactional email for contact form

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Prisma |
| Auth | Auth.js v5 (Credentials + JWT) |
| Storage | Vercel Blob |
| Email | Resend / SMTP |
| Deployment | Vercel |

---

## Local Development

### 1. Clone and install

```bash
git clone <repo-url>
cd on-demand-rs
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

```env
# Neon PostgreSQL — pooled connection (used by the app)
DATABASE_URL=postgresql://...

# Neon PostgreSQL — direct connection (used for migrations)
DATABASE_URL_UNPOOLED=postgresql://...

# Auth.js secret — generate with: openssl rand -base64 32
AUTH_SECRET=your-secret-here

# Vercel Blob — get from Vercel project dashboard
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

Optional variables:

```env
# Google Places API key (for Google Reviews integration)
GOOGLE_PLACES_API_KEY=AIza...

# Public site URL (used for image optimization checks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

Run Prisma migrations to create the schema:

```bash
npm run db:migrate
```

Seed the database with initial content from the `/data` files:

```bash
npm run db:seed
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

> **Default admin login** is set during the seed step. Check `prisma/seed.ts` for the default credentials and change them immediately after first login.

---

## Available Scripts

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run Prisma migrations (uses DATABASE_URL_UNPOOLED)
npm run db:seed      # Seed DB from ./data/ static files
npm run db:studio    # Open Prisma Studio (database GUI)
```

---

## Project Structure

```
app/
├── (public)/           # Public-facing pages (homepage, about, contact, services)
├── admin/              # Admin dashboard (protected by middleware)
│   └── (dashboard)/    # Dashboard layout, pages, and server actions
├── api/                # API routes (contact form, media upload, auth)
├── components/         # Shared UI components (Hero, HeroMedia, Services, etc.)
└── globals.css         # Global styles and Tailwind theme

data/                   # Static TypeScript content files (fallback if DB unreachable)
lib/                    # Shared utilities (content layer, prisma client, email, crypto)
prisma/                 # Schema, migrations, and seed script
types/                  # Shared TypeScript interfaces
```

### Content Layer

`lib/content.ts` is the single data access point for all public pages. It tries the database first and falls back to the static `/data` TypeScript files if the DB is unreachable. This means the site works out of the box without any database setup, and DB edits override the static defaults.

---

## Deployment

The project is configured for Vercel. The build command runs migrations before building:

```
npx prisma migrate deploy && next build
```

Set all environment variables in the Vercel project dashboard under **Settings → Environment Variables**.
