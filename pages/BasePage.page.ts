import { Page, Locator, expect } from "@playwright/test";
import { basePageLocators } from "../locators/basePage.locators";

export class BasePage {
  readonly page: Page;
  readonly hamburgerMenuButton: Locator;
  readonly superJumboRecordsLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenuButton = page
      .locator(basePageLocators.hamburgerMenuButton)
      .first();
    this.superJumboRecordsLink = page
      .locator(basePageLocators.superJumboRecordsLink)
      .first();
  }

  async goToURL(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
