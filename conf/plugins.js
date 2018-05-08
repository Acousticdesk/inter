const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const paths = require('./paths/paths');
const webpack = require('webpack');

module.exports = [
  new CopyPlugin([
    paths.templates.main,
    paths.templates.alternative,
    paths.css.styles
  ]),
  new webpack.DefinePlugin({
    MARKETPLACE: process.env.ENVIRONMENT === "MARKETPLACE",
    DEVELOPMENT: process.env.ENVIRONMENT === "DEVELOPMENT"
  })
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
