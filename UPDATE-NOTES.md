# P32 website update — October 2026

Scope: main P32 website only. Sentinel-specific changes are excluded.

- Persistent section navigation with a mobile menu, keyboard Escape support, and reduced-motion-aware anchor scrolling.
- New Layered Physical Protection section: surveys and assessments, program design and implementation, executive and family protection, facilities and residences, transportation and travel planning, and ongoing operational management.
- Native expandable service descriptions, usable with keyboard or without JavaScript.
- Dana Toren: VP Cyber Solutions (also reflected on the existing cyber page).
- Eran Mesika: Head of Security & Regulation, with the supplied portrait in the team's monochrome format.

Validation: production build and TypeScript passed. Desktop, 390px mobile-frame and 768px tablet-frame browser checks; section navigation, disclosure opening and mobile-menu Escape behavior checked.

## Handoff

This archive contains the complete source with the existing deployment configuration preserved. Run `npm ci` and `npm run build`. The static output is generated in `out/`.

Review changes in a branch first. The existing GitHub workflow deploys to Firebase Hosting on a push to `main`; do not push there until the owner approves the review.

No client contract, client-specific operations, pricing or uploaded screenshots are included.
