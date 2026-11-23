import { expect, test } from "@playwright/test";

test("service cards pin and the incoming card paints over the previous card", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const list = page.locator(".service-list");
  if (isMobile) {
    await expect(list).not.toHaveAttribute("data-stack", "enabled");
    await expect(page.locator(".service-row").first()).toHaveCSS(
      "position",
      "relative",
    );
    return;
  }
  await expect(list).toHaveAttribute("data-stack", "enabled");
  const rows = page.locator(".service-row");
  await rows.first().evaluate((row) => {
    const top = row.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - Number.parseFloat(getComputedStyle(row).top) + 120,
      behavior: "instant",
    });
  });
  await expect
    .poll(() =>
      rows
        .first()
        .evaluate((row) =>
          Math.abs(
            row.getBoundingClientRect().top -
              Number.parseFloat(getComputedStyle(row).top),
          ),
        ),
    )
    .toBeLessThan(2);
  const pinned = (await rows.first().boundingBox())!.y;
  const incoming = await rows.nth(1).boundingBox();
  const outgoing = await rows.first().boundingBox();
  expect(incoming!.y).toBeLessThan(outgoing!.y + outgoing!.height);
  expect(
    await list.evaluate((element) => {
      const rows = element.querySelectorAll(".service-row");
      const next = rows[1].getBoundingClientRect();
      return (
        document
          .elementFromPoint(next.x + 30, next.y + 20)
          ?.closest(".service-row") === rows[1]
      );
    }),
  ).toBe(true);
  await page.evaluate(() => window.scrollBy({ top: 100, behavior: "instant" }));
  await expect
    .poll(async () => (await rows.first().boundingBox())!.y)
    .toBeCloseTo(pinned, 0);
});

test("short desktop viewports keep the full service card reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 420 });
  await page.goto("/");
  await expect(page.locator(".service-list")).toHaveAttribute(
    "data-stack",
    "enabled",
  );
  const first = page.locator(".service-row").first();
  const metrics = await first.evaluate((row) => ({
    top: Number.parseFloat(getComputedStyle(row).top),
    height: row.getBoundingClientRect().height,
    viewport: document.documentElement.clientHeight,
  }));
  expect(metrics.top + metrics.height).toBeLessThanOrEqual(
    metrics.viewport - 23,
  );
  await first.evaluate((row) =>
    window.scrollTo({
      top:
        row.getBoundingClientRect().top +
        window.scrollY -
        Number.parseFloat(getComputedStyle(row).top),
      behavior: "instant",
    }),
  );
  await expect(
    first.getByRole("link", { name: "Discuss Your Plans" }),
  ).toBeInViewport();
  await first
    .getByRole("link", { name: "Discuss Your Plans" })
    .click({ trial: true });
});

test("keyboard navigation exposes service controls that were covered by the stack", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto("/");
  await page.locator(".service-row").nth(2).scrollIntoViewIfNeeded();
  await page.keyboard.press("Tab");
  const first = page.locator(".service-row").first();
  const link = first.getByRole("link", { name: "Discuss Your Plans" });
  await link.focus();
  await expect(link).toBeFocused();
  await expect(first).toHaveCSS("position", "relative");
  await expect(link).toBeInViewport();
  await link.click({ trial: true });
});

test("process descriptions expand on hover and focus without resizing the card", async ({
  page,
  isMobile,
}) => {
  await page.goto("/#approach");
  const card = page.locator(".process-card").first();
  const description = card.locator(".process-description");
  await card.scrollIntoViewIfNeeded();
  if (isMobile) {
    await expect
      .poll(() =>
        description.evaluate(
          (element) => element.getBoundingClientRect().height,
        ),
      )
      .toBeGreaterThan(30);
    return;
  }
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      description.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeLessThan(1);
  const height = (await card.boundingBox())!.height;
  await card.hover();
  await expect
    .poll(() =>
      description.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeGreaterThan(50);
  expect((await card.boundingBox())!.height).toBeCloseTo(height, 0);
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      description.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeLessThan(1);
  await card.focus();
  await expect
    .poll(() =>
      description.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeGreaterThan(50);
});

test("project and article titles reveal masked text with a single accessible name", async ({
  page,
}) => {
  await page.goto("/#property-focus");
  const project = page.locator(".focus-row").first();
  const title = project.locator(".hover-text");
  await project.hover();
  await expect(title.locator("span").first()).toHaveCSS("opacity", "0");
  await expect(title.locator("span").nth(1)).toHaveCSS("opacity", "1");
  await expect(
    project.getByRole("heading", { name: "Residential", exact: true }),
  ).toHaveCount(1);
  await page.mouse.move(0, 0);
  await project.getByRole("link", { name: "Residential", exact: true }).focus();
  await expect(title.locator("span").nth(1)).toHaveCSS("opacity", "1");
  const article = page.getByRole("button", {
    name: /Start your property conversation with the right questions/,
  });
  await article.hover();
  await expect(article.locator("h3 .hover-text > span").nth(1)).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(article).toHaveCount(1);
});

test("stacking and reveals remain enabled under the system reduced-motion flag", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  if (isMobile)
    await expect(page.locator(".service-list")).not.toHaveAttribute(
      "data-stack",
      "enabled",
    );
  else
    await expect(page.locator(".service-list")).toHaveAttribute(
      "data-stack",
      "enabled",
    );
  await expect(page.locator(".service-row").first()).toHaveCSS(
    "position",
    isMobile ? "relative" : "sticky",
  );
  const description = page.locator(".process-description").first();
  await page.locator(".process-card").first().focus();
  await expect
    .poll(() =>
      description.evaluate((element) => element.getBoundingClientRect().height),
    )
    .toBeGreaterThan(30);
  await expect(page.locator(".focus-row .hover-text > span").nth(1)).toHaveCSS(
    "display",
    "block",
  );
});
