import $view from './secondary-navigation.partial.html';

class SecondaryNavigationController {

  static $view = $view;

  /**
   *
   * @param $rootScope
   * @param {AppModeService} AppModeService
   * @param drawService
   */
  constructor(
    AppModeService,
    drawService,
  ) {
    'ngInject';
    Object.assign(this, {
      AppModeService,
      drawService,
    });

    this.AppModeService.subscribe(this._handleModeChange.bind(this));

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
