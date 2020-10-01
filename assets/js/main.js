import {startLoader, stopLoader} from './loader'
import {checkThemes, setTheme, setCodeTheme} from './theme'
import {setCache} from './sw'

// Privacy Alert

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

// Service Worker

window.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'}).then((reg) => {
      console.log(`Registration succeeded. Scope is ${reg.scope}`)
    }).catch((error) => {
      console.log(`Registration failed with: ${error}`)
    })
  }
})

// Settings

window.addEventListener('DOMContentLoaded', checkThemes)

if (document.body.classList.contains('custom-settings')) {
  // Theme

  window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('#theme-selector')

    el.addEventListener('change', () => {
      if (el.value)
        setTheme(el.value)
    })
  })

  window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('#code-theme-selector')

    el.addEventListener('change', () => {
      if (el.value)
        setCodeTheme(el.value)
    })
  })

  // Cache

  window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('#cache-mode')

    el.addEventListener('change', async () => {
      startLoader('#cache-mode ~ .loader')

      if (el.value)
        await setCache(el.value)

      stopLoader('#cache-mode ~ .loader')
    })
  })
}

