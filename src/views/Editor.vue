<template lang="pug">
  .editor
    .canvas
      editor-canvas 

</template>

<script>
  import EditorCanvas from '@/components/EditorCanvas';

  export default {
    components: {
      EditorCanvas,
    }
  }
</script>

<style lang="stylus" scoped>
  .canvas
    border 1px solid black
    border-radius 5px
    width 2100px
    height 700px
    margin 0 auto
</style>