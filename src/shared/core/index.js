import { ConfigService, ConfigsRegistry } from './services/config.service';
import { HttpService } from './services/http.service';
import { httpBackendDecorator } from './services/http-backend.decorator';


import { RoutingConfiguration } from './core.routes';

import CONFIG from '../../config.json';

export const CORE = angular.module('designerApp.core', [])
  .constant('ConfigsRegistry', ConfigsRegistry)
  .service('ConfigService', ConfigService)
  .service('HttpService', HttpService)
  .config(RoutingConfiguration)
  .config(['$provide', $provide => $provide.decorator('$httpBackend', httpBackendDecorator)])
  .config(['ConfigsRegistry', ConfigsRegistry => ConfigsRegistry.load(CONFIG)])
  .name;
