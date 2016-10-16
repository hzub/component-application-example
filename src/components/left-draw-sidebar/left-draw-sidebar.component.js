import './left-draw-sidebar.less';

import { SubscriberComponent } from 'shared/pub-sub';

export class LeftDrawSidebarComponent extends SubscriberComponent {
  static NAME = 'leftDrawSidebar';
  static OPTIONS = {
    controller: LeftDrawSidebarComponent,
    template: require('./left-draw-sidebar.template.html'),
    bindings: {}
  }

  static $inject = [
    'AppModeService',
    'drawService',
    'APP_MODES',
  ];

  constructor(AppModeService, drawService, APP_MODES) {
    super();
    Object.assign(this, {
      AppModeService,
      drawService,
      APP_MODES,
    });

    this._resetPanelVisibility();

    this._subscribeTo([this.AppModeService, this.drawService]);
  }

  _handleAction(action) {
    switch (action.type) {
    case this.AppModeService._state.ACTIONS.STATE_CHANGED:
      this._handleModeAction(action);
      break;
    case this.drawService._state.ACTIONS.STATE_CHANGED:
      this._handleDrawServiceAction(action);
      break;
    default:
      break;
    }
  }

  _handleModeAction(action) {
    const appMode = this.AppModeService.getMode();
    this.routeNewAppMode(appMode);
  }

  _handleDrawServiceAction() {
    this.routeNewSelection();
  }

  isMode(mode) {
    return this.mode === mode;
  }

  routeNewAppMode(appMode) {
    this.helpVisibilityState = appMode;

    switch (appMode) {
    case this.APP_MODES.SELECTPRODUCT:
      this._resetPanelVisibility();
      this._setPanelVisibility({product: true});
      break;
    case this.APP_MODES.ADDSHAPE:
      this._resetPanelVisibility();
      this._setPanelVisibility({shape: true});
      break;
    case this.APP_MODES.SELECT:
      this._setPanelVisibility({product: false, shape: false});
      break;
    case this.APP_MODES.BACKGROUND_EDIT:
      this._resetPanelVisibility();
      this._setPanelVisibility({background: true});
      break;
    default:
      this._resetPanelVisibility();
      break;
    }
  }

  routeNewSelection() {
    const selection = this.drawService.getSelectedEntity();

    if (!selection) {
      return;
    }

    switch (selection.type) {
    case 'text':
      this._setPanelVisibility({text: true, shape: false, object: true,});
      break;
    case 'path-group':
      this._setPanelVisibility({text: false, shape: false, object: true,});
      break;
    default:
      this._resetPanelVisibility();
    }
  }

  _setPanelVisibility(visibility) {
    _.assign(this.panelVisibility, visibility);
  }

  _resetPanelVisibility() {
    this.panelVisibility = {
      background: false,
      text: false,
      product: false,
      object: false,
      shape: false,
    };
  }
}
