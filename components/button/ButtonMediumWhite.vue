<template>
  <ButtonMedium
    v-bind="$props"
    class="text-black border border-black"
    :class="{
      'bg-opacity-20': disabled,
    }"
    @click="$emit('click')"
  >
    <slot />
  </ButtonMedium>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { buttonMixin } from './Button.vue'

@Component({
  mixins: [buttonMixin],
})
export default class ButtonMediumWhiteComponent extends Vue {}
</script>
