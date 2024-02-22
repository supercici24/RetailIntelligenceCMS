<template>
  <div class="panel-account">
    <el-form :model="account" :rules="rules" status-icon ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import userLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 定义校验规则
const rules: FormRules = {
  name: [
    { message: '请输入帐号', required: true, trigger: 'blur' },
    // { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    { pattern: /^[a-zA-Z0-9]{5,20}$/, message: '长度在5到20 个字符', trigger: 'blur' }
  ],

  password: [
    { message: '请输入密码', required: true, trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上数字或字母组成', trigger: 'blur' }
  ]
}

// 登录
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = userLoginStore()
function loginAccount(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      // 向服务器发送网络请求(携带帐号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 是否记住密码
        if (isKeepPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请输入正确的帐号和密码')
      return false
    }
  })
}

defineExpose({
  loginAccount
})
</script>

<style lang="less" scoped></style>
