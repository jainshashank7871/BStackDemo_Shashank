const wd = require('wd');
const assert = require('assert');
const asserters = wd.asserters;

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
  try {
    await driver.init(desiredCaps);
    
    const searchElement = await driver.waitForElementByAccessibilityId(
      'Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
    await searchElement.click();
    
    const searchInput = await driver.waitForElementById(
      'org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
    await searchInput.sendKeys("BrowserStack");
    
    const searchResults = await driver.elementsByClassName('android.widget.TextView');
    assert(searchResults.length > 0);
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
}

runTest();
