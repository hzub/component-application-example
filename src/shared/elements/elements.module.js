import dateRangepickerDirective from './directives/date-rangepicker/date-rangepicker.directive.js';
import GlobalLoaderService from './directives/global-loader/global-loader.service.js';
import knobDirective from './directives/knob/knob.directive';

const moduleName = 'designerApp.elements';

angular.module(moduleName, [])
  .directive('dateRangepicker', dateRangepickerDirective)
  .directive('knob', knobDirective)
  .service('globalLoader', GlobalLoaderService)
;

export default moduleName;
