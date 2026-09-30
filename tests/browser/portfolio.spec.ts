import { expect, test } from "@playwright/test";

test("portfolio hydrates, navigates, loads images, and opens Gmail", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.waitForFunction(() => {
    const island = document.querySelector("astro-island");
    return island && !island.hasAttribute("ssr");
  });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Digital Chaos");
  await page.waitForFunction(() => {
    const overlay = document.querySelector<HTMLElement>(".fixed.inset-0");
    return overlay && overlay.getBoundingClientRect().height < 1;
  });
  await page.evaluate(() => document.fonts.ready);
  // Wait for the entrance tween, not merely the shorter loading overlay.
  await expect(page.getByRole("button", { name: "View Projects" })).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await page.getByRole("button", { name: "View Projects" }).click();
  await expect.poll(() => page.locator("#projects").evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(150);

  if (testInfo.project.name === "mobile") {
    await page.locator("nav button").click();
  }
  await page.getByRole("link", { name: "Contact Me", exact: true }).filter({ visible: true }).click();
  await expect.poll(() => page.locator("#contact").evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(150);
  await page.getByPlaceholder("name or alias").fill("Migration Test");
  await page.getByPlaceholder("email@address.com").fill("test@example.com");
  await page.getByPlaceholder("echo 'Hello World'").fill("Hello & welcome");

  // Capture the browser boundary without requiring a Google login.
  await page.evaluate(() => {
    window.open = (url) => {
      document.documentElement.dataset.composeUrl = String(url);
      return null;
    };
  });
  await page.getByRole("button", { name: /Execute/ }).click();
  const composeUrl = await page.locator("html").getAttribute("data-compose-url");
  const url = new URL(composeUrl!);
  expect(url.origin).toBe("https://mail.google.com");
  expect(url.searchParams.get("to")).toBe("andredwpratama@gmail.com");
  expect(url.searchParams.get("body")).toBe("Name: Migration Test\nEmail: test@example.com\n\nMessage:\nHello & welcome");

  for (const image of await page.locator("img").all()) {
    // The hero deliberately floats forever, so don't wait for position stability.
    await image.evaluate((el) => el.scrollIntoView());
    await expect.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect.poll(() => page.evaluate(() => document.fonts.check('900 48px "Montserrat"'))).toBe(true);
  expect(errors).toEqual([]);
});

test("static homepage is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.locator(".fixed.inset-0").evaluate((el) => el.getBoundingClientRect().height)).toBe(0);
  await context.close();
});

test("unknown routes return 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Page not found", { exact: true })).toBeVisible();
});
