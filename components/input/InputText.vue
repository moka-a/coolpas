<template>
  <input
    ref="input"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :pattern="pattern"
    class="w-full p-4 text-base placeholder-[#AEADA6] placeholder:font-normal border font-medium rounded-[8px] text-black outline-none bg-[#EFECDA] border-[#D2CFBC]"
    autocorrect="off"
    autocapitalize="none"
    autocomplete="off"
    :disabled="disabled"
    @input="onInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    state: {
      type: Boolean,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    focus() {
      ;(this.$refs.input as HTMLInputElement).focus()
    },
    onInput(e: Event) {
      this.$emit('input', (e.target as HTMLInputElement | undefined)?.value)
    },
  },
})
</script>
