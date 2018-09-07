const path = require( 'path' )
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require( 'webpack' )
const createMegaloTarget = require( '@megalo/target' )
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const compiler = require( '@megalo/template-compiler' )

function resolve (...args) {
  return path.resolve( __dirname, ...args)
}

module.exports = {

  mode: 'development',

  target: createMegaloTarget( {
    compiler: Object.assign( compiler, { } ),
    platform: 'wechat',
  } ),

  entry: {
    'app': resolve( 'src/index.js' ),
    // 'packageA/pages/a/index': path.resolve( __dirname, 'src/index.js' ),
    // 'pages/index/index': resolve( 'src/pages/index/index.js' ),
    // 'pages/counter/index': resolve( 'src/pages/counter/index.js' ),
    'pages/todomvc/index': resolve( 'src/pages/todomvc/index.js' ),
  },

  output: {
    path: path.resolve( __dirname, 'dist/' ),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[id].js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  devServer: {
    // hot: true,
  },

  devtool: 'cheap-source-map',

  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      // 'vue': path.resolve('../megalo/dist/vue.mp.esm'),
      'vue': 'megalo',
      '@': path.resolve('src')
    },
  },

  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              a: 1,
              cacheIdentifier: 'x'
            }
          }
        ]
      },

      {
        test: /\.js$/,
        use: 'babel-loader'
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin( {
      filename: 'static/css/[name].wxss',
    } ),
  ]
}
