const router = require('koa-router')();
const CatalogService = require('../services/CatalogService');

router.get('/1.0/catalog', async (ctx) => {
  ctx.body = await CatalogService.findAll();
});

router.get('/1.0/catalog/paging', async (ctx) => {
  const req = ctx.query;
  ctx.body = await CatalogService.findAllByPaging(req);
});

router.post('/1.0/catalog/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await CatalogService.add(req);
});

router.put('/1.0/catalog/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await CatalogService.update(req);
});

router.delete('/1.0/catalog/delete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await CatalogService.delete(req.id);
});

router.delete('/1.0/catalog/batchDelete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await CatalogService.batchDelete(req.ids);
});

router.post('/1.0/catalog/search', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await CatalogService.search(req);
});

module.exports = router;
