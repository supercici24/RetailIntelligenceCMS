import { AxiosHeaders } from 'axios'
import aniRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return aniRequest.post({
    url: '/login',
    data: account,
    headers: new AxiosHeaders()
  })
}

export function getUserInfoById(id: number) {
  return aniRequest.get({
    url: `/users/${id}`,
    headers: new AxiosHeaders()
  })
}

// 获取用户权限
export function getUserMenusByRoleId(id: number) {
  return aniRequest.get({
    url: `/role/${id}/menu`,
    headers: new AxiosHeaders()
  })
}
