<template lang="pug">
  g.grid
    line(
      stroke-width="1"
      :stroke="gridColor"
      v-for="x in coordsX"
      :x1="x"
      y1="0"
      :x2="x"
      :y2="canvasHeight"
    )

    line(
      stroke-width="1"
      :stroke="gridColor"
      v-for="y in coordsY"
      x1="0"
      :y1="y"
      :x2="canvasWidth"
      :y2="y"
    )

    g(v-if="showPointer")
      line(
        :x1="cursorNearestGridPointCoords.x - gridStep"
        :y1="cursorNearestGridPointCoords.y"
        :x2="cursorNearestGridPointCoords.x + gridStep"
        :y2="cursorNearestGridPointCoords.y"
        stroke="#000"
        stroke-width="0.5"
      )
      line(
        :x1="cursorNearestGridPointCoords.x"
        :y1="cursorNearestGridPointCoords.y - gridStep"
        :x2="cursorNearestGridPointCoords.x"
        :y2="cursorNearestGridPointCoords.y + gridStep"
        stroke="#000"
        stroke-width="0.5"
      )
      circle(
        :cx="cursorNearestGridPointCoords.x"
        :cy="cursorNearestGridPointCoords.y"
        r="2"
        fill="#000" 
      )
</template>

<script>
  export default {
    props: {
      canvasWidth: {type: Number, default: 0},
      canvasHeight: {type: Number, default: 0},
      gridStep: {type: Number, default: 20},
      gridColor: {type: String, default: '#f3f3f3'},
      showPointer: {type: Boolean, default: true}
    }, 

    computed: {
      cursorCanvasCoords() {
        return this.$store.state.editor.cursorCanvasCoords;
      },

      cursorNearestGridPointCoords() {
        return {
          x: Math.round(this.cursorCanvasCoords.x / this.gridStep) * this.gridStep, 
          y: Math.round(this.cursorCanvasCoords.y / this.gridStep) * this.gridStep, 
        }
      },

      coordsX() {
        const coords = [];
        for (let i = 0; i <= this.canvasWidth; i+= this.gridStep) {
          coords.push(i);
        } 
        return coords;
      },

      coordsY() {
        const coords = [];
        for (let i = 0; i <= this.canvasHeight; i+= this.gridStep) {
          coords.push(i);
        } 
        return coords;
      },
    },

    watch: {
      cursorNearestGridPointCoords() {
        this.$store.commit('editor/setCursorNearestGridPointCoords', this.cursorNearestGridPointCoords);
      }
    },
  }
</script>
