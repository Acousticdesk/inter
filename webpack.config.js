const conf = require('./conf');
const path = require('path');

module.exports = {
  entry: conf.paths.js.app,
  output: {
    library: 'DIOInt',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: conf.moduleRules
  },
  plugins: conf.plugins
};
