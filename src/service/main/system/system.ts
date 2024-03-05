import aniRequest from '@/service'
import { AxiosHeaders } from 'axios'

// 用户的网络请求

// 查询用户列表数据
export function postUserListData(queryInfo: any) {
  return aniRequest.post({
    url: '/users/list',
    data: queryInfo,
    headers: new AxiosHeaders()
  })
}

// 根据id删除用户数据
export function deleteUserById(id: number) {
  return aniRequest.delete({
    url: `/users/${id}`,
    headers: new AxiosHeaders()
  })
}

// 新建用户
export function createUserData(userInfo: any) {
  return aniRequest.post({
    url: '/users',
    data: userInfo,
    headers: new AxiosHeaders()
  })
}

// 编辑用户
export function editUserData(id: number, editData: any) {
  return aniRequest.patch({
    url: `/users/${id}`,
    data: editData,
    headers: new AxiosHeaders()
  })
}

/**增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return aniRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
    headers: new AxiosHeaders()
  })
}

export function deletePageListData(pageName: string, id: number) {
  return aniRequest.delete({
    url: `/${pageName}/${id}`,
    headers: new AxiosHeaders()
  })
}

export function createPageData(pageName: string, pageInfo: any) {
  return aniRequest.post({
    url: `${pageName}`,
    data: pageInfo,
    headers: new AxiosHeaders()
  })
}

export function editPageData(pageName: string, id: number, editData: any) {
  return aniRequest.patch({
    url: `${pageName}/${id}`,
    data: editData,
    headers: new AxiosHeaders()
  })
}
