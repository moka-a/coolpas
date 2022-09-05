<template>
  <Dialog @close="$emit('cancel')">
    <div class="w-full p-6 bg-white">
      <div
        v-if="title"
        class="text-lg font-bold text-center"
        v-html="$nl2br(title)"
      />
      <div
        class="mt-2 text-sm text-center text-gray-800"
        v-html="$nl2br(message)"
      />
      <div class="mt-6">
        <template v-if="cancelText">
          <div class="flex items-center space-x-1">
            <ButtonLargeWhite class="flex-grow w-1/2" @click="$emit('cancel')">
              {{ cancelText }}
            </ButtonLargeWhite>
            <ButtonLargeBlack class="flex-grow w-1/2" @click="$emit('confirm')">
              {{ confirmText || '확인' }}
            </ButtonLargeBlack>
          </div>
        </template>
        <template v-else>
          <div class="flex">
            <ButtonMediumWhite class="w-full" @click="$emit('confirm')">
              {{ confirmText || '확인' }}
            </ButtonMediumWhite>
          </div>
        </template>
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DialogConfirmComponent extends Vue {
  @Prop({
    type: String,
    default: null,
  })
  title!: string | null

  @Prop({
    type: String,
  })
  message!: string

  @Prop({
    type: String,
    default: null,
  })
  confirmText!: string

  @Prop({
    type: String,
    default: null,
  })
  cancelText!: string
}
</script>
