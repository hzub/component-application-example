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

  select() {
    this.drawService.selectEntity(null);
    this.AppModeService.setSelectMode();
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.AppModeService.setSelectProductMode();
  }

  addShape() {
    this.AppModeService.setAddShapeMode();
  }

  zoom() {
    this.AppModeService.setZoomMode();
  }

  pan() {
    this.AppModeService.setPanMode();
  }
}


export default SecondaryNavigationController;
