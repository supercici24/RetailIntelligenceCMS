<template>
  <div class="menu">
    <page-content :contentTableConfig="contentConfig" page-name="menu"></page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/src/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped></style>
