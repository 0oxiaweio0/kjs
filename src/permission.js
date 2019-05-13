import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
// 更具当前主模块类型对所有的路由进行过滤
function getGrouproutersByType(routers, type) {
  const modalRouters = routers.filter(router => {
    if (type) {
      if (router.meta) {
        if (router.meta.group && router.meta.group === type) {
          if (router.children && router.children.length > 0) {
            router.children = getGrouproutersByType(router.children, type)
          }
          return true
        }
        return false
      }
      return false
    }
    return false
  })
  return modalRouters
}
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('superAdmin') >= 0) return true // superAdmin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is home will not trigger	afterEach hook, so manually handle it
    } else {
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        if (to.meta.group) { // 跳转模块和当前模块判断,并设置当前模路由
          if (to.meta.group !== store.getters.modalType) {
            store.dispatch('SetModalType', to.meta.group)
            const modalRuters = getGrouproutersByType(store.getters.addRouters, to.meta.group)
            store.dispatch('SetModalRouters', modalRuters)
          } else {
            if (to.meta.to) {
              store.dispatch('SetModalType', to.meta.to)
              const modalRuters = getGrouproutersByType(store.getters.addRouters, to.meta.to)
              store.dispatch('SetModalRouters', modalRuters)
            }
          }
        }
        next()//
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
    }
  } else {
    next()
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
