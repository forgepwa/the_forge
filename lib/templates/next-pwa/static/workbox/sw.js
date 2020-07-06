/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/next-precache-manifest-6d5b4bfd236bb0284477e7b94b4175ce.js",
  "/static/workbox/next-precache-manifest-1764056c6e7aa590171eb2b89086adb3.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js",
  "/static/workbox/next-precache-manifest-2d4f599a15a69a6abc3716833d66b76b.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/api.tvmaze.com\/shows\//, new workbox.strategies.NetworkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/api.tvmaze.com\/search\/shows?q=batman/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 200 ] })] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, new workbox.strategies.CacheFirst({ "cacheName":"image-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
