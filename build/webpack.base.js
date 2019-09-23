const HtmlPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BannerPlugin } = require('webpack')
const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, '../'),

  entry: {
    index: './src/index.js'
  },

  output: {
    publicPath: '/',
  },

  target: 'web',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          {
            loader: 'css-loader',
            /**
             * css module 不启用 camelCase, 否则生成的文件中包含未转换成camelCase的键
             */
            options: {
              sourceMap: false,
              module: true,
              localIdentName: '[hash:base64:6]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|ttf|svg|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new BannerPlugin('From Kiro <flykiro@gmail.com>'),
    new FriendlyErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[id].[contenthash:6].css'
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      inject: true,
      minify: {
        decodeEntities: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,

        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,

        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new (require('../test/index'))
  ]
}
