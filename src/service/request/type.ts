import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface AniInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface AniRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AniInterceptors<T>
}
