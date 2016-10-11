module.exports = config => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    files: [
      {pattern: 'src/karma.entry.js', watched: false}
    ],

    preprocessors: {
      'src/karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack_configs/webpack.config'),
    webpackServer: {
      noInfo: true
    },

    port: 9876,
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: '.'},
      ]
    },
    autoWatch: false,
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
