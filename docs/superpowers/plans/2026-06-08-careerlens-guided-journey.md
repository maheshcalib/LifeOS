# CareerLens Guided Journey Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the disconnected CareerLens workflow with one streamlined guided journey covering resume upload, career goals, life planning, scenario preferences, and a graphical unified report.

**Architecture:** Add a single client-side journey state model persisted in session storage. Build one `/journey` route with five visual stages and reuse existing parsing/analysis APIs. Generate a unified report from resume analysis plus user answers, while retaining separate pages as secondary navigation.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, React state/session storage, Gemini analysis, Vitest.

---

## Chunk 1: Journey Data Model

### Task 1: Add Journey State And INR Utilities

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/lib/journey-store.ts`
- Create: `src/lib/currency.ts`
- Create: `src/lib/journey-store.test.ts`
- Create: `src/lib/currency.test.ts`

- [ ] Define career goal, life-plan, and scenario-preference types.
- [ ] Add session-storage save/load/reset helpers.
- [ ] Add Indian currency formatter using `en-IN` and `INR`.
- [ ] Verify values render like `₹12,00,000`.

## Chunk 2: Guided Journey UI

### Task 2: Build Unified Five-Step Experience

**Files:**
- Create: `src/app/journey/page.tsx`
- Create: `src/components/journey/GuidedJourney.tsx`
- Create: `src/components/journey/JourneyProgress.tsx`
- Create: `src/components/journey/OptionCard.tsx`
- Create: `src/components/journey/ResumeStep.tsx`
- Create: `src/components/journey/CareerGoalsStep.tsx`
- Create: `src/components/journey/LifePlanningStep.tsx`
- Create: `src/components/journey/ScenarioStep.tsx`
- Create: `src/components/journey/ReportStep.tsx`

- [ ] Add persistent five-stage progress indicator.
- [ ] Embed resume file selection and analysis in stage one.
- [ ] Add large graphical multiple-choice option cards.
- [ ] Add INR salary controls and life-event choices.
- [ ] Add scenario-path choices.
- [ ] Add back/continue controls and required-answer validation.
- [ ] Persist progress after every answer.

## Chunk 3: Unified Graphical Report

### Task 3: Add Visual Report Components

**Files:**
- Create: `src/components/journey/SalaryProjection.tsx`
- Create: `src/components/journey/LifeTimeline.tsx`
- Create: `src/components/journey/SkillsMap.tsx`
- Modify: `src/components/journey/ReportStep.tsx`

- [ ] Render analysis score, AI impact, skills, and upskilling.
- [ ] Render an INR five-year salary projection.
- [ ] Render selected life events on a timeline.
- [ ] Render selected scenario path and recommended actions.

## Chunk 4: Primary Navigation And INR Cleanup

### Task 4: Make Journey The Main Product Flow

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/app/upload/page.tsx`
- Modify: `src/components/scenarios/ScenarioChart.tsx`
- Modify: `src/app/scenarios/page.tsx`
- Modify: `src/app/upgrade/page.tsx`

- [ ] Route primary calls-to-action to `/journey`.
- [ ] Redirect or clearly route `/upload` into the guided journey.
- [ ] Replace all visible USD values with INR formatting.
- [ ] Keep dashboard/life/scenario pages as secondary report modules.

## Chunk 5: Verification

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Test the full guided journey with Gemini.
- [ ] Test session resume after refresh.
- [ ] Test mobile layout and navigation.
