// scan all models defined in models:
const fs = require('fs');
const path = require('path');
/**
 * 读取controller文件,并导出
 */

const files = fs.readdirSync(path.resolve('controllers'));

const jsFiles = files.filter((f) => {
  return f.endsWith('.js');
}, files);

module.exports = {};

for (const f of jsFiles) {
  console.log(`import controller from file ${f}...`);
  const name = f.substring(0, f.length - 3);
  module.exports[name] = require(path.resolve(path.join('controllers', f)));
}
