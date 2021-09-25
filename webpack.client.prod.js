const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const clientConfig = {
  entry: ["./src/browser/index.js"],
  mode: "production",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new Dotenv(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: true,
      "process.env.API_URL": JSON.stringify(process.env.API_URL)
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    //  new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fi|en|us/)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};

module.exports = clientConfig;
