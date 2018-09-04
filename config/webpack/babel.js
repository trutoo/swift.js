const POLYFILL_BROWSERS = require('../helpers/browsers.js');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          browsers: POLYFILL_BROWSERS,
        },
      }
    ]
  ],
}
