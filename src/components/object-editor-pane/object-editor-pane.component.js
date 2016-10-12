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
    '$element',
    'fontService',
    'drawService',
    'drawTextService',
    'DRAW_ACTIONS',
  ];

  constructor($element,
              fontService,
              drawService,
              drawTextService,
              DRAW_ACTIONS) {
    super();

    _.assign(this, {
      $element,
      fontService,
      drawService,
      drawTextService,
      DRAW_ACTIONS,
    });

    this.selectedEntity = null;
    this._unsubs = [];
  }

  $onInit() {
    this._subscribeTo([this.drawService]);
    this._updateSelectedEntity();
  }

  render() {
    this.drawService.render();
  }

  _handleAction(action) {
    switch (action.type) {
    case this.DRAW_ACTIONS.VIEWPORTCHANGED:
    case this.DRAW_ACTIONS.ENTITYUPDATED:
      this._updateSelectedEntity();
      break;
    default:
      break;
    }
  }

  _updateSelectedEntity() {
    this.selectedEntity = this.drawService.getSelectedEntity();
  }
}
