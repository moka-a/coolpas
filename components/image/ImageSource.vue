<template>
  <img :src="src" :srcset="srcset" />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    src: {
      type: String,
      default: null,
    },
    '2x': {
      type: String,
      default: null,
    },
    '3x': {
      type: String,
      default: null,
    },
  },
  computed: {
    srcset() {
      if (!this['2x'] && !this['3x']) {
        return null
      }
      return [
        this['2x'] ? `${this['2x']} 2x` : '',
        this['3x'] ? `${this['3x']} 3x` : '',
      ]
        .filter((l) => l)
        .join(', ')
    },
  },
})
</script>
