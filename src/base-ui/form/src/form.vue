<template>
  <div class="m-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :model="modelValue" :rules="rules" status-icon size="large">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
              :prop="item.field"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :modelValue="modelValue[item.field]"
                  style="width: 100%"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'picker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :modelValue="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref } from 'vue'

import { IFormItem } from '../types'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: Object as PropType<Ref<string>>,
    default: () => ref('100px')
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 40px'
    })
  }
})
const emit = defineEmits(['update:modelValue'])
const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style lang="less" scoped>
.m-form {
  padding-top: 18px;
}
</style>
