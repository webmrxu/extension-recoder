
/**
 * 获取股票单日分时线
 */



const axios = require('axios');

let headers = {
  Cookie: 'cookiesu=321698572109358; device_id=63baa6d0a6a1371db9fe85f91f3ce360; Hm_lvt_1db88642e346389874251b5a1eded6e3=1698572112; s=b012b5llo9; remember=1; xq_a_token=8a14d3319e6afd41290161fae299ac627b34dc05; xqat=8a14d3319e6afd41290161fae299ac627b34dc05; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjI5NzI4OTk1NzUsImlzcyI6InVjIiwiZXhwIjoxNzAxMjY4MDkyLCJjdG0iOjE2OTg2NzYwOTI4MDUsImNpZCI6ImQ5ZDBuNEFadXAifQ.TQn0GJItriHRHjiStRUl0B6PaG0ohddgyDKKetsGAXLqeGLc1xaYxsV4Aygm-PW_t7wxcmHgTjdsa7NPkehgJCqPNS5RaZ-vK-1GAWWjd7tPqgAyOEvWh40stB9qP2DLF9E-mA8YXrGLf2hmAC96tuT_2IUDNL20J4PjuPV5Rvg9Z2mruuwzO0rhOCDjfijKG7b89rPUhaUDJUsddfD1LuiIFSmu4_ksOrtfci9puLiQPjwBeTe5EadFmCngHXpVRRCTe10CakuArVBXsQqnoYb_REc_31LIArBIoocP8MHw_dGpv_dGihAD7CqVIJvI7EZ2gOJIqL9GKpMcrGlZDw; xq_r_token=3272de06807c7117dadfa060f564d6d679bbc27e; xq_is_login=1; u=2972899575; bid=75106b6c70f252328568eb10c593de3a_lod08qc4; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1698676744'
}

// 创建一个 Axios 实例
const http = axios.create({
  baseURL: 'https://stock.xueqiu.com', // 设置请求的基本URL
  timeout: 5000, // 设置请求超时时间（毫秒）
  headers
});

// 获取单日分时k线数据
function getDaySecondLineData(symbol = 'SZ301555') {
  let url = `/v5/stock/chart/minute.json?symbol=${symbol}&period=1d`;
  return http.get(url)
}
module.exports.getDaySecondLineData = getDaySecondLineData;