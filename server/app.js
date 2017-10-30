const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');// cors middleware
const json = require('koa-json');
const serve = require('koa-static');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('./util/InitLog');

const ArticleController = require('./controllers/ArticleController');
const CatalogController = require('./controllers/CatalogController');
const IndexController = require('./controllers/IndexController');
const LoginController = require('./controllers/LoginController');
const MenuController = require('./controllers/MenuController');
const SysConfigController = require('./controllers/SysConfigController');
const TagController = require('./controllers/TagController');
const UploadController = require('./controllers/UploadController');


const app = new Koa();
// error handler
onerror(app);

// middlewares
app.use(serve(path.join(__dirname, './upload')));// 暴露出上传目录
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(cors());
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));
// controller
app.use(UploadController.routes(), UploadController.allowedMethods());
app.use(TagController.routes(), TagController.allowedMethods());
app.use(SysConfigController.routes(), SysConfigController.allowedMethods());
app.use(MenuController.routes(), MenuController.allowedMethods());
app.use(LoginController.routes(), LoginController.allowedMethods());
app.use(IndexController.routes(), IndexController.allowedMethods());
app.use(CatalogController.routes(), CatalogController.allowedMethods());
app.use(ArticleController.routes(), ArticleController.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});


module.exports = app;
