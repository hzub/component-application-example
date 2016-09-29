import defaultTemplateUrl from '../../layouts/default/default.template.html';

function RoutingConfiguration($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('default', {
      abstract: true,
      templateUrl: defaultTemplateUrl,
    })
  ;

  $urlRouterProvider.otherwise('/draw');
}

RoutingConfiguration.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];

export default RoutingConfiguration;
