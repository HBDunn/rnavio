var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index_bundle.js"
  },
  devServer: {
     historyApiFallback: true,
     contentBase: path.join(__dirname, "build"), // Not Related but important
  },
  module: {
    rules: [
      {
        test: /\.(js?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-flow",
            {
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-flow"
              ]
            }
          ]
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(jpg|png)$/, use: { loader: "url-loader" } },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      "react-native$": "react-native-web"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      ".web.jsx",
      ".web.js",
      ".jsx",
      ".js",
      ".webpack.js",
      ".mjs",
      ".json",
      ".css"
    ]
  },

  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
