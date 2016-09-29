import angular from 'angular';

import externalDependencies from './main.dependencies';

import drawModule from './modules/draw/draw.module';
import coreModule from './modules/core/core.module';
import elementsModule from './modules/elements/elements.module';

import defaultLayoutModule from './layouts/default/default.module';

angular.module('designerApp', [
  ...externalDependencies,

  drawModule,
  coreModule,
  elementsModule,

  defaultLayoutModule,
]);
