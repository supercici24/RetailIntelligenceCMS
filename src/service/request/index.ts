import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AniRequestConfig } from './type'

// 拦截器
/**
 * 1.拦截器进行精细控制->全局拦截器->实例拦截器->单词请求拦截器
 * 2.响应结果的类型处理（泛型）
 */

class AniRequest {
  instance: AxiosInstance

  constructor(config: AniRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
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

    // 针对特定的AniRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }
  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: AniRequestConfig<T>) {
    // 单次请求的成功拦截处理
    // if (config.interceptors?.requestSuccessFn) {
    //   config = config.interceptors.requestSuccessFn(config)
    // }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
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
