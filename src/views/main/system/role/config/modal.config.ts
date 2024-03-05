import { reactiveWidth } from '@/utils/reactive-width'
const modalConfig = {
  title: '角色',
  formConfig: {
    labelWidth: reactiveWidth('70px', '120px'),
    itemStyle: {},
    colLayout: {},
    // rules: rules,
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '角色名',
        placeholder: '请输入角色名'
      },
      {
        field: 'intro',
        type: 'input',
        label: '角色介绍',
        placeholder: '请输入角色介绍'
      }
    ]
  }
}
export default modalConfig
