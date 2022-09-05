import { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface DialogOptions {
  image?: string
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  hiddenClose?: boolean
}

export interface DialogCallback {
  options: DialogOptions
  onClose: (result?: boolean) => void
}

export const state = () => ({
  dialogCallback: null as DialogCallback | null,
})

export type DialogState = ReturnType<typeof state>

export const getters: GetterTree<DialogState, any> = {
  options: (state) => state.dialogCallback?.options,
}

export const mutations: MutationTree<DialogState> = {
  setDialogCallback(state: DialogState, Dialog: DialogCallback) {
    state.dialogCallback = Dialog
  },
}

export const actions: ActionTree<DialogState, any> = {
  open({ commit, state }, options: DialogOptions) {
    if (state.dialogCallback) {
      state.dialogCallback.onClose(false)
    }
    return new Promise<boolean>((resolve) => {
      commit('setDialogCallback', {
        options,
        onClose: resolve,
      } as DialogCallback)
    })
  },
  close({ commit, state }, confirmed?: boolean) {
    if (state.dialogCallback) {
      state.dialogCallback.onClose(confirmed)
    }
    commit('setDialogCallback', null)
  },
}
