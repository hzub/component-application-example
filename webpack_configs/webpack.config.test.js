const webpackConfig = require('./webpack.config.js');
const fs = require('fs');

fs.createReadStream('./app_configs/config.test.json').pipe(fs.createWriteStream('./src/config.json'));

module.exports = webpackConfig;
