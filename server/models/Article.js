const db = require('../db/db');

module.exports = db.defineModel('article', {
  title: db.STRING(100),
  cover: db.STRING(200),
  content: db.TEXT,
  overview: db.TEXT,
  tags: db.STRING(50),
  catalog: db.STRING(50),
  views: db.INTEGER,
  flag: db.STRING(1), // 0 草稿 1 发布 2 垃圾箱
});
