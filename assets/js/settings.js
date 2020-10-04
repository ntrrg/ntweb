'use strict'

import {startLoader, stopLoader} from './loader'
import {setTheme, setCodeTheme} from './theme'
import {setCache} from './sw'

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

