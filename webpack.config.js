const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        //use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    proxy: {
      "/uploads/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/static/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    port: 9000,
    historyApiFallback: true,
    contentBase: "./",
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],
};
