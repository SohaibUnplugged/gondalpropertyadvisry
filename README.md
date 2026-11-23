# Gondal Property Advisory

A responsive real estate advisory website for Usman Ali, rebuilt around the supplied Factorive reference: its photographic hero, Geist typography, warm neutral palette, editorial service rows, process grid, stacked image sections, slider, contact cards, and oversized black footer. Built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. There are no property listings, database, accounts, fabricated testimonials, or invented business statistics.

## Setup

Use Node.js 24 LTS and npm 11.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open http://localhost:3000. Keep secrets in hosting environment settings or .env.local; environment files are ignored by Git.

## Production and SEO configuration

Set SITE_URL in the build environment to the final HTTPS origin, without a path, query, or credentials. For example, in PowerShell:

```powershell
$env:SITE_URL = 'https://your-confirmed-domain.com'
npm run build
npm start
```

Without SITE_URL the site uses http://localhost:3000 for local development. Do not publish that build: canonical URLs, sitemap, social cards, and JSON-LD must use the final domain. Configure HTTP-to-HTTPS redirects and HSTS at the production host after the domain and proxy setup are known. Do not trust arbitrary forwarded headers. Public deployments need a review of host-specific CSP settings.

## Verification

```sh
npm run check
npm run format:check
npm audit
```

The check command runs ESLint, route type generation, TypeScript, a production build, and Chromium tests on desktop and mobile. Browser tests run against a separate production server on port 3100. Run npm run build before npm test when running tests alone. Tests cover contact URLs, enquiry validation and encoding, menu interactions, FAQ keyboard behavior, images, headings, SEO, JSON-LD safety, robots, sitemap, 404s, security headers, and automated WCAG checks. A passing automated accessibility scan does not replace testing with assistive technology. Performance under 10,000 concurrent users has not been load-tested.

## Code organization

- src/app/: the main page, shared layout, custom 404, sitemap, robots, icon, and styles.
- src/components/: reusable buttons, brand/icons, responsive navigation, footer, motion controller, marquee, perspective slider, insight dialogs, and WhatsApp enquiry form.
- src/components/service-stack.tsx: progressive sticky service stacking with viewport-aware pinning offsets.
- src/lib/site.ts: business identity, contact details, navigation, services, process, and FAQ copy.
- src/lib/seo.ts: validated metadata, canonical origin, social cards, and safe JSON-LD serialization.
- public/images/reference/: locally served AVIF reference photographs.
- src/app/fonts/: self-hosted variable Geist font and its OFL license.
- docs/asset-sources.json: photo provenance and font source.
- tests/e2e/: functional, responsive, accessibility, and SEO checks.
- SEO-RULES.md: mandatory rules for future pages; referenced by AGENTS.md.

The sitemap automatically discovers static public pages, including route groups. It excludes private/system paths and fails explicitly if dynamic routes are added without a content source.

## Contact behavior and privacy

Phone links call +92 308 6268500. Email links open the visitor's email application. WhatsApp buttons connect to the same number. The form validates inputs, URL-encodes the message, and opens WhatsApp for the visitor to review and send. There is no claim that a message has been delivered. No enquiry is stored on this website. The interface explains the handoff and provides a direct WhatsApp link if a browser blocks the new tab.

## Performance and security

Public pages and crawl files are prerendered. The page composition stays on the server; navigation, the form, slider, dialogs, marquee controls, and scroll-reveal controller use small client components. Photography uses next/image with responsive sizing, hero preload, and lazy loading below the fold. The variable Geist font is self-hosted through next/font/local, without runtime Google Font requests. Dependencies are reproducibly locked. Response headers disable framing and MIME sniffing and restrict unused browser capabilities. No credentials, database queries, password handling, or protected admin routes are introduced.

## Motion and interactions

The hero uses separately masked headline lines and a short image-settle animation. A single IntersectionObserver coordinates staggered text, list, card, and clipped-image reveals. Only offscreen elements are concealed after JavaScript initializes; content remains visible in server HTML and without JavaScript. Pending reveals are released and active animations cancelled when reduced motion is requested or the page unmounts.

On devices with a fine pointer, [Lenis](https://github.com/darkroomengineering/lenis) is loaded on demand for desktop wheel easing. Touch scrolling stays native. Reduced-motion users do not initialize the scroll controller; changing the preference live destroys it. Anchor navigation retains URL history, supports browser back/forward, and moves focus to the destination without a second scroll. Textareas, selects, and dialogs preserve native scrolling; modal dialogs lock the page behind them.

Browsers with scroll-timeline support add gentle photo parallax and a thin reading-progress line without per-frame React state updates. Other browsers retain the same layout and normal image treatments. Shared easing curves keep entrances, button hover effects, and transitions consistent.

The scrolling topic strip has a pause/play control and also pauses on hover. The perspective slider crossfades portraits while its text enters separately, and supports previous/next buttons, direct slide selection, arrow keys, and touch swipes. It does not auto-advance. Insight cards open labelled native dialogs with eased entry/exit, focus management, and Escape dismissal. FAQ expansion uses intrinsic-size transitions where supported. Image hover effects, rolling button labels, process-card expansion, mobile menu transitions, and the post-hero navigation complete the interaction system. All motion respects prefers-reduced-motion; process descriptions remain visible on touch layouts and with reduced motion.

Service cards now pin at the reference's 100px desktop offset, with each incoming opaque card covering the previous one. A ResizeObserver adjusts the offset for cards taller than the viewport so the full content can be read before pinning. There is no per-scroll stacking JavaScript. Narrow screens, reduced motion, and no-JavaScript browsing use a normal flowing list. Keyboard focus temporarily returns the stack to normal flow so covered links remain reachable.

The shared HoverText primitive provides the same masked text transition for action buttons, property-perspective titles, and insight titles. Its duplicate visual layer is hidden from assistive technology. Process descriptions expand within fixed-height cards using intrinsic grid sizing, with matching hover and keyboard focus states; descriptions stay open on touch layouts. These interactions reproduce the observed reference behaviors without inventing business content.

Browser tests cover these interactions, actual service-card overlap and paint order, short viewports, covered-control keyboard access, hover/focus text reveals, actual wheel easing, anchor history/focus, portrait crossfades, native dialog scrolling, live reduced-motion changes, keyboard and touch behavior, the no-JavaScript fallback, and reference typography/layout checks alongside the existing SEO, contact, and accessibility checks.

## Imagery and personalization

Photographs currently reproduce the imagery treatment of the user-supplied Factorive reference. They are illustrative, not photographs of Usman, his clients, or his listings. The brand mark is a local SVG. Replace illustrative photos with approved business photography during personalization. Source URLs are recorded in docs/asset-sources.json; confirm the photographic assets' reuse rights before a public launch.

Reference: [Factorive](https://factorive.webflow.io/). Font: [Geist in Google Fonts](https://github.com/google/fonts/tree/main/ofl/geist), distributed under the included SIL Open Font License.

The final domain, service areas, official brand assets, and any additional business-specific details are pending personalization. No deployment has been performed.
