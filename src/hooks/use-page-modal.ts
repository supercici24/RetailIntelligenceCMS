import { ref } from 'vue'
import pageModal from '@/components/page-modal'

export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref<any>({})

  const handleNewData = () => {
    defaultInfo.value = {}
    showDialog()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    showDialog()
  }
  function showDialog() {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  return { pageModalRef, handleNewData, handleEditData, defaultInfo }
}
