const utils = require('./utils')
// 模板,这样就不用手动把打包后的js，css等的文件路径加入index.html文件，也不用手动把index.html文件加入打包的路径里
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css文件从js文件中分离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 进行多线程执行
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const path = require('path')
module.exports = {
  entry: ['./src/main.js'],
  resolve: {
    alias: {
      '&': '../node_modules',
      '@': path.resolve('src')
      // 比如require('./data')时,优先找data.ts->data.js->data.json
    },
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // 检查代码格式
      {
        test: /\.(js|vue)$/,
        // 把 eslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter') // 配置formatter格式
        },
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.ts$/,
        // node_modules 目录的下的代码不用检查
        exclude: /node_modules/,
        loader: 'tslint-loader',
        // 把 tslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查
        enforce: 'pre'
      },
      // 转换css，use里面的loader是从后往前开始使用的，本例子中先使用css-loader处理后，再使用style-loader
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader'],
        exclude: /node_modules/
        // include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      // 加载图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // ES6/ES7/JSX 转义需要 Babel 的依赖，支持装饰器
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'happypack/loader?id=babel'
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
    })
  ]
}
