import {
  createUserData,
  deleteUserById,
  editUserData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0
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
    }
  }
})

export default useSystemStore
