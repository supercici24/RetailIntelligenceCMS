import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import AniRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'
import { AxiosHeaders } from 'axios'

const aniRequest = new AniRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: new AxiosHeaders(),
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers ? (config.headers.Authorization = `Bearer ${token}`) : ''
      }
      return config
    }
  }
})

export default aniRequest
