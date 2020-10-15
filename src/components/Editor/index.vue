<template lang="pug">
  .editor
    .canvas
      editor-canvas 

</template>

<script>
  import EditorCanvas from '@/components/Editor/EditorCanvas';

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
    width 90vw
    height 90vh
    margin 0 auto
</style>