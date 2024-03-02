import { postUserListData } from '@/service/main/system/system'
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
    }
  }
})

export default useSystemStore
