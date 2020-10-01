function base64Encode(str) {
  const encoder = new TextEncoder()
  return window.base64js.fromByteArray(encoder.encode(str))
}

function base64Decode(str) {
  const decoder = new TextDecoder()
  return decoder.decode(window.base64js.toByteArray(str))
}

export {
  base64Encode,
  base64Decode,
}

