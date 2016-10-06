import { DateRangepickerComponent } from './date-rangepicker.component';

export const DATE_RANGE = angular.module('components.date-range', [])
  .component(DateRangepickerComponent.NAME, DateRangepickerComponent.OPTIONS)
  .name;

