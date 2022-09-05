<template>
  <div class="space-y-2.5">
    <slot name="label">
      <div class="flex items-center space-x-2">
        <span class="text-base font-semibold">{{ label }}</span>
      </div>
    </slot>

    <div v-if="$slots.default" class="space-y-2">
      <slot />
    </div>

    <div v-if="feedback" class="text-[#FF5722] text-xs">
      {{ feedback }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
  },
})
</script>
