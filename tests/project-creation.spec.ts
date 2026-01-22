import { test, expect } from "@playwright/test";

// Helper function to login before tests
async function login(page: any, username = "testuser", password = "testpass") {
  await page.goto("/auth");
  await page.fill('input[type="text"]', username);
  await page.fill('input[type="password"]', password);
  await page.click('button:has-text("Login")');
  // Wait for navigation to complete
  await page.waitForURL(/.*\/projects/, { timeout: 5000 });
}

test.describe("Project Creation - All Fields", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page);
  });

  test("should create project with all fields populated", async ({ page }) => {
    // Click 'Add Project' button to open AddProjectModal
    await page.click('button:has-text("Add Project")');

    // Wait for modal to be visible
    await expect(page.locator('text=Add New Project')).toBeVisible();

    // Fill all required fields
    await page.fill('input[placeholder="Project Name"]', "Integration Test");
    await page.fill('input[placeholder="Street Address"]', "123 Main St");

    // Fill Start Date (assuming DatePicker input)
    const today = new Date().toISOString().split("T")[0];
    await page.fill('input[placeholder="Select Date"]', today);

    // Fill Description
    await page.fill('textarea[placeholder*="description" i]', "Full test description for integration testing");

    // Fill Budget
    await page.fill('input[type="number"][placeholder*="budget" i]', "10000");

    // Fill Deadline (future date)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90); // 90 days in the future
    const futureDateStr = futureDate.toISOString().split("T")[0];
    await page.fill('input[placeholder*="deadline" i]', futureDateStr);

    // Fill Client
    await page.fill('input[placeholder*="client" i]', "Test Client");

    // Select Status
    await page.selectOption('select', { label: "Active" });

    // Fill Tags (comma-separated)
    await page.fill('input[placeholder*="tags" i]', "test,integration");

    // Click Save button
    await page.click('button:has-text("Save")');

    // Wait for modal to close (modal should disappear)
    await expect(page.locator('text=Add New Project')).not.toBeVisible({ timeout: 5000 });

    // Verify: New project appears in projects list
    await expect(page.locator('text=Integration Test')).toBeVisible({ timeout: 5000 });

    // Additional verification: Check if other fields are visible in the project card/tile
    await expect(page.locator('text=Test Client')).toBeVisible();
  });

  test("should create project with only required fields", async ({ page }) => {
    // Click 'Add Project' button
    await page.click('button:has-text("Add Project")');

    // Wait for modal to be visible
    await expect(page.locator('text=Add New Project')).toBeVisible();

    // Fill ONLY required fields
    await page.fill('input[placeholder="Project Name"]', "Minimal Test");
    await page.fill('input[placeholder="Street Address"]', "456 Oak Ave");

    // Fill Start Date
    const today = new Date().toISOString().split("T")[0];
    await page.fill('input[placeholder="Select Date"]', today);

    // Status should have a default value or be selected
    // Verify default status is "Planning"
    const statusSelect = page.locator('select');
    await expect(statusSelect).toHaveValue("Planning");

    // Leave optional fields empty: Description, Budget, Deadline, Client, Tags

    // Click Save button
    await page.click('button:has-text("Save")');

    // Wait for modal to close
    await expect(page.locator('text=Add New Project')).not.toBeVisible({ timeout: 5000 });

    // Verify: Project created successfully
    await expect(page.locator('text=Minimal Test')).toBeVisible({ timeout: 5000 });
  });

  test("should validate required fields", async ({ page }) => {
    // Click 'Add Project' button
    await page.click('button:has-text("Add Project")');

    // Wait for modal to be visible
    await expect(page.locator('text=Add New Project')).toBeVisible();

    // Try to submit without filling required fields
    await page.click('button:has-text("Save")');

    // Modal should still be visible (submission failed)
    await expect(page.locator('text=Add New Project')).toBeVisible();

    // There might be validation error messages
    // (This depends on the implementation - adjust selectors as needed)
  });

  test("should handle form cancellation", async ({ page }) => {
    // Click 'Add Project' button
    await page.click('button:has-text("Add Project")');

    // Wait for modal to be visible
    await expect(page.locator('text=Add New Project')).toBeVisible();

    // Fill some fields
    await page.fill('input[placeholder="Project Name"]', "Cancel Test");

    // Click Cancel or Close button
    await page.click('button:has-text("Cancel")');

    // Modal should close
    await expect(page.locator('text=Add New Project')).not.toBeVisible({ timeout: 5000 });

    // Project should NOT be created
    await expect(page.locator('text=Cancel Test')).not.toBeVisible();
  });
});

test.describe("Project Creation - Field Validation", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.click('button:has-text("Add Project")');
    await expect(page.locator('text=Add New Project')).toBeVisible();
  });

  test("should accept valid budget value", async ({ page }) => {
    await page.fill('input[type="number"][placeholder*="budget" i]', "5000");
    const budgetInput = page.locator('input[type="number"][placeholder*="budget" i]');
    await expect(budgetInput).toHaveValue("5000");
  });

  test("should handle tags as comma-separated values", async ({ page }) => {
    await page.fill('input[placeholder*="tags" i]', "construction,residential,urgent");
    const tagsInput = page.locator('input[placeholder*="tags" i]');
    await expect(tagsInput).toHaveValue("construction,residential,urgent");
  });

  test("should have all status options in dropdown", async ({ page }) => {
    const statusOptions = await page.locator('select option').allTextContents();

    // Verify all expected status options are present
    expect(statusOptions).toContain("Planning");
    expect(statusOptions).toContain("Active");
    expect(statusOptions).toContain("On Hold");
    expect(statusOptions).toContain("Completed");
  });
});
