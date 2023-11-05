/**
 * 东方财富
 * https://quote.eastmoney.com/sz300042.html#fullScreenChart
 */

const axios = require('axios');

let headers = {
  Cookie: 'qgqp_b_id=3a87e8567f59c40f6244ede7f2761aec; em_hq_fls=js; em-quote-version=topspeed; st_si=04961290355907; websitepoptg_api_time=1699088713493; st_asi=delete; HAList=ty-0-300042-%u6717%u79D1%u79D1%u6280%2Cty-116-00700-%u817E%u8BAF%u63A7%u80A1%2Cty-1-600519-%u8D35%u5DDE%u8305%u53F0%2Cty-0-300059-%u4E1C%u65B9%u8D22%u5BCC%2Cty-1-000003-%uFF22%u80A1%u6307%u6570%2Cty-0-300408-%u4E09%u73AF%u96C6%u56E2%2Cty-1-000001-%u4E0A%u8BC1%u6307%u6570%2Ca-sz-000005-ST%u661F%u6E90%2Ca-sz-000001-%u5E73%u5B89%u94F6%u884C; st_pvi=48244357488899; st_sp=2023-10-29%2012%3A32%3A30; st_inirUrl=https%3A%2F%2Fwww.google.com%2F; st_sn=146; st_psi=20231104170725870-113200301201-0581626554'
}

// 创建一个 Axios 实例
const http = axios.create({
  baseURL: 'https://push2his.eastmoney.com', // 设置请求的基本URL
  timeout: 5000, // 设置请求超时时间（毫秒）
  headers
});

// 获取单日分时k线数据
function getDaySecondLineData(symbol = '600000') {
  let url = `/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=1.${symbol}&ndays=1&iscr=0&iscca=0&cb=jsonp1699089230931`;
  return http.get(url)
}
getDaySecondLineData().then(res => {
  let { data } = res;
  let jsonStr = data.slice(19,-2);
  let resData = JSON.parse(jsonStr);
  // console.log(resData);
  resData.data.trends = resData.data.trends.map(row => row.split(','))
  console.log(resData);
  debugger
})
module.exports.getDaySecondLineData = getDaySecondLineData;