import router from '@/router'
import { useRouteStore } from '@/store/route'
import { useUserStore } from '@/store/user'

export const initRoute = async () => {
  const routes = [
    {
      id: 0,
      parentId: null,
      path: '/home',
      name: 'home',
      redirect: '',
      component: 'home/index',
      title: '首页',
      icon: 'House',
      keepAlive: 1,
      rank: 0,
      roles: ['普通用户', '管理员']
    },
    {
      id: 1,
      parentId: null,
      path: '/system',
      name: 'system',
      redirect: '/system/user',
      component: '',
      title: '系统设置',
      icon: 'Setting',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 11,
      parentId: 1,
      path: '/system/user',
      name: 'user',
      redirect: '',
      component: 'system/user',
      title: '用户管理',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 12,
      parentId: 1,
      path: '/system/backInfo',
      name: 'backInfo',
      redirect: '',
      component: 'system/backInfo',
      title: '数据备份日志',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 13,
      parentId: 1,
      path: '/system/backInfo2',
      name: 'systemBackInfo2',
      redirect: '/system/backInfo',
      component: '',
      title: '多级菜单1',
      icon: 'Grid',
      keepAlive: 1,
      rank: 1,
      roles: ['管理员']
    },
    {
      id: 131,
      parentId: 13,
      path: '/system/backInfo2',
      name: 'backInfo2',
      redirect: '',
      component: 'system/backInfo',
      title: '多级菜单1-1',
      icon: '',
      keepAlive: 1,
      rank: 1,
      roles: ['管理员']
    },
    {
      id: 132,
      parentId: 13,
      path: '/system/user2',
      name: 'user2',
      redirect: '',
      component: 'system/user',
      title: '多级菜单1-2',
      icon: '',
      keepAlive: 1,
      rank: 1,
      roles: ['管理员']
    },
    {
      id: 1311,
      parentId: 13,
      path: '/system/backInfo3',
      name: 'systemBackInfo3',
      redirect: '/system/backInfo3',
      component: '',
      title: '多级菜单2',
      icon: 'Grid',
      keepAlive: 1,
      rank: 1,
      roles: ['管理员']
    },
    {
      id: 13111,
      parentId: 1311,
      path: '/system/backInfo3',
      name: 'backInfo3',
      redirect: '',
      component: 'system/backInfo',
      title: '多级菜单2-1',
      icon: '',
      keepAlive: 1,
      rank: 1,
      roles: ['管理员']
    },
    {
      id: 2,
      parentId: null,
      path: '/other',
      name: 'other',
      redirect: '/other/recordScreen',
      component: '',
      title: '其他',
      icon: 'Grid',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 21,
      parentId: 2,
      path: '/other/recordScreen',
      name: 'recordScreen',
      redirect: '',
      component: 'other/recordScreen',
      title: '录屏',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 22,
      parentId: 2,
      path: '/other/screenshots',
      name: 'screenshots',
      redirect: '',
      component: 'other/screenshots',
      title: '拍照',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 23,
      parentId: 2,
      path: '/other/video',
      name: 'video',
      redirect: '',
      component: 'other/video',
      title: '录屏TSX',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 24,
      parentId: 2,
      path: '/other/tts',
      name: 'tts',
      redirect: '',
      component: 'other/tts',
      title: 'WebSpeechAPI',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 25,
      parentId: 2,
      path: '/other/waterfallFlow',
      name: 'waterfallFlow',
      redirect: '',
      component: 'other/waterfallFlow',
      title: 'waterfallFlow',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 26,
      parentId: 2,
      path: '/other/lazyLoadImage',
      name: 'lazyLoadImage',
      redirect: '',
      component: 'other/lazyLoadImage',
      title: 'lazyLoadImage',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    // {
    //   id: 3,
    //   parentId: null,
    //   path: '/antdesign',
    //   name: 'antdesign',
    //   redirect: '/antdesign/table',
    //   component: '',
    //   title: 'antDesign',
    //   icon: 'Grid',
    //   keepAlive: 0,
    //   roles: ['管理员']
    // },
    // {
    //   id: 31,
    //   parentId: 3,
    //   path: '/antdesign/table',
    //   name: 'table',
    //   redirect: '',
    //   component: 'antdesign/table',
    //   title: 'antDesign表格',
    //   icon: '',
    //   keepAlive: 1,
    //   roles: ['管理员']
    // },
    {
      id: 4,
      parentId: null,
      path: '/vue3/keepAlive',
      name: 'keepAlive',
      redirect: '/vue3/keepAlive',
      component: '',
      title: 'keepAlive',
      icon: 'Grid',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 41,
      parentId: 4,
      path: '/vue3/keepAlive',
      name: 'keepAlive',
      redirect: '',
      component: 'vue3/keepAlive',
      title: 'keepAlive',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 5,
      parentId: null,
      path: '/threejs/index',
      name: 'threejsIndex',
      redirect: '/threejs/index',
      component: '',
      title: 'threejsIndex',
      icon: 'Grid',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 51,
      parentId: 5,
      path: '/threejs/index',
      name: 'threejsIndex',
      redirect: '',
      component: 'threejs/index-10',
      title: 'threejs',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 6,
      parentId: null,
      path: '/pinia/index',
      name: 'pinia',
      redirect: '/pinia/index',
      component: '',
      title: 'pinia',
      icon: 'Grid',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 61,
      parentId: 6,
      path: '/pinia/index',
      name: 'piniaIndex',
      redirect: '',
      component: 'pinia/index',
      title: 'pinia',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 7,
      parentId: null,
      path: '/echarts/barCharts',
      name: 'echarts',
      redirect: '/echarts/barCharts',
      component: '',
      title: 'echarts',
      icon: 'Grid',
      keepAlive: 0,
      roles: ['管理员']
    },
    {
      id: 71,
      parentId: 7,
      path: '/echarts/barCharts',
      name: 'barCharts',
      redirect: '',
      component: 'echarts/BarCharts',
      title: 'barCharts',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 72,
      parentId: 7,
      path: '/echarts/lineCharts',
      name: 'lineCharts',
      redirect: '',
      component: 'echarts/LineCharts',
      title: 'lineCharts',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    },
    {
      id: 73,
      parentId: 7,
      path: '/echarts/pieCharts',
      name: 'pieCharts',
      redirect: '',
      component: 'echarts/PieCharts',
      title: 'pieCharts',
      icon: '',
      keepAlive: 1,
      roles: ['管理员']
    }
  ]
  const roles = useUserStore().getUser()?.roles || []

  const routeList: any[] = []
  routes?.forEach((item) => {
    const hasRoles = roles.filter((r: string) => item.roles?.includes(r))
    if (hasRoles.length) {
      routeList.push(handleRoute(item))
    }
  })
  const routeTree = formatRoute(routeList)

  // 把路由追加到index，形成嵌套路由，或者直接处理成嵌套路由，直接添加
  routeTree.forEach((item) => {
    router.addRoute('/', item)
  })
  // 存储到本地缓存，用于渲染菜单
  useRouteStore().setRouteList(routeList)
}

// 处理路由信息
export const handleRoute = (data: any) => {
  return {
    ...data,
    component: data.component ? getComponent(data.component) : '',
    meta: {
      title: data.title,
      icon: data.icon,
      keepAlive: data.keepAlive,
      roles: data?.roles || []
    }
  }
}

// 导入组件，vite 中需要使用 import.meta.glob()，匹配多级目录需要使用
const modules = import.meta.glob(['@/views/**/*.vue', '@/views/**/*.tsx', '@/views/**/*.jsx'])

// 获取组件实例
export function getComponent(path: string) {
  return (
    modules[`/src/views/${path}.vue`] ||
    modules[`/src/views/${path}.tsx`] ||
    modules[`/src/views/${path}.jsx`]
  )
  // return () =>
  //     modules[`/src/views/${path}.vue`]() ||
  //     modules[`/src/views/${path}.tsx`]() ||
  //     modules[`/src/views/${path}.jsx`]()
}

// 格式化路由（转成菜单数结构，渲染菜单）
export const formatRoute = (data: any[]) => {
  return data.filter((father) => {
    const branchArr = data.filter((child) => father.id === child.parentId) //返回每一项的子级数组
    branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值
    return !father.parentId //返回第一层
  })
}

export const findRouteByIndexPath = (indexPath: string, routeArr: any[]): any => {
  let findItem = null
  if (routeArr.length > 0 && indexPath) {
    for (let i = 0; i < routeArr.length; i++) {
      const item = routeArr[i]
      if (item.path === indexPath && !item?.redirect && !item?.children) {
        findItem = item
        break
      } else if (item.children) {
        if (findItem) break
        findItem = findRouteByIndexPath(indexPath, item.children)
      }
    }
    return findItem
  }
}
