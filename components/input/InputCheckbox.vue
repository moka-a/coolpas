<template>
  <div class="relative outline-none cursor-pointer">
    <input
      :id="id"
      v-model="inputValue"
      type="checkbox"
      class="absolute top-0 left-0 w-full h-full opacity-0"
      @change="onChange"
    />
    <div class="tilde-checked">
      <slot name="checked">
        <div
          class="w-4 h-4 border-[#6C6B60] border rounded-[4px] bg-[#191C20]"
        />
      </slot>
    </div>
    <div class="tilde-unchecked">
      <slot name="unchecked">
        <div class="w-4 h-4 border-[#6C6B60] border rounded-[4px]" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  model: {
    prop: 'checked',
    event: 'change',
  },
})
export default class InputCheckboxComponent extends Vue {
  @Prop({ type: String })
  readonly id!: string | undefined

  @Prop()
  readonly checked!: any

  @Prop({ default: true })
  readonly value!: any

  @Prop({ default: false })
  readonly uncheckedValue!: any

  inputValue: boolean = false

  @Watch('checked', { immediate: true })
  watchChecked(checked: any) {
    if (Array.isArray(checked)) {
      this.inputValue = checked.includes(this.value)
    } else {
      this.inputValue = this.value === checked
    }
  }

  @Watch('inputValue')
  watchChcked(inputValue: boolean) {
    if (Array.isArray(this.checked)) {
      const value = new Set(this.checked.slice())
      if (inputValue) {
        value.add(this.value)
      } else {
        value.delete(this.value)
      }
      this.$emit('change', [...value])
    }
  }

  onChange(_: Event) {
    if (Array.isArray(this.checked)) {
      // ignore
    } else {
      this.$emit('change', this.inputValue ? this.value : this.uncheckedValue)
    }
  }
}
</script>
<style lang="postcss" scoped>
input[type='checkbox'] ~ .tilde-checked {
  @apply hidden;
}
input[type='checkbox'] ~ .tilde-unchecked {
  @apply block;
}
input[type='checkbox']:checked ~ .tilde-checked {
  @apply block;
}
input[type='checkbox']:checked ~ .tilde-unchecked {
  @apply hidden;
}
</style>
