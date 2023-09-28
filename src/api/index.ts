import { httpRequest } from '@/utils/request'

export const login = (data: any) => {
  return httpRequest.request({
    url: '/api/login',
    method: 'POST',
    data
  })
}
