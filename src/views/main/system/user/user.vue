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
    ></user-content>
    <user-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
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

// 调用hooks
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

// 调用hooks
const { pageModalRef, handleNewData, handleEditData, defaultInfo } = usePageModal()
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
