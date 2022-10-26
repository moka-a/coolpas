export interface ClosableComponent {
  close(): any
}

const components = [] as ClosableComponent[]

function onKeyHandler(e: KeyboardEvent) {
  if (e.key !== 'Escape') {
    return
  }
  if (components.length === 0) {
    return
  }
  const lastModal = components[components.length - 1] // 맨 마지막에 활성화된 모달만 취소 처리
  lastModal.close()
}

export function attachCloseListener(component: ClosableComponent) {
  if (components.length === 0) {
    window.addEventListener('keyup', onKeyHandler)
  }
  components.push(component)
}

export function detachCloseListener(component: ClosableComponent) {
  const foundIndex = components.indexOf(component)
  if (foundIndex > -1) {
    components.splice(foundIndex, 1)
  }

  if (components.length === 0) {
    window.removeEventListener('keyup', onKeyHandler)
  }
}
