const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const paths = require('./paths/paths');

module.exports = [
  new CopyPlugin([
    paths.templates.main,
    paths.templates.alternative,
    paths.css.styles
  ])
  // new HtmlPlugin({
  //   inject: false,
  //   template: paths.templates.main,
  //   filename: 'main.html'
  // }),
  // new HtmlPlugin({
  //   inject: false,
  //   template: paths.templates.alternative,
  //   filename: 'alternative.html'
  // })
];
