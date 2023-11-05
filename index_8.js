/**
 * 1、打开网站搜索关键词
 * 2、cookie/token登陆
 * 3、循环打开每一个搜索结果
 */

const puppeteer = require("puppeteer"); // v20.7.4 or later
const event = require("./event.js");
const { printTime, delay, parseCookieStr } = require("./utils.js");

(async () => {
  printTime("1");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // 设置网站加载超时时间
  const timeout = 100000;
  page.setDefaultTimeout(timeout);

  const cookieStr = `list_mode=h; theme=auto; locale=en; _ym_uid=1699162763613650171; _ym_d=1699162763; cf_clearance=8G..uOYL4dk1C5qSZMmIhJ4yg2wOKuyi66jxHHRbFeU-1699162762-0-1-d3719256.b6827dd6.8470cdb6-0.2.1699162762; _ym_isad=2; over18=1; _rucaptcha_session_id=10ffceceff2950ed3566d7d4c5024b89; remember_me_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IklsSTBlbmxMV0ZoTFExaGFUWFpFTkhnMmQybHZJZz09IiwiZXhwIjoiMjAyMy0xMS0xMlQwNTo0MzoxNC4wMDBaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX21lX3Rva2VuIn19--745c4611f8da3ff89645722753dbe3a6da3fd754; _jdb_session=KPkaIHLwGCeaUlx%2BwwiT8gxBBlzolNlVK%2BCBFxbY2Fb4WKB5x9Cob5JxhruK%2BCVfaMrXuYZpH9ipO5RJ9HPIifNGaBHxVsrq7NJuIaZ4SpZlTGpXMdZkDfImQVh8btZXjKHb3C9bSXmWRMtL0Hg1n8yvTQwFhr3DADoF1rWt8U7u9qmwkiw%2Bo9FDSrikW1h0RyziBPX%2FWCxqKk8VIjf%2FZx0if2OdMyOsKmmfeEdDLt%2BIq9nv9yqeghorgvIHOkuWUmlKRwsUDqnWRv%2F3q4AjGVyc6Yl%2B%2B4%2FFeCOF6lOyxdhLkw7l1lOOG5lc%2B5EvbZpLVt0fkTY5vi2GgYEt4yZ2fOi0MwDoKezJIrWLc9%2BaviK2G1io4TZx3FzKs6G8TIsDUJI%3D--f4usrmS3GaFy2B%2Bl--QWgr6UBqAE0qRwls%2BPMaPg%3D%3D`
  const jsonObj = parseCookieStr(cookieStr);
  let listCookie = [];
  Object.keys(jsonObj).forEach((key) => {
    let item = {
      name: key,
      value: jsonObj[key],
      domain: "javdb.com",
    };
    listCookie.push(item);
  });

  printTime("2");
  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 847,
      height: 673,
    });
  }
  // 打开网站
  printTime("3");
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    // 核心： 先设置cookie 再跳转网站，所以cookie配置中需要先定义domain
    await page.setCookie(...listCookie);
    await targetPage.goto("https://javdb.com");
    await Promise.all(promises);
  }
  printTime("6");
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
  printTime("7");
  {
    const targetPage = page;
    await targetPage.keyboard.down("Enter");
  }
  printTime("8");
  {
    const targetPage = page;
    await targetPage.keyboard.up("Enter");
  }
  printTime("9");
  {
    const targetPage = page;
    const locators = [
      targetPage.locator("aria/按發布日期排序"),
      targetPage.locator("body > section a:nth-of-type(2)"),
      targetPage.locator("xpath//html/body/section/div/div[5]/div/div/a[2]"),
      targetPage.locator("pierce/body > section a:nth-of-type(2)"),
    ];
    await event.click(locators);
  }
  printTime("10");

  async function navItemAndBack(locatorIndex = 1) {
    const targetPage = page;
    try {
      const locatorDom = await targetPage.locator(`::-p-xpath(/html/body/section/div/div[6]/div[${locatorIndex}]/a)`);
      await event.click([locatorDom]);
      await targetPage.waitForNavigation();
      printTime(`${locatorIndex}条数据加载成功`)
      await delay(2000);
      await targetPage.goBack();
      locatorIndex += 1;
      // 递归加载
      // navItemAndBack(locatorIndex)
    } catch (err) {
      console.log(err);
    }
  }
  // 递归循环打开每一个页面
  navItemAndBack(1)

  printTime("12");

  // await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});


