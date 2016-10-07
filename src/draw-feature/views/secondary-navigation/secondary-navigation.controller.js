import $view from './secondary-navigation.partial.html';

const $inject = ['$rootScope', 'drawService'];

class SecondaryNavigationController {

  static $inject = [
    '$uibModal',
    '$rootScope',
    'DRAW_STATES',
    'SELECT_DESIGN_POPUP_OPTIONS',
    'drawService',
    'userDesignsService',
  ];

  static $view = $view;

  constructor(
    $uibModal,
    $rootScope,
    DRAW_STATES,
    SELECT_DESIGN_POPUP_OPTIONS,
    drawService,
    userDesignsService
  ) {
    Object.assign(this, {
      $uibModal,
      $rootScope,
      DRAW_STATES,
      SELECT_DESIGN_POPUP_OPTIONS,
      drawService,
      userDesignsService,
    });

    this.state = this.drawService.getState();

    this.$rootScope.$on('draw:stateChanged', (e, params) => {
      this.state = params.state;
    });
  }

  getButtonStyle(state, a, b) {
    return this.state === state ? a : b;
  }

  addText() {
    this.drawService.setState(this.DRAW_STATES.ADDTEXT);
  }

  select() {
    this.drawService.selectEntity(null);
    this.drawService.setState('SELECT');
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.drawService.setState(this.DRAW_STATES.SELECTPRODUCT);
  }

  addShape() {
    this.drawService.setState(this.DRAW_STATES.ADDSHAPE)
  }

  addTestBox() {
    this.drawService.addBox(100, 50);
  }

  zoom() {
    this.drawService.setState('ZOOM');
  }

  pan() {
    this.drawService.setState('PAN');
  }

  TESTload() {
    this.$uibModal.open(this.SELECT_DESIGN_POPUP_OPTIONS).result.then(designObject => {
      this.userDesignsService.load(designObject);
    });
  }
}


export default SecondaryNavigationController;
