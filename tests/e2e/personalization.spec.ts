import { expect, test } from "@playwright/test";
import { societies, site } from "../../src/lib/site";

test("the hero selects the supplied banner for the viewport", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const hero = page.locator(".hero-image");
  await expect(hero).toHaveAttribute("alt", /Usman Ali/);
  await expect
    .poll(() => hero.evaluate((image: HTMLImageElement) => image.currentSrc))
    .toContain(isMobile ? "mobile-banner" : "desktop-banner");
  await expect
    .poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/images\/gondal\/social-banner.jpg$/,
  );
  await expect(page.locator('img[src*="reference"][src*=".avif"]')).toHaveCount(
    0,
  );
});

test("every supplied society has a loaded image and a correctly addressed enquiry", async ({
  page,
}) => {
  await page.goto("/#societies");
  await expect(page.locator(".society-card")).toHaveCount(12);
  for (const society of societies) {
    const card = page.locator(".society-card").filter({
      has: page.getByRole("heading", { name: society.name, exact: true }),
    });
    await card.scrollIntoViewIfNeeded();
    const image = card.getByRole("img");
    await expect(image).toHaveAttribute("alt", new RegExp(society.name));
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
    const source = await image.evaluate(
      (element: HTMLImageElement) => element.currentSrc,
    );
    expect(new URL(source).searchParams.get("q")).toBe("90");
    for (const link of await card.getByRole("link").all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.origin + url.pathname).toBe(site.whatsapp);
      expect(url.searchParams.get("text")).toBe(
        `Hello Usman, I would like to discuss ${society.name}.`,
      );
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  }
});

test("society content remains usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto("/#societies");
  await expect(page.locator(".society-card")).toHaveCount(societies.length);
  await expect(
    page.getByRole("heading", { name: "Grand City Kharian", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator(".society-card")
      .first()
      .getByRole("link", { name: "Discuss This Society" }),
  ).toHaveAttribute("href", /wa.me\/923086268500/);
  await context.close();
});

test("society titles reveal on focus with one accessible name", async ({
  page,
}) => {
  await page.goto("/#societies");
  const card = page.locator(".society-card").first();
  await card.locator(".society-photo").focus();
  await expect(card.locator("h3 .hover-text > span").first()).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(card.locator("h3 .hover-text > span").nth(1)).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(
    card.getByRole("heading", { name: societies[0].name, exact: true }),
  ).toHaveCount(1);
});
