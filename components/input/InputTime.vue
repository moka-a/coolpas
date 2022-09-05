<template>
  <div class="flex space-x-4">
    <InputSelect
      v-model="internalAfternoon"
      class="w-[106px] flex-shrink-0"
      placeholder="선택"
      :options="[
        {
          label: '오전',
          value: false,
        },
        {
          label: '오후',
          value: true,
        },
      ]"
      @input="onInputSelect"
    />

    <div class="relative w-full">
      <InputText
        v-model="internalTime"
        pattern="[\d,]*"
        placeholder="0230"
        @input="onInputTime"
        @focus="onFocusTime"
        @blur="onBlurTime"
      />

      <InputText
        v-if="formattedTime && !isFocusedTime"
        tabindex="-1"
        class="absolute inset-0 pointer-events-none"
        :value="formattedTime"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import numeral from 'numeral'

export interface InputTimeValue {
  afternoon: boolean | null
  timeOf12Hours: string | null
}

@Component({})
export default class InputTimeComponent extends Vue {
  @Prop({ default: null })
  readonly value!: InputTimeValue | null

  internalAfternoon = null as boolean | null
  internalTime = null as string | null

  isFocusedTime = false

  get formattedTime(): string | null {
    const time = this.internalTime
    if (time?.length !== 4) {
      return null
    }
    const hour = time.substring(0, 2)
    const minute = time.substring(2, 4)
    if (~~hour > 12 || ~~minute > 60) {
      return null
    }
    return `${hour}시 ${minute}분`
  }

  created() {
    this.watchValue(this.value)
  }

  @Watch('value')
  watchValue(value?: InputTimeValue | null) {
    this.internalAfternoon = value?.afternoon ?? null
    this.internalTime = value?.timeOf12Hours ?? null
  }

  onInputSelect(value: boolean) {
    this.$emit('input', {
      afternoon: value,
      timeOf12Hours: this.internalTime,
    } as InputTimeValue)
  }

  onFocusTime() {
    this.isFocusedTime = true
  }

  onBlurTime() {
    this.isFocusedTime = false
  }

  onInputTime(value: string) {
    if (value.length === 4) {
      const hour = value.substring(0, 2)
      const minute = value.substring(2, 4)

      if (~~hour > 12) {
        this.internalAfternoon = true
        value = `${numeral(~~hour - 12).format('00')}${minute}`
      }
    }
    this.$emit('input', {
      afternoon: this.internalAfternoon,
      timeOf12Hours: value,
    } as InputTimeValue)
  }
}
</script>
