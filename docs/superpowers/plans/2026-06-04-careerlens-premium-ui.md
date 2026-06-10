# CareerLens Premium UI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign CareerLens into a premium animated SaaS product experience with realistic dashboard visuals and polished product pages.

**Architecture:** Keep the existing App Router structure and shadcn/ui primitives. Add reusable product-visual components, richer Tailwind/CSS animation primitives, and update pages to use product-led visuals rather than static placeholder cards.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, CSS keyframe animations.

---

## Chunk 1: Visual System

### Task 1: Add Premium Motion And Product Visual Components

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/visuals/ProductHeroVisual.tsx`
- Create: `src/components/visuals/MetricOrbit.tsx`

- [ ] Add reusable animation keyframes for float, pulse, scan, reveal, shimmer, and progress fill.
- [ ] Build a realistic animated dashboard hero visual using semantic HTML, Tailwind, and CSS animations.
- [ ] Build supporting metric visual components that pages can reuse.

## Chunk 2: Page Redesign

### Task 2: Upgrade Product Pages

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/upload/page.tsx`
- Modify: `src/app/results/[id]/page.tsx`
- Modify: `src/app/life-planning/page.tsx`
- Modify: `src/app/scenarios/page.tsx`
- Modify: `src/app/upgrade/page.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/career/*.tsx`
- Modify: `src/components/life/*.tsx`
- Modify: `src/components/scenarios/ScenarioChart.tsx`

- [ ] Redesign landing page as a cinematic product hero with animated product panels and richer feature sections.
- [ ] Redesign dashboard/results pages with denser realistic product surfaces.
- [ ] Redesign upload/life/scenarios/upgrade pages with animated workflows and product-quality states.
- [ ] Keep copy concise and ensure mobile layouts do not overlap.

## Chunk 3: Verification

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start or reuse `npm run dev`.
- [ ] Verify the landing page responds locally.
