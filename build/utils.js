/**
 * Created by HaijunZhang on 2019/3/21.
 */
const path = require('path')
const packageConfig = require('../package.json')
const config = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.prod.assetsSubDirectory
      : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.createLintRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: path.resolve(__dirname, '../src')
})

exports.cssLoaders = options => {
  const output = []
  function generateLoaders (loader, loaderOptions) {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }
    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (options.extract) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    } else {
      loaders.unshift('vue-style-loader')
    }
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    return loaders
  }
  const loaders = {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
