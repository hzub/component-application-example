const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '..'),
  debug: true,
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
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
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
  ],
};
