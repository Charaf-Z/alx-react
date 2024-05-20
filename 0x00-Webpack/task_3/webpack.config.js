const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const wepback = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    shared: 'jquery',
    header: {
      import: './modules/header/header.js',
      dependOn: 'shared',
    },
    body: {
      import: './modules/body/body.js',
      dependOn: 'shared',
    },
    footer: {
      import: './modules/footer/footer.js',
      dependOn: 'shared',
    },
  },
  performance: {
    maxAssetSize: 1000000,
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
    },
    port: 8564,
    open: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true, // webpack@1.x
          //     disable: true, // webpack@2.x and newer
          //   },
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              bypassOnDebug: true,
              disable: true,
            },
          },
          'image-webpack-loader',
        ],
        // type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new wepback.ProgressPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
