/**
 * 规范返回数据类型
 */

const returnData = {};

returnData.success = (data) => {
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

