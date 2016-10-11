import './orientation-select.less';

export class OrientationSelectComponent {
  static NAME = 'orientationSelect';
  static OPTIONS = {
    controller: OrientationSelectComponent,
    template: require('./orientation-select.template.html'),
    bindings: {}
  }

  static $inject = [
    'productsService'
  ];

  constructor(productsService) {
    Object.assign(this, {
      productsService,
    });
  }
  selectOrientation(orientation) {
    this.productsService.selectOrientation(orientation);
    this.selectedOrientation = orientation.name;
  }

  $onInit() {
    this.orientations = this.productsService.getAvailableOrientations();
    this.selectedOrientation = this.productsService.getSelectedOrientation().name;
  }
}
