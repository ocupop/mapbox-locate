const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    main: [
      './src/assets/_js/main.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  output: {
    path: path.resolve(__dirname, 'src/assets/js'),
    filename: '[name].bundle.js'
  }
};

module.exports = config;