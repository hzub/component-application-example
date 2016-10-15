import $view from './secondary-navigation.partial.html';

const $inject = ['$rootScope', 'drawService'];

class SecondaryNavigationController {

  static $inject = [
    '$rootScope',
    'AppModeService',
    'drawService',
  ];

  static $view = $view;

  /**
   *
   * @param $rootScope
   * @param {AppModeService} AppModeService
   * @param drawService
   */
  constructor($rootScope, AppModeService, drawService) {
    Object.assign(this, {
      $rootScope, AppModeService, drawService,
    });

    AppModeService.subscribe(this._handleModeChange.bind(this));

    this.mode = this.AppModeService.getMode();
    this.modes = AppModeService.getModes();
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

  setBackgroundEdit() {
    this.AppModeService.setBackgroundEditMode();
  }

}


export default SecondaryNavigationController;
