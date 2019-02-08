"use strict";
const webpack = require('webpack');
const path = require('path');
const app = process.env.app;

module.exports = {
  watch: true,
  mode: "development",
  devtool: 'source-map',
  entry: [
    `./src/${app}/main.js`,
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3000',
  ],
  module:{
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader", },
          { loader: "css-loader", },
          { loader: "sass-loader", }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": ['@babel/preset-env']
          }
        }]
      },
    ],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, `./public/${app}`),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
  ],
  devServer: {
    contentBase: `./public/${app}`,  // set "public" path, relative to root
    noInfo: true,
    hot: true,
    inline: true,
    port: "3000",
    host: "localhost",
    open: 'Google Chrome',
  }
};