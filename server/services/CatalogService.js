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

/**
 * 增加分类
 */
CatalogService.add = async (catalog) => {
  try {
    const data = await Catalog.create(catalog);
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 根据名字查找分类
 */
CatalogService.findByName = async (name) => {
  try {
    const data = await Catalog.findOne({
      where: {
        name: name,
      },
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 根据id查找分类
 */
CatalogService.findById = async (id) => {
  try {
    const data = await Catalog.findOne({
      where: {
        id: id,
      },
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * update
 */
CatalogService.update = async (obj) => {
  try {
    const data = await Catalog.update(obj, {
      where: {
        id: obj.id,
      },
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 判断分类是否存在,
 * 不存在则存入数据库
 * 存在该分类下的count + 1
 */
CatalogService.isExit = async (name) => {
  try {
    const data = await Catalog.findOne({
      where: {
        name: name,
      },
    });
    if (data) {
      Catalog.update({
        count: data.count += 1,
      }, {
        where: {
          id: data.id,
        },
      });
    } else {
      Catalog.create({
        name: name,
        count: 1,
        intro: '暂无',
      });
    }
  } catch (err) {
    logger.error(err.stack);
  }
};


module.exports = CatalogService;
