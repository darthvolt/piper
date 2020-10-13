<template lang="pug">
  g.grid(
    @mousemove="mousemoveHandler"
  )
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
        :x1="cursorNearestPointCoords.x - gridStep"
        :y1="cursorNearestPointCoords.y"
        :x2="cursorNearestPointCoords.x + gridStep"
        :y2="cursorNearestPointCoords.y"
        stroke="#000"
        stroke-width="0.7"
      )
      line(
        :x1="cursorNearestPointCoords.x"
        :y1="cursorNearestPointCoords.y - gridStep"
        :x2="cursorNearestPointCoords.x"
        :y2="cursorNearestPointCoords.y + gridStep"
        stroke="#000"
        stroke-width="0.7"
      )
      circle(
        :cx="cursorNearestPointCoords.x"
        :cy="cursorNearestPointCoords.y"
        r="3"
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
      cursorCoords: {type: Object, required: true},
      showPointer: {type: Boolean, default: true}
    }, 

    computed: {
      cursorNearestPointCoords() {
        return {
          x: Math.round(this.cursorCoords.x / this.gridStep) * this.gridStep, 
          y: Math.round(this.cursorCoords.y / this.gridStep) * this.gridStep, 
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

    methods: {
      mousemoveHandler() {
        this.$emit('cursorNearestPointCalculated', this.cursorNearestPointCoords);
      }
    }
  }
</script>
