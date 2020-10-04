'use strict'

import {fromByteArray, toByteArray} from 'base64-js'

function base64Encode(str) {
  const encoder = new TextEncoder()
  return fromByteArray(encoder.encode(str))
}

function base64Decode(str) {
  const decoder = new TextDecoder()
  return decoder.decode(toByteArray(str))
}

export {
  base64Encode,
  base64Decode,
}

