const puppeteer = require("puppeteer"); // v20.7.4 or later

const event = {
  async click(locators = [], config = {}, timeout = 5000) {
    await puppeteer.Locator.race(locators)
      .setTimeout(timeout)
      .click(config);
  }
}
module.exports = event;