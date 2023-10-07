import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useRouteStore } from '@/store/route'
import { useUserStore } from '@/store/user'
import { findRouteByIndexPath, initRoute } from '@/router/initDynamicRoute'
import { useTabsStore } from '@/store/tabs.ts'
import { useCachePagesStore } from '@/store/cachePages.ts'

const staticRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    }
  },
  // 防止控制台显示，No match found for location with path ""
  {
    path: '/:catchAll(.*)',
    name: 404,
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/lu-admin-ts'),
  routes: staticRouter,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})
const ROUTE_WHITE_LIST = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  if (ROUTE_WHITE_LIST.includes(to.path)) return next()
  // if (!useUserStore().getUser()?.id) {
  //   return next({ path: '/login', query: { redirect: to.fullPath } })
  // }
  if (!useUserStore().getToken()) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }
  if ((!from?.name || from.name === 'login') && useRouteStore().getRouteList().length === 0) {
    // 重新加载动态路由
    await initRoute()
    // 跳转第一个菜单
    // if (to.path === '/') return next({ path: useRouteStore().getFirstRoute().path, replace: true })
    // 添加tab和cachePage
    const routeItem = findRouteByIndexPath(
      to.query?.redirect || to.path,
      useRouteStore().getRouteList() || []
    )
    useTabsStore().addTab(routeItem)
    // 判断页面是否可缓存
    if (routeItem.keepAlive === 1) {
      useCachePagesStore().addCachePage(routeItem.name)
    }
    return next({ path: to.query?.redirect || to.path, replace: true })
  }
  next()
})

router.afterEach((to) => {
  document.title = `${to.meta.title}`
})

export default router
