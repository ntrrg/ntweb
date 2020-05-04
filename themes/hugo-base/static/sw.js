let ENABLED = true

const BASEURL = new Request('/').url
const BUCKET = '1'
const PREFETCH = []

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(BUCKET).then((cache) => cache.addAll(PREFETCH))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      for (const key of keys)
        if (key !== BUCKET)
          caches.delete(key)
    })
  )
})

const BLACKLIST = [
  (url) => !url.startsWith(BASEURL),
]

const TTL = {
  html: 60 * 60,
  json: 60 * 60,
  js:   60 * 60 * 24,
  css:  60 * 60 * 24,
  svg:  60 * 60 * 24,
  png:  60 * 60 * 24 * 30,
  jpg:  60 * 60 * 24 * 30,
  jpeg: 60 * 60 * 24 * 30,
  pdf:  60 * 60 * 24 * 30,
}

/**
 * Gets the file extension from the given URL.
 *
 * @param {String} url
 * @returns {String}
 */
function getFileExt(url) {
  url = url.split('#')[0].split('?')[0]

  if (url.endsWith('/'))
    return 'html'

  return url.split('.').reverse()[0]
}

/**
 * Tries to fetch the response from cache.
 *
 * @param {Request} req
 * @returns {Response}
 */
async function getResponse(req) {
  if (!ENABLED || isBlacklisted(req.url))
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

    if (ttl > 0 || age <= ttl)
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

  return TTL[ext] || 0
}

/**
 * Checks whether the URL should be cached.
 *
 * @param {String} url
 * @returns {Boolean}
 */
function isBlacklisted(url) {
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

  switch(event.data.action) {
    case 'enabled':
      ENABLED = (event.data.value) ? true : false
      break

    case 'add':
      caches.open(BUCKET).then((cache) => cache.add(event.data.value))
      break
    case 'addAll':
      for (const url of event.data.value)
        caches.open(BUCKET).then((cache) => cache.add(url))
      break
    case 'delete':
      caches.open(BUCKET).then((cache) => cache.delete(event.data.value))
      break
    case 'deleteAll':
      caches.delete(BUCKET).then(() => {
        caches.open(BUCKET)
      })

      break

    default:
      console.log(`Unknown action: ${event.data.action}`)
      break
  }
})

