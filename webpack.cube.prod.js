const path = require("path");
const common = require("./webpack.cube.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// root path for this project
const ROOT = __dirname;

module.exports = merge(common, {
  mode: "production",
  entry: {
    cube: "/src/cube.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, "public/cube.html")
    })
  ],
  output: {
    path: path.join(ROOT, "/cryptoart_cube_build"),
    filename: "cube.bundle.js",
    clean: true,
    library: "DANGER_CUBE",
    libraryTarget: "umd",
    publicPath: "/",
    globalObject: "this",
    umdNamedDefine: true
  }
});
