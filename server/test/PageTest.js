const model = require('../model');

const Tag = model.Tag;

Tag.findAndCountAll({
  limit: 10, // 每页数量
  offset: 10, // 偏移量
}).then((result) => {
  console.log(result.rows.length);
});

