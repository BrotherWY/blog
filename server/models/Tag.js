const db = require('../db/db');

module.exports = db.defineModel('tag', {
  name: {
    type: db.STRING(50),
    unique: true,
  },
  intro: db.TEXT,
  count: db.INTEGER,
  article_ids: db.TEXT,
});
