import loginController from './views/login/login.controller.js';
import formTemplateUrl from '../../layouts/form/form.template.html';


function LogoutEntryFunction($state, authorizationService) {
  return authorizationService
    .logout()
    .then(() => $state.go('auth.login'));
}

function RoutingConfiguration($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true,
      templateUrl: formTemplateUrl,
    })
    .state('auth.login', {
      url: '^/login',
      controllerAs: 'vmLogin',
      controller: loginController,
      templateUrl: loginController.$view,
      params: {
        noRedirect: false,
      },
    })
    .state('auth.logout', {
      url: '^/logout',
      resolve: {
        $logoutEntry: LogoutEntryFunction,
      },
    });
}

LogoutEntryFunction.$inject = [
  '$state',
  'authorizationService',
];

RoutingConfiguration.$inject = ['$stateProvider'];

export default RoutingConfiguration;
