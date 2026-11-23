import { expect, test } from "@playwright/test";
import { societies, guides, services } from "../../src/lib/site";

test("refreshed photos use versioned URLs and larger supplied alternatives", () => {
  for (const society of societies) {
    if (["eiffel-city-dinga", "noor-garden-gujrat"].includes(society.slug))
      continue;
    expect(society.image).toMatch(/-entrance-[a-f0-9]{12}\.webp$/);
  }
  expect(services[2].image).toContain("citi-housing-kharian-entrance-");
  expect(guides[1].image).toContain("buraq-city-entrance-");
  expect(societies).toHaveLength(12);
});

test("optimized society images accept the intended quality and reject arbitrary qualities", async ({
  request,
}) => {
  const query = new URLSearchParams({
    url: societies[0].image,
    w: "640",
    q: "90",
  });
  const image = await request.get(`/_next/image?${query}`);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toMatch(/^image\//);
  query.set("q", "91");
  expect((await request.get(`/_next/image?${query}`)).status()).toBe(400);
});

test("retina screens request enough pixels for the society cards", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("/#societies");
  for (const card of await page.locator(".society-card").all()) {
    await card.scrollIntoViewIfNeeded();
    const image = card.locator("img");
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const sizing = await image.evaluate((element: HTMLImageElement) => ({
      requested: Number(new URL(element.currentSrc).searchParams.get("w")),
      required: element.getBoundingClientRect().width * window.devicePixelRatio,
    }));
    expect(sizing.requested).toBeGreaterThanOrEqual(Math.ceil(sizing.required));
  }
  await context.close();
});
