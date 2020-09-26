const {DefinePlugin} = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: './src/AppRoot.tsx',
  devServer: {
    contentBase: './public',
    port: 1234
  },
  plugins: [
    new DefinePlugin({
      RECIPES_API_URI: JSON.stringify('http://localhost:8080'),
      DUMMY_AUTH: true,
    })
  ]
});
