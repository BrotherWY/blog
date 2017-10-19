const router = require('koa-router')();
const MenuService = require('../services/MenuService');

router.get('/1.0/menu', async (ctx) => {
  ctx.body = await MenuService.findAll();
});

router.get('/1.0/menu/paging', async (ctx) => {
  const req = ctx.query;
  ctx.body = await MenuService.findAllByPaging(req);
});

router.post('/1.0/menu/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await MenuService.add(req);
});

router.put('/1.0/menu/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await MenuService.update(req);
});

router.delete('/1.0/menu/delete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await MenuService.delete(req.id);
});

router.delete('/1.0/menu/batchDelete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await MenuService.batchDelete(req.ids);
});

router.post('/1.0/menu/search', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await MenuService.search(req);
});

module.exports = router;
