const db = require('../db/db');

module.exports = db.defineModel('tag', {
  name: {
    type: db.STRING(50),
    unique: true,
  },
  remark: db.STRING(100),
});
