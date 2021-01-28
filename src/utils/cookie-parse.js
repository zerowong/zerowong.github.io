/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * decode
 * @param {string} str
 */
function tryDecode(str) {
  try {
    return decodeURIComponent(str)
  } catch (e) {
    return str
  }
}

/**
 * 解析cookie
 * @param {string} str cookie
 */
export default function parse(str) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be string')
  }
  const obj = {}
  const pairs = str.split(/; */)
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const eqIdx = pair.indexOf('=')
    if (eqIdx < 0) {
      // eslint-disable-next-line no-continue
      continue
    }
    const key = pair.substr(0, eqIdx).trim()
    let val = pair.substr(eqIdx + 1, pair.length).trim()
    if (val[0] === '"') {
      val = val.slice(1, -1)
    }
    if (obj[key] === undefined) {
      obj[key] = tryDecode(val)
    }
  }
  return obj
}
