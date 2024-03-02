import type { emit } from 'process'; import type { emit } from 'process';
<template>
  <div class="page-search">
    <m-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button size="large" @click="handleResetClick">
            <el-icon>
              <Refresh />
            </el-icon>
            重置</el-button
          >
          <el-button type="primary" size="large" @click="handleQueryClick">
            <el-icon>
              <Search />
            </el-icon>
            搜索</el-button
          >
        </div>
      </template>
    </m-form>
  </div>
</template>

<script setup lang="ts">
import MForm from '@/base-ui/form'
import { ref } from 'vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref({ ...formOriginData })

const handleResetClick = () => {
  formData.value = { ...formOriginData }
  emit('resetBtnClick')
}

const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="less" scoped>
.page-search {
  display: flow-root;

  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }

  .el-icon {
    margin-right: 4px;
  }
}
</style>
