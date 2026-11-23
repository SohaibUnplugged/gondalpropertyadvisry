import { expect, test } from "@playwright/test";

test("desktop wheel input is eased while touch devices retain native scrolling", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    await expect(page.locator(".hero-image")).toHaveCSS(
      "animation-name",
      "none",
    );
    return;
  }
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.evaluate(() => {
    const samples: number[] = [];
    (window as unknown as { scrollSamples: number[] }).scrollSamples = samples;
    const sample = () => {
      samples.push(window.scrollY);
      if (samples.length < 30) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.mouse.move(500, 450);
  await page.mouse.wheel(0, 600);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(550);
  const samples = await page.evaluate(
    () => (window as unknown as { scrollSamples: number[] }).scrollSamples,
  );
  expect(samples.some((position) => position > 0 && position < 550)).toBe(true);
});

test("reduced motion disables smoothing and releases pending content immediately", async ({
  page,
}) => {
  await page.goto("/");
  await expect
    .poll(() => page.locator('[data-motion="pending"]').count())
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator('[data-motion="pending"]')).toHaveCount(0);
  await expect(page.locator(".hero-title-line > span").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".portrait-layer").first()).toHaveCSS(
    "transition-duration",
    "0s",
  );
});

test("section links retain URL history and reach the intended section", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Services", exact: true })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect
    .poll(() =>
      page
        .locator("#services")
        .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
    )
    .toBeLessThan(160);
  if (!isMobile) await expect(page.locator("#services")).toBeFocused();
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/#about$/);
  await page.goBack();
  await expect(page).toHaveURL(/#services$/);
});

test("portrait changes crossfade without leaving the slider empty", async ({
  page,
}) => {
  await page.goto("/#perspectives");
  const layers = page.locator(".portrait-layer");
  await page.getByRole("button", { name: "Next perspective" }).click();
  await expect(layers.nth(1)).toHaveClass(/is-active/);
  await expect
    .poll(() =>
      layers.evaluateAll(
        (elements) =>
          elements
            .map((element) => Number(getComputedStyle(element).opacity))
            .filter((opacity) => opacity > 0.01 && opacity < 0.99).length,
      ),
    )
    .toBeGreaterThan(0);
  await expect(layers.nth(0)).toHaveCSS("opacity", "0");
  await expect(layers.nth(1)).toHaveCSS("opacity", "1");
  await expect(page.locator(".perspective-copy h3")).toHaveText(
    "Your next chapter deserves a clear starting point.",
  );
});

test("article scrolling does not move the page behind the dialog", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1000, height: 600 });
  await page.goto("/#insights");
  await page
    .getByRole("button", {
      name: /Start your property conversation with the right questions/,
    })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const initialScroll = await page.evaluate(() => window.scrollY);
  const rect = await dialog.boundingBox();
  await page.mouse.move(rect!.x + rect!.width / 2, rect!.y + rect!.height / 2);
  await page.mouse.wheel(0, 400);
  await expect
    .poll(() => dialog.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
