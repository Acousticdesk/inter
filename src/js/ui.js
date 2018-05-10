export default {
  isPortraitOrientation() {
    return window.innerHeight > window.innerWidth;
  },
  killDefaultDragDrop () {
    document.ondragstart = function () {
      return false;
    };
  }
};
