<template lang="pug">
  svg.canvas(
    @mousedown="canvasIsDruggble = true"
    @mouseup="canvasIsDruggble = false"
    @mouseleave="canvasIsDruggble = false"
    @mousemove="mouseMoveHandler"
    @wheel="changeScale"
    @click="clickHandler"
    ref="canvas"
    :width="canvasWidth"
    :height="canvasHeight"
    :viewBox="viewBox"
  )
    grid(
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
    )

    line-tool(
      :currentTool="currentTool"
      ref="lineTool"
    )


</template>

<script>
import grid from '@/components/Editor/EditorCanvas/Grid'
import lineTool from '@/components/Editor/EditorCanvas/tools/Line'

export default {
  components: {
    grid,
    lineTool
  },

  props: {
    currentTool: {type: String, default: 'lineTool'},
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
      cursorCoords: {x: 0, y: 0},
      canvasWidth: 5000,
      canvasHeight: 5000,
      viewboxWidth: 0,
      viewboxHeight: 0,
      viewboxMinX: 0,
      viewboxMinY: 0,
      canvasIsDruggble: false,
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
    },

    cursorNearestGridPointCoords() {
      return this.$store.state.editor.cursorNearestGridPointCoords;
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

    clickHandler(event) {
      this.$refs[this.currentTool].clickHandler(event, this.cursorNearestGridPointCoords)
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
      const point = this.cursorPoint.matrixTransform(this.$refs.canvas.getScreenCTM().inverse());
      this.$store.commit('editor/setCursorCanvasCoords', {x: point.x, y: point.y})
    }
  }
}
</script>

<style lang="stylus" scoped>
 
</style>