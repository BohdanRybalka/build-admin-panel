import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should display welcome text", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("text=Welcome to our construction expense tracker!")
    ).toBeVisible();
  });
});

test.describe("Auth page", () => {
  test("should switch between login and register", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.locator("text=Login")).toBeVisible();
    await page.click('button:has-text("Register")');
    await expect(page.locator("text=Register")).toBeVisible();
  });
});

test.describe("Projects page", () => {
  test("should require authentication", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveURL(/.*\/auth/);
  });
});
