const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    stats: "errors-only",
    open: true,
    overlay: true
  },
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/assets",
        to: "assets"
      }
    ])
  ]
};
