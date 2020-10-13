<template lang="pug">
  svg.canvas(
    @mousedown="canvasIsDruggble = true"
    @mouseup="canvasIsDruggble = false"
    @mouseleave="canvasIsDruggble = false"
    @mousemove="mouseMoveHandler"
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

    circle(
      :cx="canvasWidth /2"
      :cy="canvasHeight /2"
      r="50px"
    )


</template>

<script>
import grid from '@/components/EditorCanvas/Grid'

export default {
  components: {
    grid
  },

  mounted() {
    this.viewboxWidth = this.screenWidth;
    this.viewboxHeight = this.screenHeight;
    this.cursorPoint = this.$refs.canvas.createSVGPoint();
    this.viewboxMinX = (this.canvasWidth / 2) - (this.viewboxWidth / 2);
    this.viewboxMinY = (this.canvasHeight / 2) - (this.viewboxHeight / 2);
  }, 

  data() {
    return {
      cursorPoint: null,
      cursorCoords: null,
      canvasWidth: 5000,
      canvasHeight: 5000,
      viewboxWidth: 0,
      viewboxHeight: 0,
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

    mouseMoveHandler(event) {
      this.calcCursorCoords(event);
      this.dragCanvas();
    },

    dragCanvas() {
      const step = 3;
      if (this.canvasIsDruggble) {
        this.viewboxMinX -= event.movementX * step;
        this.viewboxMinY -= event.movementY * step;
      }
    },

    calcCursorCoords(event){
      this.cursorPoint.x = event.clientX; 
      this.cursorPoint.y = event.clientY;
      this.cursorCoords = this.cursorPoint.matrixTransform(this.$refs.canvas.getScreenCTM().inverse());
    }
  }
}
</script>

<style lang="stylus" scoped>
 
</style>