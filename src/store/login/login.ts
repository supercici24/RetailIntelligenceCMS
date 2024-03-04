import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import { mapMenusToRoutes } from '../../utils/map-menu'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: [],
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
      const userinfo = userInfoResult.data
      this.userInfo = userinfo

      // 根据角色请求用户的权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache(USER_INFO, userinfo)
      localCache.setCache(USER_MENUS, userMenus)

      // 请求所有的角色和部门
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 在页面跳转前，动态的添加路由
      this.addRoutes(userMenus)
      // 页面跳转到主页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新的时候请求所有的角色和部门
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态添加路由
        this.addRoutes(userMenus)
      }
    },
    addRoutes(userMenus: any[]) {
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  }
})

export default useLoginStore
