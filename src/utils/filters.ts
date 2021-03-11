function isInvalidDate(time: Date) {
  if (Number.isNaN(time.getTime())) {
    throw new Error('invalid Date')
  }
}

const dateDtf = new Intl.DateTimeFormat('zh', { dateStyle: 'short' })
const timeDtf = new Intl.DateTimeFormat('zh', { timeStyle: 'short', hourCycle: 'h23' })

export function date(value: string): string {
  const time = new Date(value)
  isInvalidDate(time)
  return `${dateDtf.format(time)} ${timeDtf.format(time)}`
}

const rtf = new Intl.RelativeTimeFormat('zh')
type Base = [Intl.RelativeTimeFormatUnit, number][]
const base: Base = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['month', 2592000],
  ['year', 31104000],
  ['year', Infinity],
]

export function dateFromNow(value: string): string {
  const time = new Date(value)
  isInvalidDate(time)
  let isAfter = false
  let duration = (Date.now() - time.getTime()) / 1000
  if (duration < 0) {
    duration = -duration
    isAfter = true
  }
  // -1 < time < 1
  let key = null as Intl.RelativeTimeFormatUnit | null
  for (let i = 0; i < base.length - 1; i++) {
    const prev = base[i]
    const next = base[i + 1]
    if (prev[1] <= duration && duration < next[1]) {
      duration = Math.floor(duration / prev[1])
      key = prev[0]
      break
    }
  }
  if (!key) {
    return isAfter ? '即将' : '刚刚'
  }
  if (isAfter) {
    return rtf.format(duration, key)
  }
  return rtf.format(-duration, key)
}
