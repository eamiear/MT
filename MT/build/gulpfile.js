/**
 * @export {gulp}
 * 1. gulp.start('default')
 * 2. 命令行执行 gulp
 */
const gulp = require('gulp')
const fs = require('fs-extra')
const rev = require('gulp-rev')
const csso = require('gulp-csso')
const filter = require('gulp-filter')
const uglify = require('gulp-uglify')
const useref = require('gulp-useref')
const revReplace = require('gulp-rev-replace')
const config = require('./config')

// 合并压缩打包 index.html 中 build 标签内的资源
gulp.task('bundle', function () {
  var jsFilter = filter('**/*.js', { restore: true })
  var cssFilter = filter('**/*.css', { restore: true })
  var userefAssets = useref.assets()

  return gulp.src(config.paths.DIST.join('index.html'))
    .pipe(userefAssets)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(rev())
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest(config.paths.DIST))
})

// 由于插件均被合并压缩打包，故可删除以减少生产环境下的文件量
gulp.task('clean', ['bundle'], function () {
  fs.remove(config.paths.DIST.join('static/plugins'))
})

gulp.task('default', ['bundle', 'clean'])

if (module.parent) {
  module.exports = gulp
} else {
  gulp.start('default')
}
