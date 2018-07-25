const paths = require('./paths/paths');
const webpack = require('webpack');
const HtmlWepbpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const colors = require('colors');

if (!process.env.TEMPLATE_STATE) {
	console.log('No template state was provided... Setting to default - main'.red);
}

const templateState = process.env.TEMPLATE_STATE || 'main';

module.exports = [
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
  }),
  new HtmlWepbpackPlugin({
    inject: false,
    filename: 'main.html',
    template: paths.templates.main,
    minify: true
  }),
  new HtmlWepbpackPlugin({
    inject: false,
    filename: 'alternative.html',
    template: paths.templates.alternative,
    minify: true
  })
];
