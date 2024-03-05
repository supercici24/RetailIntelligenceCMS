import {
  createUserData,
  deleteUserById,
  editUserData,
  postPageListData,
  postUserListData,
  deletePageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 删除数据
      const deleteResult = await deleteUserById(id)

      // 重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async createUserDataAction(userInfo: any) {
      // 创建新用户
      const createResult = await createUserData(userInfo)
      // 重新发送列表请求
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(payload: any) {
      const { editData, id } = payload
      const editUserResut = await editUserData(id, editData)
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async postPageListAction(payload: any) {
      const { pageName, queryInfo } = payload
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageByIdAction(payload: any) {
      const { pageName, id } = payload
      const deleteResult = await deletePageListData(pageName, id)
      this.postPageListAction({ pageName, queryInfo: { offset: 0, size: 10 } })
    },

    async createPageDataAction(payload: any) {
      console.log('payLoad:', payload)
      const { pageName, newData } = payload
      const createResult = await createPageData(pageName, newData)
      this.postPageListAction({ pageName, queryInfo: { offset: 0, size: 10 } })
    },

    async editPageDataAction(payload: any) {
      const { pageName, id, editData } = payload
      const editResult = await editPageData(pageName, id, editData)
    }
  }
})

export default useSystemStore
