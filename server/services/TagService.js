const Tag = require('../models/Tag');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');
const Sequelize = require('sequelize');

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

/**
 * 分页
 */
TagService.findAllByPaging = async ({ pageSize, pageIndex }) => {
  try {
    const data = await Tag.findAndCountAll({
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
 * 增加标签
 */
TagService.add = async (tag) => {
  try {
    const data = await Tag.create(tag);
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 根据名字查找标签
 */
TagService.findByName = async (name) => {
  try {
    const data = await Tag.findOne({
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
 * 根据id查找标签
 */
TagService.findById = async (id) => {
  try {
    const data = await Tag.findOne({
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
TagService.update = async (obj) => {
  try {
    const data = await Tag.update(obj, {
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
 * delete
 */
TagService.delete = async (id) => {
  try {
    const data = await Tag.destroy({
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
TagService.batchDelete = async (ids) => {
  try {
    ids = ids.split(',');
    for (let i = 0; i < ids.length; i += 1) {
      const data = await Tag.destroy({
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
TagService.search = async (req) => {
  const {
    or,
    and,
    gt,
    lt,
  } = Sequelize.Op;
  const { pageSize, pageIndex, params } = req;

  try {
    const result = await Tag.findAndCountAll({
      where: {
        [or]: [
          {
            name: params.name,
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
 * 判断标签是否存在,
 * 不存在则存入数据库
 * 存在该分类下的count + 1
 */
TagService.isExit = async (name) => {
  try {
    const data = await Tag.findOne({
      where: {
        name: name,
      },
    });
    if (data) {
      Tag.update({
        count: data.count += 1,
      }, {
        where: {
          id: data.id,
        },
      });
    } else {
      Tag.create({
        name: name,
        count: 1,
        intro: '暂无',
      });
    }
  } catch (err) {
    logger.error(err.stack);
  }
};

module.exports = TagService;
