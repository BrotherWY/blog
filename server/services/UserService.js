const User = require('../models/User');
const md5 = require('md5');

const UserService = {};
/**
 * 判断用户的用户名和密码是否正确
 */
UserService.checkLogin = (userName, password) => {
  let u = {};
  try {
    u = User.findOrBuild({
      where: {
        userName: userName,
        password: md5(password),
      },
    });
  } catch (error) {
    return error;
  }
  return u;
};

module.exports = UserService;
