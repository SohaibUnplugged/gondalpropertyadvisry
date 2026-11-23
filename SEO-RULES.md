# SEO rules for every future page

- Use a shared, typed metadata helper with the production origin from environment configuration. Never invent a production domain.
- Generate sitemap.xml from public page routes and content records. Exclude admin, thank-you, submission endpoints, and error pages.
- Serve robots.txt with an absolute Sitemap URL; disallow admin and form submission routes. Robots rules never replace authorization.
- Public content must be indexable. Use noindex for admin and thank-you pages; preserve framework noindex behavior for errors.
- Give each content page a unique title of 50–60 characters and description of 140–160 characters.
- Include an absolute canonical URL, Open Graph metadata, and Twitter card metadata on each content page.
- Use exactly one h1 and sequential heading levels. Supply meaningful image alt text, or empty alt text for decorative images.
- Add WebSite and Organization JSON-LD with verified identity details. Add BreadcrumbList where appropriate. FAQPage and HowTo must match visible content; never fabricate questions or steps for schema.
- Escape JSON-LD safely before embedding it in HTML.
- Include a favicon, document language, and responsive viewport.
- Use short, descriptive URL slugs and a custom 404 page. Enforce HTTPS at the trusted hosting boundary; configure proxy trust explicitly.
- Keep business claims specific to Gondal Property Advisory. Do not add unrelated brand disclaimers, fabricated results, testimonials, addresses, or listings.
- Prefer Server Components and static rendering for public content, next/image for content images, and local or system fonts. Keep client JavaScript small.
- Test metadata, indexing exclusions, sitemap coverage, canonical URLs, semantic headings, image alternatives, structured data, responsive behavior, and failure paths before release.

Use `src/lib/seo.ts` for each page's metadata. The sitemap discovers static public App Router pages at build time; supply a content source before adding dynamic routes. Set SITE_URL to the real HTTPS origin before publishing, then rebuild. Local development defaults to http://localhost:3000.
