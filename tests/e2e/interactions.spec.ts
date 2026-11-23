import { expect, test } from "@playwright/test";

test("the reference visual system is used on desktop and mobile", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page
    .locator(".hero-bottom")
    .evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(242, 239, 233)",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "font-size",
    isMobile ? "30px" : "52px",
  );
  await expect(page.locator(".hero-image")).toHaveAttribute("src", /hero-1/);
  await expect(page.locator(".service-row")).toHaveCount(4);
  await expect(page.locator(".process-card")).toHaveCount(4);
  await expect(page.locator(".focus-row")).toHaveCount(4);
  await expect(page.locator(".option-card")).toHaveCount(3);
  await expect(page.locator(".footer-wordmark")).toHaveText("GONDAL");
});

test("the moving topic strip can be paused and resumed", async ({ page }) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause scrolling topics" });
  await pause.click();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.getByRole("button", { name: "Play scrolling topics" }).click();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-play-state",
    "running",
  );
});

test("perspective controls wrap, select slides, and support keyboard navigation", async ({
  page,
}) => {
  await page.goto("/#perspectives");
  const slide = page.locator(".perspective-copy");
  await expect(slide.getByRole("heading")).toHaveText(
    "A home starts with your everyday life.",
  );
  await page.getByRole("button", { name: "Next perspective" }).click();
  await expect(slide.getByRole("heading")).toHaveText(
    "Your next chapter deserves a clear starting point.",
  );
  await page.getByRole("button", { name: "Show perspective 3" }).click();
  await expect(
    page.getByRole("button", { name: "Show perspective 3" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Next perspective" }).click();
  await expect(
    page.getByRole("button", { name: "Show perspective 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Previous perspective" }).click();
  await expect(
    page.getByRole("button", { name: "Show perspective 3" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Previous perspective" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Show perspective 1" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("perspective cards respond to swipes", async ({ page }) => {
  await page.goto("/#perspectives");
  await page.locator(".perspective-card").evaluate((element) => {
    const start = new Touch({
      identifier: 1,
      target: element,
      clientX: 280,
      clientY: 100,
    });
    element.dispatchEvent(
      new TouchEvent("touchstart", { bubbles: true, touches: [start] }),
    );
    const end = new Touch({
      identifier: 1,
      target: element,
      clientX: 100,
      clientY: 100,
    });
    element.dispatchEvent(
      new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }),
    );
  });
  await expect(
    page.getByRole("button", { name: "Show perspective 2" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("insight articles open in a labelled dialog and return keyboard focus", async ({
  page,
}) => {
  await page.goto("/#insights");
  const card = page.getByRole("button", {
    name: /Start your property conversation with the right questions/,
  });
  await card.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText(
    "Start your property conversation with the right questions",
  );
  await expect(
    dialog.getByRole("link", { name: "Discuss with Usman" }),
  ).toHaveAttribute("href", "https://wa.me/923086268500");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
  await page
    .getByRole("button", { name: /Think about the life around your next home/ })
    .click();
  await expect(dialog.getByRole("heading")).toHaveText(
    "Think about the life around your next home",
  );
  await page.getByRole("button", { name: "Close article" }).click();
  await expect(dialog).toBeHidden();
});

test("scroll reveals run and navigation changes after the hero", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".about-intro h2").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-intro [data-reveal]")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await expect(page.locator(".site-header")).toHaveCSS(
    "background-color",
    "rgb(242, 239, 233)",
  );
});

test("reduced motion keeps content visible without continuous animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-bottom")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "opacity",
    "1",
  );
  await page.locator(".process-grid").scrollIntoViewIfNeeded();
  await expect(page.locator(".process-card p").first()).toHaveCSS(
    "opacity",
    "1",
  );
});

test("the page remains readable and contactable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".service-row h3").first()).toBeVisible();
  await expect(
    page.locator('a[href="tel:+923086268500"]').first(),
  ).toHaveAttribute("href", "tel:+923086268500");
  await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("button", { name: "Continue on WhatsApp" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("link", { name: "direct WhatsApp link" }),
  ).toHaveAttribute("href", "https://wa.me/923086268500");
  await context.close();
});
