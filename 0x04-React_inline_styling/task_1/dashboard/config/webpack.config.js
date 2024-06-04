const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const wepback = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "../src/index.js"),
  },
  performance: {
    maxAssetSize: 1000000,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    assetModuleFilename: "[name][ext]",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 8564,
    open: true,
    hot: true,
    compress: true,
  },
  resolve: {
    extensions: [".*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // use: [
        //   "file-loader",
        //   {
        //     loader: "image-webpack-loader",
        //     options: {
        //       bypassOnDebug: true, // webpack@1.x
        //       disable: true, // webpack@2.x and newer
        //     },
        //   },
        // ],
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new wepback.ProgressPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./dist/index.html",
      inject: false,
    }),
    new CleanWebpackPlugin(),
  ],
};
