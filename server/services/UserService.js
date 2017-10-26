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
    const data = await User.findOne({
      where: {
        userName: userName,
        password: md5(password),
      },
    });
    if (data) {
      return ReturnData.success(data);
    } else {
      return ReturnData.error(ErrorMessage.LOGIN_PSW_ERROR);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

UserService.getAdmin = async () => {
  try {
    const data = await User.findOne({
      where: {
        userName: 'admin',
      },
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = UserService;
