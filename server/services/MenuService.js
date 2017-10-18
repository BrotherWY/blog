const Menu = require('../models/Menu');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');
const Sequelize = require('sequelize');

const logger = log4js.getLogger('app');

const MenuService = {};

/**
 * 分页
 */
MenuService.findAllByPaging = async ({ pageSize, pageIndex }) => {
  try {
    const data = await Menu.findAndCountAll({
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
 * 增加菜单
 */
MenuService.add = async (menu) => {
  try {
    const data = await Menu.create(menu);
    // 添加成功会返回该条数据，所以根据id去判断是否成功
    if (data.id) {
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
 * 根据id查找菜单
 */
MenuService.findById = async (id) => {
  try {
    const data = await Menu.findOne({
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
MenuService.update = async (obj) => {
  try {
    const data = await Menu.update(obj, {
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
MenuService.delete = async (id) => {
  try {
    const data = await Menu.destroy({
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
MenuService.batchDelete = async (ids) => {
  try {
    ids = ids.split(',');
    for (let i = 0; i < ids.length; i += 1) {
      const data = await Menu.destroy({
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
MenuService.search = async (req) => {
  const {
    or,
    and,
    gt,
    lt,
    like,
  } = Sequelize.Op;
  const { pageSize, pageIndex, params } = req;

  try {
    const result = await Menu.findAndCountAll({
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


module.exports = MenuService;
