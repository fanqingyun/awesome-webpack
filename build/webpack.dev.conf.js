const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
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
    host: 'localhost',
    // 服务器端口
    port: '9000',
    // dev-server的2种形式之一
    inline: false,
    // 编译成功时自动打开浏览器
    // open: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      // 转换css，use里面的loader是从后往前开始使用的，本例子中先使用css-loader处理后，再使用style-loader
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, 'css-loader', 'postcss-loader'],
        exclude: /node_modules/
        // include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  plugins: [
    // 配置环境，区别生产环境和开发环境
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    })
  ]
})
