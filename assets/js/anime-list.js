'use strict'

function getRandomAnime() {
  const items = document.querySelectorAll('.markdown > .task-list > ul > li')

  for (const item of items) {
    item.classList.remove('active')
  }

  return items[Math.floor(Math.random() * Math.floor(items.length))]
}

window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#anime-random-button')

  el.addEventListener('click', (e) => {
    const anime = getRandomAnime()
    anime.classList.add('active')
    anime.scrollIntoView()
    e.preventDefault()
  })
})

