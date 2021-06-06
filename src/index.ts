import puppeteer from "puppeteer";
import { JetPunkPage } from "./models/jetpunk-page";
import { config } from "dotenv";

config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.jetpunk.com/user-quizzes/91108/countries-by-borders-in-90-seconds",
  );
  const jetPunkPage = new JetPunkPage(page);
  await jetPunkPage.login(process.env.JETPUNKUSERNAME!, process.env.PASSWORD!);

  await browser.close();
}

main();
