const Article = require('../models/Article');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const TagService = require('../services/TagService');
const CatalogService = require('../services/CatalogService');
const log4js = require('koa-log4');

const logger = log4js.getLogger('app');

const ArticleService = {};
/**
 * 获取所有文章
 */
ArticleService.findAll = async () => {
  try {
    const data = await Article.findAll();
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 增加文章
 */
ArticleService.add = async (article) => {
  // 判断分类和标签是否存在数据库中,不存在则存入
  const tags = article.tags.split(',');
  for (let i = 0; i < tags.length; i += 1) {
    TagService.isExit(tags[i]);
  }
  CatalogService.isExit(article.catalog);
  article.views = 0;// 文章阅读量初始化为0
  try {
    const data = await Article.create(article);
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = ArticleService;
