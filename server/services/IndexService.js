const Tag = require('../models/Tag');
const User = require('../models/User');
const SysConfig = require('../models/SysConfig');
const Catalog = require('../models/Catalog');
const Article = require('../models/Article');
const Menu = require('../models/Menu');
const ReturnData = require('../util/ReturnData');
const ErrorMessage = require('../constants/ErrorMessage');
const log4js = require('koa-log4');

const logger = log4js.getLogger('app');

const IndexService = {};

IndexService.index = async () => {
  try {
    const tags = await Tag.findAll();
    const catalogs = await Catalog.findAll();
    // 查找出个人的基本信息
    const userInfo = await getUserInfo();
    userInfo.tag_count = tags.length;
    userInfo.catalog_count = catalogs.length;
    let articles = await Article.findAll({
      where: {
        is_top: 0,
      },
    });
    userInfo.article_count = articles.length;
    // 先对articles排序
    articles.sort((a, b) => b.createdAt - a.createdAt);
    // 推荐文章
    const hots = await Article.findAll({
      where: {
        is_hot: 1,
      },
    }) || [];
    // 把置顶文章放到最前
    const tops = await Article.findAll({
      where: {
        is_top: 1,
      },
    }) || [];
    articles = tops.concat(articles);
    // 对已经排好序的文章根据tags和catalogs对比出名字
    if (articles.length > 0) {
      articles.forEach((article) => {
        const temp = []; // 用来存储tag数组
        article.tags.split(',').forEach((tag) => {
          tags.forEach((t) => {
            if (t.id === tag) {
              temp.push(t);
            }
          });
        });
        article.tags = temp;
      });
    }
    const data = {
      tags: tags,
      catalogs: catalogs,
      articles: articles,
      hots: hots,
      userInfo: userInfo,
    };
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

// 准备好个人信息
async function getUserInfo() {
  try {
    const userInfo = {};
    const user = await User.findAll({
      where: {
        userName: 'admin',
      },
    });
    userInfo.user = user.length > 0 ? user[0] : {};
    const contacts = await SysConfig.findAll({
      where: {
        code: 'contact',
      },
    });
    userInfo.contacts = contacts || [];
    return userInfo;
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
}

IndexService.header = async () => {
  try {
    const menus = await Menu.findAll({
      where: {
        flag: 0,
      },
    });
    menus.sort((a, b) => a.sort - b.sort);
    const logo = await SysConfig.findAll({
      where: {
        code: 'logo',
      },
    });
    const data = {
      menus: menus,
      logo: logo && logo[0],
    };
    return ReturnData.success(data);
  } catch (err) {
    logger.error(err.stack);
    return ReturnData.error(ErrorMessage.NETWORK_ERROR);
  }
};

module.exports = IndexService;
