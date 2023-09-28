import { httpRequest } from '@/utils/request'

export const login = (data: any) => {
  return httpRequest.request({
    url: '/manage/user/login',
    method: 'POST',
    data
  })
}

