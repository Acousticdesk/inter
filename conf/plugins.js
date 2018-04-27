const HtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const paths = require('./paths/paths');

module.exports = [
  // new HtmlPlugin({
  //   inject: false,
  //   template: paths.templates.main,
  //   filename: 'main.html',
  //   inline: {
  //     js: fs.readFileSync(paths.js.app, 'utf8'),
  //     css: fs.readFileSync(paths.css.styles, 'utf8')
  //   }
  // }),
  // new HtmlPlugin({
  //   inject: false,
  //   template: paths.templates.alternative,
  //   filename: 'alternative.html',
  //   inline: {
  //     js: fs.readFileSync(paths.js.app, 'utf8'),
  //     css: fs.readFileSync(paths.css.styles, 'utf8')
  //   }
  // })
];
