/**
 * 微博 cookie/token login
 * 
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
   const cookieStr = `SINAGLOBAL=3954152546958.0586.1612105581523; UOR=www.baidu.com,weibo.com,hot.apago.top; XSRF-TOKEN=Qsqh32uL8s8P861KqzS7tXPu; PC_TOKEN=192c917dbd; login_sid_t=097de300a2299f0eefafbe36c6b146dc; cross_origin_proto=SSL; WBStorage=4d96c54e|undefined; _s_tentry=weibo.com; Apache=579072811430.6676.1698156777063; ULV=1698156777066:22:1:1:579072811430.6676.1698156777063:1686224115467; wb_view_log=1440*9002; WBtopGlobal_register_version=2023102422; SCF=AlRNbcDwypTGrSdR9BJdAy4uMR3QRZz35mAIgskQn15gBL0xQnJuIPE7tkQnX2xJ856ukCvtnmYssW0iI8lbSG8.; SUB=_2A25IM6F1DeRhGeBP41AQ8yvIyzyIHXVrMLy9rDV8PUNbmtAGLVnjkW9NRSUrB464_G0C_UWYYQ9xEfjb8u-bwD7M; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWRw8cDnBKPZQsb89.uzhBS5JpX5o275NHD95QceKnEeKefSh57Ws4Dqcjci--ci-zNi-zpi--fiKLhi-z0i--NiK.Xi-zNi--fi-82iK.7i--fiKLFi-i8i--4iKn4i-zX; ALF=1698761637; SSOLoginState=1698156837; WBPSESS=O0nuaflFIs2_xYy5ULlMJVDxQeWKq9nzF98MBJraDGh-7Qrlx-4Xm18SVXhM5g62SSk3tVwEtwDss-Eny_SZppgkbTsupeY8gp8BZvj1UHtgAIWhfDCZlkhqphm1o04F-Oi42psaYIEnSVwpuSQqiA==`
   const jsonObj = parseCookieStr(cookieStr);
   let listCookie = [];
   Object.keys(jsonObj).forEach((key) => {
     let item = {
       name: key,
       value: jsonObj[key],
       domain: 'weibo.com',
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
 
     await targetPage.goto("https://weibo.com/");
 
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
 