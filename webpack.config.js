var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BASE_DIR = path.resolve(__dirname);
var SRC_DIR = path.resolve(__dirname, './src');
var DIST_DIR = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    main: path.join(SRC_DIR, 'js/main.js')
  },
  output: {
    path: DIST_DIR,
    publicPath: '',
    filename: 'js/[name].js', // '[name].[hash].js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2016'] }
        }],
        include: SRC_DIR,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader" }, // css-loader?minimize
          ],
          fallback: "style-loader"
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [
              { loader: "css-loader?minimize" }, // css-loader?minimize
              { loader: "postcss-loader",
                options: {
                  plugins() { return [require('autoprefixer')({ browsers: ['last 3 versions'] })]; }
                }
              },
              { loader: "sass-loader" }
            ],
            fallback: "style-loader"
        }),
        include: SRC_DIR,
      },
      {
         test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'fonts/',
             publicPath: '../'
           }
         }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        },
        include: SRC_DIR,
     }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'main' }),
    new CleanWebpackPlugin(['dist'], {
      root: BASE_DIR,
      verbose: true,
      dry: false,
    }),
    new ExtractTextPlugin({
        filename: "css/[name].css", // css/[name].[contenthash].css
    }),
  ],
};

// PRODUCTION SETTINGS
if (process.env.NODE_ENV === 'prod') {

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"prod"' } }),

    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   compress: { warnings: false },
    // }),

    new webpack.LoaderOptionsPlugin({ minimize: true }),

  ]);
}
