<template>
  <div class="header-info">
    <!-- <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div> -->
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="32" :src="userInfo.avatarUrl" icon="UserFilled"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Avatar">{{ userInfo.name }}</el-dropdown-item>
            <el-dropdown-item divided icon="Edit">
              <el-upload :action="uploadAvatarUrl" name="avatar" :show-file-list="false">
                更新头像
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item divided icon="CircleCloseFilled" @click="handleExitClick">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
import { BASE_URL } from '@/service/config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import notification from '@/utils/notification'
import router from '@/router'

const loginStore = useLoginStore()
const userInfo = computed(() => loginStore.userInfo)
const uploadAvatarUrl = computed(() => `${BASE_URL}/upload/avatar`)

const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  notification.success('退出登录成功')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background-color: #f2f2f2;
    }
    i {
      fontsize: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 100%;
    }
  }
}
.header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  .info {
    display: flex;
    align-items: center;

    .button-icon {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .el-icon {
        padding: 8px 10px;
        cursor: pointer;
      }
      .el-icon:hover {
        background: #f6f6f6;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
