const router = require('koa-router')();
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const uploadPath = require('../util/InitUpload');
/**
 *  图片上传
 */
router.post('/1.0/upload', koaBody({ multipart: true }), async (ctx) => {
  const file = ctx.request.body.files.file;
  let name = file.name;
  name = setImgName(name);
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(uploadPath, name));
  reader.pipe(stream);
  ctx.body = {
    status: 'success',
    url: `${ctx.origin}/${name}`,
  };
});

/**
 * 设置图片新名字 使用uuid
 */
function setImgName(name) {
  return `${uuid.v4()}${path.extname(name)}`;
}
module.exports = router;
