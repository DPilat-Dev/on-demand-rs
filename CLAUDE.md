# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run Prisma migrations (uses DATABASE_URL_UNPOOLED)
npm run db:seed      # Seed DB from ./data/ files
npm run db:studio    # Open Prisma Studio
```

Vercel build command override: `npx prisma migrate deploy && next build`

## Architecture

**OnDemand Restaurant Service** — a business website for a commercial restaurant equipment repair company in Oklahoma. Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Content/Data Separation

All business content lives in `/data` (not in components). Components are pure presentation layers that receive data as props. When adding or editing content (text, images, service info), modify `/data` files — not components.

- `/data/services/` — One file per service (e.g., `commercial-refrigeration.ts`). Each follows the `ServiceData` interface in `types/service.ts`, which includes `serviceTypes[]`, `equipment[]`, `faqs[]`, `commonIssues[]`, `brands[]`, and full SEO metadata.
- `/data/homepage.ts`, `about.ts`, `contact.ts`, `footer.ts` — Content for their respective pages.

### Routing

- `/app/page.tsx` — Homepage, composes section components
- `/app/services/page.tsx` — Service listing grid
- `/app/services/[slug]/page.tsx` — Dynamic service detail page (client component, uses `React.use()` for async params)
- `/app/api/contact/route.ts` — Contact form POST handler (currently logs to console; wired for email/DB integration)

### Dynamic Icon System

`/app/components/DynamicIcon.tsx` lazy-loads icon libraries from `react-icons` on demand. Pass an icon name string (e.g., `"FaPhone"`) and it extracts the library prefix (`fa`), dynamically imports only that library, and renders the icon. This avoids bundling all icon libraries. Use this pattern when adding new icons rather than static imports.

### Key Types

`types/service.ts` — The central schema for service pages. Review this before adding or modifying service data files.

`types/seo.ts` — SEO metadata shape used across the app.

### Styling

Tailwind CSS v4 via PostCSS. Theme colors and custom properties are defined in `app/globals.css` as CSS variables. No separate Tailwind config file — v4 uses CSS-based configuration.

## Admin CRM

Full technical documentation: `docs/CRM_ADMIN.md`

Admin dashboard lives at `/admin` (protected by `middleware.ts` — only `/admin/**` routes are gated). The admin layout at `app/admin/layout.tsx` renders independently of the public layout — no `<Header>` or `<Footer>`.

**Auth:** Auth.js v5 Credentials provider. Config in `auth.ts`. Login at `/admin/login`.

**Database:** PostgreSQL via Neon. Prisma schema at `prisma/schema.prisma`. Singleton client in `lib/prisma.ts`.

**Content layer:** `lib/content.ts` is the single point of data access for all page components — tries DB first, falls back to `./data/` TypeScript files. Never import from `./data/` directly in page components.

**Feature flags:** `getFeatureFlags()` returns a `Record<string, boolean>`. Check `flags['key'] !== false` (not `=== true`) so sections default to visible when the DB is unreachable.

**Cache invalidation:** Admin Server Actions call `revalidatePath()` after every save to purge Vercel ISR cache for affected routes.

**`app/services/[slug]/page.tsx`** — async server component that fetches data and passes it as a prop to `ServicePageClient.tsx` (the `'use client'` component with `useState`).

### Environment variables required

```
DATABASE_URL           # Neon pooled (auto-injected by Neon Vercel integration)
DATABASE_URL_UNPOOLED  # Neon direct (for migrations)
AUTH_SECRET            # openssl rand -base64 32
```

Copy `.env.local.example` → `.env.local`.
