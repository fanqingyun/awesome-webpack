const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
// const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(common, {
  // 配置模型： 开发环境
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../web',
    // host: 'localhost',   //服务器的ip地址
    // port: 1573, //端口
    // open: true,  //自动打开页面
    // //热加载，功能：只渲染所改组件的页面效果，不会全部刷新，其他页面数据依然会存在
    // hot: true
    // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host, // 热加载
    // port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    // 在浏览器上全屏显示编译的errors或warnings
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
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
    // new webpack.HashedModulesPlugin()
  ]
})
// 这一步可以动态获取端口并把devWebpackConfig暴露出去
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 9000
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // console.log(devWebpackConfig)
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        }
      }))
      resolve(devWebpackConfig)
    }
  })
})
