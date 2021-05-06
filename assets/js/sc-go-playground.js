'use strict'

import {base64Decode, base64Encode} from './base64'

window.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a.go-playground-link')

  for (const link of links) {
    link.style.display = 'initial'
    link.addEventListener('click', getGoPlaygroundLink)
  }
})

async function getGoPlaygroundLink(e) {
  const goPlaygroundURL = window.goPlaygroundURL
  const link = e.target
  const code = link.dataset.code
  const done = link.href[link.href.length - 1] !== "#"

  if (code === undefined || done) {
    return
  }

  e.preventDefault()
  link.title = ''
  link.innerText = i18n('SHORTCODE_GO_PLAYGROUND_SENDING')

  const res = await fetch(goPlaygroundURL + '/share', {
    method: 'POST',
    body: base64Decode(code)
  }).catch((err) => {
    link.title = err
    link.innerText = i18n('SHORTCODE_GO_PLAYGROUND_ERROR')
  })

  if (res.ok) {
    const id = await res.text()
    link.href = `${goPlaygroundURL}/p/${id}`
    link.innerText = i18n('SHORTCODE_GO_PLAYGROUND_OPEN')
  } else {
    link.title = `${res.status} ${res.statusText}`
    link.innerText = i18n('SHORTCODE_GO_PLAYGROUND_ERROR')
  }
}
