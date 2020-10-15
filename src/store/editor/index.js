
export default {
  namespaced: true,
  state: {
    cursorCanvasCoords: {x: 0, y: 0},
    cursorNearestGridPointCoords: {x: 0, y: 0},
  },
  mutations: {
    setCursorNearestGridPointCoords({cursorNearestGridPointCoords}, coords) {
      cursorNearestGridPointCoords.x = coords.x;
      cursorNearestGridPointCoords.y = coords.y;
    },

    setCursorCanvasCoords({cursorCanvasCoords}, coords) {
      cursorCanvasCoords.x = coords.x;
      cursorCanvasCoords.y = coords.y;
    }
  },
  actions: {
  },
  modules: {
  }
}
