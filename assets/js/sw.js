'use strict'

function postMessage(msg) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.controller.postMessage(msg)
    })
  }
}

function register(path = '/sw.js', opts = {scope: '/'}) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path, opts).then((reg) => {
      console.log(`Registration succeeded. Scope is ${reg.scope}`)
    }).catch((error) => {
      console.log(`Registration failed with: ${error}`)
    })
  }
}

async function setCache(mode) {
  switch (mode) {
    case 'enable':
      postMessage({action: 'enabled', value: true})
      break
    case 'disable':
      postMessage({action: 'enabled', value: false})
      break
    case 'populate':
      const res = await fetch('/cache.json')

      if (res.status === 200 || res.status === 304) {
        const progress = document.querySelector('#cache-mode ~ .progress')
        const urls = await res.json()
        const max = urls.length

        for (let i = 0; i < max; ++i) {
          const url = urls[i]
          progress.innerText = `${parseInt((i + 1) * 100 / max)}% ${url}`
          await fetch(url).catch(() => {})
        }
      }

      break
    case 'clean':
      postMessage({action: 'deleteAll'})
      break
  }
}

export {
  postMessage,
  register,
  setCache,
}

