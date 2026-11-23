import { devices, expect, test } from "@playwright/test";

test("animations run automatically under the real host motion setting", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    ...devices["Desktop Chrome"],
    baseURL,
    viewport: { width: 1440, height: 900 },
    reducedMotion: null,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await expect(page.locator(".service-list")).toHaveAttribute(
    "data-stack",
    "enabled",
  );
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const before = await page
    .locator(".marquee-track")
    .evaluate((element) => getComputedStyle(element).transform);
  await expect
    .poll(() =>
      page
        .locator(".marquee-track")
        .evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(before);
  await context.close();
});

test("OS reduced motion does not require an opt-in button", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await expect(
    page.getByRole("group", { name: "Website animation settings" }),
  ).toHaveCount(0);
  if (!isMobile) {
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await expect(page.locator(".service-list")).toHaveAttribute(
      "data-stack",
      "enabled",
    );
    await page.mouse.move(500, 400);
    await page.mouse.wheel(0, 500);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(400);
  }
});

test("legacy motion URL parameters cannot switch animations off", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?motion=reduced&source=preview#services");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await expect(page).toHaveURL(/motion=reduced&source=preview#services$/);
});

test("a previously saved reduced setting cannot disable animations", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("gondal.motion-preference", "reduced"),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await page.reload();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
});

test("later OS preference changes keep motion running", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await expect(page.locator(".hero-title-line > span").first()).toHaveCSS(
    "animation-name",
    "title-line-in",
  );
});

test("browser storage is not needed for animations", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  expect(errors).toEqual([]);
});

test("the removed animation controls and accessibility override stylesheet are absent", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".motion-control")).toHaveCount(0);
  await expect(page.locator("#motion-reduction")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Use system motion setting" }),
  ).toHaveCount(0);
});

test("CSS marquee motion remains available without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "marquee-scroll",
  );
  await expect(page.locator(".motion-control")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await context.close();
});
