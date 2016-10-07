import './global-spinner.less';

export class GlobalSpinnerComponent {
  static NAME = 'globalSpinner';

  static OPTIONS = {
    controller: GlobalSpinnerComponent,
    template: require('./global-spinner.template.html'),
    bindings: {}
  }

  static $inject = [
    '$element',
    'globalSpinnerService'
  ];

  constructor($element, globalSpinnerService) {
    Object.assign(this, {
      globalSpinnerService
    });

    this.unsubscribeFn = this.globalSpinnerService.subscribe(doShow => {
      this.isShown = doShow;
    });
  }

  $onDestroy() {
    this.unsubscribeFn();
  }
}
