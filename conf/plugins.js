const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const paths = require('./paths/paths');
const webpack = require('webpack');
const HtmlWepbpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const templateState = process.env.TEMPLATE_STATE || 'main';

module.exports = [
  new CopyPlugin([
    paths.templates.main,
    paths.templates.alternative
  ]),
  new webpack.DefinePlugin({
    MARKETPLACE: process.env.ENVIRONMENT === 'MARKETPLACE',
    DEVELOPMENT: process.env.ENVIRONMENT === 'DEVELOPMENT',
    ALTERNATIVE_TEMPLATE: templateState === 'alternative'
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.css'
  }),
  new HtmlWepbpackPlugin({
    inject: false,
    filename: 'preview.html',
    template: paths.templates.preview,
    templateState
  })
];
