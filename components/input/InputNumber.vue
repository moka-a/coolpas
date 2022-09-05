<template>
  <input
    ref="input"
    type="text"
    :value="formatTo(inputValue)"
    pattern="[0-9\-]+"
    class="w-full p-4 text-base placeholder-[#AEADA6] placeholder:font-normal bg-[#EFECDA] border rounded-lg border-[#D2CFBC] outline-none"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>
<script lang="ts">
import numeral from 'numeral'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class InputNumberComponent extends Vue {
  @Prop({ type: Number, default: null })
  readonly value!: number | null

  @Prop({ type: Boolean, default: null })
  readonly state!: boolean | null

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: String, default: null })
  readonly placeholder!: string | null

  @Prop({ type: String, default: '0,0' })
  readonly format!: string

  @Prop({ type: Number, default: null })
  readonly max!: number | null

  @Prop({ type: Number, default: null })
  readonly min!: number | null

  inputValue = null as number | null

  created() {
    this.watchValue(this.value)
  }

  @Watch('value')
  watchValue(value?: number | null) {
    this.inputValue = value ?? null
  }

  formatTo(number?: string | number | null): string {
    if (number === '' || number == null) {
      return ''
    }
    return numeral(number).format(this.format)
  }

  focus() {
    ;(this.$refs.input as HTMLInputElement).focus()
  }

  onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value.replace(/\D+/g, '')
    let inputValue = null as number | null
    if (value) {
      inputValue = +value
      if (this.min !== null) {
        inputValue = Math.max(this.min, inputValue)
      }
      if (this.max !== null) {
        inputValue = Math.min(this.max, inputValue)
      }
    }
    this.inputValue = inputValue
    this.$emit('input', inputValue)
    this.$nextTick(() => this.$forceUpdate())
  }
}
</script>
