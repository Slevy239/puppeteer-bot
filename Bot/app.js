const puppeteer = require('puppeteer');
const credentials = require('./credentials')

async function instaBot () {
  const browser = await puppeteer.launch({
      headless: false,
      args: [
          '--window-size=1920,1080'
      ]
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', credentials.username);
  await page.type('input[name="password"]', credentials.password);

  await page.click('button[type="submit"]');
  // Add a wait for some selector on the home page to load to ensure the next step works correctly
//   await page.pdf({path: 'page.pdf', format: 'A4'});
//   await browser.close();
};
instaBot();