/* eslint-disable global-require, no-process-env */

// Look in ./config folder for webpack.*.js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config/webpack.prod.js');
} else {
  module.exports = require('./config/webpack.dev.js');
}
