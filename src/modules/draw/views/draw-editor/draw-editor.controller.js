import $view from './draw-editor.view.html';

const $inject = ['$rootScope', 'drawService'];

class DrawEditorController {
  constructor($rootScope, drawService) {
    Object.assign(this, {
      $rootScope,
      drawService,
    });
  }
}

DrawEditorController.$inject = $inject;
DrawEditorController.$view = $view;

export default DrawEditorController;
