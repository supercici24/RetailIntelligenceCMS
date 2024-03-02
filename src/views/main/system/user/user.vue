<template>
  <div class="user">
    <user-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></user-search>
    <user-content ref="pageContentRef" :contentTableConfig="contentTableConfig"></user-content>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import userSearch from '@/components/page-search'
import userContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import useSystemStore from '@/store/main/system/system'

import { usePageSearch } from '@/hooks/use-page-search'

const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

const systemStore = useSystemStore()

const { userList } = storeToRefs(systemStore)

// 发送网络请求
function fetchUserListData() {
  systemStore.postUserListAction()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
