import configService from './services/config.service';
import httpService from './services/http.service';
import httpBackendDecorator from './services/http-backend.decorator';
import RoutingConfiguration from './core.routes';

import configContent from '../../config.json';

const moduleName = 'designerApp.core';

angular.module(moduleName, [])
  .config(RoutingConfiguration)
  .config(['$provide', ($provide) => {
    $provide.decorator('$httpBackend', httpBackendDecorator);
  }])
  .provider('configService', configService)
  .service('httpService', httpService)
  .config(['configServiceProvider', (configServiceProvider) => {
    configServiceProvider.load(configContent);
  }])
;

export default moduleName;
