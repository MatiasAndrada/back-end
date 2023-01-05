const path = require("path");
const nodeExternals = require('webpack-node-externals')


module.exports = {
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
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
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
