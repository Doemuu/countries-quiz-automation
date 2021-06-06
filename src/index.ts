import puppeteer from "puppeteer";
import { JetPunkPage } from "./models/jetpunk-page";
import { config } from "dotenv";
import axios from "axios";
import { Country } from "./types/country";
import { SLEEP_TIME } from "./constants/index";

config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.jetpunk.com/user-quizzes/91108/countries-by-borders-in-90-seconds",
  );
  const jetPunkPage = new JetPunkPage(page);
  await jetPunkPage.login(process.env.JETPUNKUSERNAME!, process.env.PASSWORD!);

  const ax = axios.create({ baseURL: "https://restcountries.eu/rest/v2" });
  const countries = await ax.get<Country[]>("/all");

  await jetPunkPage.play(countries.data);

  await page.waitForTimeout(SLEEP_TIME);
  await page.screenshot({ path: "example.png" });
  await browser.close();
}

main();
