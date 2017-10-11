const router = require('koa-router')();
const UserService = require('../services/UserService');

/**
 *  get 获取参数使用 ctx.query
 *  post 获取使用 ctx.request.body
 */
router.post('/1.0/login', async (ctx) => {
  const req = ctx.request.body;
  const user = await UserService.checkLogin(req.userName, req.password);
  if (user) {
    ctx.body = {
      user: user,
    };
  }
});

module.exports = router;
