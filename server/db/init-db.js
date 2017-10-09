/**
 * 初始化数据库
 */
const babelCore = require('babel-core/register');

babelCore({
  presets: ['stage-3'],
});

const model = require('../model');

model.sync().then(() => {
  process.exit(0);
});

console.log('init db ok.');
