import $view from './draw-editor.view.html';

const $inject = ['$rootScope', 'drawService'];

class DrawEditorController {
  constructor($rootScope, drawService) {
    Object.assign(this, {
      $rootScope,
      drawService,
    });

    this.$rootScope.$on('draw:stateChanged', (e, params) => {
      console.info("HALOO", params.state);
      this.stateChange(params.state);
    });
  }

  stateChange(state) {
    this.isPanning = state === 'PAN';
  }

  zoomIn() {
    this.drawService.zoomIn();
  }
  zoomOut() {
    this.drawService.zoomOut();
  }
  pan() {
    this.drawService.setState('PAN');
  }
}

DrawEditorController.$inject = $inject;
DrawEditorController.$view = $view;

export default DrawEditorController;
