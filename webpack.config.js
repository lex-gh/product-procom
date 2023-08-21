const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode,
  entry: path.resolve(__dirname, "src", "main.js"),
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "./",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "/dist"),
    },
    open: true,
    compress: true,
    hot: true,
  },
};
