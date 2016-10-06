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
  LEFT_DRAW_SIDEBAR,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,
  PRODUCT_SELECT
} from './components';

import defaultLayoutModule from './layouts/default/default.module';

angular.module('designerApp', [
  ...externalDependencies,

  CORE,
  DRAW,
  ELEMENTS,

  DRAW_AREA,
  DRAW_PREVIEW,

  LEFT_DRAW_SIDEBAR,
  PRODUCT_SELECT,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,

  defaultLayoutModule,
]);
