/* 控制loading状态的自动切换hook */
import { useSettingStore } from '@/store/setting.ts'

export function useAutoRequest(fun: any, options?: any) {
  const { loading = false, onSuccess } = options || { loading: false }

  const requestLoading = ref(loading)

  const run = (...params: any[]) => {
    requestLoading.value = true
    useSettingStore().setLoading(true)
    return fun(...params)
      .then((res: any) => {
        onSuccess && onSuccess(res)
        return res
      })
      .finally(() => {
        requestLoading.value = false
        useSettingStore().setLoading(false)
      })
  }

  return [requestLoading, run]
}
