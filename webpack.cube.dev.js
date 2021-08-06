const path = require('path');
const fs = require('fs');
const common = require('./webpack.cube.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// root path for this project
const ROOT = __dirname;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './cryptoart_cube_build',
    dev: {
      publicPath: '/',
    },
    hot: false,
    open: true,
    historyApiFallback: true,
    port: 3000,
    https: true,
    // compress: true,
    // clientLogLevel: 'none',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'public/cube.html'),
    }),
  ],
  entry: '/src/cube.js',
  output: {
    path: path.join(ROOT, 'cryptoart_cube_build'),
    filename: 'cube.bundle.js',
    clean: true,
    library: 'DANGER_CUBE',
    libraryTarget: 'umd',
    publicPath: '/',
    globalObject: 'window',
    umdNamedDefine: true,
  },
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(ROOT, 'cryptoart_cube_build'),
  //   publicPath: '/',
  //   clean: true,
  // },
});
