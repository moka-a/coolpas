<template>
  <div class="h-full">
    <div class="fixed inset-0">
      <ImageSource
        class="object-cover w-full h-full pointer-events-none"
        :src="require('~/assets/images/jumbotron.jpeg')"
      />
    </div>

    <div class="fixed inset-0">
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col space-y-2 drop-shadow">
          <div class="text-xl font-semibold text-center text-white">
            First calm.<br />No distinguish, awareness
          </div>

          <div class="flex items-center justify-center">
            <Button
              class="flex items-center px-3 py-0.5 text-center text-white border-[1.5px] border-white rounded cursor-pointer w-min"
              @click="downloadPdf"
            >
              <div class="whitespace-nowrap">PDF</div>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed inset-x-0 top-0">
      <div class="flex items-center h-20 px-8 md:px-14 md:h-24 drop-shadow-sm">
        <Button
          class="flex items-center space-x-3 cursor-pointer"
          @click="explain = true"
        >
          <div class="text-2xl font-semibold text-white">쿨파스</div>

          <ImageSource
            class="transform pointer-events-none w-7 h-7 rotate-12"
            :src="require('~/assets/images/coolcat.jpeg')"
          />
        </Button>
      </div>
    </div>

    <template v-if="explain">
      <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        @click="explain = false"
      >
        <ImageSource
          class="object-contain w-full p-4 transition-opacity transform h-[66%] md:p-0"
          :src="require('~/assets/images/coolpas_explain.jpeg')"
        />
      </div>
    </template>

    <template v-if="loading">
      <DialogLoading />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { saveAs } from 'file-saver'
import { DEFAULT_USER_AGENT } from '~/plugins/user-agent'

@Component({})
export default class PagesIndex extends Vue {
  explain = false
  loading = false

  mounted() {
    window.addEventListener('resize', this.onResize)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    let userAgent = DEFAULT_USER_AGENT
    if (typeof navigator !== 'undefined') {
      userAgent = navigator.userAgent
    }
    this.$ua.reset(userAgent)
  }

  async downloadPdf() {
    if (this.$ua.deviceType().type === 'mobile') {
      await this.$dialog({
        message: '데스크탑으로 접속 하시면 PDF를 다운받으실 수 있습니다.',
      })
      return
    }

    this.loading = true
    await this.downloadURI()
    this.loading = false
  }

  async downloadURI() {
    const url =
      'https://etc-everything-anywhere.s3.ap-northeast-2.amazonaws.com/first_calm_open.pdf'

    const blob = await fetch(url).then((r) => r.blob())
    saveAs(blob, 'first_calm_open.pdf')
  }
}
</script>
