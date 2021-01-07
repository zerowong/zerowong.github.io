import moment from 'moment'

moment.locale('zh-cn')

function date(value) {
  return moment(value).format('YYYY/M/D HH:mm')
}

export default { date }
