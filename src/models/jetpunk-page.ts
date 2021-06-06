import { ElementHandle, Page } from "puppeteer";
import * as Selectors from "../constants/jetpunk-selectors";
import { Country } from "../types/country";
import { countries } from "../constants/countries_alt";

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

  async play(entries: Array<Country>) {
    await this.page.waitForSelector(Selectors.QUIZ_START);
    const startBtn = await this.page.$(Selectors.QUIZ_START);
    await startBtn!.click();

    await this.page.waitForSelector(Selectors.QUIZ_INPUT);

    await this.page.waitForSelector(Selectors.QUIZ_MAP);
    const map = await this.page.$(Selectors.QUIZ_MAP);

    for (const country of entries) {
      await this.page.focus(Selectors.QUIZ_INPUT);
      const c = await map!.$(`#${country.alpha2Code.toLowerCase()}`);
      if (c !== null) {
        await this.page.keyboard.type(country.name);
      }
      const element = await this.page.$(Selectors.QUIZ_INPUT);
      await this.page.evaluate((element: any) => {
        element.value = "";
      }, element);
    }
    for (const backupcountry of countries) {
      await this.page.focus(Selectors.QUIZ_INPUT);
      await this.page.keyboard.type(backupcountry);
      this.resetCountryInput();
    }
  }
  async resetInput(element: ElementHandle<Element>) {
    await this.page.evaluate((element: any) => {
      element.value = "";
    }, element);
  }
  async resetCountryInput() {
    const element = await this.page.$(Selectors.QUIZ_INPUT);
    this.resetInput(element!);
  }
}
