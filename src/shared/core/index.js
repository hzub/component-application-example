import { APP_MODES } from './app-modes.constant';
import { ConfigService, ConfigsRegistry } from './config.service';
import { HttpService } from './http.service';
import { httpBackendDecorator } from './http-backend.decorator';
import { RoutingConfiguration } from './core.routes';
import { AppModeService } from './app-mode.service';

import CONFIG from '../../config.json';

export const CORE = angular.module('designerApp.core', [])
  .constant('ConfigsRegistry', ConfigsRegistry)
  .constant('APP_MODES', APP_MODES)
  .service('ConfigService', ConfigService)
  .service('HttpService', HttpService)
  .service('AppModeService', AppModeService)
  .config(RoutingConfiguration)
  .config(['$provide', $provide => $provide.decorator('$httpBackend', httpBackendDecorator)])
  .config(['ConfigsRegistry', ConfigsRegistry => ConfigsRegistry.load(CONFIG)])
  .name;
