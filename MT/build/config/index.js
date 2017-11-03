var path = require('path')
/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target)
}
var ROOT = path.resolve(__dirname, '../..')

var env = (process.env.NODE_ENV || 'development').trim()
console.log('[Current environment]', env)

module.exports = {
  __env__: env,
  __ISDEV__: env === 'development',
  __ISPROD__: env === 'production',
  prod: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env'),
    BROWSER_SYNC: 8081,  // BrowserSync 调试服务器
    DEV_SERVER: 8100,    // Express + Webpack 热替换开发服务器，且提供静态资源支持
    MOCK_SERVER: 8900    // RESTful API Mock 服务器
  },
  paths: {
    DIST: ROOT.join('dist'),    // build 后输出目录
    SRC: ROOT.join('src'),      // 源码目录
    STATIC: ROOT.join('static') // 高度静态资源目录
  }
}
