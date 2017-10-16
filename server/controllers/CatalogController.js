const router = require('koa-router')();
const CatalogService = require('../services/CatalogService');

router.get('/1.0/catalog', async (ctx) => {
  ctx.body = await CatalogService.findAll();
});

module.exports = router;
