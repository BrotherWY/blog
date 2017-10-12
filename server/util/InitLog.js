const log4js = require('koa-log4');
const path = require('path');

const logConfig = require('../config/config-log');

const logDir = path.join(__dirname, '..', 'logs');
// 生成logs目录
try {
  require('fs').mkdirSync(logDir);// 新建目录，./logs
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', err);
    process.exit(1);
  }
}
// 根据log 配置文件(log4js.json)配置日志文件
log4js.configure(logConfig, { cwd: logDir });

module.exports = log4js;
