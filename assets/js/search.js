import {base64Decode, base64Encode} from './base64'

const input = document.querySelector('#search-box input')
input.setAttribute('disabled', '')
startLoader('#search-box .loader')

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')

  if (q) {
    document.querySelector('#search-box input').value = q
    await search(q)
    input.removeAttribute('disabled')
    stopLoader('#search-box .loader')
  }

  document.querySelector('#search-box input').addEventListener('keyup', (e) => {
    const q = e.target.value

    if (q) {
      search(q)
    }
  })

  document.querySelector('#search-box').addEventListener('submit', (e) => {
    const q = e.target.querySelector('input').value

    if (q) {
      search(q)
    }

    e.preventDefault()
  })
})

async function buildSearchIndex() {
  const res = await fetch('../search-index/index.json')
  const data = (await res.json()).documents
  window.idxData = new Map()

  window.idx = lunr(function () {
    this.ref('url')
    this.field('type')
    this.field('title')
    this.field('publishdate')
    this.field('date')
    this.field('description')
    this.field('content')
    this.field('authos')
    this.field('series')
    this.field('tags')

    data.forEach(function (doc) {
      doc.content = base64Decode(doc.content)
      doc.authors = doc.taxonomies.authors
      doc.tags = doc.taxonomies.tags
      doc.series = doc.taxonomies.series
      this.add(doc)
      window.idxData.set(doc.url, doc)
    }, this)
  })
}

async function search(q) {
  if (window.idx === undefined) {
    await buildSearchIndex()
  }

  const resultsEl = document.querySelector('#search-results')
  const results = idx.search(q)

  resultsEl.innerHTML = ''

  for (const result of results) {
    const page = window.idxData.get(result.ref)

    resultsEl.innerHTML += `
      <li>
        <a href="${page.url}"><strong>${page.title}</strong></a>
        <p>${page.description}</p>
        <p class="small muted">${page.tags.map((s) => `#${s}`).join(' ')}</p>
      </li>
    `
  }
}

export {
  search,
}

