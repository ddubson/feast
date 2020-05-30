const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: './src/web/AppRoot.tsx',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: 1234
  }
});
