import _ from 'lodash';

class dateRangepickerController {
  constructor($scope) {
    Object.assign(this, {
      $scope,
    });

    this.init();

    $scope.$watch('vmRangepicker.range', val => {
      if (_.isObject(val)) {
        this.ngModel.$setViewValue(val);
      }
    });
  }

  init() {
    this.range = { from: new Date(), to: new Date() };
    this.range.from.setHours(0, 0, 0);
    this.range.to.setHours(23, 59, 59);

    this.fromPickerOpen = false;
    this.fromPickerOptions = {
      minDate: this.minDate ? new Date(this.minDate) : null,
      maxDate: this.toPickerDate,
    };
    this.fromPickerDate = this.range.from;

    this.toPickerOpen = false;
    this.toPickerOptions = {
      minDate: this.fromPickerDate,
      maxDate: this.maxDate ? new Date(this.maxDate) : null,
    };
    this.toPickerDate = this.range.to;
  }

  toggleFromPicker() {
    this.fromPickerOpen = !this.fromPickerOpen;
    this.toPickerOpen = false;
  }
  toggleToPicker() {
    this.fromPickerOpen = false;
    this.toPickerOpen = !this.toPickerOpen;
  }

  onFromPickerChange() {
    this.toPickerOptions.minDate = this.fromPickerDate;
    this.range.from = this.fromPickerDate;
    this.onChange({ value: this.range });
  }
  onToPickerChange() {
    this.fromPickerOptions.maxDate = this.toPickerDate;
    this.range.to = this.toPickerDate;
    this.range.to.setHours(23, 59, 59);
    this.onChange({ value: this.range });
  }
}

dateRangepickerController.$inject = ['$scope'];

export default dateRangepickerController;
