
const $inject = ['$rootScope', 'drawService'];

class LeftSideBarController {
  constructor($rootScope, drawService) {
    Object.assign(this, {
      $rootScope,
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

    if (state === 'SELECTPRODUCT') {
      this.panelVisibility = {
        text: false,
        object: false,
        product: true,
      };
    } else if (state === 'SELECT') {
    } else {
      this.resetPanelVisibility();
    }

    this.helpVisibilityState = state;
  }

  resetPanelVisibility() {
    this.panelVisibility = {
      text: false,
      object: false,
      product: false,
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
}

LeftSideBarController.$inject = $inject;

export default LeftSideBarController;
