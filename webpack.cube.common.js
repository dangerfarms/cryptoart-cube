const path = require('path');
// const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const ROOT = __dirname;
const parsedDotEnv = {
  ...process.env,
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  ...dotenv.config().parsed,
};

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      process: false,
      //'crypto-browserify': require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      // THREE: 'super-three',
      // AFRAME: 'aframe',
      // AFRAME: path.resolve(path.join(__dirname, 'external/8frame-1.2.0.min')),
      // AFRAME: 'aframe',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(parsedDotEnv),
      // 'process.env': {
      //   NODE_ENV: JSON.stringify('development'),
      // },
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
};
