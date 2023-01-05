const path = require("path");
const nodeexternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: "./src/server.ts",
  target: "node",
  externals: [nodeexternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
