<template lang="pug">
  svg.canvas(
    @mousedown="canvasIsDruggble = true"
    @mouseup="canvasIsDruggble = false"
    @mouseleave="canvasIsDruggble = false"
    @mousemove="drugCanvas"
    @wheel="changeScale"
    ref="canvas"
    :width="canvasWidth"
    :height="canvasHeight"
    :viewBox="viewBox"
  )
    grid(
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
    )

    //- circle(
    //-   cx="1500"
    //-   cy="1000"
    //-   r="50px"
    //- )


</template>

<script>
import grid from '@/components/EditorCanvas/Grid'

export default {
  components: {
    grid
  },

  mounted() {
    this.viewboxMinX = (this.canvasWidth / 2) - (this.viewboxWidth / 2);
    this.viewboxMinY = (this.canvasHeight / 2) - (this.viewboxHeight / 2);
  }, 

  data() {
    return {
      canvasWidth: 3000,
      canvasHeight: 2000,
      viewboxWidth: 1500,
      viewboxHeight: 500,
      viewboxMinX: 0,
      viewboxMinY: 0,
      canvasIsDruggble: false,
      currentTool: 'line',
    }
  },

  computed: {
    viewBox() {
      return `${this.viewboxMinX} ${this.viewboxMinY} ${this.viewboxWidth} ${this.viewboxHeight}`;
    },
    screenWidth() {
      return document.documentElement.clientWidth;
    },
    screenHeight() {
      return document.documentElement.clientHeight;
    }
  },

  methods: {
    changeScale(event) {
      const step = 30;
      if (event.deltaY > 0) {
        this.viewboxWidth += step;
        this.viewboxHeight += step;
      } else {
        this.viewboxWidth -= step;
        this.viewboxHeight -= step;
      }
    },

    drugCanvas(event) {
      const step = 3;
      if (this.canvasIsDruggble) {
        this.viewboxMinX -= event.movementX * step;
        this.viewboxMinY -= event.movementY * step;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
 
</style>