// 模板,这样就不用手动把打包后的js，css等的文件路径加入index.html文件，也不用手动把index.html文件加入打包的路径里
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ]
}