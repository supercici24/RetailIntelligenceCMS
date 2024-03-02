import { AxiosHeaders } from 'axios'
import aniRequest from '..'
import type { IAccount } from '@/types'

enum LoginAPI {
  accountLogin = '/login',
  loginUserInfo = '/users/',
  userMenu = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return aniRequest.post({
    url: LoginAPI.accountLogin,
    data: account,
    headers: new AxiosHeaders()
  })
}

export function getUserInfoById(id: number) {
  return aniRequest.get({
    url: LoginAPI.loginUserInfo + id,
    headers: new AxiosHeaders()
  })
}

// 获取用户权限
export function getUserMenusByRoleId(id: number) {
  return aniRequest.get({
    url: LoginAPI.userMenu + id + '/menu',
    headers: new AxiosHeaders()
  })
}
