const path = require("path");
const workboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./client/src/app.js", // relative path
  output: {
    path: path.join(__dirname, "public"), // absolute path
    filename: "bundle.js", // file name
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: "style-loader",
          },
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              //   localIdentName: '[local]___[hash:base64:5]'
            },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
  plugins: [
    // Other plugins...

    new workboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 7000000,
    }),
  ],
};
