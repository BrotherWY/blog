const db = require('../db/db');

module.exports = db.defineModel('tag', {
  name: db.STRING(50),
  remark: db.STRING(100),
});
