let ENABLED = true

const BASEURL = new Request('/').url
const BUCKET = 'v1'
const DEFAULT_EXT = 'html'
const DEFAULT_TLL = 60 * 60 * 24

const TTL = {
  html: 60 * 60,
  json: 60 * 60,
  js:   60 * 60 * 24,
  css:  60 * 60 * 24,
}

const PREFETCH = [
]

const BLACKLIST = [
  (url) => !url.startsWith(BASEURL),
]

self.addEventListener('install', (event) => {
  self.skipWaiting()

  event.waitUntil(
    caches.open(BUCKET).then((cache) => cache.addAll(PREFETCH))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    clients.claim(),
    caches.keys().then((keys) => {
      for (const key of keys)
        if (key !== BUCKET)
          caches.delete(key)
    }),
  ]))
})

/**
 * Gets the file extension from the given URL.
 *
 * @param {String} url
 * @returns {String}
 */
function getFileExt(url) {
  url = url.split('#')[0].split('?')[0]

  if (url.endsWith('/'))
    return DEFAULT_EXT

  return url.split('.').reverse()[0]
}

/**
 * Tries to fetch the response from cache.
 *
 * @param {Request} req
 * @returns {Response}
 */
async function getResponse(req) {
  if (isBlacklisted(req.url))
    return await fetch(req).catch(() => {})

  const cache = await caches.open(BUCKET)
  let res = await cache.match(req)

  if (res) {
    let date = null;
    const headers = res.headers.entries()

    for (const [key, val] of headers)
      if (key === 'date')
        date = new Date(val)

    if (!date)
      return res

    const age = parseInt((new Date().getTime() - date.getTime()) / 1000)
    const ttl = getTTL(req.url)

    if (age <= ttl)
      return res
  }

  const lang = req.url.split('/')[3] || 'en'
  const offlineURL = `/${lang}/offline/`
  const notFoundURL = `/${lang}/404/`

  res = await fetch(req).catch(() => {
    if (res)
      return res
    else if (!req.url.endsWith(offlineURL))
      return getResponse(new Request(offlineURL))
  })

  if (!res)
    return res

  if (res.status === 404 && !req.url.endsWith(notFoundURL))
    return await getResponse(new Request(notFoundURL))

  if (res.status === 200 || res.status === 304)
    cache.put(req, res.clone())

  return res
}

/**
 * Gets the TTL for the given URL.
 *
 * @param {String} url
 * @returns {Number}
 */
function getTTL(url) {
  const ext = getFileExt(url)

  return TTL[ext] || DEFAULT_TLL
}

/**
 * Checks whether the URL should be cached.
 *
 * @param {String} url
 * @returns {Boolean}
 */
function isBlacklisted(url) {
  if (!ENABLED || url.startsWith('http://localhost/'))
    return true

  for (const fn of BLACKLIST)
    if (!fn(url))
      return false

  return true
}

self.addEventListener('fetch', (event) => {
  event.respondWith(getResponse(event.request))
})

self.addEventListener('message', (event) => {
  if (typeof event.data !== 'object')
    return

  const {action, value} = event.data

  switch(action) {
    case 'enabled':
      ENABLED = (value) ? true : false
      break

    case 'add':
      caches.open(BUCKET).then((cache) => cache.add(value))
      break
    case 'addAll':
      for (const url of value)
        caches.open(BUCKET).then((cache) => cache.add(url))
      break
    case 'delete':
      caches.open(BUCKET).then((cache) => cache.delete(value))
      break
    case 'deleteAll':
      caches.delete(BUCKET).then(() => caches.open(BUCKET))
      break

    default:
      console.log(`Unknown action: ${action}`)
      break
  }
})

