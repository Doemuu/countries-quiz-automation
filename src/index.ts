import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.jetpunk.com/user-quizzes/91108/countries-by-borders-in-90-seconds"
  );
  await page.screenshot({ path: "example.png" });

  await browser.close();
}

main();
