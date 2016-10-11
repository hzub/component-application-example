import './zoom-control.less';

import { SubscriberComponent } from 'shared/pub-sub';

export class ZoomControlComponent extends SubscriberComponent {
  static NAME = 'zoomControl';
  static OPTIONS = {
    controller: ZoomControlComponent,
    template: require('./zoom-control.template.html'),
    bindings: {}
  }

  static $inject = [
    'DRAW_ACTIONS',
    'drawService'
  ];

  /**
   * @param {angular.IRootScopeService} DRAW_ACTIONS
   * @param {DrawService} drawService
   */
  constructor(DRAW_ACTIONS, drawService) {
    super();
    this._DRAW_ACTIONS = DRAW_ACTIONS;
    this._drawService = drawService;

    this.percentage = drawService.getZoom();
  }

  $onInit() {
    this._subscribeTo([this._drawService]);
  }

  _handleAction(action) {
    if (action.type === this._DRAW_ACTIONS.VIEWPORTCHANGED) {
      this.percentage = this._drawService.getZoom();
    }
  }

  $onDestroy() {
    this._unsub();
  }

  increase() {
    this._drawService.zoomIn();
  }

  decrease() {
    this._drawService.zoomOut();
  }
}
