<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">零售智能管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="routePath"
        text-color="#b7bdc3"
        active-color="#fff"
        background-color="#001529"
        :collapse="isFold"
        :collapse-transition="false"
      >
        <template v-for="item in userMenus" :key="item.id">
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id + ''" v-if="item.type === 1">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!--子菜单 -->
            <template v-for="subItem in item.childrens" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">
                <el-icon v-if="subItem.icon">
                  {{ subItem.icon }}
                  <component :is="subItem.icon"></component>
                </el-icon>
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import useLoginStore from '@/store/login/login'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { mapPathToMenu } from '@/utils/map-menu'
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 默认菜单
const route = useRoute()

const routePath = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2153;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60b1;
    }
  }
}
</style>
