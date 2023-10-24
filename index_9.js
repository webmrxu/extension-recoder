/**
 * 115 cookie/token login
 * 
 * cookie 解释 https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/Cookie
 */

const puppeteer = require("puppeteer"); // v20.7.4 or later

const { parseCookieStr, printTime, delay } = require('./utils.js');

(async () => {
  printTime(0)
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  const timeout = 10000;
  page.setDefaultTimeout(timeout);
  printTime(1)
  const cookieStr = `USERSESSIONID=82e8f16799fc55189893dfff619b1ac318a2fa4fb5dd9455f8509389f739e49b; 115_lang=zh; HWWAFSESID=879ebebd77848a1fdc; HWWAFSESTIME=1697961853533; UID=336225108_A1_1697961983; CID=7a10943e4ec83d090e308ab52810247b; SEID=498c971a32e0890c967824cb9edbe13593a773e498079d1c081a89655304c6b9116a37f7a48fecf86c279ed1cce5f74f750208b5cb420271dbaa94dc`
  const jsonObj = parseCookieStr(cookieStr);
  let listCookie = [];
  Object.keys(jsonObj).forEach((key) => {
    let item = {
      name: key,
      value: jsonObj[key],
      domain: '115.com',
    };
    listCookie.push(item);
  });
  Object.keys(jsonObj).forEach((key) => {
    let item = {
      name: key,
      value: jsonObj[key],
      domain: 'webapi.115.com',
    };
    listCookie.push(item);
  });
  Object.keys(jsonObj).forEach((key) => {
    let item = {
      name: key,
      value: jsonObj[key],
      domain: 'passportapi.115.com',
    };
    listCookie.push(item);
  });

  printTime(2)
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
    
    // 核心： 先设置cookie 再跳转网站，所以cookie配置中需要先定义domain
    await targetPage.setCookie(...listCookie);

    await targetPage.goto("https://115.com/");

    await Promise.all(promises);
    // webdriver 设置为 false 让目标页面无法检测是否为 headless 浏览器
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
      });
    });
  }

  // await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
