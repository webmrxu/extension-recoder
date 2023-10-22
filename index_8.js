/**
 * 1、打开网站搜索关键词
 * 2、cookie/token登陆
 * 3、循环打开每一个搜索结果
 */

const puppeteer = require("puppeteer"); // v20.7.4 or later
const event = require("./event.js");
const { printTime, delay } = require("./utils.js");

 
(async () => {
  printTime("1");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // 设置网站加载超时时间
  const timeout = 10000;
  page.setDefaultTimeout(timeout);

  const jsonStr = `{"list_mode":"hh","theme":"auto","_rucaptcha_session_id":"773b0c25373a1d444d4c878ab11952f7","_ym_uid":"1656733079441700698","_ym_d":"1697958841","_ym_isad":"1","over18":"1","locale":"zh","redirect_to":"%2Fv%2FXGD5e","remember_me_token":"eyJfcmFpbHMiOnsibWVzc2FnZSI6IklrSkJObEZhT0ZWS1ZITnRSM2xxWkhVelNHUm1JZz09IiwiZXhwIjoiMjAyMy0xMC0yOVQwNzoyNzoyOC4wMDBaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX21lX3Rva2VuIn19--18355bf6f7bfffe3f925f0141bf18aa7230702ba","cf_clearance":"kB2F7bB1Hv3JmhQ_vi2BS8zMy9KnPy2By1TY9A0Jpjc-1697959719-0-1-c55d4c1c.2895dac2.925c13fc-0.2.1697959719","_jdb_session":"CBTTQVv4yS%2BgctsFbSTudkKArR39hZMri2I58dYohqKOyFpisONYBY91m0UvqaM2NqqU%2Fa4jtldMQmT8cuIB4WNHgyPIGeqJTlciLD%2FRinuLKWnJIGc8na%2BpVbA1T2JBwS0hC%2BwBpn%2F7gPcn6Em4tZsqKTQhyOD604pCSxuqBx3jXd3U6R%2BnaE8QZ6cWoaq%2BBaG90Ud578jFao31Go2mJNRV%2BAvElzRYUA6PaPaaNIuNvKE0qKdkjKF0Kal47Phs2VAwvUHgujmlccp2mBUNxfFdJF7Pm4HgZE2Gm0CBdFt4n05RCu10Q%2BUrNZHyPnJBCI%2Bn3XbTY3R98Ru3wQZX7M%2BSTWtttdqJfUFAteP7Ai2dIb%2B0pipPJCYCoqaxBhSENw4%3D--KkK3dv6aSoUlvu3o--9R4E5g9%2B7tbBH3YMd83S7A%3D%3D"}`;
  const jsonObj = JSON.parse(jsonStr);
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
      navItemAndBack(locatorIndex)
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


