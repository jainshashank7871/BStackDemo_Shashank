// @ts-check
const { test, expect } = require('@playwright/test');

let email = process.env.BROWSERSTACK_EMAIL || 'jainshashank7871@gmail.com';
let pwd = process.env.BROWSERSTACK_PWD || 'Welcome@12';

let url = 'https://live.browserstack.com/dashboard';

test('BstackDemo Live Login', async ({ page },testInfo) => {

  try{

    await page.evaluate(_ => {},`browserstack_executor: ${JSON.stringify({action: "setSessionName", arguments: {name:testInfo.project.name}})}`);
    await page.waitForTimeout(5000);

    await page.goto(url,{ waitUntil: 'networkidle' });

    const email_element = await page.$("#user_email_login");

    // @ts-ignore
    await email_element.type(email);

    const pwd_element = await page.$("#user_password");

    // @ts-ignore
    await pwd_element.type(pwd);

    console.log(email, pwd);

    const submit_element = await page.$("#user_submit");

    // @ts-ignore
    await submit_element.click();

    await page.waitForTimeout(16000);

    const invite_element = await page.$("#invite-link");
    

    try {
      
      // Attempt to find a element
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

    if (invite_element){
      await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Successfully logged in'}})}`);
    }
    else{
      await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Test failed'}})}`);
    }

  } catch (e) {
    console.log(e);
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Test failed'}})}`);

  }  

});