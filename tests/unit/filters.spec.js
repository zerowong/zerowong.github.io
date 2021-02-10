import { date, dateFromNow } from '../../src/utils/filters'

describe('filters.date', () => {
  it('正确格式化', () => {
    const time0 = '2021-02-06T11:21:08.887Z'
    const time1 = new Date(time0)
    const time2 = time1.getTime()
    expect(date(time0)).toBe('2021/2/6 19:21:08')
    expect(date(time1)).toBe('2021/2/6 19:21:08')
    expect(date(time2)).toBe('2021/2/6 19:21:08')
  })

  it('非法参数', () => {
    const time = 'time'
    expect(() => date(time)).toThrow()
  })
})

describe('filters.dateFromNow', () => {
  it('参数为数字，Date实例，Date字符串', () => {
    const time0 = '2021-02-06T11:21:08.887Z'
    const time1 = new Date(time0)
    const time2 = time1.getTime()
    expect(() => dateFromNow(time0)).not.toThrow()
    expect(() => dateFromNow(time1)).not.toThrow()
    expect(() => dateFromNow(time2)).not.toThrow()
  })

  it('非法参数', () => {
    const time = 'time'
    expect(() => dateFromNow(time)).toThrow()
  })

  it('-1 < time < 1', () => {
    const time0 = Date.now() - 1
    expect(dateFromNow(time0)).toBe('刚刚')
    const time1 = Date.now() + 999
    expect(dateFromNow(time1)).toBe('即将')
  })

  it('秒', () => {
    const time0 = Date.now() - 1000
    expect(dateFromNow(time0)).toBe('1秒钟前')
    const time1 = Date.now() + 1000
    expect(dateFromNow(time1)).toBe('1秒钟后')
  })

  it('分钟', () => {
    const time0 = Date.now() - 1000 * 60
    expect(dateFromNow(time0)).toBe('1分钟前')
    const time1 = Date.now() + 1000 * 60
    expect(dateFromNow(time1)).toBe('1分钟后')
  })

  it('小时', () => {
    const time0 = Date.now() - 1000 * 60 * 60
    expect(dateFromNow(time0)).toBe('1小时前')
    const time1 = Date.now() + 1000 * 60 * 60
    expect(dateFromNow(time1)).toBe('1小时后')
  })

  it('天', () => {
    const time0 = Date.now() - 1000 * 60 * 60 * 24
    expect(dateFromNow(time0)).toBe('1天前')
    const time1 = Date.now() + 1000 * 60 * 60 * 24
    expect(dateFromNow(time1)).toBe('1天后')
  })

  it('月', () => {
    const time0 = Date.now() - 1000 * 60 * 60 * 24 * 30
    expect(dateFromNow(time0)).toBe('1个月前')
    const time1 = Date.now() + 1000 * 60 * 60 * 24 * 30
    expect(dateFromNow(time1)).toBe('1个月后')
  })

  it('年', () => {
    const time0 = Date.now() - 1000 * 60 * 60 * 24 * 30 * 12
    expect(dateFromNow(time0)).toBe('1年前')
    const time1 = Date.now() + 1000 * 60 * 60 * 24 * 30 * 12
    expect(dateFromNow(time1)).toBe('1年后')
  })
})
