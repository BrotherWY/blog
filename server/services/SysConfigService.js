const SysConfig = require('../models/SysConfig');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');
const Sequelize = require('sequelize');

const logger = log4js.getLogger('app');

const SysConfigService = {};


SysConfigService.findAll = async () => {
  try {
    const data = await SysConfig.findAll();
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};


SysConfigService.findByCode = async (code) => {
  try {
    const data = await SysConfig.findAll({
      where: {
        code: code,
      },
    });
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

/**
 * 分页
 */
SysConfigService.findAllByPaging = async ({ pageSize, pageIndex }) => {
  try {
    const data = await SysConfig.findAndCountAll({
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
SysConfigService.add = async (sysConfig) => {
  try {
    const data = await SysConfig.create(sysConfig);
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
 * 根据id查找菜单
 */
SysConfigService.findById = async (id) => {
  try {
    const data = await SysConfig.findOne({
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
SysConfigService.update = async (obj) => {
  try {
    const data = await SysConfig.update(obj, {
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
SysConfigService.delete = async (id) => {
  try {
    const data = await SysConfig.destroy({
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
SysConfigService.batchDelete = async (ids) => {
  try {
    ids = ids.split(',');
    for (let i = 0; i < ids.length; i += 1) {
      const data = await SysConfig.destroy({
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
SysConfigService.search = async (req) => {
  const {
    or,
    and,
    gt,
    lt,
    like,
  } = Sequelize.Op;
  const { pageSize, pageIndex, params } = req;

  try {
    const result = await SysConfig.findAndCountAll({
      where: {
        [or]: [
          {
            name: {
              [like]: `%${params.name}%`,
            },
          },
          {
            code: {
              [like]: `%${params.code}%`,
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


module.exports = SysConfigService;
