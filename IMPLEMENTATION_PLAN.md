# MVP Audit & Implementation Plan

## Current audit snapshot

### What existed before this run
- Next.js App Router scaffold only
- Demo placeholder routes for `/`, `/review`, `/review/[sessionId]`, `/word/[wordId]`, `/result/[sessionId]`, `/library`, `/settings`
- Tailwind v4 token seed and basic visual direction
- No real session lifecycle, no backend abstraction, no API routes, no PWA install baseline

### Gaps against ARCHITECTURE.md
1. **Home** lacked real task aggregation and session start.
2. **Review flow** had no session model, queue, submission, or completion handling.
3. **Word detail** had no domain-backed content or AI degradation story.
4. **Result page** had no computed stats.
5. **Library/settings** were route skeletons only.
6. **Data layer** had no schema, repositories, or seed path.
7. **API layer** was missing for tasks / review / words / ai.
8. **PWA** had no manifest or service worker baseline.

## Implementation plan used in this run
1. Build a **minimal domain model** (`Word`, `Deck`, `ReviewSession`, `UserSettings`).
2. Add a **pragmatic data layer**:
   - `postgres` client for Vercel Postgres
   - SQL schema file
   - seed script
   - automatic fallback to in-repo demo seed when DB env is absent
3. Add **repositories + services** for home, review, word detail.
4. Replace placeholder pages with **mobile-first feature modules** aligned to Ink & Iron / Panda Judge.
5. Implement **API routes** for home/tasks, review create/get/submit/complete, words detail, AI placeholder.
6. Add **PWA essentials**: manifest, generated icons, service worker registration, cache-first shell baseline.
7. Update **README + env docs** and verify with lint/build.
8. Commit as one coherent MVP pass.
