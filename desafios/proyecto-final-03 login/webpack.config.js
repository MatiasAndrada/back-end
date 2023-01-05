const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  mode: "development",
  entry: "./src/server.js",
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],

  stats: {
    errorDetails: true,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      { test: /\.handlebars$/, loader: "handlebars-loader" },
    ],
  },
};
module.exports = config;