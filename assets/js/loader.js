function startLoader(selector, interval = 100) {
  const el = document.querySelector(selector)

  if (!el) {
    console.error(`Couldn't find any element (${selector})`)
    return
  }

  if (typeof el.dataset.interval !== 'undefined')
    return

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

function stopLoader(selector) {
  const el = document.querySelector(selector)

  if (!el) {
    console.error(`Couldn't find any element (${selector})`)
    return
  }

  if (typeof el.dataset.interval === 'undefined')
    return

  clearInterval(el.dataset.interval)
  el.innerText = ''
  el.removeAttribute('data-interval')
}

export {
  startLoader,
  stopLoader,
}

