const User = require('../models/User');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const md5 = require('md5');
const log4js = require('koa-log4');

const logger = log4js.getLogger('app');

const UserService = {};
/**
 * 判断用户的用户名和密码是否正确
 */
UserService.checkLogin = async (userName, password) => {
  try {
    const data = await User.findOrBuild({
      where: {
        userName: userName,
        password: md5(password),
      },
    });
    /**
    * data is array
    * 0: user data,
    * 1: 是否成功 false 成功 true 失败
    */
    if (data[1]) {
      return ReturnData.error(ErrorMessage.LOGIN_PSW_ERROR);
    } else {
      return ReturnData.success(data[0]);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = UserService;
