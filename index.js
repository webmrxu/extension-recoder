/**
 * segmentfault 思否 自动登陆
 * headless 无头浏览器和本地的手动打开的浏览器还是有区别的，
 * 登陆信息，cookie token 等都是没有的，如果需要正常访问需要登陆的网站，这登陆步骤也是个问题
 * 如果这个步骤选择手工登陆，那不断执行步骤，频繁登陆，账号肯定会被限制
 */
const account = "accountestt"; // 账号
const pass = "passTest"; // 密码
const puppeteer = require("puppeteer"); // v20.7.4 or later

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 808,
      height: 673,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://segmentfault.com/");
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator('::-p-aria(注册登录[role=\\"link\\"])'),
      targetPage.locator("div.left-wrap a.btn"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"sf-header\\"]/div/div[2]/div/a[2])'
      ),
      targetPage.locator(":scope >>> div.left-wrap a.btn"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 44,
          y: 24,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(密码登录)"),
      targetPage.locator("div.login-3rd button:nth-of-type(3)"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"loginDiv\\"]/div/div[1]/div/button[3])'
      ),
      targetPage.locator(":scope >>> div.login-3rd button:nth-of-type(3)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 42,
          y: 8.703125,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(手机号或邮箱)"),
      targetPage.locator("#mobileOrMail"),
      targetPage.locator('::-p-xpath(//*[@id=\\"mobileOrMail\\"])'),
      targetPage.locator(":scope >>> #mobileOrMail"),
    ])
      .setTimeout(timeout)
      .fill(account);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(密码)"),
      targetPage.locator("#password"),
      targetPage.locator('::-p-xpath(//*[@id=\\"password\\"])'),
      targetPage.locator(":scope >>> #password"),
    ])
      .setTimeout(timeout)
      .fill(pass);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#loginDiv > div"),
      targetPage.locator('::-p-xpath(//*[@id=\\"loginDiv\\"]/div)'),
      targetPage.locator(":scope >>> #loginDiv > div"),
    ])
      .setTimeout(timeout)
      .click({
        delay: 1058.3999999985099,
        offset: {
          x: 2,
          y: 101.4765625,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("2");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(手机号或邮箱)"),
      targetPage.locator("#mobileOrMail"),
      targetPage.locator('::-p-xpath(//*[@id=\\"mobileOrMail\\"])'),
      targetPage.locator(":scope >>> #mobileOrMail"),
    ])
      .setTimeout(timeout)
      .fill(account);
  }

  {
    const targetPage = page;
    await targetPage.keyboard.down("Backspace");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Backspace");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Backspace");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Backspace");
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(登录)"),
      targetPage.locator("form button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"loginDiv\\"]/div/form/div[5]/button)'
      ),
      targetPage.locator(":scope >>> form button"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 69,
          y: 21.703125,
        },
      });
    await Promise.all(promises);
  }

  //  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
