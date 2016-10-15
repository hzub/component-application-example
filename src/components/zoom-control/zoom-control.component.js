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

  static $inject = [
    'DRAW_ACTIONS',
    'drawService'
  ];

  /**
   * @param DRAW_ACTIONS
   * @param {DrawService} drawService
   */
  constructor(DRAW_ACTIONS, drawService) {
    super();
    this._DRAW_ACTIONS = DRAW_ACTIONS;
    this._drawService = drawService;

    this._setPercentage();
    this.dropdown = {
      open: null,
      options: ZOOM_PERCENTAGES.reverse()
    };
  }

  $onInit() {
    this._subscribeTo([this._drawService]);
  }

  _handleAction(action) {
    switch (action.type) {
    case this._DRAW_ACTIONS.VIEWPORTCHANGED:
      this._setPercentage();
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
