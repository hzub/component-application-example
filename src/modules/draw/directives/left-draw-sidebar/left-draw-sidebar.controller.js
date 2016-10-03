class LeftSideBarController {
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

    this.resetPanelVisibility();

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
      this._setPanelVisibility({product: true});
      break;
    case this.DRAW_STATES.ADDSHAPE:
      this.resetPanelVisibility();
      this._setPanelVisibility({shape: true});
      break;
    case this.DRAW_STATES.SELECT:
      break;
    default:
      this.resetPanelVisibility();
      break;
    }
  }

  resetPanelVisibility() {
    this.panelVisibility = {
      text: false,
      object: false,
      product: false,
      shape: false,
    };
  }

  routeNewSelection(selection) {
    if (!selection) {
      this.resetPanelVisibility();
      return;
    }

    if (selection.type === 'text') {
      this.panelVisibility = {
        text: true,
        object: true,
        product: false,
      };
    } else {
      this.resetPanelVisibility();
    }
  }

  _setPanelVisibility(visibility) {
    _.assign(this.panelVisibility, visibility);
  }
}

export default LeftSideBarController;
