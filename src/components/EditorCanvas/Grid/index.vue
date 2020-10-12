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
</template>

<script>
  export default {
    props: {
      canvasWidth: {type: Number, default: 0},
      canvasHeight: {type: Number, default: 0},
      gridStep: {type: Number, default: 10},
      gridColor: {type: String, default: '#f3f3f3'}
    }, 

    computed: {
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
    }
  }
</script>
