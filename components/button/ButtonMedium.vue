<template>
  <Button
    v-bind="$props"
    class="px-2 py-2 text-sm font-bold text-center rounded-full"
    :class="{
      'bg-opacity-20': disabled,
    }"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { buttonMixin } from './Button.vue'

@Component({
  mixins: [buttonMixin],
})
export default class ButtonLargeComponent extends Vue {}
</script>
