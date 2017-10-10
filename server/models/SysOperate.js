const db = require('../db/db');

module.exports = db.defineModel('sys_operate', {
  name: db.STRING(20),
  icon: db.STRING(20),
  url: db.STRING(50),
  sort: db.INTEGER,
  flag: db.INTEGER,
  up_id: db.STRING(50),
});
