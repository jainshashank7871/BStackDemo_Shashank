let wd = require('wd');
let assert = require('assert');
let asserters = wd.asserters;

desiredCaps = {
  // Set your BrowserStack access credentials
  'browserstack.user' : 'BROWSERSTACK_USERNAME',
  'browserstack.key' : 'BROWSERSTACK_ACCESS_KEY',

  // Set URL of the application under test
  'app' : 'bs://95a9573a607bea9536e0de8ce5e49de8438a62e0',

  // Specify device and os_version for testing
  'device' : 'Google Pixel 3',
  'os_version' : '9.0',

  // Set other BrowserStack capabilities
  'project' : 'First NodeJS project',
  'build' : 'Wikipedia Android Project',
  'name': 'first_test_1',
  "browserstack.networkLogs" : "true",
  "browserstack.networkLogsOptions": {
    "captureContent": "true"
  }
};

// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");


console.log(driver, 'driver')
// Test case for the BrowserStack sample Android app. 
// If you have uploaded your app, update the test case here. 
driver.init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId(
      'Search Wikipedia', asserters.isDisplayed 
      && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById(
      'org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed 
      && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("BrowserStack");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');    
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { 
    // Invoke driver.quit() after the test is done to indicate that the test is completed.
    return driver.quit(); 
  })
  .done();
