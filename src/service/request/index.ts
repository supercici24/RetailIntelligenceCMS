import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AniRequestConfig, AniRequestInterceptors } from './type'

// 拦截器
/**
 * 1.拦截器进行精细控制->全局拦截器->实例拦截器->单次请求拦截器
 * 2.响应结果的类型处理（泛型）
 */

class AniRequest {
  instance: AxiosInstance
  interceptors?: AniRequestInterceptors

  constructor(config: AniRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors

    // 1、每个instance实例都添加拦截器(全局)
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 2、针对特定的AniRequest实例添加拦截器（单个）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: AniRequestConfig<T>): Promise<T> {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AniRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: AniRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: AniRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: AniRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default AniRequest
