import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 针对AxiosRequestConfig配置进行扩展（axios版本升级后，用AxiosRequestConfig会有类型冲突）
export interface AniRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface AniRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  interceptors?: AniRequestInterceptors<T>
}
