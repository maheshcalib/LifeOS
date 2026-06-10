# CareerLens Runnable MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current visual CareerLens prototype into a runnable hackathon MVP where a user uploads a resume, receives a structured analysis, views results, and generates career scenarios.

**Architecture:** Build the first MVP in guest mode so the core workflow is testable without authentication or external service setup. Parse resume files server-side, return validated structured analysis from Anthropic or a deterministic fallback, store the result in browser session storage, and render the result dynamically. Add Supabase persistence and authentication only after the guest workflow is stable.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Anthropic SDK, pdf-parse, mammoth, Vitest, React Testing Library, Playwright, optional Supabase.

---

## MVP Definition

The MVP is complete when a new user can:

1. Open the landing page and navigate to upload.
2. Select or drag-and-drop a PDF, DOCX, or TXT resume.
3. See file validation, loading, success, and failure states.
4. Submit the resume for server-side parsing and AI analysis.
5. View real analysis values on `/results/[id]`.
6. Generate three five-year scenarios from that analysis.
7. Refresh during the same browser session without losing the result.
8. Complete the flow using fallback analysis when no Anthropic key is configured.

Out of scope for the first runnable MVP:

- Authentication and account management.
- Razorpay payments and paid plan enforcement.
- Resend emails.
- Production-grade life-plan persistence.
- Multi-user dashboards and analysis history.

## Chunk 1: Testing Foundation

### Task 1: Add Automated Test Tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/test/setup.ts`

- [ ] Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, and `@playwright/test`.
- [ ] Add scripts: `test`, `test:watch`, and `test:e2e`.
- [ ] Configure unit tests with the `@/` alias and browser-like DOM.
- [ ] Configure Playwright to start the Next.js dev server automatically.
- [ ] Run an empty smoke test and confirm the test runner works.

## Chunk 2: Resume Upload And Parsing

### Task 2: Create A Real Resume Parsing API

**Files:**
- Create: `src/app/api/parse-resume/route.ts`
- Modify: `src/lib/resume-parser.ts`
- Create: `src/lib/resume-parser.test.ts`

- [ ] Write tests for TXT parsing, unsupported files, empty files, and file-size validation.
- [ ] Update `parseResumeFile` to reject empty content and files over 10MB.
- [ ] Add `POST /api/parse-resume` accepting multipart form data and returning `{ resumeText }`.
- [ ] Return clear `400` responses for missing, empty, oversized, or unsupported files.

### Task 3: Make The Upload Page Functional

**Files:**
- Create: `src/components/upload/ResumeUploader.tsx`
- Modify: `src/app/upload/page.tsx`
- Create: `src/components/upload/ResumeUploader.test.tsx`

- [ ] Add hidden file input, choose-file button, and drag-and-drop handling.
- [ ] Show selected filename, type, and size.
- [ ] Add idle, validating, parsing, analyzing, success, and error states.
- [ ] Submit the file to `/api/parse-resume`, then submit text to `/api/analyze`.
- [ ] Save the result to session storage with a generated analysis ID.
- [ ] Navigate to `/results/[id]` after successful analysis.

## Chunk 3: Structured AI Analysis

### Task 4: Return A Validated Analysis Contract

**Files:**
- Modify: `src/app/api/analyze/route.ts`
- Create: `src/lib/analysis.ts`
- Create: `src/lib/analysis.test.ts`
- Modify: `src/types/index.ts`

- [ ] Move fallback analysis into `src/lib/analysis.ts`.
- [ ] Add runtime validation and normalization for every `AnalysisResult` field.
- [ ] Update the Anthropic prompt to request only the exact `AnalysisResult` JSON shape.
- [ ] Parse Anthropic text content into JSON and reject malformed responses.
- [ ] On missing API key, return fallback analysis with `source: "demo"`.
- [ ] On successful Anthropic analysis, return normalized data with `source: "anthropic"`.
- [ ] Return helpful errors without exposing secrets or raw provider errors.

## Chunk 4: Dynamic Results And Scenarios

### Task 5: Render Real Analysis Results

**Files:**
- Create: `src/lib/analysis-store.ts`
- Modify: `src/app/results/[id]/page.tsx`
- Create: `src/components/results/AnalysisResults.tsx`
- Create: `src/components/results/AnalysisResults.test.tsx`

- [ ] Implement session-storage helpers for analysis results.
- [ ] Convert results rendering into a client component that loads by analysis ID.
- [ ] Replace hard-coded scores, skills, AI impact, and roadmap values.
- [ ] Add loading, invalid-ID, and expired-session states.
- [ ] Add a button to generate scenarios from the current analysis.

### Task 6: Generate Dynamic Scenarios

**Files:**
- Modify: `src/app/api/scenarios/route.ts`
- Modify: `src/app/scenarios/page.tsx`
- Create: `src/components/scenarios/ScenarioExplorer.tsx`
- Create: `src/lib/scenarios.ts`
- Create: `src/lib/scenarios.test.ts`

- [ ] Define and validate a `CareerScenario` interface.
- [ ] Update scenarios API to return structured scenario JSON.
- [ ] Provide deterministic fallback scenarios when Anthropic is unavailable.
- [ ] Pass the selected analysis into scenario generation.
- [ ] Replace static scenario content with API response and loading/error states.

## Chunk 5: Demo Reliability

### Task 7: Add Demo Mode And Error Recovery

**Files:**
- Modify: `.env.local`
- Modify: `src/app/api/analyze/route.ts`
- Modify: `src/app/api/scenarios/route.ts`
- Modify: `src/components/upload/ResumeUploader.tsx`

- [ ] Add `NEXT_PUBLIC_DEMO_MODE=true`.
- [ ] Make fallback responses explicit and reliable for hackathon demos.
- [ ] Add retry actions for parsing and analysis failures.
- [ ] Add a sample-resume action so judges can test without uploading a file.
- [ ] Display whether the result came from demo mode or live AI.

## Chunk 6: Optional Supabase Persistence

### Task 8: Persist Analyses After Core MVP Passes

**Files:**
- Modify: `supabase/migrations/001_initial.sql`
- Create: `src/lib/supabase/admin.ts`
- Modify: `src/app/api/analyze/route.ts`
- Modify: `src/app/results/[id]/page.tsx`

- [ ] Decide between anonymous Supabase auth and service-role-backed guest records.
- [ ] Apply the migration to a Supabase project.
- [ ] Store analysis text and results after successful analysis.
- [ ] Load results from Supabase when session storage is unavailable.
- [ ] Confirm RLS prevents one user from reading another user's records.

Do not start this chunk until the guest-mode MVP works end to end.

## Chunk 7: End-To-End Verification

### Task 9: Add MVP Browser Tests

**Files:**
- Create: `e2e/landing.spec.ts`
- Create: `e2e/resume-flow.spec.ts`
- Create: `e2e/scenarios.spec.ts`

- [ ] Test landing page navigation to upload.
- [ ] Test invalid file rejection.
- [ ] Test sample resume analysis in demo mode.
- [ ] Test redirect to dynamic results.
- [ ] Test displayed analysis values match the API result.
- [ ] Test scenario generation and rendering.
- [ ] Test mobile viewport for overlapping controls and unreadable content.

### Task 10: Final MVP Acceptance

- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test:e2e`.
- [ ] Manually test PDF, DOCX, and TXT uploads.
- [ ] Test with `ANTHROPIC_API_KEY` configured.
- [ ] Test without `ANTHROPIC_API_KEY` in demo mode.
- [ ] Verify no API keys appear in browser network responses or client bundles.

## Manual Test Script

1. Start the app with `npm run dev`.
2. Open the landing page and click **Upload My Resume**.
3. Upload an unsupported file and confirm a useful error appears.
4. Upload a valid resume and confirm parsing and analysis progress appears.
5. Confirm the app redirects to a result-specific URL.
6. Confirm ATS score, skills, AI impact, roadmap, and improvements use returned data.
7. Refresh the results page and confirm the result remains available.
8. Generate scenarios and confirm three paths render.
9. Remove `ANTHROPIC_API_KEY`, restart, and repeat using demo mode.
10. Re-enable the key and confirm live AI mode works.

## Suggested Delivery Order

1. Day 1: Test setup, parse API, functional uploader.
2. Day 2: Structured analysis contract and dynamic results.
3. Day 3: Dynamic scenarios, demo mode, browser tests.
4. After hackathon MVP: Supabase auth/persistence, life planning, payments, email.
