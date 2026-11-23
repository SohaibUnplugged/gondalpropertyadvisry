import { expect, test } from "@playwright/test";

import AxeBuilder from "@axe-core/playwright";
import { pageMetadata, safeJsonLd } from "../../src/lib/seo";

test("SEO helper rejects invalid metadata and off-site canonical URLs", () => {
  const input = {
    title: "Gondal Property Advisory | Your Next Move, Made Clear",
    description:
      "Make your next property decision with Gondal Property Advisory. Speak directly with Usman Ali about buying, selling, and your property investment goals.",
  };
  expect(() => pageMetadata({ ...input, title: "Short" })).toThrow();
  expect(() => pageMetadata({ ...input, description: "Short" })).toThrow();
  for (const path of [
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/?query=value",
    "/#fragment",
  ])
    expect(() => pageMetadata({ ...input, path })).toThrow();
  expect(pageMetadata({ ...input, noindex: true }).robots).toEqual({
    index: false,
    follow: false,
  });
  expect(
    safeJsonLd({ text: "</script><script>alert(1)</script>" }),
  ).not.toContain("<");
});

test("page meets automated WCAG accessibility checks", async ({ page }) => {
  await page.goto("/");
  await page
    .locator(".hero-bottom")
    .evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("page SEO and structured data match the visible business", async ({
  page,
}) => {
  await page.goto("/");
  const title = await page.title();
  expect(title.length).toBeGreaterThanOrEqual(50);
  expect(title.length).toBeLessThanOrEqual(60);
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute("content");
  expect(description!.length).toBeGreaterThanOrEqual(140);
  expect(description!.length).toBeLessThanOrEqual(160);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^http:\/\/localhost:3000\/?$/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    title,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent())!,
  )["@graph"];
  expect(
    graph.map((item: { "@type": string }) => item["@type"]).flat(),
  ).toEqual(
    expect.arrayContaining([
      "Organization",
      "RealEstateAgent",
      "WebSite",
      "BreadcrumbList",
      "FAQPage",
      "HowTo",
    ]),
  );
  expect(
    graph.find((item: { "@type": string }) => item["@type"] === "FAQPage")
      .mainEntity,
  ).toHaveLength(4);
  const levels = await page
    .locator("h1,h2,h3,h4,h5,h6")
    .evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    );
  levels.forEach((level, index) => {
    if (index) expect(level).toBeLessThanOrEqual(levels[index - 1] + 1);
  });
  for (const image of await page.getByRole("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  }
});

test("crawl files include the public route and exclude private paths", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const text = await robots.text();
  expect(text).toContain("Sitemap: http://localhost:3000/sitemap.xml");
  expect(text).toContain("Disallow: /admin");
  expect(text).toContain("Disallow: /form-submit");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<loc>http://localhost:3000/</loc>");
  expect(await sitemap.text()).not.toMatch(/<loc>[^<]*(admin|thank-you|api)/);
});

test("FAQ answers open and close with the keyboard", async ({ page }) => {
  await page.goto("/#faqs");
  const summary = page.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).not.toHaveAttribute("open");
});

test("all contact links use the supplied contact details", async ({ page }) => {
  await page.goto("/");
  for (const link of await page.locator('a[href^="tel:"]').all())
    await expect(link).toHaveAttribute("href", "tel:+923086268500");
  for (const link of await page.locator('a[href*="wa.me"]').all())
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/wa.me\/923086268500(?:\?|$)/,
    );
  for (const link of await page.locator('a[href^="mailto:"]').all())
    await expect(link).toHaveAttribute(
      "href",
      "mailto:usman_gondal777@yahoo.com",
    );
  for (const link of await page.locator('main a[href^="#"]').all()) {
    const id = (await link.getAttribute("href"))!.slice(1);
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  }
});

test("enquiry rejects missing and whitespace-only input", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Your name").fill("  ");
  await page.getByLabel(/interested in/).selectOption("Buying a property");
  await page.getByLabel("What do you have in mind?").fill("          ");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Please enter your name",
  );
});

test("valid enquiry safely prepares a WhatsApp message", async ({ page }) => {
  await page.goto("/#contact");
  await page.evaluate(() => {
    window.open = (url) => {
      (window as unknown as { preparedUrl: string }).preparedUrl = String(url);
      return null;
    };
  });
  await page.getByLabel("Your name").fill("Ali & Family");
  await page.getByLabel(/interested in/).selectOption("Buying a property");
  await page
    .getByLabel("What do you have in mind?")
    .fill("Looking for a home & garden. What should I consider?");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  const url = new URL(
    await page.evaluate(
      () => (window as unknown as { preparedUrl: string }).preparedUrl,
    ),
  );
  expect(url.origin + url.pathname).toBe("https://wa.me/923086268500");
  expect(url.searchParams.get("text")).toContain("Ali & Family");
  expect(url.searchParams.get("text")).toContain("home & garden");
  await expect(page.locator(".form-note")).toContainText(
    "Review it and tap send",
  );
});

test("mobile menu closes on navigation and Escape", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (!isMobile) {
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeHidden();
    return;
  }
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await expect(page).toHaveURL(/#services$/);
});

test("layout stays usable across small phones, tablets, and wide screens", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page
      .locator(".hero-bottom")
      .evaluate((element) =>
        Promise.all(
          element.getAnimations().map((animation) => animation.finished),
        ),
      );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    const actions = await page.locator(".hero-actions").boundingBox();
    const hero = await page.locator(".hero").boundingBox();
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(
      actions!.y + actions!.height,
      `hero actions extend beyond the hero at ${width}px`,
    ).toBeLessThanOrEqual(hero!.y + hero!.height);
    expect(
      heading!.y + heading!.height,
      `hero heading overlaps actions at ${width}px`,
    ).toBeLessThan(actions!.y);
    await expect(
      page.getByRole("button", { name: "Continue on WhatsApp" }),
    ).toBeEnabled();
  }
});
