const db = require('../db/db');

module.exports = db.defineModel('comment', {
  email: db.STRING(50),
  blog: db.STRING(50),
  content: db.TEXT,
  up_id: db.STRING(50),
});
