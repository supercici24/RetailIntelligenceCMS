import { reactiveWidth } from '@/utils/reactive-width'
const modalConfig = {
  title: '部门',
  formConfig: {
    labelWidth: reactiveWidth('70px', '120px'),
    itemStyle: {},
    colLayout: {},
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '部门名称',
        placeholder: '请输入部门名称'
      },
      {
        field: 'parentId',
        type: 'select',
        label: '上级部门',
        placeholder: '请输入上级部门',
        options: []
      },
      {
        field: 'leader',
        type: 'select',
        label: '负责人',
        placeholder: '请输入负责人',
        options: []
      }
    ]
  },
  pageNama: 'department'
}

export default modalConfig
