const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //  you should know that the HtmlWebpackPlugin by default will generate its own index.html
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'x-spreadsheet',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      // chunkFilename: devMode ? '[id].[hash].css' : '[id].css',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    contentBase: '../dist',
    proxy: {
      '/test': {
        bypass: (req, res) => {
            console.log(req.query)
            const data = []
            for(let i = 0; i < 100; i++) {
                data.push({key: 'test' + i, title: 'test' + i})
            }
          return res.send(data.filter(val => val.title.includes(req.query.query)))
        },
      },
    },
  },
});
