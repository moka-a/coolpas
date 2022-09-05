<template>
  <Button
    v-bind="$props"
    class="px-4 py-4 font-bold text-center rounded-full text-base"
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
