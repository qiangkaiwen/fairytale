const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const clientConfig = {
  context: path.join(__dirname, "./src"),
  entry: ["webpack-hot-middleware/client", "./browser/index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      __isBrowser__: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = clientConfig;
