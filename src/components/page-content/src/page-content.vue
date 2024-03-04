<template>
  <div class="page-content">
    <m-table
      :listData="dataList"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      :listCount="dataCount"
    >
      <!-- header插槽 -->
      <template #headerHandle>
        <el-button type="primary" @click="handleNewClick">
          {{ contentTableConfig?.title.btnText }}
        </el-button>
      </template>
      <!-- 表格中的插槽 -->
      <template #status="tableScope">
        <el-icon :size="20">
          <component
            :is="tableScope.row.enable ? 'CircleCheckFilled' : 'CircleCloseFilled'"
            :color="tableScope.row.enable ? '#67c23a' : '#f56c6c'"
          ></component>
        </el-icon>
      </template>
      <!-- <template #createAt="tableScope">
        <span> </span>
      </template>
      <template #updateAt="tableScope">
        <span> </span>
      </template> -->
      <template #handle="tableScope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            type="primary"
            size="small"
            icon="Edit"
            @click="handleEditClick(tableScope.row)"
          />
          <el-button
            v-if="isDelete"
            type="danger"
            size="small"
            icon="Delete"
            @click="handleDeleteClick(tableScope.row)"
          />
        </div>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
import mTable from '@/base-ui/table'
import useSystemStore from '@/store/main/system/system'

import { ref, watch, computed } from 'vue'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  }
})
const isUpdate = ref(true)
const isDelete = ref(true)

// 1.双向绑定
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(
  () => pageInfo.value,
  () => getPageData()
)

const listStore = useSystemStore()
// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  listStore.postUserListAction({
    // queryInfo: {
    offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
    size: pageInfo.value.pageSize,
    ...queryInfo
    // }
  })
}

// 3.从store中获取数据
const dataList = computed(() => listStore.userList)
const dataCount = computed(() => listStore.userTotalCount)

getPageData()

const emit = defineEmits(['newBtnClick', 'editBtnClick'])
// 删除/编辑/新建
const handleDeleteClick = (item: any) => {
  listStore.deleteUserByIdAction(item.id)
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

const handleNewClick = () => {
  emit('newBtnClick')
}

defineExpose({
  getPageData
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 22px;
  border-top: 20px solid #f0f2f5;

  .el-icon {
    margin-right: 4px;
  }
}
</style>
