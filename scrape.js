const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 56; seed <= 65; seed++) {
    const url = `https://example.com?seed=${seed}`;  // replace with real URL
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", totalSum);
  console.log("=================================");

  await browser.close();
}

run();
