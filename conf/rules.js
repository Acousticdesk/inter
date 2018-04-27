module.exports = [
  {
    test: /\.html$/,
    exclude: /node_modules/,
    use: 'html-loader'
  }, {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'}
    ]
  }
];
