/**
 * Created by HaijunZhang on 2019/3/19.
 */
const merge = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.base')
const config = require('./config')
const utils = require('./utils')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: config.prod.output,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  module: {
    rules: utils.cssLoaders({
      sourceMap: config.prod.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.prod.productionSourceMap ? config.prod.devtool : false,
  plugins: [
    // new CleanWebpackPlugin(),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      title: 'A vue project',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.prod.assetsSubDirectory,
        ignore: ['.*', '*.json']
      }
    ])
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: config.prod.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // new TerserPlugin({
      //   sourceMap: config.prod.productionSourceMap,
      //   cache: true,
      //   parallel: true
      // }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin()
    ]
  }
})
