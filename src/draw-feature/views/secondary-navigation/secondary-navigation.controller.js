import $view from './secondary-navigation.partial.html';

class SecondaryNavigationController {

  static $view = $view;

  constructor(
    AppModeService,
    DRAW_STATES,
    drawService,
  ) {
    'ngInject';
    Object.assign(this, {
      AppModeService,
      DRAW_STATES,
      drawService,
    });

    this.AppModeService.subscribe(this._handleModeChange.bind(this));

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
