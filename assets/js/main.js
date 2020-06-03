// Theme

function setTheme(theme) {
  document.querySelector('.body').dataset.theme = theme
  localStorage.setItem('general-theme', theme)
}

function setCodeTheme(theme) {
  document.querySelector('.body').dataset.codeTheme = theme
  localStorage.setItem('code-theme', theme)
}

window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('general-theme')

  if (theme) {
    setTheme(theme)
  }

  const codeTheme = localStorage.getItem('code-theme')

  if (codeTheme) {
    setCodeTheme(codeTheme)
  }
})

// Service worker

function swPostMessage(msg) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.controller.postMessage(msg)
    })
  }
}

async function setCache(mode) {
  switch (mode) {
    case 'enable':
      swPostMessage({action: 'enabled', value: true})
      break
    case 'disable':
      swPostMessage({action: 'enabled', value: false})
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
      swPostMessage({action: 'deleteAll'})
      break
  }
}

// Privacy

function checkPrivacyAlert() {
  const privacyAlert = localStorage.getItem('privacy-alert')
  const el = document.querySelector('.privacy-alert')

  if (privacyAlert === 'agree')
    el.style.display = 'none'
  else
    el.style.display = 'block'
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.privacy-alert').addEventListener('click', (e) => {
    localStorage.setItem('privacy-alert', 'agree')
    checkPrivacyAlert()
  })

  checkPrivacyAlert()
})

// Loader

function startLoader(el, interval = 100) {
  el = document.querySelector(el)

  if (typeof el.dataset.interval !== 'undefined') {
    return
  }

  let count = 0

  el.dataset.interval = setInterval(() => {
    switch (count % 4) {
      case 0:
        el.innerText = '|'
        break
      case 1:
        el.innerText = '/'
        break
      case 2:
        el.innerText = '-'
        break
      case 3:
        el.innerText = '\\'
        break
    }

    count++
  }, interval)
}

function stopLoader(el) {
  el = document.querySelector(el)

  if (typeof el.dataset.interval === 'undefined') {
    return
  }

  clearInterval(el.dataset.interval)
  el.innerText = ''
  el.removeAttribute('data-interval')
}

// Base64

function base64Encode(str) {
  const encoder = new TextEncoder()
  return base64js.fromByteArray(encoder.encode(str))
}

function base64Decode(str) {
  const decoder = new TextDecoder()
  return decoder.decode(base64js.toByteArray(str));
}

// Task list

window.addEventListener('DOMContentLoaded', () => {
  let selector = '.markdown ul li input[type="checkbox"]'
  const inputs = document.querySelectorAll(selector)

  for (const input of inputs) {
    const list = input.parentNode.parentNode
    list.classList.add('task-list')
  }
})

