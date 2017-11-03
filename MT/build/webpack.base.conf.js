var webpack = require('webpack')
var path = require('path')
var config = require('./config')
var styleRules = require('./config/style-rules')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var NyanProgressPlugin = require('nyan-progress-webpack-plugin')

module.exports = {
  entry: {
    app: config.paths.SRC.join('apps.js')
  },
  // devtool - source map 配置详见 https://webpack.js.org/configuration/devtool
  devtool: false,
  output: {
    path: config.paths.DIST,
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': config.paths.SRC,
      'static': path.resolve(__dirname, '../static'),
      'jquery': 'jquery'
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      },
      enforce: 'pre',
      include: config.paths.SRC
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: styleRules.vueLoader
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      include: config.paths.SRC
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'image/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'fonts/[name]-[hash:6].[ext]'
      }
    }].concat(styleRules.basic)
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    // new webpack.DefinePlugin(Object.assign({
    //   'process.env': env
    // }, env)),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // minChunks: function (module) {
      //   return module.context && module.context.indexOf('node_modules') !== -1
      // },
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.paths.SRC.join('index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
