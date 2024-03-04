<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :width="dialogWidth"
      :title="modalConfig.title"
      destroy-on-close
      center
    >
      <m-form v-bind="modalConfig.formConfig" v-model="formItems">
        <slot></slot>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
          </span>
        </template>
      </m-form>
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
    listStore.editUserDataAction({
      id: props.defaultInfo.id,
      editData: { ...formItems.value }
    })
  } else {
    // 创建新用户
    listStore.createUserDataAction({
      // newData: { ...formItems.value, ...props.outerInfo }
      ...formItems.value
    })
  }
}

defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped></style>
