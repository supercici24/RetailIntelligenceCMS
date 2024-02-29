<template>
  <div class="user">
    <user-search :searchFormConfig="searchFormConfig"></user-search>
  </div>
</template>

<script setup lang="ts">
import userSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
