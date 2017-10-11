const router = require('koa-router')();

router.get('/home', (ctx) => {
  ctx.body = {
    name: 'haha',
    age: 22,
  };
});

module.exports = router;
