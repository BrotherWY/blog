const router = require('koa-router')();
const SysConfigService = require('../services/SysConfigService');

router.get('/1.0/config', async (ctx) => {
  ctx.body = await SysConfigService.findAll();
});

router.get('/1.0/config/paging', async (ctx) => {
  const req = ctx.query;
  ctx.body = await SysConfigService.findAllByPaging(req);
});

router.post('/1.0/config/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await SysConfigService.add(req);
});

router.put('/1.0/config/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await SysConfigService.update(req);
});

router.delete('/1.0/config/delete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await SysConfigService.delete(req.id);
});

router.delete('/1.0/config/batchDelete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await SysConfigService.batchDelete(req.ids);
});

router.post('/1.0/config/search', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await SysConfigService.search(req);
});

module.exports = router;
