# CareerLens Futuristic Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform CareerLens into a high-contrast futuristic dark interface with realistic graphical depth and readable neon data accents.

**Architecture:** Centralise the visual system in global CSS utilities and design tokens, then update shared layout, journey, career, and visual components to consume those styles. Add one generated realistic career-intelligence visual as the project hero background.

**Tech Stack:** Next.js 14, Tailwind CSS, CSS animations, generated bitmap asset.

---

## Chunk 1: Theme Foundation

- [ ] Generate and save a futuristic CareerLens hero graphic.
- [ ] Add near-black, cyan, magenta, lime, and amber theme tokens.
- [ ] Add reusable dark-panel, neon-border, and data-glow utilities.

## Chunk 2: Product Surfaces

- [ ] Apply the dark theme to navbar, footer, landing page, and shared cards.
- [ ] Redesign the guided journey as a futuristic command interface.
- [ ] Upgrade progress, option cards, salary projection, timeline, and skills map.
- [ ] Improve graphical density without reducing readability.

## Chunk 3: Verification

- [ ] Run tests, lint, and production build.
- [ ] Start the application.
- [ ] Verify landing and guided journey routes respond.
