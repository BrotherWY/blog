const db = require('../db/db');

module.exports = db.defineModel('sys_config', {
  name: db.STRING(20),
  url: db.STRING(50),
  icon: db.STRING(50),
  code: db.STRING(20),
  sort: db.INTEGER,
});
