import objectEditorController from './object-editor.controller';
import objectEditorTemplate from './object-editor.template.html';

import './object-editor.styles.less';

class ObjectEditorDirective {
  constructor() {
    this.restrict = 'EA';
    this.scope = {
    };
    this.templateUrl = objectEditorTemplate;
    this.controller = objectEditorController;
    this.controllerAs = 'vmObjectEditor';
    this.bindToController = true;
  }

  link($scope, $element, $attrs) {
    const vm = $scope.vmObjectEditor;
  }

  static get(...params) {
    return new ObjectEditorDirective(...params);
  }
}

ObjectEditorDirective.get.$inject = [];

export default ObjectEditorDirective.get;
