<template lang="pug">
  g
    line.drawingLine(
      v-if="drawingLineStartCoords && lineIsDrawed && selectedLineIndex === null"
      :x1="drawingLineStartCoords.x"
      :y1="drawingLineStartCoords.y"
      :x2="cursorNearestGridPointCoords.x"
      :y2="cursorNearestGridPointCoords.y"
      stroke-width="1"
      stroke-opacity="0.3"
      stroke="#000"
    )

    g(v-for="(lineCoords, index) in linesCoords")
      line(
        :x1="lineCoords.x1"
        :y1="lineCoords.y1"
        :x2="lineCoords.x2"
        :y2="lineCoords.y2"
        stroke-width="1"
        :stroke-opacity="selectedLineIndex === index ? 0.3 : 1"
        stroke="#000"
      )
      line(
        @dblclick="lineDoubleClickHandler(index)"
        :x1="lineCoords.x1"
        :y1="lineCoords.y1"
        :x2="lineCoords.x2"
        :y2="lineCoords.y2"
        stroke-width="7"
        stroke="#000"
        stroke-opacity="0"
      )

    template(v-if="selectedLineIndex !== null")
      circle(
        @click="lineControClickHandler($event, 'lineStart')"
        r="4"
        fill="#000"
        fill-opacity="0.3"
        :cx="linesCoords[selectedLineIndex].x1"
        :cy="linesCoords[selectedLineIndex].y1"
      )
      circle(
        @click="lineControClickHandler($event, 'lineEnd')"
        r="4"
        fill="#000"
        fill-opacity="0.3"
        :cx="linesCoords[selectedLineIndex].x2"
        :cy="linesCoords[selectedLineIndex].y2"
      )
    
</template>

<script>
export default {
  data() {
    return {
      lineIsDrawed: false,
      lineIsEdited: false,
      selectedLineIndex: null,
      drawingLineStartCoords: null,
      editedControlType: '',
      linesCoords: [],
    }
  },

  computed: {
    cursorNearestGridPointCoords() {
      return this.$store.state.editor.cursorNearestGridPointCoords;
    }
  },

  methods: {
    editLine() {
      const editedLineCoords = this.linesCoords[this.selectedLineIndex]; 
      if(this.editedControlType === 'lineStart') {
        editedLineCoords.x1 = this.cursorNearestGridPointCoords.x;
        editedLineCoords.y1 = this.cursorNearestGridPointCoords.y;
      } else {
        editedLineCoords.x2 = this.cursorNearestGridPointCoords.x;
        editedLineCoords.y2 = this.cursorNearestGridPointCoords.y;
      }
    },
    
    lineControClickHandler(event, controlType) {
      event.stopPropagation();
      this.lineIsEdited = !this.lineIsEdited;
      this.editedControlType = controlType;
    },

    lineDoubleClickHandler(lineIndex) {
      this.selectLine(lineIndex);
    },

    selectLine(lineIndex) {
      this.selectedLineIndex = lineIndex;
    },

    editorMousemoveHandler() {
      if (this.lineIsEdited) {
        this.editLine();
      }
    },

    editorClickHandler() {
      if (this.lineIsEdited) {
        this.lineIsEdited = false;
        return;
      }

      if (this.selectedLineIndex !== null) {
        this.selectedLineIndex = null;
        return;
      } 

      if (!this.lineIsDrawed) {
        this.lineIsDrawed = true;
        this.drawingLineStartCoords = {
          x: this.cursorNearestGridPointCoords.x,
          y: this.cursorNearestGridPointCoords.y,
        };
      } else {
        this.lineIsDrawed = false;
        
        if (
          this.drawingLineStartCoords.x !== this.cursorNearestGridPointCoords.x || 
          this.drawingLineStartCoords.y !== this.cursorNearestGridPointCoords.y
        ) {
          this.linesCoords.push({
            x1: this.drawingLineStartCoords.x,
            y1: this.drawingLineStartCoords.y,
            x2: this.cursorNearestGridPointCoords.x,
            y2: this.cursorNearestGridPointCoords.y,
          })
        }

        this.drawingLineStartCoords = null;
      }
    }
  }
}
</script>