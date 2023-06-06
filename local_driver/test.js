import inquirer from 'inquirer';
import { Builder, By, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';

let username, password, browser, prompt;

let url = 'https://live.browserstack.com/dashboard';

if (process.argv[2] && process.argv[3] && process.argv[4]) {
  username = process.argv[2]
  password = process.argv[3]
  browser = process.argv[4]
} else {
  prompt = true;
  console.log('Example Command node test.js <Username>, <Password>  <Browser>');
  console.log('Username, Password or Browser is not present.');
}

async function runTest(browserName, username, pwd) {

  let browser = await new Builder().forBrowser(browserName).build();
  try {
    await browser.get(url);

    await browser.findElement(By.id('user_email_login')).sendKeys(username);
    await browser.findElement(By.id('user_password')).sendKeys(pwd);
    await browser.findElement(By.id('user_submit')).sendKeys('webdriver', Key.RETURN);
    await browser.sleep(16000);
    const mac_block1 = await browser.findElement(By.className('accordion--mac'));
    mac_block1.click();
    await browser.sleep(3000);
    await mac_block1.findElement(By.css("div[data-test-ositem = 'macmty']")).click();
    await browser.sleep(3000);
    const browserTitle = await browser.findElement(By.css("div[data-rbd-draggable-id = 'macmty__chrome__113.0']")).getAttribute("innerText");
    
    assert.strictEqual(browserTitle, '113', 'Positive case - Browser title is correct');

    // Negative case: Find a non-existent element on the page
    try {
        await browser.findElement(By.id('nonExistentElement-123'));
        assert.fail('Negative case - Element is found (unexpected)');
    } catch (error) {
          assert.strictEqual(
            error.name,
            'NoSuchElementError',
            'Negative case - Element is not found (expected)'
          );
      }
  } finally {
    await browser.wait(browser.quit(),20000)
  }
}

async function getInput() {
  if (prompt) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your BrowserStack Username?',
      },
      {
        type: 'password',
        name: 'password',
        message: "What's your BrowserStack Password?",
      },
      {
        type: 'list',
        name: 'browser',
        message: "Which Browser do you want to run your test on?",
        choices: ['safari', 'chrome', 'firefox'],
      }
    ]);

    username = answers.name;
    password = answers.password;
    browser = answers.browser;
  }

  console.log("Started for " + browser + '...');
  runTest(browser, username, password);
}

getInput();