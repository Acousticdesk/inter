const conf = require('./conf');
const path = require('path');

module.exports = {
  entry: conf.paths.js.app,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: conf.plugins
};
