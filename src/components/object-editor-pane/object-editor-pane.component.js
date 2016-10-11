import _ from 'lodash';

import { SubscriberComponent } from 'shared/pub-sub';

import './object-editor-pane.less';

export class ObjectEditorPaneComponent extends SubscriberComponent {
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
    super();

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

  _handleAction() {
    this._updateSelectedEntity();
  }

  $onInit() {
    //this._unsubs.push(this.drawService.onSelectEntity(() => this._updateSelectedEntity()));
    this._subscribeTo([this.drawService]);
    this._updateSelectedEntity();
  }

  $onDestroy() {
    this._unsubs.forEach(f => f());
    this._unsubs = [];
  }

  render() {
    this.drawService.render();
  }

  _updateSelectedEntity() {
    this.selectedEntity = this.drawService.getSelectedEntity();
  }
}
