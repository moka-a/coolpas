<template>
  <div class="h-full">
    <div class="fixed inset-0">
      <ImageSource
        class="object-cover w-full h-full pointer-events-none"
        :src="require('~/assets/images/jumbotron.jpeg')"
      />
    </div>

    <div class="fixed inset-0">
      <div class="flex items-center h-24 px-8 md:px-14">
        <div class="text-2xl font-semibold text-white">쿨파스</div>
      </div>

      <div class="flex items-center justify-center h-full pb-12">
        <div class="text-xl font-semibold text-center text-white drop-shadow">
          First calm,<br />No distinguish, awareness
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PagesIndex extends Vue {
  mounted() {}
}
</script>
