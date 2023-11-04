/**
 * 获取股票单日分时线
 */

const { getDaySecondLineData } = require('../apis/xueqiu');

getDaySecondLineData().then(res => {
  const { data: { data} } = res;
  console.log(data);
  debugger
}).catch(console.log)