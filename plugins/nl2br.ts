import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export type Nl2br = (text?: string | null) => string

declare module 'vue/types/vue' {
  interface Vue {
    $nl2br: Nl2br
  }
}

declare module '@nuxt/types' {
  interface Context {
    $nl2br: Nl2br
  }
}

function nl2br(text?: string | null): string {
  if (!text) {
    return ''
  }
  return text.trim().replace(/(?:\n\r|\n|\r)/g, '<br />')
}

export default (ctx: Context, inject: Inject) => {
  ctx.$nl2br = nl2br
  inject('nl2br', nl2br)
}
