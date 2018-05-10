const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const paths = require('./paths/paths');
const webpack = require('webpack');
const HtmlWepbpackPlugin = require('html-webpack-plugin');

module.exports = [
  new CopyPlugin([
    paths.templates.main,
    paths.templates.alternative,
    paths.css.styles
  ]),
  new webpack.DefinePlugin({
    MARKETPLACE: process.env.ENVIRONMENT === "MARKETPLACE",
    DEVELOPMENT: process.env.ENVIRONMENT === "DEVELOPMENT"
  }),
  new HtmlWepbpackPlugin({
    inject: false,
    filename: 'preview.html',
    template: paths.templates.preview,
    templateState: process.env.TEMPLATE_STATE || 'main'
  })
];
