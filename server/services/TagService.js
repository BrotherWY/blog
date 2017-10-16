const Tag = require('../models/Tag');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');

const logger = log4js.getLogger('app');

const TagService = {};
/**
 * 获取所有标签
 */
TagService.findAll = async () => {
  try {
    const data = await Tag.findAll();
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = TagService;
