const webpack = require('webpack')
const configure = require('./config')
const config = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

config.output.filename = '[name].js'
config.output.chunkFilename = '[id].js'

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  config.entry.app
]
// enable devtool
config.devtool = '#source-map'
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': configure.dev.env
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: configure.dev.BROWSER_SYNC,
    proxy: 'localhost:' + configure.dev.DEV_SERVER,
    notify: false
  }, {
    reload: false
  })
)

module.exports = config
