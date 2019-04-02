/**
 * Created by HaijunZhang on 2019/3/19.
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const config = require('./config')
const utils = require('./utils')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  module: {
    rules: utils.cssLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  devServer: {
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    overlay: config.dev.overlay ? {
      warnings: true,
      errors: true
    } : false,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxy,
    // 一切服务都启用gzip 压缩
    compress: true,
    // 启用 webpack 的模块热替换特性
    hot: true,
    quiet: true, //
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { BASE_URL: '"/api"' }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      title: 'A vue project'
    })
  ]
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPortPromise().then(port => {
    process.env.PORT = port
    devConfig.devServer.port = port
    devConfig.plugins.push(
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here: http://${devConfig.devServer.host}:${devConfig.devServer.port}`
          ]
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      })
    )
    resolve(devConfig)
  }).catch(err => {
    reject(err)
  })
})
