const router = require('koa-router')();
const CatalogService = require('../services/CatalogService');

router.get('/1.0/catalog', async (ctx) => {
  ctx.body = await CatalogService.findAll();
});

router.post('/1.0/catalog/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await CatalogService.add(req.catalog);
});

router.put('/1.0/catalog/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await CatalogService.add(req);
});

module.exports = router;
