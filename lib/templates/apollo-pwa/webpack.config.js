const path = require("path");

module.exports = {
  entry: "./src/app.js", // relative path
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
};
