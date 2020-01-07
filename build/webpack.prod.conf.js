const merge = require('webpack-merge')
const common = require('./webpack.base.conf.js')
// const webpack = require('webpack')
const path = require('path')
const config = require('../config')
// 将css文件从js文件中分离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩js文件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
// 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 打包前先清空输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 复制静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 多线程压缩
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 用于分析代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prodConfig = merge(common, {
  // 配置模型：生产环境
  mode: 'production',
  output: {
    // 打包路径
    path: config.build.assetsRoot,
    // 文件名
    filename: 'js/[name].[contenthash].js'
    // 上线时配置的cdn地址
    // publicPath: '../dist'
  },
  optimization: {
    // 打包时，会抽离出runtime部分
    runtimeChunk: 'single',
    // 分离chunks, 分离不常变化的文件，如 node_modules 下引用的库
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        }
      }
    },
    minimizer: [
      new UglifyWebpackPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true
          },
          warnings: false
        },
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsWebpackPlugin({})
    ]
  },
  module: {
    rules: [
      // 转换css，use里面的loader是从后往前开始使用的，本例子中先使用css-loader处理后，再使用style-loader
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ],
        // exclude: /node_modules/
        // include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这个配置能让css里面的背景图片的路径正确
              publicPath: '../'
            }
          },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
})
if (config.build.bundleAnalyzerReport) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
    statsOptions: { source: false }
  }))
}
module.exports = prodConfig
