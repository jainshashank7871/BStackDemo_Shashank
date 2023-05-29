import { Builder, By, Key } from 'selenium-webdriver';
import Options from 'selenium-webdriver/firefox.js';
import inquirer from 'inquirer';


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

async function runTest(browserName, username, password) {
  // Set up the Selenium Grid URL and desired capabilities
  const gridUrl = 'http://localhost:4444/';
  const capabilities = {
    browserName: browserName,
  };

  // Create a Selenium WebDriver instance
  const browser = await new Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .build();

  try {
    // Navigate to a website
    await browser.get(url);


    await browser.findElement(By.id('user_email_login')).sendKeys(username);
    await browser.findElement(By.id('user_password')).sendKeys(password);
    await browser.findElement(By.id('user_submit')).sendKeys('webdriver', Key.RETURN);

  } finally {
    // Quit the WebDriver
    // await browser.quit();
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
