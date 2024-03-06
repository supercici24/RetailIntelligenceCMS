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

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.childrens) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        // 给route的顶层菜单增加重定向功能（只需要添加一次）
        if (
          !routes.find((item) => {
            item.path === menu.url
          })
        ) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //二级菜单
        routes.push(route)
      }

      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}
/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.childrens) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
  return undefined
}
export { firstMenu }

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(currentPath: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []

  for (const menu of userMenus) {
    if (menu.type === 1) {
      const MapBreadcrumbs = mapPathToBreadcrumbs(currentPath, menu.childrens ?? [])
      if (MapBreadcrumbs) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push(...MapBreadcrumbs)
        return breadcrumbs
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      breadcrumbs.push({ name: menu.name, path: menu.url })
      return breadcrumbs
    }
  }
}

/**
 * 菜单映射到id
 * @param menumList
 */
export function mapMenuListToIds(menumList: any[]) {
  const ids: number[] = []

  function recurseIds(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseIds(item)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseIds(menumList)

  return ids
}
