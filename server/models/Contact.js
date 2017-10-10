const db = require('../db/db');

module.exports = db.defineModel('contact', {
  user_id: {
    type: db.STRING(50),
    unique: true,
  },
  name: db.STRING(20),
  url: db.STRING(50),
});
