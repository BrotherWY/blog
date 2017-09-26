const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.client.conf');
const serverConfig = require('./webpack.server.conf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
  } catch (e) {}
};

module.exports = function setupDevServer(app, cb) {
  let bundle,
    clientManifest;
  let resolve;
  const readyPromise = new Promise((r) => { resolve = r; });
  const ready = (...args) => {
    resolve();
    cb(...args);
  };

  // modify client config to work with hot middleware
  clientConfig.entry.client = [clientConfig.entry.client, 'webpack-hot-middleware/client?reload=true'];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  // dev middleware
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });
  app.use(devMiddleware);
  clientCompiler.plugin('done', (s) => {
    const stats = s.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;

    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json',
    ));
    if (bundle) {
      ready(bundle, {
        clientManifest,
      });
    }
  });

  // hot middleware
  app.use(webpackHotMiddleware(clientCompiler, { heartbeat: 5000 }));

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, s) => {
    if (err) throw err;
    const stats = s.toJson();
    if (stats.errors.length) return;

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    if (clientManifest) {
      ready(bundle, {
        clientManifest,
      });
    }
  });

  return readyPromise;
};
