const { HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')
const VConsolePlugin = require('vconsole-webpack-plugin')

const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {

  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    clientLogLevel: 'warning',
    contentBase: false,
    port: 8888,
    quiet: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new VConsolePlugin({
      enable: true
    })
  ]
})