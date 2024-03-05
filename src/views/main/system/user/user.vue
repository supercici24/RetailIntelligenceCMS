<template>
  <div class="user">
    <user-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></user-search>
    <user-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      page-name="users"
    ></user-content>
    <user-modal
      page-name="users"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    ></user-modal>
  </div>
</template>

<script setup lang="ts">
import userSearch from '@/components/page-search'
import userContent from '@/components/page-content'
import userModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { computed } from 'vue'
import useMainStore from '@/store/main/main'

// 调用hooks
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

// 调用hooks
const { pageModalRef, handleNewData, handleEditData, defaultInfo } = usePageModal()

const listStore = useMainStore()
// 动态添加部门和角色选项
const modalConfigRef = computed(() => {
  const department = modalConfig.formConfig!.formItems.find((item) => item.field === 'departmentId')
  department!.options = listStore.entireDepartments.map((item) => {
    return { title: item.name, value: item.id }
  })

  const roles = modalConfig.formConfig!.formItems.find((item) => item.field === 'roleId')
  roles!.options = listStore.entireRoles.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
