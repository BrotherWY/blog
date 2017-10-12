const Koa = require('koa');
const cors = require('@koa/cors');// cors middleware
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('./util/InitLog');
// controller
const LoginController = require('./controllers/LoginController');

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

// routes
app.use(LoginController.routes(), LoginController.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});


module.exports = app;
