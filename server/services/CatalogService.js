const Catalog = require('../models/Catalog');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');
const Sequelize = require('sequelize');

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
 * 分页
 */
CatalogService.findAllByPaging = async ({ pageSize, pageIndex }) => {
  try {
    const data = await Catalog.findAndCountAll({
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
 * 增加分类
 */
CatalogService.add = async (catalog) => {
  try {
    const data = await Catalog.create(catalog);
    // 添加成功会返回该条数据，所以根据id去判断是否成功
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
 * delete
 */
CatalogService.delete = async (id) => {
  try {
    const data = await Catalog.destroy({
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
CatalogService.batchDelete = async (ids) => {
  try {
    ids = ids.split(',');
    for (let i = 0; i < ids.length; i += 1) {
      const data = await Catalog.destroy({
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
CatalogService.search = async (req) => {
  const {
    or,
    and,
    gt,
    lt,
    like,
  } = Sequelize.Op;
  const { pageSize, pageIndex, params } = req;

  try {
    const result = await Catalog.findAndCountAll({
      where: {
        [or]: [
          {
            name: {
              [like]: `%${params.name}%`,
            },
          },
          {
            [and]: [
              {
                updatedAt: { [gt]: params.start ? parseInt(params.start, 0) : 0 },
              },
              {
                updatedAt: { [lt]: params.end ? parseInt(params.end, 0) : 0 },
              },
            ],
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

/**
 * 判断分类是否存在,
 * 不存在则存入数据库
 * 存在该分类下的count + 1
 * 加上 articleId
 */
CatalogService.isExit = async (id, articleId) => {
  try {
    let data = await Catalog.findAll({
      where: {
        id: id,
      },
    });
    if (data.length > 0) {
      data = data[0];
      Catalog.update({
        count: data.count += 1,
        article_ids: `${data.article_ids}${articleId},`,
      }, {
        where: {
          id: data.id,
        },
      });
    } 
  } catch (err) {
    logger.error(err.stack);
  }
};

module.exports = CatalogService;
