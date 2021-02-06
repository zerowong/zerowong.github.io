'use strict'

/**
 * @param {number | Date | string} value
 */
export function date(value) {
  const time = new Date(value)
  if (Number.isNaN(time.getTime())) {
    throw new Error('invalid Date')
  }
  return `${time.toLocaleDateString('zh')} ${time.toLocaleTimeString('zh', { hourCycle: 'h23' })}`
}

const rtf = new Intl.RelativeTimeFormat('zh')
// second: 0 <= t < 60, minute: 60*60, hour: 60*60*24, day: 60*60*24*30, month: 60*60*24*30*12, year: > month
const base = [
  // avoid t / 0 => finite
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['month', 2592000],
  ['year', 31104000],
  ['infinity', Infinity],
]

/**
 * @param {number | Date | string} value
 */
export function dateFromNow(value) {
  const time = new Date(value)
  let isAfter = false
  let duration = (new Date() - time) / 1000
  if (duration < 0) {
    duration = -duration
    isAfter = true
  }
  // -1 < time < 1
  let key = 'second'
  for (let i = 0; i < base.length - 1; i++) {
    const prev = base[i]
    const next = base[i + 1]
    if (prev[1] <= duration && duration < next[1]) {
      duration = Math.floor(duration / prev[1])
      key = prev[0]
      break
    }
  }
  if (isAfter) {
    return rtf.format(duration, key)
  }
  return rtf.format(-duration, key)
}
