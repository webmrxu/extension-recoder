const utils = {
  printTime(...rest) {
    const now = Number(new Date()) / 1000;
    const s = now.toFixed(2);
    console.log(s.slice(-5), ...rest);
  },

  delay(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds));
  },

  parseCookieStr(str) {
    let cookieStr = str;
    let cookies = cookieStr.split('; ');
    let result = {};
    for (let i = 0; i < cookies.length; i++) {
      let parts = cookies[i].split('=');
      let name = parts[0];
      let value = parts[1];
      result[name] = value;
    }
    return result;
  }
}
module.exports = utils;