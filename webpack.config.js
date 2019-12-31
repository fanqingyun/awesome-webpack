const path = require('path');
// ExtractTextPlugin不支持webpack4，替换成mini-css-extract-plugin
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录
  context: path.resolve(__dirname, './src'),
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        // use: ['style-loader', 'css-loader?minimize'],
        // 提取到js
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader'
        //   }
        // ]
        // 单独提取到css文件
        // use: ExtractTextPlugin.extract({
        //   // 转换 .css 文件需要使用的 Loader
        //   use: ['css-loader'],
        // })
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: `[name]_[contenthash:8].css`,
    // }),
    new miniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`
    })
  ]
};