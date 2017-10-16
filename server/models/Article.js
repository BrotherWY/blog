const db = require('../db/db');

module.exports = db.defineModel('article', {
  title: db.STRING(100),
  cover: db.STRING(50),
  content: db.TEXT,
  overview: db.TEXT,
  tags: db.STRING(50),
  catalog: db.STRING(50),
  views: db.INTEGER,
});
