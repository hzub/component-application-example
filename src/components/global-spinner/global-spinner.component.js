import $ from 'jquery';

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

    this.spinnerElement = $element[0].querySelector('.js-spinner');

    this.globalSpinnerService.subscribe(doShow => {
      this.showSpinner(doShow);
    });
  }

  showSpinner(doShow) {
    if (doShow) {
      this.spinnerElement.classList.add('isShown');
    } else {
      this.spinnerElement.classList.remove('isShown');
    }
  }
}
