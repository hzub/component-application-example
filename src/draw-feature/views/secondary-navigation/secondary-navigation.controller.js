import $view from './secondary-navigation.partial.html';

const $inject = ['$rootScope', 'drawService'];

class SecondaryNavigationController {

  static $inject = [
    '$rootScope',
    'AppModeService',
    'drawService',
  ];

  static $view = $view;

  constructor($rootScope, AppModeService, drawService) {
    Object.assign(this, {
      $rootScope, AppModeService, drawService,
    });

    AppModeService.subscribe(this._handleModeChange.bind(this));

    this.mode = this.AppModeService.getMode();
  }

  _handleModeChange() {
    this.mode = this.AppModeService.getMode();
  }

  getButtonStyle(mode, a, b) {
    return this.mode === mode ? a : b;
  }

  addText() {
    this.AppModeService.setAddTextMode();
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.AppModeService.setSelectProductMode();
  }

  addShape() {
    this.AppModeService.setAddShapeMode();
  }

}


export default SecondaryNavigationController;
