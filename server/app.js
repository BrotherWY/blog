const Koa = require('koa');
const cors = require('@koa/cors');// cors middleware
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('./util/InitLog');
const controllers = require('./controllers');

const app = new Koa();
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(cors());
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

// controller
for (const i in controllers) {
  app.use(controllers[i].routes(), controllers[i].allowedMethods());
}

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});


module.exports = app;
