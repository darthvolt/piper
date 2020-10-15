<template lang="pug">
  g
    line(
      v-if="currentLineStartCoords && newLineDrawing"
      :x1="currentLineStartCoords.x1"
      :y1="currentLineStartCoords.y1"
      :x2="cursorNearestGridPointCoords.x"
      :y2="cursorNearestGridPointCoords.y"
      stroke-width="1"
      stroke="#000"
    )
</template>

<script>
export default {
  props: {
    currentTool: {type: String, default: ''},
  },

  data() {
    return {
      newLineDrawing: false,
      currentLineStartCoords: null,
    }
  },

  computed: {
    cursorNearestGridPointCoords() {
      return this.$store.state.editor.cursorNearestGridPointCoords;
    }
  },

  methods: {
    clickHandler(event, cursorNearPointCoordsOnClick) {
      this.newLineDrawing = !this.newLineDrawing;
      
      if(!this.newLineDrawing) {
        this.currentLineStartCoords = {
          x1: cursorNearPointCoordsOnClick.x,
          y1: cursorNearPointCoordsOnClick.y,
        };
      } else {
        this.currentLineCoord = null;
      }
    }
  }
}
</script>