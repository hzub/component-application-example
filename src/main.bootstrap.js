import angular from 'angular';

import EXTERNAL_DEPENDENCIES from './main.dependencies';

import { CORE } from 'shared';
import { DRAW_FEATURE } from 'draw-feature';

import defaultLayoutModule from 'layouts/default/default.module';

angular.module('designerApp', [
  ...EXTERNAL_DEPENDENCIES,

  CORE,
  DRAW_FEATURE,

  defaultLayoutModule,
]);
