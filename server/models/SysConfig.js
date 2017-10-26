const db = require('../db/db');

module.exports = db.defineModel('sys_config', {
  name: db.STRING(20),
  icon: db.STRING(20),
  url: db.STRING(50),
  img_url: db.STRING(200),
  code: db.STRING(20),
  sort: db.INTEGER,
  content: db.TEXT,
});
