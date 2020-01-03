const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
const path = require('path')
// 压缩js文件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
// 将css文件从js文件中分离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 打包前先清空输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = merge(common, {
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
  // 压缩js和css文件
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({ parallel: 4 }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new CleanWebpackPlugin()
  ]
})
