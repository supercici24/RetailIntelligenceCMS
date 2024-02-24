import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //空值合并运算符 ??，判断左侧表达式的值是否为 null 或 undefined，如果是，则返回右侧表达式的值。否则返回左侧表达式的值
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登录，获取token等信息
      const loginResult: any = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的详细信息（角色信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据角色请求用户的权限（菜单menus）
      // const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      // this.userMenus = userMenusResult.data

      // 页面跳转到主页面
      router.push('/main')
    }
  }
})

export default useLoginStore
