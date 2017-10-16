const router = require('koa-router')();
const ArticleService = require('../services/ArticleService');

router.get('/1.0/article', async (ctx) => {
  ctx.body = await ArticleService.findAll();
});

router.post('/1.0/article/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.add(req);
});

module.exports = router;
