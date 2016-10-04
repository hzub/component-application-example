import $view from './draw-editor.view.html';
import './draw-editor.styles.less';

const $inject = ['$rootScope', 'drawService'];

class DrawEditorController {
  constructor($rootScope, drawService) {
    Object.assign(this, {
      $rootScope,
      drawService,
    });

    this.showPreview = false;

    $rootScope.$on('draw:stateChanged', (e, params) => {
      const state = params.state;
      this.showPreview = state === 'PAN' || state === 'ZOOM';
    });
  }
}

DrawEditorController.$inject = $inject;
DrawEditorController.$view = $view;

export default DrawEditorController;
