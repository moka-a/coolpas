<template>
  <transition name="dialog">
    <div v-if="show" class="fixed inset-0 z-50 flex items-end">
      <div
        class="absolute inset-0 bg-black opacity-50"
        @click="onClickBackground"
      />
      <div class="relative m-auto">
        <SpinnerCircle color="#D9D9D9" :size="32" />
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DialogLoadingComponent extends Vue {
  show: boolean = false

  mounted() {
    this.show = true
  }

  onClickBackground() {
    this.show = false
    this.$emit('close')
  }
}
</script>
<style lang="postcss" scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 250ms;

  .content {
    transition: all 250ms;
  }
}
.dialog-enter,
.dialog-leave-to {
  @apply opacity-0;
}
.dialog-enter {
  .content {
    @apply opacity-0;

    transform: translateY(12.5%);
  }
}
.dialog-leave-to {
  .content {
    @apply opacity-0;

    transform: translateY(12.5%);
  }
}
</style>
