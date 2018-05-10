const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.handlebars$/,
    exclude: /node_modules/,
    use: 'handlebars-loader'
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    use: 'html-loader'
  }, {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {loader: MiniCssExtractPlugin.loader},
      {loader: 'css-loader'}
    ]
  }
];
