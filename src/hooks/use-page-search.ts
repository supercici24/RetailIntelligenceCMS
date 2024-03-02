import type pageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  return { pageContentRef, handleQueryClick, handleResetClick }
}
