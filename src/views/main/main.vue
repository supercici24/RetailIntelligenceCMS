<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container class="page">
        <el-header>
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

// 处理折叠
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  .main-content,
  .page {
    height: 100%;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.15s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
.page-content {
  height: calc(100% - 48px);

  .page-info {
    border-radius: 5px;
    background-color: #fff;
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  align-items: center;
}

.el-header {
  height: 48px !important;
}
</style>
