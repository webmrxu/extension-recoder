/**
 * 打开网站搜索关键词
 */
const puppeteer = require("puppeteer"); // v20.7.4 or later
const event = require('./event.js');
const { printTime } = require('./utils.js');


(async () => {
  printTime('1')
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // 设置网站加载超时时间
  const timeout = 10000;
  page.setDefaultTimeout(timeout);
  printTime('2')
  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 847,
      height: 673,
    });
  }
  // 打开网站
  printTime('3')
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://javdb.com");
    await Promise.all(promises);
  }
  printTime('4')
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Yes, I am.)"),
      targetPage.locator("a.is-success"),
      targetPage.locator("::-p-xpath(/html/body/div[1]/div[2]/footer/a[1])"),
      targetPage.locator(":scope >>> a.is-success"),
      targetPage.locator("::-p-text(Yes, I am.)"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 81.5,
          y: 35,
        },
      });
    await Promise.all(promises);
  }
  printTime('5')
  {
    const targetPage = page;
    const locators = [
      targetPage.locator("::-p-aria(Title/ID/Cast)"),
      targetPage.locator("#video-search"),
      targetPage.locator('::-p-xpath(//*[@id=\\"video-search\\"])'),
      targetPage.locator(":scope >>> #video-search"),
    ];
    await event.click(locators);
  }
  printTime('6')
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(Title/ID/Cast)"),
      targetPage.locator("#video-search"),
      targetPage.locator('::-p-xpath(//*[@id=\\"video-search\\"])'),
      targetPage.locator(":scope >>> #video-search"),
    ])
      .setTimeout(timeout)
      .fill("白色");
  }
  printTime('7')
  {
    const targetPage = page;
    await targetPage.keyboard.down("Enter");
  }
  printTime('8')
  {
    const targetPage = page;
    await targetPage.keyboard.up("Enter");
  }
  printTime('9')

  // await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
