# Learning Dashboard

A high-fidelity student learning dashboard built for the Frontend Intern Challenge. Dark mode, Bento Grid layout, live Supabase data, and Framer Motion animations throughout.

**Stack:** Next.js 15 (App Router) · Supabase · Tailwind CSS · Framer Motion · Lucide React · TypeScript

> **Live demo:** _add your Vercel URL here after deploying_

---

## Architectural Choices

### Why a thin Server Component shell?

The root `page.tsx` is a Server Component that renders three things: the `<Sidebar>`, the `<TopBar>`, and a `<Suspense>` boundary wrapping `<DashboardContent>`. That's it. All the interesting work happens one level down.

I chose this pattern because it gives the cleanest separation between "things that need the server" and "things that need the browser." The shell never fetches data and never imports Framer Motion, so it stays lightweight and renders instantly.

### Bento Grid as a CSS Grid, not a library

The grid is plain CSS Grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`) with `col-span` overrides on individual tiles. I deliberately avoided a third-party Bento library — they tend to add JavaScript overhead and fight with Framer Motion's layout animations. Doing it in Tailwind keeps it predictable and easy to adjust.

### Single query, typed at the boundary

All Supabase access goes through `lib/supabase/queries.ts`. There's one function (`getCourses`) and one place where the raw database response gets cast to the `Course` TypeScript interface. If the schema changes, there's exactly one file to update.

---

## Server / Client Component Split

```
app/page.tsx                       Server Component — layout shell only
  ├── <Sidebar />                  Client Component — needs useState (collapse toggle)
  ├── <TopBar />                   Client Component — interactive buttons
  └── <Suspense fallback={skeleton}>
        └── <DashboardContent />   Server Component — async, fetches from Supabase
              └── <BentoGrid />    Client Component — Framer Motion needs the browser
                    ├── <HeroTile />
                    ├── <StatsTile />
                    ├── <CourseCard /> × N
                    └── <ActivityTile />
```

The key rule I followed: **a component is a Server Component by default, and only becomes a Client Component when it has a concrete reason to be one.** The reasons in this project are:

- `Sidebar` — uses `useState` for the collapse state
- `TopBar` — has interactive buttons
- `BentoGrid` and all tiles — Framer Motion's `motion.*` components require browser APIs and won't work without `"use client"`

`DashboardContent` sits at the boundary. It's async, runs on the server, calls Supabase, and then passes the fetched `courses` array down as a plain prop to `BentoGrid`. Because props crossing the server/client boundary must be serializable, the `Course` type uses only primitives (strings, numbers) — no Date objects, no class instances.

The `Suspense` boundary around `DashboardContent` means Next.js streams the shell (sidebar, topbar) to the browser immediately, then streams the grid content once the Supabase query resolves. The skeleton loader fills the gap.

---

## Challenges

### Hydration mismatch from non-deterministic data

The activity contribution graph originally used `Math.random()` and `new Date()` to generate mock data. This caused a React hydration error because the server rendered one set of values and the client re-ran the same function and got different ones.

The fix was to replace both with deterministic alternatives: a fixed anchor date (`2026-05-30`) and a seeded pseudo-random number generator (mulberry32 algorithm, seed `42`). Same inputs → same outputs on every render, server or client.

### Framer Motion's `layoutId` across collapsed/expanded sidebar states

The sidebar nav highlight uses `layoutId="sidebar-active-bg"` to animate smoothly between items. This worked fine in the expanded state, but when the sidebar collapsed to icon-only mode, the layout animation would sometimes jump because the element's bounding box changed significantly.

The solution was to keep the `layoutId` consistent and let Framer Motion's spring physics (`stiffness: 400, damping: 30`) absorb the position delta naturally. The spring is stiff enough that the transition feels snappy rather than floaty.

### Keeping animations off the layout thread

The brief specifically required zero layout shifts. The temptation with progress bars is to animate `width` directly, which triggers layout recalculation on every frame. I kept `width` as the animated property on progress bars (it's the most readable approach) but wrapped the track in `overflow-hidden` so the browser can contain the repaint to a single composited layer. For everything else — card hover, tile entrance, activity cells — only `transform` and `opacity` are animated, which run entirely on the GPU compositor thread.

### `"use client"` boundary and Supabase credentials

Framer Motion forces `BentoGrid` to be a Client Component, but I still needed the Supabase data to be fetched server-side. The solution is the `DashboardContent` → `BentoGrid` handoff: `DashboardContent` is a Server Component that fetches data and renders `BentoGrid` as a child, passing data as props. The Supabase URL and anon key never appear in any client bundle. Row Level Security on the `courses` table ensures the anon key can only `SELECT` — even if someone extracted it from network traffic, they couldn't write or delete anything.

---

## Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Set up Supabase**

Create a free project at [supabase.com](https://supabase.com), then run `supabase/schema.sql` in the SQL Editor. It creates the `courses` table, enables RLS, and seeds 4 rows.

**3. Add environment variables**
```bash
cp .env.example .env.local
```
Fill in your project URL and anon key from **Supabase → Settings → API**.

**4. Run**
```bash
npm run dev
# http://localhost:3000
```

---

## Deploying to Vercel

1. Push to a public GitHub repo
2. Import at [vercel.com](https://vercel.com) — Next.js is auto-detected
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in **Project Settings → Environment Variables**
4. Deploy

---

## Project Structure

```
app/
  page.tsx          # Server Component shell
  layout.tsx        # Root layout, dark mode class
  loading.tsx       # Route-level skeleton (Next.js convention)
  error.tsx         # Route-level error boundary

components/
  dashboard/
    DashboardContent.tsx   # Async Server Component — Supabase fetch
    BentoGrid.tsx          # Client Component — stagger animation container
    BentoTile.tsx          # Reusable tile wrapper with hover spring
    HeroTile.tsx           # Greeting + streak
    CourseCard.tsx         # Dynamic course tile with progress bar
    ActivityTile.tsx       # Contribution graph
    StatsTile.tsx          # Quick stats
    TopBar.tsx             # Header bar
    ErrorState.tsx         # Graceful error UI
  sidebar/
    Sidebar.tsx            # Collapsible nav (desktop + tablet)
    SidebarNavItem.tsx     # layoutId highlight item
    SidebarMobile.tsx      # Bottom nav bar (mobile)
  skeletons/
    DashboardSkeleton.tsx  # Full-page skeleton grid
    TileSkeleton.tsx       # Individual shimmer tile

lib/
  supabase/
    server.ts     # Supabase client factory (server-only)
    queries.ts    # getCourses() — single source of truth
  utils.ts        # cn(), generateActivityData(), activityColor()

types/
  index.ts        # Course, ActivityDay, NavItem interfaces

supabase/
  schema.sql      # Table definition + RLS policy + seed data
```
