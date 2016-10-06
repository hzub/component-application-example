import $controller from './draw-preview.controller';
import $template from './draw-preview.template.html';

import './draw-preview.styles.less';

class DrawPreviewDirective {
  constructor() {
    this.restrict = 'EA';
    this.scope = {};
    this.templateUrl = $template;
    this.controller = $controller;
    this.controllerAs = 'vmDrawPreview';
    this.bindToController = true;
  }

  link($scope) {
    const vm = $scope.vmDrawPreview;

    vm.init();
  }

  static get(...params) {
    return new DrawPreviewDirective(...params);
  }
}

DrawPreviewDirective.get.$inject = [];

export default DrawPreviewDirective.get;
