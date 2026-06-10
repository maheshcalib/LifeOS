# CareerLens Elegant Report Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Cool Professional redesign with a detailed guided journey, action-first report, and target-role job match planner.

**Architecture:** Keep the working resume parsing and Gemini analysis flow. Extend journey state with profile, role targets, and financial preferences; derive deterministic job-match and action-plan data from the analysis; render results in an executive summary plus report tabs.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui Tabs, Gemini, Vitest.

---

- [ ] Add tested job-match and action-plan derivation logic.
- [ ] Replace futuristic dark styling with the Cool Professional palette.
- [ ] Expand the guided journey with profile and target-role questions.
- [ ] Build an executive summary and tabs for action plan, diagnosis, job matches, scenarios, and life plan.
- [ ] Run tests, lint, build, and restart the app.
