import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(accesstoken) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { accesstoken }
  })
}

/**
 * 更改用户状态
 * @param {} accesstoken
 */
export function changeStatus(data) {
  return request({
    url: '/api/user/updateState',
    method: 'post',
    data
  })
}

/**
 * 更改用户权限
 */
export function changePower(data) {
  return request({
    url: '/api/user/updatePower',
    method: 'post',
    data
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  store.dispatch('user/logout')
  console.log("退出成功")
}

/**
 * 获取所有用户信息
 */

export function getUserAll() {
  return request({
    url: '/api/users',
    method: 'get'
  })
}