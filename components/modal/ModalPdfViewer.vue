<template>
  <ModalPdf :position="position" @close="onClose">
    <div class="w-full h-full">
      <div class="flex items-center w-full h-full px-16">
        <div class="flex-1">
          <ImageSource
            class="pointer-events-none"
            :src="require(`~/assets/images/first_calm_${page * 2}.jpg`)"
          />
        </div>

        <div class="flex-1">
          <ImageSource
            class="pointer-events-none"
            :src="require(`~/assets/images/first_calm_${page * 2 + 1}.jpg`)"
          />
        </div>
      </div>

      <div class="fixed inset-x-0 bottom-0">
        <div class="flex items-center justify-center py-10">
          <div
            class="flex items-center justify-center px-2 space-x-4 bg-black rounded bg-opacity-10"
          >
            <a
              class="p-1.5 cursor-pointer rounded-xl"
              @click="paginate(page - 1)"
            >
              <IconArrowRight
                class="text-white transform rotate-180 fill-current text-opacity-70"
              />
            </a>

            <div class="text-white select-none text-opacity-70">
              {{ page + 1 }} / 42
            </div>

            <a
              class="p-1.5 cursor-pointer rounded-xl"
              @click="paginate(page + 1)"
            >
              <IconArrowRight class="text-white fill-current text-opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </ModalPdf>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class ModalPdfViewerComponent extends Vue {
  @Prop({ default: null })
  readonly position!: Vue | Element | null

  page = 0

  mounted() {
    this.watchRouteQuery(this.$route.query)
    window.addEventListener('keyup', this.onKeyHandler)
  }

  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyHandler)
  }

  onKeyHandler(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      this.paginate(this.page + 1)
    }
    if (e.key === 'ArrowLeft') {
      this.paginate(this.page - 1)
    }
  }

  @Watch('$route.query')
  watchRouteQuery(query: Record<string, string | (string | null)[]>) {
    if (query.page) {
      this.paginate(~~query.page - 1)
    }
  }

  paginate(page: number) {
    if (page < 0 || page > 41) {
      page = 0
    }
    this.page = page
    this.$replaceQuery({ page: page + 1 })
  }

  onClose() {
    this.$emit('close')
  }
}
</script>
