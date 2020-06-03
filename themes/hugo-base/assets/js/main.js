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

