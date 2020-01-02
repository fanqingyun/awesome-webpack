const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
const path = require('path')

module.exports =  merge(common, {
  // 配置模型： 开发环境
  mode: 'development',
  devServer: {
    // 开启热模块
    hot: true,
    // 压缩文件,开启gzip
    compress: true,
    // 告诉服务器从哪里提供内容,建议提供绝对路径
    contentBase: path.join(__dirname, '../dist'),
    // 服务器地址
    host: "localhost",
    // 服务器端口
    port: "9000",
    // dev-server的2种形式之一
    inline: false,
    // 编译成功时自动打开浏览器
    // open: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
})
