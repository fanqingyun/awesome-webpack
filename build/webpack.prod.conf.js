const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
const path = require('path')

module.exports =  merge(common, {
  // 配置模型：生产环境
  mode: 'production',
  output: {
    // 打包路径
    path: path.resolve(__dirname, '../dist'),
    // 文件名
    filename: '[name].js'
    // 上线时配置的cdn地址
    // publicPath: '../dist'
  },
  plugins: [
    
  ]
})