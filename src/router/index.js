import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/admin/index'
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () =>
        import ('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/admin/works',
    component: Layout,
    children: [{
      path: '',
      name: 'Works',
      component: () =>
        import ('@/views/works/index'),
      meta: { title: '作品管理', icon: 'eye-open' }
    }]
  },
  {
    path: '/admin/users',
    component: Layout,
    children: [{
      path: '',
      name: 'Users',
      component: () =>
        import ('@/views/users/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  },
  {
    path: '/admin/template',
    component: Layout,
    children: [{
      path: '',
      name: 'template',
      component: () =>
        import ('@/views/works/index'),
      meta: { title: '模板管理', icon: 'el-icon-s-grid' }
    }]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () =>
  //       import ('@/views/form/index'),
  //     meta: { title: '表单数据', icon: 'form' }
  //   }]
  // },
  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'http://localhost:8080',
      meta: { title: '进入官网', icon: 'link' }
    }]
  },
  {
    path: '/404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router