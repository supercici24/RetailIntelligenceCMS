<template>
  <div class="main-header">
    <div class="main-icon" @click="handleMenuIconClick">
      <el-icon size="25px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './header-crumb.vue'

// 内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .main-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
