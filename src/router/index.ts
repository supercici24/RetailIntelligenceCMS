import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menu'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main' //重定向到首页，但在定位之前需要用导航守卫拦截检查是否已登录
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      name: 'main'
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (!token && to.path !== '/login') return '/login'

  // 刚登录或者手动在浏览器输入进入main时，跳转到菜单中的第一个菜单路由
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
