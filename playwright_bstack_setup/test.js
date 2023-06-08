const { test, expect } = require('@playwright/test');


(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();