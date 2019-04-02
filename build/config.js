/**
 * Created by HaijunZhang on 2019/3/21.
 */
const path = require('path')
const httpType = 'http://'
const proxyUrl = '10.20.2.20:8081' // 代理地址设置

module.exports = {
  dev: {
    publicPath: '/',
    useEslint: false,
    devtool: 'cheap-eval-source-map',
    host: 'localhost',
    assetsSubDirectory: 'static',
    port: 8010,
    autoOpenBrowser: false,
    proxy: {
      '/api': {
        target: httpType + proxyUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      },
      '/captcha': {
        target: httpType + proxyUrl
      },
      '/messageService': {
        target: 'ws://' + proxyUrl,
        changeOrigin: true,
        ws: true
      },
      '/uploadService': {
        target: 'ws://' + proxyUrl,
        changeOrigin: true,
        ws: true
      },
      '/logViewService': {
        target: 'ws://' + proxyUrl,
        changeOrigin: true,
        ws: true
      }
    },
    poll: false,
    overlay: true,
    notifyOnErrors: true,
    cssSourceMap: false
  },
  prod: {
    output: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    assetsSubDirectory: 'static',
    devtool: 'source-map',
    productionSourceMap: false
  }
}
