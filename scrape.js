const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  // ✅ ADD YOUR LINKS HERE
  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=56",
    "https://sanand0.github.io/tdsdata/js_table/?seed=57",
    "https://sanand0.github.io/tdsdata/js_table/?seed=58",
    "https://sanand0.github.io/tdsdata/js_table/?seed=59",
    "https://sanand0.github.io/tdsdata/js_table/?seed=60",
    "https://sanand0.github.io/tdsdata/js_table/?seed=61",
    "https://sanand0.github.io/tdsdata/js_table/?seed=62",
    "https://sanand0.github.io/tdsdata/js_table/?seed=63",
    "https://sanand0.github.io/tdsdata/js_table/?seed=64",
    "https://sanand0.github.io/tdsdata/js_table/?seed=65"
  ];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Page ${i + 1} sum: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", totalSum);
  console.log("=================================");

  await browser.close();
}

run();
