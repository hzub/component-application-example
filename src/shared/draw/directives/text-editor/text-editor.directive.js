import textEditorController from './text-editor.controller';
import textEditorTemplate from './text-editor.template.html';

import './text-editor.styles.less';

class TextEditorDirective {
  constructor() {
    this.restrict = 'EA';
    this.scope = {
    };
    this.templateUrl = textEditorTemplate;
    this.controller = textEditorController;
    this.controllerAs = 'vmTextEditor';
    this.bindToController = true;
  }

  link($scope, $element, $attrs) {
    const vm = $scope.vmTextEditor;
  }

  static get(...params) {
    return new TextEditorDirective(...params);
  }
}

TextEditorDirective.get.$inject = [];

export default TextEditorDirective.get;
