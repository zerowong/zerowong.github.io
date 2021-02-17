import moment from 'moment'

moment.locale('zh-cn')

export function date(value) {
  return moment(value).format('YYYY/M/D HH:mm')
}

export function dateFromNow(value) {
  return moment(value).fromNow()
}
