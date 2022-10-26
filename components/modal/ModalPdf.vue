<template>
  <transition name="modal" :duration="300" @afterEnter="$emit('afterEnter')">
    <div v-if="isInit" class="fixed inset-0 z-10 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-90" data-modal-background />
      <template v-if="containerStyle">
        <div
          class="absolute inset-0 overflow-x-hidden overflow-y-auto"
          data-modal-window
        >
          <div ref="container" class="absolute pb-8" :style="containerStyle">
            <div ref="container" class="relative">
              <slot name="default" />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="absolute inset-0 flex justify-center pt-24 pb-24 overflow-x-hidden overflow-y-auto"
          data-modal-window
        >
          <div ref="container" class="relative">
            <slot />
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  attachCloseListener,
  ClosableComponent,
  detachCloseListener,
} from '~/utils/escHandler'

@Component({})
export default class ModalComponent extends Vue implements ClosableComponent {
  @Prop({ default: null })
  readonly position!: Vue | Element | null

  isInit = false
  animated = null as string | null

  windowWidth = 0
  windowHeight = 0

  mounted() {
    this.isInit = true
    this.onResize()
    window.addEventListener('resize', this.onResize)
    attachCloseListener(this)
  }

  beforeDestroy() {
    this.isInit = false
    window.removeEventListener('resize', this.onResize)
    detachCloseListener(this)
  }

  get containerStyle(): Record<string, string> | null {
    if (!this.position) {
      return null
    }

    let target = this.position as Vue | Element
    if (!(target instanceof Element)) {
      target = target.$el
    }

    const { x, y } = target.getBoundingClientRect()
    if (x > this.windowWidth / 2 && y > this.windowHeight / 2) {
      // bottom right
      return {
        right: `${this.windowWidth - x}px`,
        bottom: `${this.windowHeight - y}px`,
      }
    }

    if (x < this.windowWidth / 2 && y > this.windowHeight / 2) {
      // bottom left
      return {
        left: `${x}px`,
        bottom: `${this.windowHeight - y}px`,
      }
    }

    if (x > this.windowWidth / 2 && y < this.windowHeight / 2) {
      // top right
      return {
        right: `${this.windowWidth - x}px`,
        top: `${y}px`,
      }
    }
    return {
      left: `${x}px`,
      top: `${y}px`,
    }
  }

  onResize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
  }

  onClickBackground(e: MouseEvent) {
    if (!e.target) {
      return
    }
    if (!this.$refs.container) {
      return
    }
    if (!document.contains(e.target as Node)) {
      return
    }
    const $container = this.$refs.container as HTMLElement
    if ($container.contains(e.target as Node)) {
      return
    }
    this.close()
  }

  close() {
    this.$emit('close')
  }
}
</script>
<style lang="postcss" scoped>
.modal-enter-active,
.modal-leave-active {
  [data-modal-background] {
    @apply transition-opacity duration-300;
  }
  [data-modal-window] {
    @apply transition-all duration-300 transform-gpu;
  }
}
.modal-enter,
.modal-leave-to {
  [data-modal-background] {
    @apply opacity-0;
  }
}
.modal-enter {
  [data-modal-window] {
    @apply opacity-0 -translate-y-24;
  }
}
.modal-leave-to {
  [data-modal-window] {
    @apply opacity-0 translate-y-24;
  }
}
</style>
