const { chromium } = require('playwright');
require('dotenv').config();

let email = process.env.BROWSERSTACK_EMAIL;
let pwd = process.env.BROWSERSTACK_PWD;

let url = 'https://live.browserstack.com/dashboard';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  // await context.clearCookies();

  // await page.clearCache();

  /** tets tetste tste*/

  const email_element = await page.$("#user_email_login");

  await email_element.type(email);

  const pwd_element = await page.$("#user_password");

  await pwd_element.type(pwd);

  console.log(email, pwd);

  const submit_element = await page.$("#user_submit");

  await submit_element.click();

  await page.waitForTimeout(16000);


  const mac_block1 = await page.$$('.accordion--mac'); // Finds all elements with the specified class name

  // Iterate over the elements and perform actions
  for (const element of mac_block1) {
    await element.click();
  }

  await page.waitForTimeout(3000);

  try {
    
    // Attempt to find a non-existent element
    const nonExistentElement = await page.$('.non-existent-element');

    if (!nonExistentElement) {
      console.log('Negative test case passed: Non-existent element is not found.');
    } else {
      console.error('Negative test case failed: Non-existent element found.');
    }
  } catch (error) {
    console.error('Negative test case failed:', error);
  } finally {
    console.log('all test done');
  }

  /** tets tetste tste*/

  await page.screenshot({ path: 'example.png' });


  // await context.close();

  await browser.close();
})();