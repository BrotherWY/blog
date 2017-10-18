/**
 * 规范返回数据类型
 */

const returnData = {};

returnData.success = (data) => {
  if (data instanceof Array) {
    data.sort((a, b) => b.createdAt - a.createdAt);
  }
  if (data && data.rows) {
    data.rows.sort((a, b) => b.createdAt - a.createdAt);
  }
  return {
    code: 200,
    data: data,
  };
};

returnData.error = (msg) => {
  return {
    code: -1,
    msg: msg,
  };
};

module.exports = returnData;

