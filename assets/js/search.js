'use strict'

import lunr from 'lunr'

import {base64Decode, base64Encode} from './base64'
import {startLoader, stopLoader} from './loader'

const formEl = document.querySelector('#search-box')
const inputEl = formEl.querySelector('input')

var idx, idxData

window.addEventListener('load', async () => {
  formEl.addEventListener('submit', async (e) => {
    const q = inputEl.value

    if (q !== '')
      await doSearch(q)

    e.preventDefault()
  })

  inputEl.addEventListener('keyup', async (e) => {
    const q = inputEl.value

    if (q !== '')
      await doSearch(q)
  })

  // Search from URL query

  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')

  if (q !== '') {
    inputEl.value = q
    await doSearch(q)
  }
})

async function buildSearchIndex() {
  if (idx !== undefined)
    return

  const res = await fetch('../search-index/index.json')
  const data = await res.json()
  idxData = new Map()

  idx = lunr(function () {
    this.ref('url')
    this.field('type')
    this.field('title')
    this.field('publishdate')
    this.field('date')
    this.field('description')
    this.field('content')
    this.field('series')
    this.field('tags')

    for (const doc of data.documents) {
      doc.content = base64Decode(doc.content)
      doc.tags = doc.taxonomies.tags
      doc.series = doc.taxonomies.series
      this.add(doc)
      idxData.set(doc.url, doc)
    }
  })
}

async function doSearch(q) {
  startLoader('#search-box .loader')
  await search(q)
  stopLoader('#search-box .loader')
}

async function search(q) {
  await buildSearchIndex()

  const el = document.querySelector('#search-results')
  const results = idx.search(q)

  el.innerHTML = ''

  for (const result of results) {
    const page = idxData.get(result.ref)

    el.innerHTML += `
      <li>
        <a href="${page.url}"><strong>${page.title}</strong></a>
        <p>${page.description}</p>
        <p class="small muted">${page.tags.map((s) => `#${s}`).join(' ')}</p>
      </li>
    `
  }
}

