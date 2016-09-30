import dateRangepickerDirective from './directives/date-rangepicker/date-rangepicker.directive.js';
import GlobalLoaderService from './directives/global-loader/global-loader.service.js';

const moduleName = 'designerApp.elements';

angular.module(moduleName, [])
  .directive('dateRangepicker', dateRangepickerDirective)
  .service('globalLoader', GlobalLoaderService)
;

export default moduleName;
