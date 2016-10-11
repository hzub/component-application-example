import defaultTemplateUrl from 'layouts/default/default.template.html';

RoutingConfiguration.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];

export function RoutingConfiguration($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('default', {
      abstract: true,
      templateUrl: defaultTemplateUrl,
    })
  ;

  $urlRouterProvider.otherwise('/draw');
}

export default RoutingConfiguration;
