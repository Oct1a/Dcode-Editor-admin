import request from '@/utils/request'

/**
 * 获取作品列表
 */
export function getWorks() {
  return request({
    url: '/api/works',
    method: 'get'
  })
}

/**
 * 删除作品
 * @param {*} data
 */

export function delWork(data) {
  return request({
    url: '/api/delete_Work',
    method: 'post',
    data
  })
}