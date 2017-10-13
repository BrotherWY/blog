const router = require('koa-router')();
/**
 *  文件上传
 */
router.post('/1.0/upload', async (ctx) => {
  const req = ctx.request.body;
  console.log(req);
});

module.exports = router;
