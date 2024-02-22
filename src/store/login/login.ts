import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //空值合并运算符 ??，判断左侧表达式的值是否为 null 或 undefined，如果是，则返回右侧表达式的值。否则返回左侧表达式的值
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult: any = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useLoginStore
