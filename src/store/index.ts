import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)

  // 加载本地数据(并且使用addRoute加载动态路由)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
