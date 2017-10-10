const db = require('../db/db');

module.exports = db.defineModel('article', {
  title: db.STRING(100),
  cover: db.STRING(50),
  content: db.TEXT,
  tag_ids: db.STRING(50),
  catalog_id: db.STRING(50),
  views: db.INTEGER,
  html: db.STRING(50),
});
