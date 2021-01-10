import moment from 'moment'

moment.locale('zh-cn')

function date(value) {
  return moment(value).format('YYYY/M/D HH:mm')
}

function dateFromNow(value) {
  return moment(value).fromNow()
}

export default { date, dateFromNow }
