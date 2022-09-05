<template>
  <div class="flex space-x-4">
    <InputSelect
      v-model="internalLunar"
      class="w-[106px] flex-shrink-0"
      placeholder="선택"
      :options="[
        {
          label: '양력',
          value: false,
        },
        {
          label: '음력',
          value: true,
        },
      ]"
      @input="onInputSelect"
    />

    <div class="relative w-full">
      <InputNumber
        v-model="internalDate"
        format="0"
        placeholder="19961003"
        @input="onInputDate"
        @focus="onFocusDate"
        @blur="onBlurDate"
      />

      <InputText
        v-if="formattedDate && !isFocusedDate"
        tabindex="-1"
        class="absolute inset-0 z-50 pointer-events-none"
        :value="formattedDate"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { endOfMonth } from 'date-fns'

export interface InputDateValue {
  lunar: boolean | null
  date: string | null
}

@Component({})
export default class InputDateComponent extends Vue {
  @Prop({ default: null })
  readonly value!: InputDateValue | null

  internalLunar = null as boolean | null
  internalDate = null as number | null

  isFocusedDate = false

  get formattedDate(): string | null {
    const date = `${this.internalDate}`
    if (date.length !== 8) {
      return null
    }
    const year = date.substring(0, 4)
    const month = date.substring(4, 6)
    const day = date.substring(6, 8)
    const endDay = endOfMonth(new Date(`${year}-${month}`)).getDate()

    if (~~month > 12 || ~~day > endDay) {
      return null
    }
    return `${year}년 ${month}월 ${day}일`
  }

  created() {
    this.watchValue(this.value)
  }

  @Watch('value')
  watchValue(value?: InputDateValue | null) {
    this.internalLunar = value?.lunar ?? null
    this.internalDate = value?.date ? ~~value?.date : null
  }

  onInputSelect(value: boolean) {
    this.$emit('input', {
      lunar: value,
      date: this.internalDate !== null ? `${this.internalDate}` : null,
    } as InputDateValue)
  }

  onFocusDate() {
    this.isFocusedDate = true
  }

  onBlurDate() {
    this.isFocusedDate = false
  }

  onInputDate(value: number) {
    this.$emit('input', {
      lunar: this.internalLunar,
      date: `${value}`,
    } as InputDateValue)
  }
}
</script>
