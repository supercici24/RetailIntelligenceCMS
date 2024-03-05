<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :width="dialogWidth"
      :title="modalConfig.title"
      destroy-on-close
      center
    >
      <m-form v-bind="modalConfig.formConfig" v-model="formItems"></m-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { reactiveWidth } from '@/utils/reactive-width'

import mForm from '@/base-ui/form'
import useSystemStore from '@/store/main/system/system'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  outerInfo: {
    type: Object,
    default: () => ({})
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String
  }
})

const listStore = useSystemStore()

const formItems = ref<any>({})
const dialogVisible = ref(false)
const dialogWidth = reactiveWidth('90%', '30%')

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formConfig.formItems) {
      formItems.value[item.field] = newValue[item.field]
    }
  }
)

// 点击确定按钮
const handleConfirmClick = () => {
  dialogVisible.value = false

  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    listStore.editPageDataAction({
      pageName: props.pageName,
      id: props.defaultInfo.id,
      editData: { ...formItems.value, ...props.outerInfo }
    })
  } else {
    // 创建新用户
    listStore.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formItems.value, ...props.outerInfo }
    })
  }
}

defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped></style>
