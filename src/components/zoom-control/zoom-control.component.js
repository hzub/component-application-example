import './zoom-control.less';

export class ZoomControlComponent {
  static NAME = 'zoomControl';
  static OPTIONS = {
    controller: ZoomControlComponent,
    template: require('./zoom-control.template.html'),
    bindings: {}
  }

  static $inject = [
    '$rootScope',
    'drawService'
  ];

  /**
   * @param {angular.IRootScopeService} $rootScope
   * @param {DrawService} drawService
   */
  constructor($rootScope, drawService) {
    this._$rootScope = $rootScope;
    this._drawService = drawService;

    this.percentage = drawService.getZoom();
  }

  $onInit() {
    this._unsub = this._$rootScope.$on('draw:viewportChanged', () => {
      this.percentage = this._drawService.getZoom()
    });
  }

  $onDestroy() {
    this._unsub();
  }

  increase() {
    this._drawService.zoomIn();
  }

  decrease() {
    this._drawService.zoomOut();
  }
}
