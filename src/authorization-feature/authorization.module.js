import authorizationService from './services/authorization.service';
import authInterceptorFactory from './services/auth.interceptor.factory';
import RoutingConfiguration from './authorization.routes';

import './styles/authorization.less';

const moduleName = 'tenantApp.authorization';

function RunFn($rootScope, $state, _authorizationService) {
  $rootScope.$on(
    '$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'auth') {
        _authorizationService.raiseInvalidToken();
      }
    }
  );
}

function ConfigFn($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorFactory');
}

angular.module(moduleName, [])
  .config(RoutingConfiguration)
  .service('authorizationService', authorizationService)
  .service('authInterceptorFactory', authInterceptorFactory)
  .run(RunFn)
  .config(ConfigFn)
;

RunFn.$inject = ['$rootScope', '$state', 'authorizationService'];
ConfigFn.$inject = ['$httpProvider'];

export default moduleName;
