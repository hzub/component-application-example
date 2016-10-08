import './left-draw-sidebar.less';

export class LeftDrawSidebarComponent {
  static NAME = 'leftDrawSidebar';
  static OPTIONS = {
    controller: LeftDrawSidebarComponent,
    template: require('./left-draw-sidebar.template.html'),
    bindings: {}
  }

  static $inject = [
    '$rootScope',
    'DRAW_STATES',
    'DRAW_ACTIONS',
    'drawService'
  ];

  constructor($rootScope, DRAW_STATES, DRAW_ACTIONS, drawService) {
    Object.assign(this, {
      $rootScope,
      DRAW_STATES,
      DRAW_ACTIONS,
      drawService,
    });

    this._resetPanelVisibility();

    this.$rootScope.$on('draw:stateChanged', (e, params) => {
      this.routeNewState(params.state);
    });

    this.drawService.onSelectEntity(selection => {
      this.routeNewSelection(selection);
    });
  }

  isMode(mode) {
    return this.mode === mode;
  }

  routeNewState(state) {
    this.helpVisibilityState = state;

    switch (state) {
    case this.DRAW_STATES.SELECTPRODUCT:
      this._resetPanelVisibility();
      this._setPanelVisibility({product: true});
      break;
    case this.DRAW_STATES.ADDSHAPE:
      this._resetPanelVisibility();
      this._setPanelVisibility({shape: true});
      break;
    case this.DRAW_STATES.SELECT:
      this._setPanelVisibility({product: false, shape: false,});
      break;
    default:
      this._resetPanelVisibility();
      break;
    }
  }

  routeNewSelection(selection) {
    if (!selection) {
      this._resetPanelVisibility();
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
      text: false,
      product: false,
      object: false,
      shape: false,
    };
  }
}
