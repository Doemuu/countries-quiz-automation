import { Page, Touchscreen } from "puppeteer";
import * as Selectors from "../constants/jetpunk-selectors";

export class JetPunkPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    const loginBtn = await this.page.$(Selectors.LOGIN_BTN);
    await loginBtn!.click();

    await this.page.waitForSelector(Selectors.LOGIN_USERNAME);

    await this.page.focus(Selectors.LOGIN_USERNAME);
    await this.page.keyboard.type(username);

    await this.page.waitForSelector(Selectors.LOGIN_PASSWORD);

    await this.page.focus(Selectors.LOGIN_PASSWORD);
    await this.page.keyboard.type(password);

    const offishalLoginBtn = await this.page.$(Selectors.OFFISHAL_LOGIN_BTN);
    await offishalLoginBtn!.click();

    await this.page.waitForSelector(Selectors.LOGIN_CLOSE);
    const closeBtn = await this.page.$(Selectors.LOGIN_CLOSE);
    await closeBtn!.click();
  }
}
