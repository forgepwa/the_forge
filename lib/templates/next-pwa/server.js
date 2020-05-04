const { join } = require('path')
const { url, parse } = require('url')
const express = require('express')
const next = require('next')
const cache = require('lru-cache') // for using least-recently-used based caching

const PORT = 8000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const root = process.cwd()

console.log('inside server!!!!!!!')
const ssrCache = new cache({
  max: 20, // not more than 20 results will be cached
  maxAge: 1000 * 60 * 5, // 5 mins
})

app.prepare().then(() => {
  const server = express()
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/')
  })

  server.get('/p/:id', (req, res) => {
    const queryParams = { id: req.params.id }
    renderAndCache(req, res, '/movie', queryParams)
  })
  // handle GET request to /service-worker.js
  server.get('*', (req, res) => {
    if (req.url.includes('/sw')) {
      app.serveStatic(req, res, join(root, `./static/workbox/${req.url}`))
    } else if (req.url.startsWith('static/workbox/')) {
      app.serveStatic(req, res, join(__dirname, req.url))
    } else {
      handle(req, res, req.url)
    }
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Live @ https://localhost:${PORT}`)
  })
})

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url
  // pathName = url.parse(key).pathname
  // if (pathName.endsWith('sw.js')) {
  //   res.writeHead(200, {
  //     'Service-Worker-Allowed': '/',
  //     'Content-Type': 'application/javascript',
  //   })
  // }
  // if page is in cache, serve from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // if something wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
