const webpack = require('webpack')
const config = require('./webpack.base.conf')
const configure = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'production' ? configure.prod.env : {'NODE_EN': configure.__env__}

config.output.filename = 'js/[name].[chunkhash:6].js'
config.output.chunkFilename = 'js/[id].[chunkhash:6].js'

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      warnings: false,
      collapse_vars: true,
      reduce_vars: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env': env
  }),
  // split echarts into its own file
  new webpack.optimize.CommonsChunkPlugin({
    async: 'echarts',
    minChunks (module) {
      const context = module.context
      return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash:6].css',
    allChunks: true // 若要按需加载 CSS 则请注释掉该行
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      safe: true
    }
  })
)

module.exports = config
