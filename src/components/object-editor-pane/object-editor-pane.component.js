import _ from 'lodash';
import './object-editor-pane.less';

export class ObjectEditorPaneComponent {
  static NAME = 'objectEditorPane';
  static OPTIONS = {
    controller: ObjectEditorPaneComponent,
    template: require('./object-editor-pane.template.html'),
    bindings: {}
  }

  static $inject = [
    '$rootScope',
    '$element',
    'fontService',
    'drawService',
    'drawTextService'
  ];

  constructor($rootScope,
              $element,
              fontService,
              drawService,
              drawTextService) {

    _.assign(this, {
      $rootScope,
      $element,
      fontService,
      drawService,
      drawTextService,
    });

    this.selectedEntity = null;
    this._unsubs = [];
  }

  $onInit() {
    this._unsubs.push(this.drawService.onSelectEntity(() => this._updateSelectedEntity()));
    this._updateSelectedEntity();
  }

  $onDestroy() {
    this._unsubs.forEach(f => f());
    this._unsubs = [];
  }

  _updateSelectedEntity() {
    console.log('update selected');
    this.selectedEntity = this.drawService.getSelectedEntity();
  }
}
