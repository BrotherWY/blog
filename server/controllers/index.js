const router = require('koa-router')();

router.get('/', (ctx) => {
  ctx.body = '哈哈哈';
});

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json',
  };
});

module.exports = router;
