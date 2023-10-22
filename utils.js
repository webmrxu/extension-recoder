const utils = {
  printTime(...rest) {
    const now = Number(new Date()) / 1000;
    const s = now.toFixed(2);
    console.log(s.slice(-5), ...rest);
  }
}
module.exports = utils;