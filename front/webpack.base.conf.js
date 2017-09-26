const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';

const config = {
  prod: {
    assetsPublicPath: '/',
    cssSourceMap: false,
  },
  dev: {
    assetsPublicPath: '/',
    cssSourceMap: false,
  },
};

function assetsPath(_path) {
  return path.posix.join('static', _path);
}

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: assetsPath('js/[name].[chunkhash].js'),
    publicPath: `${isProd ? config.prod.assetsPublicPath : config.dev.assetsPublicPath}dist/`,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: eslintFriendlyFormatter,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [
            autoprefixer({
              browsers: ['last 5 versions'],
            }),
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.(scss)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(css)$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash].[ext]'),
        },
      },
    ],
  },
};

