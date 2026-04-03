# Phase 10: Manual QA and Verification - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete QA pass on the Honey & Bloom template: deploy to Vercel, run automated checks (links, Lighthouse, schema), then Andrew does a manual walkthrough on iPhone and desktop. Fix issues as found. Generate FUTURE_DIRECTIONS.md. Push final build to main on GitHub.

</domain>

<decisions>
## Implementation Decisions

### Deployment Setup
- GitHub repo does NOT exist yet -- create it as part of this phase
- Vercel project does NOT exist yet -- include manual connection steps for Andrew
- Deploy to default .vercel.app preview URL only -- no custom domain needed for QA
- Rename current `master` branch to `main` before pushing to GitHub
- Final push to `main` after all QA passes so Vercel has the production build

### Testing Scope
- Claude decides the mix of automated vs manual checks (automated first, then manual walkthrough)
- All four conversion paths are critical and must be tested:
  1. Booking flow (4-step UI through confirmation on mobile)
  2. Click-to-call (phone number triggers dialer on iPhone)
  3. Service pages (menu -> detail -> booking CTA)
  4. Contact form (renders and validates correctly)
- Andrew has an iPhone for real-device testing (Safari on iOS)
- DevTools responsive mode for additional viewport checks

### Issue Handling
- Fix bugs immediately when found -- stop testing, fix, redeploy, continue
- No known issues going in -- clean slate
- Core Web Vitals targets are BLOCKING: LCP < 2.5s, CLS < 0.1, INP < 200ms must all pass before sign-off
- Schema validation: Claude decides whether warnings are blocking based on severity (errors always block)

### Sign-off Criteria
- Every page must be reviewed and polished -- this is a portfolio piece
- All conversion paths tested and confirmed functional
- All Lighthouse scores green
- FUTURE_DIRECTIONS.md generated as final deliverable (per global CLAUDE.md requirement)
- Production build pushed to main on GitHub with Vercel auto-deploy

### Claude's Discretion
- Automated check tooling choices (which CLI tools, scripts)
- Exact order of the QA checklist
- Whether schema warnings are blocking
- How to structure the manual walkthrough checklist for Andrew

</decisions>

<specifics>
## Specific Ideas

- Andrew tests on real iPhone (Safari/iOS) -- this is the primary mobile test device
- The QA plan should include step-by-step manual instructions for GitHub repo creation and Vercel connection since Andrew is learning Git
- Bugs are fixed in real-time, not batched -- each fix gets a commit, redeploy, and re-test

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 10-manual-qa*
*Context gathered: 2026-04-02*
