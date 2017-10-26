const router = require('koa-router')();
const IndexService = require('../services/IndexService');

router.get('/1.0/index', async (ctx) => {
  ctx.body = await IndexService.index();
});

router.get('/1.0/index/header', async (ctx) => {
  ctx.body = await IndexService.header();
});

module.exports = router;
