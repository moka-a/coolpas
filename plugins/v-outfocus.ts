import Vue from 'vue'

Vue.directive('outfocus', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (document.activeElement) {
        if (['INPUT', 'BUTTON', 'A'].includes(document.activeElement.tagName)) {
          return
        }
        if ((document.activeElement as HTMLElement).tabIndex !== -1) {
          return
        }
        ;(document.activeElement as HTMLElement).blur()
      }
    })
  },
})
