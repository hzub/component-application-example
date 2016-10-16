import './zoom-control.less';
import { ZOOM_PERCENTAGES } from './zoom-percentages';
import { SubscriberComponent } from 'shared/pub-sub';

export class ZoomControlComponent extends SubscriberComponent {
  static NAME = 'zoomControl';
  static OPTIONS = {
    controller: ZoomControlComponent,
    template: require('./zoom-control.template.html'),
    bindings: {}
  }

  /**
   * @param DRAW_ACTIONS
   * @param {DrawService} drawService
   * @param {ProductsService} productsService
   */
  constructor(DRAW_ACTIONS, drawService, productsService) {
    'ngInject';

    super();
    this._DRAW_ACTIONS = DRAW_ACTIONS;
    this._drawService = drawService;
    this._productsService = productsService;

    this._setPercentage();
    this.dropdown = {
      open: null,
      options: ZOOM_PERCENTAGES.reverse()
    };
  }

  $onInit() {
    this._subscribeTo([this._drawService, this._productsService]);
  }

  _handleAction(action) {
    switch (action.type) {
    case this._DRAW_ACTIONS.VIEWPORTCHANGED:
      this._setPercentage();
      break;

    case this._productsService.ACTIONS.ORIENTATION_CHANGED:
      this._setPercentage();
      this.setZoom();
      break;
    }
  }

  openDropDown() {
    this.dropdown.open = true;
  }

  closeDropDown() {
    this.dropdown.open = false;
  }

  selectPercentageOption(value) {
    this.percentage = value;
    this.setZoom();
  }

  setZoom() {
    this.percentage = this._fixPercentageValue(this.percentage);
    this._drawService.setZoomPercentage(this.percentage);
    this.closeDropDown();
  }

  increase() {
    this._drawService.zoomIn();
  }

  decrease() {
    this._drawService.zoomOut();
  }

  _setPercentage() {
    this.percentage = this._drawService.getZoomPercentage();
  }

  _fixPercentageValue(percentage) {
    const number = Number(percentage.toString().replace(/^0+|[^\d]/g, ''));
    return number > 1000 ? 1000 : number;
  }
}
