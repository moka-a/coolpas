<template>
  <div
    tabindex="0"
    class="relative focus:outline-none"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeyDown"
  >
    <div
      class="text-base bg-[#EFECDA] border border-[#D2CFBC] rounded-lg outline-none"
      :class="{
        'border-[#D2CFBC]': state !== false && !isFocused,
        'border-[#D2CFBC]': state !== false && isFocused,
      }"
      @mousedown="toggle"
    >
      <div class="flex items-center justify-between p-4 gap-x-1">
        <div v-if="selectedIndex > -1" class="truncate">
          {{ currentLabel || '&nbsp;' }}
        </div>
        <div v-else class="text-[#AEADA6] truncate">
          {{ placeholder || '&nbsp;' }}
        </div>
        <IconDown
          class="w-2.5 h-2.5 text-[#AEADA6] transform fill-current"
          :class="{
            'rotate-180': isOpenOption,
          }"
        />
      </div>
    </div>

    <div
      v-if="isOpenOption"
      class="absolute left-0 z-50 w-full overflow-auto bg-black divide-y divide-[#6C6B60] rounded-lg max-h-72 mt-1"
      :style="{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.4))' }"
    >
      <template v-for="(option, optionIndex) in options">
        <div
          :key="optionIndex"
          class="flex items-center justify-between px-3 py-2 truncate cursor-pointer"
          @click="onClickOption(optionIndex)"
        >
          <span class="text-base font-normal text-white">{{
            option.label
          }}</span>
          <template v-if="optionIndex === selectedIndex">
            <IconCheck class="w-2.5 h-2.5" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

export interface InputSelectOption {
  label: string
  value: any
}

@Component({})
export class InputSelectMixin extends Vue {
  @Prop({ default: null })
  readonly value!: any

  @Prop({ default: null })
  readonly default: any

  @Prop({
    type: String,
    default: '선택해주세요.',
  })
  readonly placeholder!: string

  @Prop({
    type: Boolean,
    default: null,
  })
  readonly state!: boolean | null

  @Prop({
    type: Array,
    default: () => [],
  })
  readonly options!: InputSelectOption[]

  selectedIndex = -1
  isFocused = false
  isInternalOpen = false

  get currentLabel() {
    if (this.options[this.selectedIndex]) {
      return this.options[(this as any).selectedIndex].label
    }
    return null
  }

  get isOpenOption() {
    return this.isFocused && this.isInternalOpen
  }

  isSameValue(value1: any, value2: any) {
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return (
        value1 === value2 || JSON.stringify(value1) === JSON.stringify(value2)
      )
    }
    return value1 == value2 // eslint-disable-line eqeqeq
  }

  created() {
    this.options.findIndex((option) =>
      this.isSameValue(option.value, this.value)
    )
    this.defaultState()
  }

  defaultState() {
    if (this.default) {
      this.selectedIndex = +this.default
    }
  }

  @Watch('options')
  watchOptions(options: InputSelectOption[]) {
    if (this.options[this.selectedIndex]) {
      this.selectedIndex = options.findIndex((option) =>
        this.isSameValue(option.value, this.options[this.selectedIndex].value)
      )
    } else {
      this.selectedIndex = -1
    }
  }

  @Watch('value')
  watchValue(value: any) {
    this.selectedIndex = this.options.findIndex((option) =>
      this.isSameValue(option.value, value)
    )
  }

  focus() {
    ;(this.$el as HTMLInputElement).focus()
  }

  onKeyDown(e: KeyboardEvent) {
    if (!this.isFocused) {
      return
    }
    if (e.key === 'ArrowDown') {
      if (!this.isInternalOpen) {
        this.isInternalOpen = true
        return
      }
      if (this.selectedIndex < this.options.length - 1) {
        this.selectedIndex++
      }
    } else if (e.key === 'ArrowUp') {
      if (!this.isInternalOpen) {
        this.isInternalOpen = true
        return
      }
      if (this.selectedIndex > 0) {
        this.selectedIndex--
      }
    } else if (e.key === 'Enter') {
      if (this.isInternalOpen && this.selectedIndex !== -1) {
        this.onClickOption(this.selectedIndex)
      }
      e.preventDefault()
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      this.isInternalOpen = false
    }
  }

  onFocus() {
    this.isFocused = true
  }

  onBlur() {
    this.isFocused = false
    this.isInternalOpen = false

    if (this.selectedIndex !== -1) {
      this.onClickOption(this.selectedIndex)
    }
  }

  toggle() {
    if (!this.isInternalOpen) {
      this.isInternalOpen = true
    } else {
      this.isInternalOpen = false
    }
  }

  onClickOption(index: number) {
    this.selectedIndex = index
    this.$emit('input', this.options[index].value)
    ;(this.$el as HTMLDivElement).blur()
  }
}

export default Vue.extend({
  mixins: [InputSelectMixin],
})
</script>
