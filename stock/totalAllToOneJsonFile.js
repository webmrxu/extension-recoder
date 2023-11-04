/**
 * 对 data/allClass 所有股票汇总
 */
const { error } = require('console');
const fs = require('fs');
const path = require('path');

let result = []
let allPromise = []
// 定义要读取的文件夹路径
const folderPath = __dirname + '/data/allClass';
function readFilesRecursively(folderPath) {
  // 读取文件夹内的所有文件和子文件夹
  const items = fs.readdirSync(folderPath);
  items.forEach((item) => {
    if (!item.includes('.json')) {
      return;
    }

    const filePath = path.join(folderPath, item);
    // 检查是否是文件
    if (fs.statSync(filePath).isFile()) {
      allPromise.push(fs.promises.readFile(filePath, 'utf8'))
      // 在这里你可以对文件执行操作
      // 使用fs.readFile()来读取文件内容
      // fs.readFile(itemPath, 'utf8', (err, data) => {
      //   if (err) {
      //     console.error('读取文件时出错：', itemPath, err);
      //   } else {
      //     try {
      //       let fileData = JSON.parse(data) || [];
      //       if (itemPath.includes('allPage1.json')) {
      //         console.log(fileData);
      //       }
      //       if (fileData.length) {
      //         fileData.forEach(row => {
      //           let { name, symbol } = row;
      //           let item = [ symbol, name];
      //           result.push(item);
      //         })
      //       }
      //     } catch (err) {
      //       console.error('json解析失败：', itemPath, err);
      //     }
      //   }
      // });
    } else {
      // 如果是子文件夹，递归调用函数
      readFilesRecursively(itemPath);
    }
  });
}
// 开始读取指定文件夹
readFilesRecursively(folderPath);
Promise.all(allPromise).then(datas => {
  datas.forEach(data => {
    try {
      let fileData = JSON.parse(data) || [];
      if (fileData.length) {
        fileData.forEach(row => {
          let { name, symbol } = row;
          let item = [symbol, name];
          result.push(item);
        })
      }
    } catch (err) {
      console.error('json解析失败：', err);
    }
  })
  // console.log(result[0]) ;
  let filePath = 'allClass.json';
  let jsonStr = JSON.stringify(result,null,2)
  fs.writeFile(filePath, jsonStr, (err) => {
    if (err) {
      console.error('写入文件时发生错误：', err);
    } else {
      console.log(filePath + '文件写入成功。');
    }
  });
}).catch(error => {
  console.log('promise all err', error);
})

