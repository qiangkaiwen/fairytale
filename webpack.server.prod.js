const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
  entry: "./src/server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  mode: "production",
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: false
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = serverConfig;
