const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
require('dotenv').config();

let email = process.env.BROWSERSTACK_EMAIL;
let pwd = process.env.BROWSERSTACK_PWD;

let url = 'https://live.browserstack.com/dashboard';


describe("BStack demo test", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();
  });
  
  afterAll(async () => {
    await driver.quit();
  })
  
  test("login test", async () => {

    let browser = driver;
    await browser.get(url);

    await browser.findElement(By.id('user_email_login')).sendKeys(email);
    await browser.findElement(By.id('user_password')).sendKeys(pwd);
    await browser.findElement(By.id('user_submit')).sendKeys('webdriver', Key.RETURN);
    await browser.sleep(15000);
  }, 1000000);
});



