const {DefinePlugin} = require("webpack");
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    app: ['./src/web/AppRoot.tsx']
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new DefinePlugin({
      DUMMY_AUTH: false,
      RECIPES_API_URI: "https://feast-api-dev.herokuapp.com"
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
