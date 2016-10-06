const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname, '..');

const SRC_DIR_NAME = 'src';
const DIST_DIR_NAME = 'dist';

const SRC_DIR = path.resolve(ROOT_DIR, SRC_DIR_NAME);
const DIST_DIR = path.resolve(ROOT_DIR, DIST_DIR_NAME);

const MAIN_ENTRY = path.resolve(SRC_DIR, 'main.js')

module.exports = {
  context: ROOT_DIR,
  debug: true,

  resolve: {
    extensions: ['', '.js', '.scss', '.less'],
    modulesDirectories: ['node_modules', 'src'],
    root: ROOT_DIR
  },

  entry: {
    main: MAIN_ENTRY,
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader'),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      }, {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=./assets/fonts/[hash].[ext]',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=./assets/fonts/[hash].[ext]',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=./assets/fonts/[hash].[ext]',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=./assets/fonts/[hash].[ext]',
      }, {
        test: /src[\/\\]components[\/\\].+\.html$/,
        loader: 'raw',
      }, {
        test: /src[\/\\].+\.html$/,
        exclude: /src[\/\\]components/,
        loader: 'ngtemplate?relativeTo=' + (path.join(__dirname, '../src')) + '/!html?interpolate',
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=./assets/images/[hash].[ext]',
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.js'),
    }),
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin([DIST_DIR_NAME], {
      root: ROOT_DIR
    }),
  ],
};
