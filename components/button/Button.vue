<template>
  <a
    v-if="type === 'link' && (target || download || hasSchemaLink)"
    :href="to"
    :target="target"
    :download="download"
    :disabled="disabled"
    :class="{
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
    }"
    @click="$emit('click', $event)"
    ><slot
  /></a>
  <nuxt-link
    v-else-if="type === 'link'"
    :to="to"
    :disabled="disabled"
    :class="{
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
    }"
    :replace="replace"
    @click="$emit('click', $event)"
    ><slot
  /></nuxt-link>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="{
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
    }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
<script lang="ts">
/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'

export const buttonMixin = Vue.extend({
  props: {
    to: {
      default: null,
    },
    replace: {
      default: false,
    },
    target: {
      type: String,
      default: null,
    },
    download: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasSchemaLink() {
      const to = this.to as unknown as string | { query: string }
      return (
        typeof to === 'string' &&
        (to.indexOf('http:') === 0 || to.indexOf('https:') === 0)
      )
    },
  },
})

export default Vue.extend({
  mixins: [buttonMixin],
})
</script>
