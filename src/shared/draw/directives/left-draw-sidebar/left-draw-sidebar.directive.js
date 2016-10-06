import LeftDrawSidebarController from './left-draw-sidebar.controller';
import LeftDrawSidebarTemplate from './left-draw-sidebar.template.html';

class LeftDrawSidebarDirective {
  constructor() {
    this.restrict = 'EA';
    this.scope = {
    };
    this.templateUrl = LeftDrawSidebarTemplate;
    this.controller = LeftDrawSidebarController;
    this.controllerAs = 'vmLeftDrawSidebar';
    this.bindToController = true;
  }

  link($scope, $element, $attrs) {
    const vm = $scope.vmLeftDrawSidebar;
  }

  static get(...params) {
    return new LeftDrawSidebarDirective(...params);
  }
}

LeftDrawSidebarDirective.get.$inject = [];

export default LeftDrawSidebarDirective.get;
