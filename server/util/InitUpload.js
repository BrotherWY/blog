const path = require('path');

const uploadDir = path.join(__dirname, '..', 'upload');
// 生成upload目录
try {
  require('fs').mkdirSync(uploadDir);// 新建目录，./upload
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Could not set up upload directory, error was: ', err);
    process.exit(1);
  }
}

module.exports = uploadDir;
