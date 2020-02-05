const puppeteer = require('puppeteer');
const credentials = require('./credentials')

async function instaBot () {
  const browser = await puppeteer.launch({
      headless: false,
    //   args: [
    //       '--window-size=1920,1080'
    //   ]
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', credentials.username);
  await page.type('input[name="password"]', credentials.password);

  await page.click('button[type="submit"]');

  await page.waitFor(() => document.querySelector('[placeholder=Search]'))

  await page.evaluate(() => document.querySelector('[href="/accounts/activity/"]').click())

  await page.waitFor(() => document.querySelectorAll('[role=button] ._5f5mN').length)

  await page.evaluate(() => {
    const elements = document.querySelectorAll('[role=button] ._5f5mN')

    elements.forEach(element => {
      if (element.innerText === 'Follow') {
        element.click()
      }
    })
  })

  await page.waitFor(4000)

  await browser.close()

  instaBot()
};
instaBot();