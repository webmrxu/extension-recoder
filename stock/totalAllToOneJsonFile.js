/**
 * 对 data/allClass 所有股票汇总
 */
const fs = require('fs');
const path = require('path');

// 定义要读取的文件夹路径
const folderPath = './data/allClass';

function readFilesRecursively(folderPath) {
  // 读取文件夹内的所有文件和子文件夹
  const items = fs.readdirSync(folderPath);

  items.forEach((item) => {
    if (!item.includes('.json')) {
      return;
    }
    const itemPath = path.join(folderPath, item);
    // 检查是否是文件
    if (fs.statSync(itemPath).isFile()) {
      console.log('文件：', itemPath);
      // 在这里你可以对文件执行操作
      // 使用fs.readFile()来读取文件内容
      fs.readFile(itemPath, 'utf8', (err, data) => {
        if (err) {
          console.error('读取文件时出错：',itemPath, err);
        } else {
          try {
            let fileData = JSON.parse(data);
            if (itemPath.includes('1.json')) {
              console.log(fileData);
            }
          } catch (err) {
            console.error('json解析失败：',itemPath, err);
          }
        }
      });
    } else {
      // 如果是子文件夹，递归调用函数
      readFilesRecursively(itemPath);
    }
  });
}

// 开始读取指定文件夹
readFilesRecursively(folderPath);
