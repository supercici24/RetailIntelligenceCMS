import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(editCallback?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref<any>({})

  const handleNewData = () => {
    defaultInfo.value = {}
    showDialog()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    showDialog()
    editCallback && editCallback(item)
  }
  function showDialog() {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  return { pageModalRef, handleNewData, handleEditData, defaultInfo }
}
