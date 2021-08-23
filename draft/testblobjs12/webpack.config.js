// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./wwwroot/index.js",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "wwwroot")
  }
};