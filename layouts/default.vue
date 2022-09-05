<template>
  <div class="h-full">
    <Nuxt />

    <template v-if="dialog">
      <DialogConfirm
        v-bind="dialog"
        @confirm="$store.dispatch('dialog/close', true)"
        @cancel="$store.dispatch('dialog/close', false)"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters({
      dialog: 'dialog/options',
    }),
  },
})
export default class LayoutDefault extends Vue {}
</script>
