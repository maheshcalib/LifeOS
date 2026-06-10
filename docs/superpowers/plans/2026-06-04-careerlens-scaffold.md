# CareerLens Scaffold Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack CareerLens Next.js 14 scaffold with the requested routes, components, Supabase schema, AI/email/parser dependencies, and branded landing page.

**Architecture:** Create a greenfield App Router app with focused UI components under `src/components`, shared service clients under `src/lib`, and typed domain contracts under `src/types`. API routes accept JSON, guard missing configuration, and return structured responses that can later be backed by production prompts and persistence.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Anthropic SDK, pdf-parse, mammoth, resend.

---

## Chunk 1: Scaffold And Dependencies

### Task 1: Initialize Project Tooling

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `components.json`
- Create: `.env.local`

- [ ] Create a Next.js 14 TypeScript/Tailwind project in the current directory.
- [ ] Install runtime packages: `@supabase/supabase-js @supabase/ssr @anthropic-ai/sdk pdf-parse mammoth resend lucide-react class-variance-authority clsx tailwind-merge tailwindcss-animate`.
- [ ] Install shadcn components: `button card badge progress tabs avatar separator toast`.
- [ ] Verify `npm run build` reaches compilation or reports only actionable app errors.

## Chunk 2: App Structure

### Task 2: Add Pages, Components, Libs, Types, Migration

**Files:**
- Create all requested files under `src/app`, `src/components`, `src/lib`, `src/types`, and `supabase/migrations`.

- [ ] Add layout, global styles, and brand tokens.
- [ ] Add landing page with required hero, features, CTA, and no auth dependency.
- [ ] Add dashboard/upload/results/life-planning/scenarios/upgrade pages.
- [ ] Add requested career, life, scenario, layout, and shadcn UI components.
- [ ] Add Supabase browser/server helpers, Anthropic client helper, resume parser, and utilities.
- [ ] Add API routes for analysis, life planning, scenarios, and Razorpay webhook placeholder.
- [ ] Add Supabase migration with RLS and own-row policies.
- [ ] Run `npm run lint` and `npm run build`.
