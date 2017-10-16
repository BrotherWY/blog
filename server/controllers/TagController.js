const router = require('koa-router')();
const TagService = require('../services/TagService');

router.get('/1.0/tag', async (ctx) => {
  ctx.body = await TagService.findAll();
});

router.post('/1.0/tag/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await TagService.add(req.tag);
});

module.exports = router;
