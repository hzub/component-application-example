import $view from './secondary-navigation.partial.html';

class SecondaryNavigationController {

  static $inject = [
    '$rootScope',
    'DRAW_STATES',
    'drawService',
    'saveService',
  ];

  static $view = $view;

  constructor($rootScope, DRAW_STATES, drawService, saveService) {
    Object.assign(this, {
      $rootScope, DRAW_STATES, drawService, saveService,
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

  save() {
    this.saveService.save();
  }

  load() {
    this.saveService.load();
  }
}


export default SecondaryNavigationController;
