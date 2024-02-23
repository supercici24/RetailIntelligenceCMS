import aniRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return aniRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return aniRequest.get({
    url: `/users/${id}`
  })
}
