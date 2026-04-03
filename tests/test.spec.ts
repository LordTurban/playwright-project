import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.page";

test.describe("Tests for Yeete Page shenanigans", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goToURL("/");
  });

  test("Should visit SuperJumboRecords", async ({ page }) => {
    await homePage.goToSuperJumboRecords();
  });
});
