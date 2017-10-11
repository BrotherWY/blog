const model = require('../model');
const md5 = require('md5');

const User = model.User;

User.create({
  name: 'brotherwang',
  avatar: 'xx',
  userName: 'admin',
  password: md5('admin'),
  intro: 'hshshshshsh',
});
