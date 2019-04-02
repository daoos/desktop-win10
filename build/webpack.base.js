/**
 * Created by HaijunZhang on 2019/3/19.
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.prod.output,
    publicPath: process.env.NODE_ENV === 'production' ? config.prod.publicPath : config.dev.publicPath,
    filename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'utils': 'cmp-basic/src/utils',
      'directive': 'cmp-basic/src/directive',
      'component': 'cmp-basic/src/components',
      'components': path.resolve(__dirname, '../src/components'),
      'task': path.resolve(__dirname, '../src/views/task'),
      'filters': path.resolve(__dirname, '../src/filters'),
      'views': path.resolve(__dirname, '../src/views'),
      'services': path.resolve(__dirname, '../src/services'),
      'util': path.resolve(__dirname, '../src/utils')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [utils.createLintRule()] : []),
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader', options: {} }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new VueLoaderPlugin()
  ]
}
