const db = require('../db/db');

module.exports = db.defineModel('catalog', {
  name: {
    type: db.STRING(50),
    unique: true,
  },
  intro: db.TEXT,
  count: db.INTEGER,
});
