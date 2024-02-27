import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1、从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有的ts文件 (**:匹配所有的子目录)
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export function mapMenusToRoutes(menuList: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of menuList) {
    for (const subMenu of menu.childrens) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) routes.push(route)
    }
  }
  return routes
}
