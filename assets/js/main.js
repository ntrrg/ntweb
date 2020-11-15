'use strict'

import {checkThemes} from './theme'
import {postMessage as postMessageSW, register as registerSW} from './sw'

// Secondary menu

window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.secondary-menu')
  el.style.display = 'block'
})

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
  registerSW()
})

// Themes

window.addEventListener('DOMContentLoaded', checkThemes)

