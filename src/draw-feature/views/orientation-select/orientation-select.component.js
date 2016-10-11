import $view from './orientation-select.view.html';

const $inject = ['productsService'];

class OrientationSelectController {

  constructor(productsService) {
    Object.assign(this, {
      productsService,
    });

    this.init();
  }

  selectOrientation(orientation) {
    this.productsService.selectOrientation(orientation);
    this.selectedOrientation = orientation.name;
  }

  init() {
    this.orientations = this.productsService.getAvailableOrientations();
    this.selectedOrientation = this.productsService.getSelectedOrientation().name;
  }

}

OrientationSelectController.$inject = $inject;
OrientationSelectController.$view = $view;

export default OrientationSelectController;
