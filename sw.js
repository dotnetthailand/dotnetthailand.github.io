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

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-793aad54df6a0c911d9d.js"
  },
  {
    "url": "framework-9490cff3dc572bc970b1.js"
  },
  {
    "url": "styles.19b0b7906592c98c9470.css"
  },
  {
    "url": "styles-de85f2284b4b64ac3acf.js"
  },
  {
    "url": "03e9278c-925810118b17b3e0f911.js"
  },
  {
    "url": "app-ef52d553982d2ec4e1de.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "40a00f446f56d7e22eebf6eefa9e2b9b"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-1bdd8d7e3d408af50b60.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "9ff9f3d6504e79bbbaac00d9ee61af32"
  },
  {
    "url": "page-data/sq/d/12478684.json",
    "revision": "edcba1c42bcb7a33844e665067e2f5b3"
  },
  {
    "url": "page-data/sq/d/1306071104.json",
    "revision": "0ddb5cfcf3aff5b8d8a4a8a72ce43d00"
  },
  {
    "url": "page-data/sq/d/2353585426.json",
    "revision": "0daf532982f89e351600ec2dfa4d21b0"
  },
  {
    "url": "page-data/sq/d/2552263575.json",
    "revision": "c83778169cffbb999124e9308202ce11"
  },
  {
    "url": "page-data/sq/d/2882937274.json",
    "revision": "49b724437366353fea10530b7a199302"
  },
  {
    "url": "page-data/sq/d/353167761.json",
    "revision": "5eb50e811cd444ec22731778676cc4f8"
  },
  {
    "url": "page-data/sq/d/3812332637.json",
    "revision": "6f652ba5fbd56f6202d63791279dbbe8"
  },
  {
    "url": "page-data/sq/d/4285724809.json",
    "revision": "7b94f1d5ca10b76c615aa1193c0e7a6c"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "f53b7ff98edf7618aaa2c2d177f4f6f0"
  },
  {
    "url": "polyfill-2606bb7ba3f5c0c8c968.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "eff77ef2c59515006ffb90b994bd2fb8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-ef52d553982d2ec4e1de.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)

/* eslint-disable no-undef */
workbox.routing.registerRoute(
  new RegExp('https:.*min.(css|js)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cdn-cache',
  })
);
