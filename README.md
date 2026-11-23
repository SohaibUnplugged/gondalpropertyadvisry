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
- public/images/gondal/: optimized business banners, Usman’s portrait, and society photographs.
- public/images/reference/: the four retained decorative process icons.
- src/app/fonts/: self-hosted variable Geist font and its OFL license.
- docs/asset-sources.json: photo provenance and font source.
- tests/e2e/: functional, responsive, accessibility, and SEO checks.
- SEO-RULES.md: mandatory rules for future pages; referenced by AGENTS.md.

The sitemap automatically discovers static public pages, including route groups. It excludes private/system paths and fails explicitly if dynamic routes are added without a content source.

## Contact behavior and privacy

Phone links call +92 308 6268500. Email links open the visitor's email application. WhatsApp buttons connect to the same number. The form validates inputs, URL-encodes the message, and opens WhatsApp for the visitor to review and send. There is no claim that a message has been delivered. No enquiry is stored on this website. The interface explains the handoff and provides a direct WhatsApp link if a browser blocks the new tab.

## Performance and security

Public pages and crawl files are prerendered. The page composition stays on the server; navigation, the form, slider, dialogs, marquee controls, and scroll-reveal controller use small client components. Photography uses next/image with responsive sizing and lazy loading below the fold. The hero uses the Next.js getImageProps art-direction pattern, loading the mobile or desktop banner through a single picture element with high fetch priority. The variable Geist font is self-hosted through next/font/local, without runtime Google Font requests. Dependencies are reproducibly locked. Response headers disable framing and MIME sniffing and restrict unused browser capabilities. No credentials, database queries, password handling, or protected admin routes are introduced.

## Motion and interactions

Animations run automatically, as explicitly requested by the site owner. There is no global animation toggle, system-mode selector, saved motion preference, or special preview URL requirement. The OS reduced-motion flag does not disable the site's animations. Legacy localStorage values and motion query parameters cannot switch them off.

The hero uses masked headline lines and an image-settle animation. A single IntersectionObserver coordinates staggered text, lists, cards, and clipped-image reveals. Server HTML remains readable without JavaScript, and active animations are cancelled on unmount.

On fine-pointer devices, [Lenis](https://github.com/darkroomengineering/lenis) loads on demand for desktop wheel easing. Touch scrolling stays native. Anchor navigation preserves URL history and destination focus. Textareas, selects, and dialogs scroll natively; modal dialogs lock the page behind them. Browsers with scroll-timeline support add photo depth and a reading-progress line without per-frame React state updates.

Service cards pin at the reference's 100px desktop offset and incoming opaque cards cover previous cards. ResizeObserver adjusts pinning for short viewports. Narrow screens and no-JavaScript browsing use normal flow. Keyboard focus exposes covered controls. Process descriptions expand on hover/focus and stay open on touch layouts. Shared HoverText handles masked title/button transitions, with duplicate visual text hidden from assistive technology.

The marquee has its existing pause/play control and hover behavior. Society photographs crossfade; the slider supports buttons, arrow keys, and swipes. Insight dialogs support eased entry/exit, focus management, and Escape dismissal. FAQs use intrinsic-size transitions where supported.

Run npm run dev, then npm run test:local in another terminal to verify the actual localhost:3000 server. The native-host regression explicitly uses reducedMotion: null and a desktop pointer, alongside emulated desktop/mobile cases. Tests verify automatic motion under the real OS preference, absence of the removed control, legacy settings, wheel easing, stacking, hover/focus states, and the no-JavaScript fallback. The local checks never replace or stop the user's running development server.

## Imagery and personalization

The hero selects the supplied desktop or mobile banner at a 700px breakpoint. Usman Ali’s supplied portrait appears in the About and FAQ sections. All 12 supplied societies have entrance photos and individual WhatsApp enquiry links; their interior photos also appear throughout the service, property focus, advice, and insight sections. No reference photography remains. Assets are normalized and compressed locally, with no embedded image metadata or remote image dependencies.

Society records are centralized in src/lib/site.ts. Add a name, stable slug, description, and local image there to create another card. Names come from the business-supplied archive, including its Kharian, Sarai Alamgir, Dinga, and Gujrat labels. These labels are not an independently verified office address or service-area claim. Copy makes no claims about current inventory, prices, approvals, developer authorization, or guaranteed returns. The site contains no property listings or invented testimonials.

Project identity research included [Grand City](https://grandcity.pk/kharian), [BSM Developers](https://www.bsmdevelopers.com/new-metro-city-kharian), [Dream City](https://dreamcitykharian.com/), and [Buraq City](https://buraqcity.com.pk/). Published descriptions use enquiry prompts rather than reproducing marketing claims. Project photos may represent an earlier stage or marketing imagery; current conditions and transaction terms require direct confirmation.

The visual layout remains inspired by [Factorive](https://factorive.webflow.io/). The four decorative process SVGs retain their source records in docs/asset-sources.json. Font: [Geist in Google Fonts](https://github.com/google/fonts/tree/main/ofl/geist), under the included SIL Open Font License.

The final domain and office address remain unconfirmed. No deployment has been performed. Commit and push source changes to the supplied GitHub repository; configure the final SITE_URL and production HTTPS hosting before public launch.
