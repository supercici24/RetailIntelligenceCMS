<template>
  <div class="main">
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'
function handleExitClick() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 跳回登录页面
  router.push('/login')
}
</script>

<style lang="less" scoped></style>
