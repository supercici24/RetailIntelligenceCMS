import aniRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return aniRequest.post({
    url: '/login',
    data: account
  })
}
