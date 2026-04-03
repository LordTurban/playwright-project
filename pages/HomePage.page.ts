import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async goToSuperJumboRecords(): Promise<void> {
    await this.hamburgerMenuButton.click();
    await this.superJumboRecordsLink.click();
    await expect(this.page.url()).toContain("superjumbo-vinyl");
    await this.page.screenshot({
      path: "./screenshots/superjumbo.png",
      fullPage: true,
    });
    await this.page.close();
  }
}
