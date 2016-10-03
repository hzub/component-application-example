import $view from './secondary-navigation.partial.html';

const $inject = ['$rootScope', 'drawService'];

class SecondaryNavigationController {

  constructor($rootScope, drawService) {
    Object.assign(this, {
      $rootScope, drawService,
    });

    this.state = this.drawService.getState();
    console.info("HALO", this.drawService.getState());

    this.$rootScope.$on('draw:stateChanged', (e, params) => {
      this.state = params.state;
    });
  }

  getButtonStyle(state, a, b) {
    return this.state === state ? a : b;
  }

  addText() {
    this.drawService.setState('ADDTEXT');
  }

  select() {
    this.drawService.selectEntity(null);
    this.drawService.setState('SELECT');
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.drawService.setState('SELECTPRODUCT');
  }

  addTestBox() {
    this.drawService.addBox(100, 50);
  }

  zoomIn() {
    this.drawService.zoomIn();
  }
  zoomOut() {
    this.drawService.zoomOut();
  }
  pan() {
    this.drawService.setState('PAN');
  }
}

SecondaryNavigationController.$inject = $inject;
SecondaryNavigationController.$view = $view;

export default SecondaryNavigationController;
