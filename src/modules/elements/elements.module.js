import dateRangepickerDirective from './directives/date-rangepicker/date-rangepicker.directive.js';

const moduleName = 'designerApp.elements';

angular.module(moduleName, [])
  .directive('dateRangepicker', dateRangepickerDirective)
;

export default moduleName;
