const path = require('path');
const common = require('./webpack.cube.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv');

const outputPath = process.env.REACT_APP_LIB ? '/cryptoart_cube_lib' : '/cryptoart_cube_dist';
const externals = process.env.REACT_APP_LIB
  ? {
      react: 'react',
      'react-dom': 'react-dom',
    }
  : {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    };
console.log('building lib:', process.env.REACT_APP_LIB || false, outputPath);
// root path for this project
const ROOT = __dirname;

module.exports = merge(common, {
  mode: 'production',
  entry: {
    cube: '/src/cube.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'public/cube.html'),
    }),
  ],
  output: {
    path: path.join(ROOT, outputPath),
    filename: 'cube.bundle.js',
    clean: true,
    library: 'DANGER_CUBE',
    libraryTarget: 'umd',
    publicPath: '/',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  externals: externals,
});
