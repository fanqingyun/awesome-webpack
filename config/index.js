const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static', // 静态文件目录
    assetsPublicPath: '/', // 相对文件路径
    proxyTable: {
      '/api': {
        // target: 'http://192.1.1.148:9000/systex_nbuWeb/api', 
        target: 'http://192.1.1.205:10016/systex_nbuWeb/api',
        // target: 'http://192.1.1.205:10023/systex_nbuWeb/api',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 需要rewrite的,
        }
      }
    },
    host: 'localhost',
    port: '9000',
    autoOpenBrowser: false, // 是否自动打开浏览器
    poll: false,
    devtool: 'cheap-module-eval-source-map' // Source Maps
  },
  build: {
    // html模板
    index: path.resolve(__dirname, '../web/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../web'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/web/',
    // 生产环境的souce map
    productionSourceMap: false,
    devtool: '#source-map',
    // 开启静态文件的Gzip压缩
    // 如果是true 的话  需要 npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 打包完成显示包大小的状态分析
    // `npm run build --report`
    // bundleAnalyzerReport: process.env.npm_config_report
  }
}
