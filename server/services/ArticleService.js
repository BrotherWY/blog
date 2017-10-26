const Article = require('../models/Article');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const TagService = require('../services/TagService');
const CatalogService = require('../services/CatalogService');
const log4js = require('koa-log4');
const Sequelize = require('sequelize');

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
 * 这里需要修改
 * tag和catalog 应该存他的id
 */
ArticleService.add = async (article) => {
  article.views = 0;// 文章阅读量初始化为0
  article.is_hot = 0;
  article.is_top = 0;
  try {
    const data = await Article.create(article);
    // 判断分类和标签是否存在数据库中,不存在则存入
    if (data && data.id) {
      isCatalogOrTag(article, data.id);
    }
    if (data && data.id) {
      return ReturnData.success(data);
    } else {
      return ReturnData.error(ErrorMessage.ADD_ERROR);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

function isCatalogOrTag(article, id) {
  const tags = article.tags.split(',');
  for (let i = 0; i < tags.length; i += 1) {
    TagService.isExit(tags[i], id);
  }
  CatalogService.isExit(article.catalog, id);
}

/**
 * 分页
 */
ArticleService.findAllByPaging = async ({ pageSize, pageIndex, flag }) => {
  try {
    const data = await Article.findAndCountAll({
      where: {
        flag: flag,
      },
      limit: parseInt(pageSize, 0),
      offset: (pageIndex - 1) * parseInt(pageSize, 0),
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 根据flag查找文章并分页
 */
ArticleService.findByFlag = async ({ pageSize, pageIndex, flag }) => {
  try {
    const data = await Article.findOne({
      where: {
        flag: flag,
      },
      limit: parseInt(pageSize, 0),
      offset: (pageIndex - 1) * parseInt(pageSize, 0),
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 根据hot查找文章并分页
 */
ArticleService.findByhot = async () => {
  try {
    const data = await Article.findOne({
      where: {
        is_hot: 1,
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
ArticleService.findById = async (id) => {
  try {
    const data = await Article.findOne({
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
ArticleService.update = async (obj) => {
  try {
    const data = await Article.update(obj, {
      where: {
        id: obj.id,
      },
      individualHooks: true,
    });
    /**
     * 更新成功后返回一个数组
     * 数组第一个是affectedCount
     * 数组第二个是affectedRows
     * 首先根据是不是数组，然后判断affectedCount是不是大于0
     */
    if (data && data instanceof Array && data[0] > 0) {
      return ReturnData.success(data);
    } else {
      return ReturnData.error(ErrorMessage.UPDATE_ERROR);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * update statu
 * flag
 * 0 未发布(草稿箱)
 * 1 已发布
 * 2 已下架(垃圾箱)
 */
ArticleService.updateStatu = async (obj) => {
  try {
    const data = await Article.update(obj, {
      where: {
        id: obj.id,
      },
      individualHooks: true,
    });
    if (data && data instanceof Array && data[0] > 0) {
      return ReturnData.success(data);
    } else {
      return ReturnData.error(ErrorMessage.UPDATE_STATU_ERROR);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * batch update statu
 */
ArticleService.batchUpdateStatu = async (obj) => {
  try {
    const ids = obj.ids;
    for (let i = 0; i < ids.length; i += 1) {
      const data = await Article.update({ flag: obj.flag }, {
        where: {
          id: ids[i],
        },
        individualHooks: true,
      });
      if (!(data && data instanceof Array && data[0] > 0)) {
        return ReturnData.error(ErrorMessage.BATCH_UPDATE_STATU_ERROR);
      }
    }
    return ReturnData.success();
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * delete
 */
ArticleService.delete = async (id) => {
  try {
    const data = await Article.destroy({
      where: {
        id: id,
      },
    });
    if (data > 0) {
      return ReturnData.success(data);
    } else {
      return ReturnData.error(ErrorMessage.DELETE_ERROR);
    }
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * batchDelete
 */
ArticleService.batchDelete = async (ids) => {
  try {
    ids = ids.split(',');
    for (let i = 0; i < ids.length; i += 1) {
      const data = await Article.destroy({
        where: {
          id: ids[i],
        },
      });
      if (data < 1) {
        return ReturnData.error(ErrorMessage.BATCH_DELETE_ERROR);
      }
    }
    return ReturnData.success();
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * search
 */
ArticleService.search = async (req) => {
  const {
    and,
    gt,
    lt,
  } = Sequelize.Op;
  const { pageSize, pageIndex, params } = req;

  try {
    const result = await Article.findAndCountAll({
      where: {
        [and]: [
          {
            flag: params.flag,
          },
          {
            updatedAt: { [gt]: params.start ? parseInt(params.start, 0) : 0 },
          },
          {
            updatedAt: { [lt]: params.end ? parseInt(params.end, 0) : 0 },
          },
        ],
      },
      limit: parseInt(pageSize, 0),
      offset: (pageIndex - 1) * parseInt(pageSize, 0),
    });
    return ReturnData.success(result);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = ArticleService;
