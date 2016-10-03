import _ from 'lodash';

const $inject = ['$rootScope', '$element', 'fontService', 'drawService', 'drawTextService'];

class ObjectEditorController {
  constructor($rootScope, $element, fontService, drawService, drawTextService) {
    Object.assign(this, {
      $rootScope,
      $element,
      fontService,
      drawService,
      drawTextService,
    });
  }
  flipHorizontally() {
    this.drawService.flipHorizontally(this.drawService.getSelectedEntity());
  }
  flipVertically() {
    this.drawService.flipVertically(this.drawService.getSelectedEntity());
  }
}

ObjectEditorController.$inject = $inject;

export default ObjectEditorController;
