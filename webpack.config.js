var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/js');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules : [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
