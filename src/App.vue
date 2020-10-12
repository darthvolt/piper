<template lang="pug">
  .app
    component(:is="template")
</template>

<script>
import defaultLayout from '@/layouts/default';

export default {
  components: {
    defaultLayout
  },
  computed: {
    template() {
      return `${this.$route.meta.template || 'default'}Layout`
    }
  }
}
</script>

<style lang="stylus">

</style>