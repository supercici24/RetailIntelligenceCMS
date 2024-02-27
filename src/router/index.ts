import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
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
})

export default router
