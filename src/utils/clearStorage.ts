import { useTabsStore } from '@/store/tabs'
import { useCachePagesStore } from '@/store/cachePages'
import { useUserStore } from '@/store/user'
import { useRouteStore } from '@/store/route'

export const clearAll = () => {
  useTabsStore().clearTab()
  useCachePagesStore().clearCachePage()
  useUserStore().clearUser()
  useRouteStore().clearRouteList()
}
