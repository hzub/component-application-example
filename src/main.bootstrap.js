import angular from 'angular';

import externalDependencies from './main.dependencies';

import {
  CORE,
} from 'shared';

import drawModule from './modules/draw/draw.module';
import elementsModule from './modules/elements/elements.module';

import {
  SHAPES_PANE,
  OBJECT_EDITOR_PANE
} from './components';


import defaultLayoutModule from './layouts/default/default.module';

angular.module('designerApp', [
  ...externalDependencies,

  CORE,
  drawModule,
  elementsModule,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,

  defaultLayoutModule,
]);
