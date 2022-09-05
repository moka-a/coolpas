<template>
  <ButtonLarge
    v-bind="$props"
    class="text-white bg-black"
    :class="{
      'bg-opacity-20': disabled,
    }"
    @click="$emit('click')"
  >
    <slot />
  </ButtonLarge>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { buttonMixin } from './Button.vue'

@Component({
  mixins: [buttonMixin],
})
export default class ButtonLargeBlackComponent extends Vue {}
</script>
