import aniRequest from '@/service'
import { AxiosHeaders } from 'axios'

// 用户的网络请求
export function postUserListData(queryInfo: any) {
  return aniRequest.post({
    url: '/users/list',
    data: queryInfo,
    headers: new AxiosHeaders()
  })
}
