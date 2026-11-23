# Gondal Property Advisory

A responsive real estate advisory website for Usman Ali, inspired by the visual direction of Factorive. Built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. There are no property listings, database, accounts, or invented business statistics.

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
- src/components/: reusable brand/icons, responsive navigation, and WhatsApp enquiry form.
- src/lib/site.ts: business identity, contact details, navigation, services, process, and FAQ copy.
- src/lib/seo.ts: validated metadata, canonical origin, social cards, and safe JSON-LD serialization.
- public/images/: locally served architectural photographs.
- tests/e2e/: functional, responsive, accessibility, and SEO checks.
- SEO-RULES.md: mandatory rules for future pages; referenced by AGENTS.md.

The sitemap automatically discovers static public pages, including route groups. It excludes private/system paths and fails explicitly if dynamic routes are added without a content source.

## Contact behavior and privacy

Phone links call +92 308 6268500. Email links open the visitor's email application. WhatsApp buttons connect to the same number. The form validates inputs, URL-encodes the message, and opens WhatsApp for the visitor to review and send. There is no claim that a message has been delivered. No enquiry is stored on this website. The interface explains the handoff and provides a direct WhatsApp link if a browser blocks the new tab.

## Performance and security

Public pages and crawl files are prerendered. Only navigation and the form require client components. Hero and interior photography use next/image with responsive sizing, hero preload, and lazy loading below the fold. System fonts avoid external font downloads. Dependencies are reproducibly locked. Response headers disable framing and MIME sniffing and restrict unused browser capabilities. No credentials, database queries, password handling, or protected admin routes are introduced.

## Imagery and personalization

Architectural photographs illustrate the visual direction and are not represented as Usman's listings. No portrait of Usman has been fabricated. The brand mark is a local SVG. Replace illustrative photos with approved business photography when available.

Photo sources: [exterior](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9) via images.unsplash.com/photo-1600596542815-ffad4c1539a9 and [interior](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d). Images are subject to the [Unsplash license](https://unsplash.com/license).

The final domain, service areas, official brand assets, and any additional business-specific details are pending personalization. No deployment has been performed.
