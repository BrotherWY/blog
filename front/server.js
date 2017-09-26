const express = require('express');
const LRU = require('lru-cache');
const fs = require('fs');
const p = require('path');
const devServer = require('./setup-dev-server');
const { createBundleRenderer } = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';

const resolve = file => p.resolve(__dirname, file);

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    basedir: resolve('./dist'),
    runInNewContext: 'once',
  }));
}

const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

let renderer,
  readyPromise;
const app = express();

if (isProd) {
  renderer = createRenderer(bundle, {
    clientManifest,
  });
} else {
  readyPromise = devServer(app, (b, options) => {
    renderer = createRenderer(b, options);
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30,
  fallthrough: false,
});


app.use('/dist', serve('./dist', true));

app.get('*', (req, res) => {
  if (readyPromise) {
    readyPromise.then(() => {
      requestSetting(res, req);
    });
  } else {
    requestSetting(res, req);
  }
});

app.listen(8888, () => {
  console.log('listen 8888');
});

function requestSetting(res, req) {
  res.setHeader('Content-Type', 'text/html');
  const context = {
    title: 'test', // default title
    url: req.url,
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
}
