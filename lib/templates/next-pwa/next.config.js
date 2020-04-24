const withCSS = require('@zeit/next-css')
const NextWorkboxPlugin = require('next-workbox-webpack-plugin')

module.exports = withCSS({
  webpack(config, { isServer, buildId, dev }) {
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next',
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /\/p\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: new RegExp(
            '^https://api.tvmaze.com/search/shows?q=batman'
          ),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    }

    config.plugins.push(
      new NextWorkboxPlugin({
        buildId,
        ...workboxOptions,
      })
    )

    return config
  },
})
