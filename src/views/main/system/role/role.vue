<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      pageName="role"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :outerInfo="outerInfo"
    >
      <div class="menu-terr">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleEltreeCheck"
        />
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/src/page-search.vue'
import pageContent from '@/components/page-content/src/page-content.vue'
import pageModal from '@/components/page-modal/src/page-modal.vue'

import searchConfig from './config/search.config'
import contentTableConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import useMainStore from '@/store/main/main'
import { computed, nextTick, ref } from 'vue'
import { mapMenuListToIds } from '@/utils/map-menu'

// 调用hooks
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

// 获取完整的菜单
const mainStore = useMainStore()
const menus = computed(() => mainStore.entireMenus)
const outerInfo = ref({})
const handleEltreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  outerInfo.value = { menuList }
}

// pagemodal树形选择编辑逻辑
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = mapMenuListToIds(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys)
  })
}
// 调用hooks
const { pageModalRef, handleNewData, handleEditData, defaultInfo } = usePageModal(editCallback)
</script>

<style lang="less" scoped>
.menu-terr {
  margin-left: 30px;
}
</style>
