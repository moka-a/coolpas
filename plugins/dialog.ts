import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { DialogOptions } from '~/store/dialog'

export interface VueDialog {
  (options: DialogOptions): Promise<boolean>
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: VueDialog
  }
}

declare module '@nuxt/types' {
  interface Context {
    $dialog: VueDialog
  }
}

export default ({ app, store }: Context, inject: Inject) => {
  function openDialog(options: DialogOptions) {
    return store.dispatch('dialog/open', options)
  }
  app.dialog = openDialog
  inject('dialog', openDialog)
}
