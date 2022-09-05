import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import copy from 'clipboard-copy'

export type Share = (url?: string | null) => void

declare module 'vue/types/vue' {
  interface Vue {
    $share: Share
  }
}

declare module '@nuxt/types' {
  interface Context {
    $share: Share
  }
}

export default ({ app }: Context, inject: Inject) => {
  const { $dialog } = app

  async function share(url?: string | null) {
    try {
      navigator.share({
        title: '',
        text: '',
        url: url ?? '',
      })
    } catch (e) {
      console.log(e)

      await copy(url ?? '')
      await $dialog({
        title: '링크가 복사되었어요! 🔗',
        message: '친구에게 공유해 보세요.',
      })
    }
  }

  inject('share', share)
}
