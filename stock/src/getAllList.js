/**
 * 获取所有的股票信息
 * https://stock.xueqiu.com/v5/stock/screener/quote/list.json?page=1&size=30&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz
 */

const axios = require('axios');
const fs = require('fs');
const filePath = 'all.txt';
/**
 * 获取所有沪深股票分页数据
 * 总55页 每页 90 条
 * 55 * 90 = 4950 条数据
 */

const pageLen = 55;

let headers = {
  Cookie: 'cookiesu=321698572109358; device_id=63baa6d0a6a1371db9fe85f91f3ce360; Hm_lvt_1db88642e346389874251b5a1eded6e3=1698572112; s=b012b5llo9; remember=1; xq_a_token=8a14d3319e6afd41290161fae299ac627b34dc05; xqat=8a14d3319e6afd41290161fae299ac627b34dc05; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjI5NzI4OTk1NzUsImlzcyI6InVjIiwiZXhwIjoxNzAxMjY4MDkyLCJjdG0iOjE2OTg2NzYwOTI4MDUsImNpZCI6ImQ5ZDBuNEFadXAifQ.TQn0GJItriHRHjiStRUl0B6PaG0ohddgyDKKetsGAXLqeGLc1xaYxsV4Aygm-PW_t7wxcmHgTjdsa7NPkehgJCqPNS5RaZ-vK-1GAWWjd7tPqgAyOEvWh40stB9qP2DLF9E-mA8YXrGLf2hmAC96tuT_2IUDNL20J4PjuPV5Rvg9Z2mruuwzO0rhOCDjfijKG7b89rPUhaUDJUsddfD1LuiIFSmu4_ksOrtfci9puLiQPjwBeTe5EadFmCngHXpVRRCTe10CakuArVBXsQqnoYb_REc_31LIArBIoocP8MHw_dGpv_dGihAD7CqVIJvI7EZ2gOJIqL9GKpMcrGlZDw; xq_r_token=3272de06807c7117dadfa060f564d6d679bbc27e; xq_is_login=1; u=2972899575; bid=75106b6c70f252328568eb10c593de3a_lod08qc4; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1698676744'
}

function getPageRes(page) {
  if (page > pageLen) {
    return;
  }
  let url = `https://stock.xueqiu.com/v5/stock/screener/quote/list.json?page=${page}&size=90&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz`;
  axios.get(url, {headers}).then(res => {
    if (res.data) {
      let jsonStr = JSON.stringify(res.data.data.list);
      let filePath = 'allPage'+page+'.json';
      fs.writeFile(filePath, jsonStr, (err) => {
        if (err) {
          console.error('写入文件时发生错误：', err);
        } else {
          console.log(filePath + '文件写入成功。');
          setTimeout(() => {
            getPageRes(page+1)
          }, 3000);
        }
      });
    }
  }).catch(err => {
    console.log(err);
  })
}

getPageRes(1)

// console.log(1111);