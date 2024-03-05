<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
      :contentTableConfig="contentConfig"
      page-name="department"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      page-name="department"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
const { pageModalRef, handleNewData, handleEditData, defaultInfo } = usePageModal()
</script>

<style lang="less" scoped></style>
