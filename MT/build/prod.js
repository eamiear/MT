const fs = require('fs-extra')
const webpack = require('webpack')
const gulp = require('./gulpfile')
const configure = require('./config')
const config = require('./webpack.prod.conf')

fs.emptyDirSync(configure.paths.DIST) // 清空 build 目录
fs.copySync(configure.paths.STATIC, configure.paths.DIST.join('static')) // 复制高度静态资源

webpack(config, function (err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }), err)

  // save build info to file
  // fs.writeFile(
  //   PATHS.DIST.join('__build_info__'),
  //   stats.toString({ color: false })
  // );

  // bundle plugins
  gulp.start('default')
})
