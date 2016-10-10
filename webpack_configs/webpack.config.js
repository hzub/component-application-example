const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const ROOT_DIR = path.resolve(__dirname, '..');

const SRC_DIR_NAME = 'src';
const DIST_DIR_NAME = 'dist';

const SRC_DIR = path.resolve(ROOT_DIR, SRC_DIR_NAME);
const DIST_DIR = path.resolve(ROOT_DIR, DIST_DIR_NAME);

const MAIN_ENTRY = path.join(SRC_DIR, 'main.js')


const config = module.exports = {}

/*  COMMON CFG
 *  ************************************************ */
config.context = ROOT_DIR;
config.debug = true;

config.resolve = {
  extensions: ['', '.js', '.scss', '.less'],
  modulesDirectories: ['node_modules', SRC_DIR_NAME],
  root: ROOT_DIR
}

config.module = {
  preLoaders: [],
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
      loader: 'ngtemplate?relativeTo=' + (path.join(__dirname, '../src'))
      + '/!html?interpolate',
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file?name=./assets/images/[hash].[ext]',
    }
  ],
};


config.plugins = [
  new CleanWebpackPlugin([DIST_DIR_NAME], {
    root: ROOT_DIR
  })
];


/*  ALL EXCEPT TEST CONFIGS
 *  ************************************************ */
if (!ENV_TEST) {
  config.entry = {
    main: MAIN_ENTRY,
  };

  config.output = {
    path: DIST_DIR,
    filename: '[name].js',
  };

  config.plugins.push(
    new HtmlWebpackPlugin({template: path.join(SRC_DIR_NAME, 'index.ejs')}),
    new ExtractTextPlugin('styles.css')
  );
}


/*  DEVELOPMENT CONFIGS
 *  ************************************************ */
if (ENV_DEVELOPMENT) {
  config.devtool = 'source-map';
}


/*  TEST CONFIGS
 *  ************************************************ */
if (ENV_TEST) {
  config.output = {};
  config.entry = {};
  config.devtool = 'inline-source-map';
  config.module.preLoaders.push({
    test: /\.js$/,
    exclude: [
      /server/,
      /node_modules/,
      /shared\/vendors/,
      /karma\.entry\.js$/,
      /\.test\.js$/,
      /\.spec\.js$/,
      /\.mock\.js$/,
      /__tests__/
    ],
    loader: 'isparta'
  });
}
