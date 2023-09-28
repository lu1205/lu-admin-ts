import type { RouteRecordRaw } from 'vue-router'

export interface User {
  id?: null | number
  username?: string
  password?: string
  name?: string
  borrowcard?: string
  depart?: string
  role?: string
  sex?: string
  tel?: string
  email?: string
}

export type Route = RouteRecordRaw & {
  path?: string | any
}
