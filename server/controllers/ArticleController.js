const router = require('koa-router')();
const ArticleService = require('../services/ArticleService');

router.get('/1.0/article', async (ctx) => {
  ctx.body = await ArticleService.findAll();
});

router.get('/1.0/article/paging', async (ctx) => {
  const req = ctx.query;
  ctx.body = await ArticleService.findAllByPaging(req);
});

router.post('/1.0/article/add', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.add(req);
});

router.put('/1.0/article/update', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.update(req);
});

router.delete('/1.0/article/delete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await ArticleService.delete(req.id);
});

router.delete('/1.0/article/batchDelete', async (ctx) => {
  const req = ctx.query;
  ctx.body = await ArticleService.batchDelete(req.ids);
});

router.post('/1.0/article/search', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.search(req);
});

router.put('/1.0/article/updateStatu', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.updateStatu(req);
});

router.put('/1.0/article/batchUpdateStatu', async (ctx) => {
  const req = ctx.request.body;
  ctx.body = await ArticleService.batchUpdateStatu(req);
});

module.exports = router;
