const router = require('koa-router')();
const TagService = require('../services/TagService');

router.get('/1.0/tag', async (ctx) => {
  ctx.body = await TagService.findAll();
});

router.post('/1.0/tag/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await TagService.add(req);
});

router.put('/1.0/tag/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await TagService.update(req);
});

router.delete('/1.0/tag/delete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await TagService.delete(req.id);
});

module.exports = router;
