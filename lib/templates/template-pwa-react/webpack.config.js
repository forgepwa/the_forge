const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: new RegExp('http://localhost:8800/'),
        handler: 'staleWhileRevalidate',
      }],
    }),
  ],
};

