import angular from 'angular';

import externalDependencies from './main.dependencies';

import {
  ELEMENTS,
  DRAW,
  CORE,
} from 'shared';

import {
  DRAW_AREA,
  DRAW_PREVIEW,
  SHAPES_PANE,
  OBJECT_EDITOR_PANE
} from './components';


import defaultLayoutModule from './layouts/default/default.module';

angular.module('designerApp', [
  ...externalDependencies,

  CORE,
  DRAW,
  ELEMENTS,

  DRAW_AREA,
  DRAW_PREVIEW,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,

  defaultLayoutModule,
]);
