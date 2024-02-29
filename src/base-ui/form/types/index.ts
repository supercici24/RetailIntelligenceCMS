import type { Ref } from 'vue'
import type { FormRules } from 'element-plus'

type IFormType = 'input' | 'password' | 'select' | 'picker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  placeholder?: any
  // select
  options?: any[]
  // 特殊属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: Ref<string>
  colLayout?: any
  itemStyle?: any
  rules?: FormRules
}
