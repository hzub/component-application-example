import $view from './secondary-navigation.partial.html';

const $inject = ['drawService'];

class SecondaryNavigationController {

  constructor(drawService) {
    Object.assign(this, {
      drawService,
    });
  }

  addText() {
    this.drawService.setState('ADDTEXT');
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.drawService.setState('SELECTPRODUCT');
  }

  addTestBox() {
    this.drawService.addBox(100, 50);
  }

}

SecondaryNavigationController.$inject = $inject;
SecondaryNavigationController.$view = $view;

export default SecondaryNavigationController;
