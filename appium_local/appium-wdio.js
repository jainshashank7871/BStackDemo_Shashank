var assert = require('assert');
const wd = require('wd');

async function runTest() {
  const desiredCaps = {
    platformName: 'Android',
    platformVersion: '11.0',
    deviceName: 'ONEPLUS A6000', // Replace with your device name
    app: '/Users/shashankjain/Documents/work/BStackDemo_Shashank/appium_local/WikipediaSample.apk',
    automationName: 'UiAutomator2',
    project: 'First NodeJS project',
    build: 'Wikipedia Android Project',
    name: 'first_test_1',
  };

  const driver = wd.promiseRemote('http://localhost:4723/wd/hub');

  // Test case for the BrowserStack sample Android app.
  // If you have uploaded your app, update the test case here.
  describe('Search Wikipedia Functionality', () => {
    it('can find search results', async () => {
      var searchSelector = await $(`~Search Wikipedia`);
      await searchSelector.waitForDisplayed({ timeout: 30000 });
      await searchSelector.click();
  
      var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
      await insertTextSelector.waitForDisplayed({ timeout: 30000 });
  
      await insertTextSelector.addValue("BrowserStack");
      await browser.pause(5000);
  
      var allProductsName = await $$(`android.widget.TextView`);
      assert(allProductsName.length > 0);
    });
  });
}

runTest();
