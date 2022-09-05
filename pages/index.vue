<template>
  <div class="h-full">
    <div class="fixed inset-0">
      <ImageSource
        class="object-cover w-full h-full pointer-events-none"
        :src="require('~/assets/images/jumbotron.jpeg')"
      />
    </div>

    <div class="fixed inset-0">
      <div class="flex items-center h-20 px-8 md:px-14 md:h-24 drop-shadow-sm">
        <div
          class="flex items-center space-x-3 cursor-pointer"
          @click="clickCoolpas"
        >
          <div class="text-2xl font-semibold text-white">쿨파스</div>

          <ImageSource
            class="transform pointer-events-none w-7 h-7 rotate-12"
            :src="require('~/assets/images/coolcat.jpeg')"
          />
        </div>
      </div>

      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col pb-16 space-y-2 md:pb-24 drop-shadow">
          <div class="text-xl font-semibold text-center text-white">
            First calm,<br />No distinguish, awareness
          </div>

          <div class="flex items-center justify-center">
            <a
              class="flex items-center px-3 py-0.5 text-center text-white border-[1.5px] border-white rounded cursor-pointer w-min"
              href="https://etc-everything-anywhere.s3.ap-northeast-2.amazonaws.com/first_calm_open.pdf"
              target="_blank"
            >
              <div class="whitespace-nowrap">PDF</div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <template v-if="explain">
      <div
        class="fixed inset-0 bg-black bg-opacity-30"
        @click="explain = false"
      >
        <ImageSource
          class="object-contain w-full h-full p-4 transition-opacity transform md:p-48"
          :src="require('~/assets/images/coolpas_explain.jpeg')"
        />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PagesIndex extends Vue {
  explain = false

  clickCoolpas() {
    this.explain = true
  }
}
</script>
