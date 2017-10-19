const db = require('../db/db');

module.exports = db.defineModel('menu', {
  name: db.STRING(20),
  icon: db.STRING(20),
  url: db.STRING(50),
  sort: db.INTEGER,
  flag: db.STRING(1),
  up_id: db.STRING(50),
});
