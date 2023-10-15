/**
 * 使用网站cookie登陆
 * 自动点赞文章
 */
const puppeteer = require("puppeteer"); // v20.7.4 or later

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);
  const jsonStr = `{"_ga":"GA1.1.979404250.1612104328","_uab_collina":"166805071483779354911676","_ga_MJYFRXB3ZX":"GS1.1.1697358897.54.1.1697360667.0.0.0","PHPSESSID":"103f52260293419721d988cda9aef4c4","Hm_lvt_e23800c454aa573c0ccb16b52665ac26":"1696559500,1697352543","acw_sc__v2":"652baa3a4a529adb6ee1950b77defdb3337e32f0","Hm_lpvt_e23800c454aa573c0ccb16b52665ac26":"1697360667","ssxmod_itna":"WqRx9DBDniiQ=BKGHfIjOYi0QKDQKhDRnQYrYzx0HEeiODUoxn+4+vmAvBG54mfzkUAih5aelCQnDaKBA+v3CTDneG0DQKGmGxGtHD7w+eDxx0oD5xGoDPxDeDAnPCBy1u40PDjCVLBBDi3DbgtDmqGnD7UBDGff3eDA4qGSWl6nQl3DGqDniQLd=Av/DBE=wh6yWYXKKWpnDB67xBj0C2NZmwt2R=Xxp7wweF4Cexxo8fh=8Dx4QfqPRoorix+KYh4rUFxYnBvdm74deob0pUxxD===","ssxmod_itna2":"WqRx9DBDniiQ=BKGHfIjOYi0QKDQKhDRnQYrY4nF8uK+YDs=mDLW9i7MKNAYbqAPrqjaExQGK4909rGiF8q4R=nlWegNGQoxM3HNTVbTQ6s7iRW=+n9QMoLa1WpH4EbGewCNY4kjs8EXI4YP4bon4CLXYA=h08LGf3r6tw6L/RGBD8b4LnK=gQYdEMrM3CWEiRiTq6fFda=4s16boZ2xwPn=akD1kDU5=cuA8Di6WTxz6Erhp1Owhzq5xdUXW/fYTmEXDmkIZbtrIKT8YBbuQwDp=erso3vZ3g6yGrmLexr=yGYPQe6lOKZowVEmIa4F6xtiqeGqPQ=rlwY8qBY4V7ruCeqlweGP/rqsl57ieAQPIDeVDjihxoE54g5hCK42fKlN+6PAe6TIuEDpmGpOeez4qstE7GRHEDq+De7DpxxpAGdt660Gq=oGE0Kc417w7eiQ+q7Wx8QGXBdP4RWfEhDRuAj88KBpKemqhBhf0hxWHMrmotwr4PpIr7GGfjD0o4q6hXnGWDG28xTp2Hf2=+vd7uql8X0xYECOaGzfitKy5mxTS2AZjhx08DiQNYD="}`
  const jsonObj = JSON.parse(jsonStr);
  let listCookie = []
  Object.keys(jsonObj).forEach(key => {
    let item = {
      name: key,
      value: jsonObj[key],
      domain: 'segmentfault.com'
    }
    listCookie.push(item)
  })
  
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
    await page.setCookie(...listCookie);
    
    await targetPage.goto("https://segmentfault.com/");
    await Promise.all(promises);
  }
  
  // const cookiesSet = await page.cookies();
  // console.log('cookie', JSON.stringify(cookiesSet));
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator(
        '::-p-aria(爬虫时网页源代码和页面内容不一致，和F12中的ELEMENT也不一致，怎么办？[role=\\"link\\"])'
      ),
      targetPage.locator("li:nth-of-type(1) div.w-100 > div:nth-of-type(1) a"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"__next\\"]/div[5]/div[1]/div[1]/div[2]/ul/li[1]/div/div[2]/div[1]/h3/a)'
      ),
      targetPage.locator(
        ":scope >>> li:nth-of-type(1) div.w-100 > div:nth-of-type(1) a"
      ),
      targetPage.locator(
        "::-p-text(爬虫时网页源代码和页面内容不一致，和F12中的ELEMENT也不一致，怎么办？)"
      ),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 157.5,
          y: 8,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator(
        '::-p-aria(爬虫时网页源代码和页面内容不一致，和F12中的ELEMENT也不一致，怎么办？[role=\\"link\\"])'
      ),
      targetPage.locator("li:nth-of-type(1) div.w-100 > div:nth-of-type(1) a"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"__next\\"]/div[5]/div[1]/div[1]/div[2]/ul/li[1]/div/div[2]/div[1]/h3/a)'
      ),
      targetPage.locator(
        ":scope >>> li:nth-of-type(1) div.w-100 > div:nth-of-type(1) a"
      ),
      targetPage.locator(
        "::-p-text(爬虫时网页源代码和页面内容不一致，和F12中的ELEMENT也不一致，怎么办？)"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 377.5,
          y: 13,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("div.answer-area span.mx-1"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"questionMain\\"]/div[3]/div[2]/div/div[2]/div[1]/div[2]/div[1]/div/button[1]/span[1])'
      ),
      targetPage.locator(":scope >>> div.answer-area span.mx-1"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 2.5,
          y: 7.796875,
        },
      });
  }

  // await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
