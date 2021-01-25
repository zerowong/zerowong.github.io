import chunk from 'lodash-es/chunk'

/**
 * 分页
 * @param {any[]} arr 任意数组
 * @param {string} key 排序依据的key
 * @param {string} order 'asc' | 'desc', 默认'acs'
 * @param {number} limit 每页元素个数，默认10
 */
export default function sortAndPage(arr, key, order, limit = 10) {
  const flatArr = arr.flat()
  let flag = -1
  if (order === 'desc') {
    flag = 1
  }
  flatArr.sort((a, b) => {
    if (a[key] < b[key]) {
      return flag
    }
    if (a[key] > b[key]) {
      return -flag
    }
    return 0
  })
  return chunk(flatArr, limit)
}
