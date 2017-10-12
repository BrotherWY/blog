const router = require('koa-router')();
const UserService = require('../services/UserService');

/**
 *  get 获取参数使用 ctx.query
 *  post 获取使用 ctx.request.body
 */
router.post('/1.0/login', async (ctx) => {
  const req = ctx.request.body;
  const data = await UserService.checkLogin(req.userName, req.password);
  ctx.body = data;
});

module.exports = router;
