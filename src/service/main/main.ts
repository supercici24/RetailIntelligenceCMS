import aniRequest from '@/service'
import { AxiosHeaders } from 'axios'

export function getEntireRoles() {
  return aniRequest.post({
    url: '/role/list',
    data: {
      offset: 0,
      size: 10
    },
    headers: new AxiosHeaders()
  })
}

export function getEntireDepartment() {
  return aniRequest.post({
    url: '/department/list',
    data: {
      offset: 0,
      size: 10
    },
    headers: new AxiosHeaders()
  })
}
