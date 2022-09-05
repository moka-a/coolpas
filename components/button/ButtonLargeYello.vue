<template>
  <ButtonLarge
    v-bind="$props"
    class="text-black border border-[#FBF130] bg-[#FBF130]"
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
export default class ButtonLargeYelloComponent extends Vue {}
</script>
