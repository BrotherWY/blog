const db = require('../db/db');

module.exports = db.defineModel('user', {
  name: db.STRING(50),
  avatar: db.STRING(150),
  userName: db.STRING(50),
  password: db.STRING(50),
  intro: db.TEXT,
});
