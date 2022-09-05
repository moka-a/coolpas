<template>
  <svg
    class="spinner-circle"
    :width="`${size}`"
    :height="`${size}`"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :class="{
        'with-color': color,
        'without-color': !color,
      }"
      fill="none"
      :stroke="color"
      :stroke-width="(2 * 65) / size"
      stroke-linecap="round"
      cx="33"
      cy="33"
      :r="(66 - (2 * 65) / size) / 2"
    ></circle>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 65,
    },
  },
})
</script>
<style lang="postcss" scoped>
.spinner-circle {
  animation: spinner_rotate 1.4s linear infinite;
}

.spinner-circle circle {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
}

.spinner-circle circle.with-color {
  animation: spinner_dash 1.4s ease-in-out infinite;
}

.spinner-circle circle.without-color {
  animation: spinner_dash 1.4s ease-in-out infinite,
    spinner_color 5.6s ease-in-out infinite;
}

@keyframes spinner_rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner_color {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes spinner_dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(360deg);
  }
}
</style>
