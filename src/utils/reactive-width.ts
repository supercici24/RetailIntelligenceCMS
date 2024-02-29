import { ref } from 'vue'
import type { Ref } from 'vue'

export function reactiveWidth(xlWidthResult: any, smWidthResult: any): Ref<any> {
  const targetResult = ref<any>()

  function changeTargetResult() {
    if (window.innerWidth <= 768) {
      targetResult.value = xlWidthResult
    } else if (window.innerWidth >= 768) {
      targetResult.value = smWidthResult
    }
  }
  changeTargetResult()

  window.addEventListener('resize', () => {
    changeTargetResult()
  })

  return targetResult
}
