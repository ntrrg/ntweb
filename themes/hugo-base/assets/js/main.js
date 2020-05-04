// Task list

window.addEventListener('DOMContentLoaded', () => {
  let selector = '.markdown ul li input[type="checkbox"]'
  const inputs = document.querySelectorAll(selector)

  for (const input of inputs) {
    const list = input.parentNode.parentNode
    list.classList.add('task-list')
  }
})

