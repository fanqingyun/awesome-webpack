// 模板,这样就不用手动把打包后的js，css等的文件路径加入index.html文件，也不用手动把index.html文件加入打包的路径里
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 压缩js文件
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
// 将css文件从js文件中分离出来
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 打包前先清空输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
module.exports = {
  entry: ["./src/main.js"],
  // 压缩js和css文件
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({ parallel: 4 }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      // 转换css，use里面的loader是从后往前开始使用的，本例子中先使用css-loader处理后，再使用style-loader
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
        exclude: /node_modules/
        // include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "less-loader"
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src")
      },
      // 加载图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      // ES6/ES7/JSX 转义需要 Babel 的依赖，支持装饰器
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
            // options: {
            //   presets: ["@babel/preset-env", "@babel/react"],
            //   plugins: [
            //     [require("@babel/plugin-proposal-decorators"), { legacy: true }]
            //   ]
            // }
          }
        ],
        // include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CleanWebpackPlugin()
  ]
};
