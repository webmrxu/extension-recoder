/**
 * 获取股票单日分时线
 */
const allClass = require('../data/allClass.json')
const { getDaySecondLineData } = require('../apis/xueqiu');
const { formatDate } = require('../utils/utils');
const path = require('path');
const fs = require('fs');
// getDaySecondLineData().then(res => {
//   const { data: { data} } = res;
//   console.log(data);
//   debugger
// }).catch(console.log)


async function getOneStock(index) {
  let stock = allClass[index]
  if (stock && stock.length === 2) {
    let symbol = stock[0]
    let dateStr = formatDate();
    let directoryPath = path.join(__dirname, '../data/', dateStr);
    let filePath = path.join(__dirname, '../data/', dateStr, symbol + '.json');
    try {
      let res = await getDaySecondLineData(symbol);
      const { data: { data } } = res;
      
      
      fs.mkdirSync(directoryPath, { recursive: true });
      let jsonStr = JSON.stringify(data);
      await fs.promises.writeFile(filePath, jsonStr);
      console.log(...stock, '获取成功');
      setTimeout(() => {
        // 递归获取下一股票
        getOneStock(index+1);
      }, 1000);
    } catch (err) {
      console.log('获取分时数据异常', err);
    }
  } else {
    return;
  }
}
getOneStock(0)