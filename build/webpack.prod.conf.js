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
// 多线程压缩
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
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
    new CleanWebpackPlugin(),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ]
})
