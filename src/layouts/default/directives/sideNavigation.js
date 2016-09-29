/**
 * SideNavigation - Directive for attaching $state to navigation
 */
class SideNavigation {
  constructor($state) {
    this.$state = $state;
  }
  link($scope) {
    $scope.$state = this.$state;
  }
  static $get(...params) {
    return new SideNavigation(...params);
  }
}

SideNavigation.$get.$inject = ['$state'];

export default SideNavigation.$get;
