const router = require('koa-router')();
const TagService = require('../services/TagService');

router.get('/1.0/tag', async (ctx) => {
  ctx.body = await TagService.findAll();
});

module.exports = router;
