const fs = require('fs');
const path = require('path');

const utils = {
  formatDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  },
  // 检查任意路径下的文件是否存在
  fileExists(filePath) {
    try {
      // 使用 fs.accessSync 来检查文件是否存在
      fs.accessSync(filePath, fs.constants.F_OK);
      return true; // 文件存在
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false; // 文件不存在
      } else {
        // 其他错误，如权限问题
        throw err;
      }
    }
  }
}
// test
module.exports = utils;