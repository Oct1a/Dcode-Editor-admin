import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

/**
 * 权限管理，判断是否有登录
 */

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] //没有重定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start() //开启进度条

  document.title = getPageTitle(to.meta.title) //获取页面标题
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，则跳转
      next({ path: '/admin' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          next({ path: '/admin' })
        } catch (error) {
          // 删除令牌，然后转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是在白名单列表内，直接进入
      next()
    } else {
      // 其他没有权限则跳转登录界面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})