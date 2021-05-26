import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    //发送请求前
    if (store.getters.token) {
      // 请求都携带token
      config.headers['accesstoken'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log("请求出现错误", error) // for debug
    return Promise.reject(error)
  }
)

//状态码判断
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    if (res.code !== 200) {
      Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 50008: 非法token; 50012: 其他客户端登录; 50014: token已过期;
        // if (res.code === 401) {
        //   // to re-login
        //   MessageBox.confirm('账户密钥已过期，请重新登录', '确认退出', {
        //     confirmButtonText: 'Re-Login',
        //     cancelButtonText: 'Cancel',
        //     type: 'warning'
        //   }).then(() => {
        //     store.dispatch('user/resetToken').then(() => {
        //       location.reload()
        //     })
        //   })
        // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    store.dispatch('user/resetToken').then(() => {
      location.reload()
    })
    return Promise.reject(error)
  }
)

export default service