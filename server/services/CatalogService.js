const Catalog = require('../models/Catalog');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');

const logger = log4js.getLogger('app');

const CatalogService = {};
/**
 * 获取所有分类
 */
CatalogService.findAll = async () => {
  try {
    const data = await Catalog.findAll();
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = CatalogService;
