const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
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
