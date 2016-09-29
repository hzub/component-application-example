import dateRangepickerController from './date-rangepicker.controller';
import dateRangepickerTemplate from './date-rangepicker.template.html';

class DateRangepickerDirective {
  constructor() {
    this.restrict = 'EA';
    this.require = 'ngModel';
    this.scope = {
      format: '@',
      minDate: '@',
      maxDate: '@',
      onChange: '&',
    };
    this.templateUrl = dateRangepickerTemplate;
    this.controller = dateRangepickerController;
    this.controllerAs = 'vmRangepicker';
    this.bindToController = true;
  }

  link($scope, $element, $attrs, ngModel) {
    const vm = $scope.vmRangepicker;
    vm.ngModel = ngModel;
  }

  static get(...params) {
    return new DateRangepickerDirective(...params);
  }
}

DateRangepickerDirective.get.$inject = [];

export default DateRangepickerDirective.get;
