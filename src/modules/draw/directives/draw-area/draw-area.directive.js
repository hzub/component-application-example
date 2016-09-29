import $controller from './draw-area.controller';
import $template from './draw-area.template.html';

import extendFabric from './fabric.extensions.js';

class DateRangepickerDirective {
  constructor($rootScope, drawService) {
    this.restrict = 'EA';
    this.scope = {};
    this.templateUrl = $template;
    this.controller = $controller;
    this.controllerAs = 'vmDrawArea';
    this.bindToController = true;

    extendFabric($rootScope, drawService);
  }

  link($scope, $element) {
    const vm = $scope.vmDrawArea;

    vm.init();
  }

  static get(...params) {
    return new DateRangepickerDirective(...params);
  }
}

DateRangepickerDirective.get.$inject = ['$rootScope', 'drawService'];

export default DateRangepickerDirective.get;
