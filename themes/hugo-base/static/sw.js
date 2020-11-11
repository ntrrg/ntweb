let ENABLED = true
const BASEURL = new Request('/').url.slice(0, -1)
const BUCKET = 'v1'
const DEFAULT_CHECKMODE = 'age'
const DEFAULT_EXT = 'html'
const DEFAULT_TLL = 1000 * 60 * 60 * 24

const TTL = {
  html: 1000 * 60 * 60,
  json: 1000 * 60 * 60,
  js:   1000 * 60 * 60 * 24,
  css:  1000 * 60 * 60 * 24,
}

const PREFETCH = [
]

const IGNORELIST = [
  (url) => !url.startsWith(`${BASEURL}/`),
  (url) => url === `${BASEURL}/en/build-info/index.json`,
  (url) => url === `${BASEURL}/es/build-info/index.json`,
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

    caches.open(BUCKET).then((cache) => cache.addAll(PREFETCH)),
  ]))
})

/**
 * Checks if the given response has expired.
 *
 * @param {Response} res
 * @returns {Boolean}
 */
function checkResponseByAge(res) {
  let date = null
  const headers = res.headers.entries()

  for (const [key, val] of headers)
    if (key === 'date')
      date = new Date(val)

  if (!date)
    return true

  const age = new Date().getTime() - date.getTime()
  const ttl = getTTL(res.url)

  if (age <= ttl)
    return true

  return false
}

/**
 * Finds the canonical URL from a given URL.
 *
 * @param {String} url
 * @returns {String}
 */
function getCanonicalURL(url) {
  url = url.split('#')[0].split('?')[0]
  const file = url.split('/', -1).pop()

  if (file === '')
    return `${url}index.html`

  if (!file.includes('.'))
    return `${url}/index.html`

  return url
}

/**
 * Gets the file extension from the given URL.
 *
 * @param {String} url
 * @returns {String}
 */
function getFileExt(url) {
  url = getCanonicalURL(url)

  return url.split('/').pop().split('.').pop().toLowerCase()
}

/**
 * Tries to fetch the response from cache.
 *
 * @param {Request} req
 * @returns {Response}
 */
async function getResponse(req) {
  if (!ENABLED || isIgnored(req.url))
    return await fetch(req).catch(() => {})

  const cache = await caches.open(BUCKET)
  let res = await cache.match(req)

  if (isValidResponse(res, DEFAULT_CHECKMODE))
    return res.clone()

  const lang = req.url.split('/')[3] || 'en'
  const offlineURL = `/${lang}/offline/`
  let offline = false

  res = await fetch(req).catch(() => {
    offline = true

    // Reuse old response (if exists), even if it is outdated.
    if (res)
      return res.clone()

    if (getFileExt(req.url) === 'html')
      if (!req.url.endsWith(offlineURL))
        return getResponse(new Request(offlineURL))

    return null
  })

  if (offline || !res)
    return res

  const notFoundURL = `/${lang}/404/`

  if (res.status === 404)
    if (getFileExt(req.url) === 'html')
      if (!req.url.endsWith(notFoundURL))
        return await getResponse(new Request(notFoundURL))

  if (res.status === 200 || res.status === 304) {
    cache.put(req, res.clone())

    if (getFileExt(req.url) === 'html') {
      if (req.url.endsWith('/')) {
        cache.add(req.url.slice(0, -1))
        cache.add(`${req.url}index.html`)
      } else if (req.url.endsWith('index.html')) {
        cache.add(req.url.slice(0, -10))
        cache.add(req.url.slice(0, -11))
      } else {
        cache.add(`${req.url}/`)
        cache.add(`${req.url}/index.html`)
      }
    }
  }

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
function isIgnored(url) {
  for (const fn of IGNORELIST)
    if (fn(url))
      return true

  return false
}

/**
 * Checks if the given response is valid depending on the given mode. The
 * allowed modes are: `age`.
 *
 * @param {Response} res
 * @param {String} mode
 * @returns {Boolean}
 */
function isValidResponse(res, mode='age') {
  if (!res)
    return false

  switch(mode) {
  case 'age':
    return checkResponseByAge(res)
  }

  return false
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
    caches.delete(BUCKET).then(() => caches.open(BUCKET)
      .then((cache) => cache.addAll(PREFETCH)))

    break

  default:
    console.log(`Unknown action: ${action}`)
    break
  }
})

