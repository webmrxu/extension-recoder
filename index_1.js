/**
 * 初次体验 chrome recorder
 * 无界面执行
 * tip: node 版本要高点，我使用的node v14版本导致执行不成功,使用nvm 安装 v18版本执行成功
 * 
 */

const puppeteer = require("puppeteer"); // v20.7.4 or later

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 723,
      height: 782,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://www.v2ex.com/t/981893");
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator(
        "::-p-aria(    46 guyoyo   OP    2 小时 49 分钟前 @ian511 感谢您耐心的恢复，从你这儿可以看到需求还是有的，如何嵌入到现有的研发流程，不增加负担，真的能提升效率比较关键) >>>> ::-p-aria(guyoyo)"
      ),
      targetPage.locator("#r_13778069 strong > a"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"r_13778069\\"]/table/tbody/tr/td[3]/strong/a)'
      ),
      targetPage.locator(":scope >>> #r_13778069 strong > a"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 31,
          y: 11.0078125,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(guyoyo 创建的更多回复)"),
      targetPage.locator("div:nth-of-type(22) > a"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Main\\"]/div[6]/div[22]/a)'),
      targetPage.locator(":scope >>> div:nth-of-type(22) > a"),
      targetPage.locator("::-p-text(guyoyo 创建的更多回复)"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 100.765625,
          y: 3.328125,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#Main div.cell > div"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Main\\"]/div[2]/div[33]/div)'),
      targetPage.locator(":scope >>> #Main div.cell > div"),
      targetPage.locator("::-p-text(工作靠不住啊)"),
    ])
      .setTimeout(timeout)
      .click({
        delay: 1148.6000000014901,
        offset: {
          x: 6,
          y: 17.84375,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Meta");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("c");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Meta");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#search"),
      targetPage.locator('::-p-xpath(//*[@id=\\"search\\"])'),
      targetPage.locator(":scope >>> #search"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 40,
          y: 11,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("#search"),
      targetPage.locator('::-p-xpath(//*[@id=\\"search\\"])'),
      targetPage.locator(":scope >>> #search"),
    ])
      .setTimeout(timeout)
      .fill("工作靠不住啊");
  }

  {
    const targetPage = page;
    await targetPage.keyboard.down("Enter");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Enter");
  }
  console.log("run recorder is success .....");
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
