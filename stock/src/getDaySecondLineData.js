/**
 * 获取股票单日分时线
 */
const allClass = require('../data/allClass.json')
const { getDaySecondLineData } = require('../apis/xueqiu');
const { formatDate, fileExists } = require('../utils/utils');
const path = require('path');
const fs = require('fs');

async function getOneStock(index) {
  let stock = allClass[index];
  // console.log(index, stock);
  if (stock && stock.length === 2) {
    let symbol = stock[0]
    let dateStr = formatDate();
    let directoryPath = path.join(__dirname, '../data/', dateStr);
    let filePath = path.join(__dirname, '../data/', dateStr, symbol + '.json');
    if (fileExists(filePath)) {
      console.log(index, ...stock, '已经存储');
      setTimeout(() => {
        // 递归获取下一股票
        getOneStock(index + 1);
      }, 50);
      return;
    }
    try {
      let res = await getDaySecondLineData(symbol);
      const { data: { data } } = res;
      fs.mkdirSync(directoryPath, { recursive: true });
      let jsonStr = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(filePath, jsonStr);
      console.log(index + ' ', ...stock, 'api数据获取成功');
      setTimeout(() => {
        // 递归获取下一股票
        getOneStock(index + 1);
      }, 500);
    } catch (err) {
      console.log('获取分时数据异常', err);
    }
  } else {
    if (index === allClass.length) {
      console.log(index, '所有数据加载完成.');
    } else {
      console.log(index, '数据加载中断:', allClass.length - index, ' 条数据未加载');
    }
    return;
  }
}
getOneStock(0)