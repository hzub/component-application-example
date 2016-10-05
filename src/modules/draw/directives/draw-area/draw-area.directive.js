import $controller from './draw-area.controller';
import $template from './draw-area.template.html';

import extendFabric from './fabric.extensions.js';

const $inject = ['$rootScope', 'drawService', 'stackSelectorService'];

class DateRangepickerDirective {
  constructor($rootScope, drawService, stackSelectorService) {
    Object.assign(this, {
      $rootScope, drawService, stackSelectorService,
    });

    this.restrict = 'EA';
    this.scope = {};
    this.templateUrl = $template;
    this.controller = $controller;
    this.controllerAs = 'vmDrawArea';
    this.bindToController = true;

    extendFabric(this);
  }

  link($scope, $element) {
    const vm = $scope.vmDrawArea;

    vm.init();
  }

  static get(...params) {
    return new DateRangepickerDirective(...params);
  }
}

DateRangepickerDirective.get.$inject = $inject;

export default DateRangepickerDirective.get;
