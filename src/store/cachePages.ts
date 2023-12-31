import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCachePagesStore = defineStore(
  'cachePages',
  () => {
    const cachePages = ref<Array<string>>([])

    /*
     * 获取缓存页面
     * */
    const getCachePages = () => {
      return cachePages.value
    }

    /*
     * 添加缓存页面
     * */
    const addCachePage = (page: string) => {
      !cachePages.value.includes(page) && cachePages.value.push(page)
    }

    /*
     * 移除缓存页面
     * */
    const removeCachePage = (page: string) => {
      const index = cachePages.value.indexOf(page)
      if (index > -1) {
        cachePages.value.splice(index, 1)
      }
    }

    /*
     * 设置缓存页面
     * */
    const setCachePage = (pages: string[]) => {
      cachePages.value = pages
    }

    /*
     * 清空缓存页面
     * */
    const clearCachePage = () => {
      cachePages.value = []
    }

    return {
      cachePages,
      getCachePages,
      addCachePage,
      removeCachePage,
      setCachePage,
      clearCachePage
    }
  },
  {
    persist: {
      key: 'cachePages',
      storage: localStorage,
      paths: ['cachePages']
    }
  }
)
